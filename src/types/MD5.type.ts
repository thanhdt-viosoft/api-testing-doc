import * as _ from 'lodash'
import { AbsType } from './AbsType'
import { TestTag } from '../item/TestTag'
import { createHash } from 'crypto'

export class MD5 extends AbsType<string> {
  constructor(str: string) {
    super('md5', 'scalar', str)
  }

  init() { }

  async exec() {
    if (!this.data) return this.data
    const vl = await TestTag.replaceVars(this.data, undefined)
    return createHash('md5').update(vl).digest('hex')
  }
}
