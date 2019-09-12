import * as yaml from 'js-yaml'
import * as _ from 'lodash'

export abstract class AbsType<T> {
  curDir: string

  constructor(public tag, public kind, public data: T) {
    // console.log('Init tag', tag, kind)
  }

  conditionValid() {
    return true
  }

  abstract async init()

  abstract async exec()

  protected stringToTime(vl: any) {
    return eval(vl.replace('s', '*1000').replace('m', '*60000')) as number
  }

  toYamlTag() {
    return new yaml.Type(`!${this.tag}`, {
      kind: this.kind,
      construct: (data) => {
        const new1 = _.cloneDeep(this)
        new1.data = data || (new1.kind === 'mapping' ? {} : new1.kind === 'sequence' ? [] : undefined)
        return new1
      }
    })
  }

  protected format(rs: any, pretty: boolean) {
    if (rs === null || rs === undefined) return ''
    if (typeof rs === 'object') {
      if (pretty === true) {
        return JSON.stringify(rs, null, '  ')
      } else if (!pretty) {
        return JSON.stringify(rs)
      } else {
        return ''
      }
    }
    return new String(rs)
  }
}