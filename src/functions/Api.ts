import chalk from 'chalk'
import * as _ from 'lodash'
import * as fs from 'fs'
import * as FormData from 'form-data'
import axios from 'axios'
import { TestTag } from '../item/TestTag'
import TestCase from '../item/TestCase'
import { FileTypeYaml } from '../types/File.type'

const Method = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS']

function getValidator(name: string) {
  name = name[0].toUpperCase() + name.substr(1)
  const func = require(`../validator/${name}`)
  if (!func) console.error(`Could not fould validator ${name}`)
  return func.default
}

function delayRetry(delay, max, count, isSlient) {
  const msg = `[Retry] ${count}/${max} after ${delay} ms`
  return new Promise(resolve => {
    if (!isSlient) {
      console.log() // chalk.yellow(msg.split('').map(() => '-').join('')))
      console.log(chalk.yellow(msg))
      console.log()
    }
    setTimeout(resolve, delay)
  })
}

export default async function (tag: TestTag) {
  let { value, attr } = tag
  if (value.extends) {
    let tmp = TestCase.steps.find((e: TestTag) => e.name === 'api' && e.attr.title === value.extends) as TestTag
    if (!tmp) throw new Error(`Could not found test step ${value.extends} to extends`)
    value = _.merge({ headers: {} }, _.pick(tmp.value, [...Method, 'body', 'headers']), value)
    // attr = _.merge({}, tmp.attr, attr)
  }

  const axiosConfig = {
    method: Method.find(e => value[e])
  } as any

  attr.index = result.index
  attr.id = 'id' + (Math.random() * 1E16).toString()
  if (!attr._title) attr._title = _.cloneDeep(attr.title)
  attr.title = await TestTag.replaceVars(attr._title, undefined)
  attr.testApiName = `[${tag.tc.title}] ${attr.title}`
  value.doc === undefined && attr.title.startsWith('//') && (value.doc = false)
  value.doc === undefined && (value.doc = tag.tc.doc)
  value.doc === undefined && (value.doc = true)
  value.debug === undefined && (value.debug = tag.tc.debug)
  if (value['retry/delay']) {
    attr.retry = {} as any
    const prms = value['retry/delay'].split('/')
    attr.retry.time = +prms[0] || 1
    if (prms[1]) {
      attr.retry.delay = eval(prms[1].replace('s', '*1000').replace('m', '*60000'))
    } else {
      attr.retry.delay = 1000
    }
  } else {
    delete attr.retry
  }
  attr.isRetry = !!attr.retry
  let start
  let retry = 0
  do {
    try {
      try {
        attr.error = false
        attr.url = axiosConfig.url = await TestTag.replaceVars(value[axiosConfig.method].replace(/(:[_a-zA-Z0-9|]+\|)/g, ''), vars)
        const _url = new URL(await TestTag.replaceVars(value[axiosConfig.method].replace(/\|([^/]+)/g, ''), vars))
        attr.testApiUrl = _url.pathname + decodeURIComponent(_url.search)
        attr.mdUrl = value[axiosConfig.method].replace(/\|([^/]+)/g, '')
        attr.method = axiosConfig.method
        attr.pathname = new URL(attr.url).pathname
        attr.note = value.note
        if (!value.headers) value.headers = {}
        try {
          axiosConfig.headers = (value.headers && await TestTag.replaceVars(value.headers, undefined)) || {}
          if (!axiosConfig.headers['content-type']) axiosConfig.headers['content-type'] = 'application/json'
        } catch (e) {
          e.message = '<<Replace var in request header is error>> ' + e.message
          throw e
        }
        attr.headers = axiosConfig.headers
        try {
          axiosConfig.data = value.body && await TestTag.replaceVars(value.body, undefined)
        } catch (e) {
          e.message = '<<Replace var in request body is error>>' + e.message
          throw e
        }
        attr.body = _.cloneDeep(axiosConfig.data)
        if (axiosConfig.data) {
          if (axiosConfig.headers['content-type'] && axiosConfig.headers['content-type'].includes('multipart/form-data')) {
            const form = new FormData()
            for (let k in axiosConfig.data) {
              if (axiosConfig.data[k] instanceof FileTypeYaml) {
                let file: string
                try {
                  file = await (axiosConfig.data[k] as FileTypeYaml).getAbsFile(tag.tc.curDir)
                  axiosConfig.data[k] = fs.createReadStream(file)
                } catch (e) {
                  console.log(chalk.red(`Could not found file "${file}"`))
                  throw e
                }
              }
              form.append(k, axiosConfig.data[k])
            }
            axiosConfig.data = form
            attr.headers = _.cloneDeep(axiosConfig.headers)
            axiosConfig.headers = _.merge({}, axiosConfig.headers, form.getHeaders())
          }
        }
        start = Date.now()
        attr.response = await axios(axiosConfig)
        TestTag.setVar(value.var, attr.response.data)
        TestTag.setVars(value.vars, attr.response)
      } catch (e) {
        attr.error = true
        if (e.response) {
          attr.response = _.pick(e.response, ['headers', 'status', 'data', 'statusMessage'])
          attr.response.data = e.response.data
        } else {
          attr.response = {} as any
          attr.response.data = e.message
        }
        if (!attr.response.headers) attr.response.headers = {}
        if (!attr.response.headers['content-type']) attr.response.headers['content-type'] = 'text/plain'
      } finally {
        attr.response.executionTime = Date.now() - start
        attr.msgs = [] as {
          msg?: string, child?: { actual: any, expect: any }, status: number
        }[]
        if (value.validate) {
          // @ts-ignore
          const { status, headers, data } = attr.response
          for (let etc of value.validate) {
            for (let des in etc) {
              for (let func of etc[des]) {
                for (let funcPath in func) {
                  let funcValue = func[funcPath]
                  const [, funcName, k] = funcPath.match(/^([^(]+)\(([^)]+)\)$/)
                  funcValue = await TestTag.replaceVars(funcValue, vars)
                  const validator = getValidator(funcName)
                  validator(des, eval(k), funcValue, attr.msgs)
                }
              }
            }
          }
          attr.error = !!attr.msgs.find(e => e.status === -1)
        }
        if (attr.error) throw new Error(`API: ${attr.title} is error`)
        result.status.passed++
      }
      break;
    } catch (e) {
      if (!attr.retry || ++retry > attr.retry.time) {
        attr.isRetry = false
        result.status.failed++
        throw e
      }
      attr.isRetry = true
    } finally {
      let styleStatus = isNaN(+attr.response.status) || attr.response.status < 200 || attr.response.status >= 300 ? chalk.yellow : chalk.cyan
      if (!value.slient) {
        if (attr.error) {
          if (attr.isRetry) {
            console.log(chalk.gray(chalk.red('↻ ') + `${attr.index}. `) + chalk.red(`${styleStatus(`${+attr.response.status}`)} ${attr.method} \t${attr.pathname} \t${chalk.gray(attr.title)} \t${chalk.grey(`${attr.response.executionTime}ms`)}`))
          } else {
            console.log(chalk.gray(chalk.blue(value.doc ? '✰ ' : '  ') + `${attr.index}. `) + chalk.red(`${styleStatus(`${+attr.response.status}`)} ${attr.method} \t${attr.pathname} \t${chalk.blue(attr.title)} \t${chalk.grey(`${attr.response.executionTime}ms`)}`))
            if (attr.response) {
              console.group()
              console.log(chalk.red('- ' + attr.response.data))
              console.groupEnd()
            }
          }
        } else {
          console.log(chalk.gray(chalk.blue(value.doc ? '✰ ' : '  ') + `${attr.index}. `) + chalk.green(`${styleStatus(`${+attr.response.status}`)} ${attr.method} \t${attr.pathname} \t${chalk.blue(attr.title)} \t${chalk.grey(`${attr.response.executionTime}ms`)}`))
        }
        if (value.debug || attr.error) {
          const link = chalk.red('⬤ ') + chalk.grey(`${TestCase.TestURL}/Test?cmd=${encodeURIComponent(Buffer.from(unescape(encodeURIComponent(JSON.stringify(TestCase.toTestOnapisCom(tag))))).toString('base64'))}`)
          console.group()
          console.log(link)
          console.groupEnd()
        }
        if (attr.msgs.length > 0) {
          console.group()
          attr.msgs.forEach(e => {
            if (e.status === 1) {
              console.group(chalk.magenta(`> ${e.msg} ${chalk.green('✔')}`))
            } else {
              console.group(chalk.magenta(`> ${e.msg} ${chalk.red('✘')}`))
              if (e.child) {
                console.group(chalk.grey(`+ Actual`))
                console.log(chalk.red((typeof (e.child.actual) === 'object' ? JSON.stringify(e.child.actual, null, ' ') : `${e.child.actual}`)))
                console.groupEnd()
                console.group(chalk.grey(`+ Expect`))
                console.log(chalk.green((typeof (e.child.expect) === 'object' ? JSON.stringify(e.child.expect, null, ' ') : `${e.child.expect}`)))
                console.groupEnd()
              }
            }
            console.groupEnd()
          })
          console.groupEnd()
        }
      }
      if (attr.error && attr.isRetry) await delayRetry(attr.retry.delay, attr.retry.time, retry, value.slient)
    }
  } while (true)

  // attr._url = attr.url = attr[attr.method].replace(/(:[_a-zA-Z0-9|]+\|)/g, '')
  // attr.__url = attr[attr.method].replace(/\|([^/]+)/g, '')
}
