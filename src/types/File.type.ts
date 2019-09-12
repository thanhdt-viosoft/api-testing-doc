import * as path from 'path'
import * as _ from 'lodash'
import { AbsType } from './AbsType'
import Axios from 'axios'
import { TestTag } from '../item/TestTag'

export class FileTypeYaml extends AbsType<string> {

  constructor(str: string) {
    super('file', 'scalar', str)
  }

  static toFile(str: string) {
    if (str.startsWith('!file')) {
      return new FileTypeYaml(str.split('!file')[1])
    }
    return str
  }

  async getAbsFile(curDir: string) {
    if (/(^\w+\:[\\/])|(^\/)/g.test(this.data)) {
      return await TestTag.replaceVars(this.data, undefined)
    } else if (/^http\:\/\/.+/g.test(this.data)) {
      const rs = await Axios.get(this.data)
      return rs.data
    }
    return path.join(curDir, await TestTag.replaceVars(this.data, undefined))
  }

  init() { }

  exec() {
    return this
  }
}
