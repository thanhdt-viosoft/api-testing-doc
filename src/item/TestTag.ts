import * as __ from 'lodash'
import TestCase from "./TestCase"
import { AbsType } from '../types/AbsType'
import TestTags from './TestTags';

export class TestTag {
  if: string
  name: string
  attr = {} as any
  curDir: string
  value: any

  static setVar(key, _value) {
    if (key) eval(`vars.${key} = _value`)
  }

  static getVar(key, _df?: any) {
    let rs
    if (key) rs = eval(`vars.${key}`)
    if (rs === undefined) return eval(`vars.${key} = _df`)
    return rs
  }

  static setVars(varsObj, value) {
    // @ts-ignore
    if (varsObj && value !== null && value !== undefined) {
      // @ts-ignore
      eval(`${Object.keys(varsObj).map(e => `TestTag.setVar('${e}', value.${varsObj[e]}`).join('\n')})`)
    }
  }

  async conditionValid() {
    if (this.attr.if === undefined) return true
    const rs = await TestTag.replaceVars(this.attr.if, undefined)
    return rs
  }

  constructor(step: any, public tc: TestCase, public parent: TestTag | TestTags) {
    if (!step) return
    if (typeof step === 'object') {
      for (let k in step) {
        const match = k.match(/<([^ >]+)( .+)?/)
        if (match) {
          let [, tagName, _attr = ''] = match
          tagName = tagName.replace(/-/g, '_')
          _attr = _attr.trim()
          const r = /([A-Za-z0-9_\-]+)(="(.*?)"[> ])?/gs
          let m = r.exec(_attr)
          while (m) {
            this.attr[m[1]] = m[3] !== undefined ? (m[3] === 'true' ? true : m[3] === 'false' ? false : m[3]) : true
            m = r.exec(_attr)
          }
          this.name = tagName
          this.value = step[k]
        } else {
          throw new Error(`Not found directive ${k}`)
        }
      }
    } else {
      this.name = 'note'
      this.value = step
    }
  }

  async exec() {
    if (!functions[this.name]) throw new Error(`Not found tag "${this.name}" with attributes "${JSON.stringify(this.attr)}"`)
    if (this.attr.loop) {
      const list = eval(`vars.${this.attr.loop}`)
      if (list) {
        for (let _i in list) {
          eval(`vars.${this.attr.loop}_key = _i`)
          eval(`vars.${this.attr.loop}_value = list[_i]`)
          await functions[this.name](this)
          eval(`delete vars.${this.attr.loop}_key`)
          eval(`delete vars.${this.attr.loop}_value`)
        }
      }
    } else if (this.attr.while) {
      const isOk = TestTag.replaceVars(this.attr.while, undefined)
      while (isOk) {
        await functions[this.name](this)
        if (this.attr.whileDelay) {
          this.attr.whileDelay = +this.attr.whileDelay
          await this.sleep(this.attr.whileDelay)
        }
      }
    } else {
      await functions[this.name](this)
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  static async replaceVars(_obj, _vars) {
    return TestTag._replaceVars(__.cloneDeep(_obj), _vars)
  }

  private static async _replaceVars(obj, _vars) {
    let vars = _vars || global['vars']
    // @ts-ignore
    const _ = __
    if (Array.isArray(obj)) {
      return await Promise.all(obj.map(e => TestTag._replaceVars(e, vars)))
    } else if (obj && typeof obj === 'object') {
      if (obj instanceof AbsType) {
        await (obj as AbsType<any>).init()
        return await (obj as AbsType<any>).exec()
      } else {
        for (let k in obj) {
          obj[k] = await TestTag._replaceVars(obj[k], vars)
        }
      }
    } else if (typeof obj === 'string') {
      obj = obj.trim()
      if (/^\$\{[^}]+\}$/ms.test(obj)) {
        return eval(obj.replace(/\$\{([^\}]+)\}/msg, 'vars.$1'))
      } else if (/^\(.*?\)$/ms.test(obj)) { // else if (/^\(.*?\$\{.*?\)$/ms.test(obj)) {
        return eval(obj.replace(/\$\{([^\}]+)\}/msg, 'vars.$1'))
      } else if (/\$\{([^\}]+)\}/mg.test(obj)) {
        return eval("`" + obj.replace(/\$\{([^\}]+)\}/mg, '${vars.$1}') + "`")
      }
      return obj
    }
    return obj
  }
}