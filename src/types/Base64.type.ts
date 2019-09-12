import * as _ from 'lodash'
import { AbsType } from './AbsType'
import { TestTag } from '../item/TestTag'

export class Atob extends AbsType<string> {
  constructor(str: string) {
    super('atob', 'scalar', str)
  }

  init() { }

  async exec() {
    if (!this.data) return this.data
    const vl = await TestTag.replaceVars(this.data, undefined)
    return Buffer.from(vl, 'base64').toString()
  }
}

export class Btoa extends AbsType<string> {
  constructor(str: string) {
    super('btoa', 'scalar', str)
  }

  init() { }

  async exec() {
    if (!this.data) return this.data
    const vl = await TestTag.replaceVars(this.data, undefined)
    return Buffer.from(vl).toString('base64')
  }
}