import chalk from 'chalk'
import * as shell from 'shelljs'
import { FileTypeYaml } from '../types/File.type'
import { TestTag } from '../item/TestTag'
import * as Convert from 'ansi-to-html'
import TestJob from '../item/TestJob';
import { QueueJob } from '../QueueJob'

var convert = new Convert()

export default async function (wsTag: TestTag) {
  const { cmd, debug, ansi2html, stopWhen, stopWhenDelay, delayBeforeDone = 5000 } = wsTag.attr
  const f = FileTypeYaml.toFile(cmd)
  let scmd: string
  if (f instanceof FileTypeYaml) {
    scmd = await f.getAbsFile(wsTag.tc.curDir)
  } else {
    scmd = f
  }
  const jobs = new QueueJob()
  return new Promise(async (resolve, reject) => {
    try {
      console.log(chalk.grey(`Execute "${scmd}"`))

      let rs = wsTag.attr.vars ? TestTag.getVar(wsTag.attr.vars, []) : undefined
      let state = 0

      const p = shell.exec(scmd, {
        silent: true,
        async: true
      })

      const output = function (data: any, isError = false) {
        return (function (data: any, isError = false) {
          return async function () {
            if (data !== undefined && data !== null) {
              data = data.toString()
              // if (/warn/img.test(data)) {
              //   data = chalk.yellow(data)
              // } else 
              if (isError) data = chalk.red(data)
              if (debug) {
                console.log(chalk.gray(data))
              } else if (ansi2html) {
                data = convert.toHtml(data)
              }
            }

            TestTag.setVar(wsTag.attr.var, data)
            if (rs) rs.push(data)

            const job = new TestJob(undefined, wsTag.tc, wsTag)
            job.isGlobalJob = false
            job.value = wsTag.value
            await job.exec()
          }
        })(data, isError)
      }
      p.stderr.on('data', async (data) => {
        if (state < -1) return
        jobs.push(output(data, true))
        await jobs.exec()
      })
      p.stdout.on('data', async (data) => {
        if (state < -1) return
        jobs.push(output(data, false))
        await jobs.exec()
      })
      p.on('close', async (code) => {
        if (state < 0) return
        state = -1
        if (debug) console.log('- Execution finished', code)

        p.stdin.end();

        setTimeout(async () => {
          if (state < -1) return
          state = -2
          jobs.push(output(null, false))
          await jobs.exec()
          resolve()
        }, +delayBeforeDone)
      })
      p.on('exit', async (code) => {
        if (code === 0 || state < 0) return
        state = -1
        if (debug) console.log('- Execution stoped', code)

        p.stdin.end();

        setTimeout(async () => {
          if (state < -1) return
          state = -2
          jobs.push(output(undefined, false))
          await jobs.exec()
          resolve()
        }, +delayBeforeDone)
      })

      if (stopWhen) {
        let isClose: any
        do {
          isClose = await TestTag.replaceVars(stopWhen, undefined)
          if (isClose && !p.killed) {
            p.kill()
          } else {
            await wsTag.sleep(+stopWhenDelay || 1000)
          }
        } while (!isClose)
      }
    } catch (e) {
      console.log(chalk.red(`Could not found file execution or command "${scmd}"`))
      reject(e)
    }
  })
}
