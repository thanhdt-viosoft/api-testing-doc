import * as _ from 'lodash'
import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import TestCase from './TestCase'
import { TestTag } from './TestTag'
import SCHEMA from '../types'
import TestTags from './TestTags'

export default class TestJob extends TestTags {
  steps: TestTag[]
  curDir: string

  async init() {
    if (this.yamlConfig) {
      const yamlSteps = yaml.safeLoad(fs.readFileSync(this.yamlConfig, 'utf8'), {
        schema: SCHEMA
      })
      this.value = yamlSteps.steps || yamlSteps
      this.curDir = path.dirname(this.yamlConfig)
      // console.log(`Async load TestJob: ${this.yamlConfig} ...`)
    }
    await super.init()
  }

  constructor(public yamlConfig: string, tc: TestCase, parent: any) {
    super(undefined, tc, parent)
  }

  async exec() {
    await this.init()
    if (this.attr.loop) {
      const list = eval(`vars.${this.attr.loop}`)
      if (list) {
        for (let _i in list) {
          eval(`vars.${this.attr.loop}_key = _i`)
          eval(`vars.${this.attr.loop}_value = list[_i]`)
          await this._execute()
          eval(`delete vars.${this.attr.loop}_key`)
          eval(`delete vars.${this.attr.loop}_value`)
        }
      }
    } else if (this.attr.while) {
      const isOk = TestTag.replaceVars(this.attr.while, undefined)
      while (isOk) {
        await this._execute()
        if (this.attr.whileDelay) {
          this.attr.whileDelay = +this.attr.whileDelay
          await this.sleep(this.attr.whileDelay)
        }
      }
    } else {
      await this._execute()
    }
  }

}