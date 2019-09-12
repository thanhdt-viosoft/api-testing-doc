import * as _ from 'lodash'
import * as fs from 'fs'
import chalk from 'chalk'
import * as yaml from 'js-yaml'
import TestCase from './TestCase'
import { TestTag } from './TestTag'
import SCHEMA from '../types'
import { FileTypeYaml } from '../types/File.type'
import TestJob from './TestJob'

export default class TestTags extends TestTag {
  steps: TestTag[]
  curDir: string
  isGlobalJob = true

  async scanTags() {
    for (let step of this.value) {
      let elem
      let isDisabledApi
      let apiName = Object.keys(step).find(e => !e.startsWith('<'))
      if (apiName && typeof step[apiName] === 'object') {
        elem = new TestTag(undefined, this.tc, this)
        elem.name = 'api'
        elem.attr.title = apiName
        elem.value = step[apiName]
        isDisabledApi = elem.value.disabled || elem.attr.title.endsWith('---')
      } else {
        elem = new TestTag(step, this.tc, this)
        elem.attr.curDir = this.curDir || this.tc.curDir
        if (elem.name === 'job') {
          const job = new TestJob(undefined, this.tc, this)
          job.value = elem.value
          job.curDir = elem.attr.curDir
          job.attr = elem.attr
          elem = job
        } else if (elem.name === 'import') {
          if (!(elem.value instanceof FileTypeYaml)) throw new Error('Import value must have !file tag')
          if (!elem.attr.data) {
            // <import>: File import here
            const yamlConfig = await (elem.value as FileTypeYaml).getAbsFile(this.tc.curDir)
            if (fs.existsSync(yamlConfig)) {
              const yamlObj = yaml.safeLoad(fs.readFileSync(yamlConfig, 'utf8'), {
                schema: SCHEMA
              })
              if (Array.isArray(yamlObj)) {
                const job = new TestJob(yamlConfig, this.tc, this)
                job.attr = elem.attr
                elem = job
              } else {
                const tcase = new TestCase(yamlConfig, this.tc)
                tcase.docs = _.merge({}, this.tc.docs, elem.docs)
                tcase.if = elem.attr.if
                elem = tcase
              }
            } else {
              console.log(chalk.red(`Could not found yaml file "${yamlConfig}"`))
            }
          } else {
            const jsonData = await elem.value.getAbsFile(this.tc.curDir)
            const data = fs.readFileSync(jsonData, 'utf8')
            try {
              if (elem.attr.var) {
                TestTag.setVar(elem.attr.var, JSON.parse(data))
              } else {
                _.merge(vars, JSON.parse(data))
              }
            } catch (e) {
              console.log(chalk.red('Format data in <import data> is not valid json type'))
            }
            continue
          }
        }
      }
      if (this.tc.stepByStep && !(elem.name === 'pause' || elem.name === 'job')) {
        const prev = this.steps[this.steps.length - 1]
        if (prev && !(prev.name === 'pause')) {
          const pause = new TestTag(undefined, this.tc, this.parent)
          pause.name = 'pause'
          this.steps.push(pause)
        }
      }
      if (!isDisabledApi) this.steps.push(elem)
      if (this.isGlobalJob) TestCase.steps.push(elem)
    }
  }

  async init() {
    if (this.attr.debug === undefined) this.attr.debug = this.tc.debug
    if (this.value) {
      this.steps = []
      await this.scanTags()
    }
  }

  constructor(public yamlConfig: string, tc: TestCase, parent: any) {
    super(undefined, tc, parent)
  }

  loadTag(value: any) {
    const t = new TestTag(value, this.tc, this.parent)
    _.merge(this, t)
  }

  protected async _execute() {
    const asyncJobs = []
    const executeAsyncASAP = async () => {
      if (asyncJobs.length > 0) {
        await Promise.all(asyncJobs.map(async (e) => {
          try {
            await e
          } catch (e) {
            if (!this.attr.forces) throw e
          }
        }))
        asyncJobs.splice(0, asyncJobs.length)
      }
    }
    if (this.attr.title) console.group(chalk.white(`✜  ${await TestTag.replaceVars(this.attr.title, undefined)}`))
    try {
      for (let i in this.steps) {
        const t = this.steps[i] as TestTag | TestJob | TestCase
        if (!await t.conditionValid()) continue
        if (t instanceof TestJob || t instanceof TestCase) {
          if (t instanceof TestJob && t.attr.async) {
            asyncJobs.push(t.exec())
            continue
          }
        }
        await executeAsyncASAP()
        try {
          await t.exec()
        } catch (e) {
          if (!this.attr.forces) throw e
        }
      }
      await executeAsyncASAP()
    } catch (e) {
      if (!this.attr.force) throw e
    }
    if (this.attr.title) console.groupEnd()
  }
}