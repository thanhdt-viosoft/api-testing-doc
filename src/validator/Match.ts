import * as _ from 'lodash'

export default function (des: string, a: object, b: object, errors: { msg?: string, child?: { actual: any, expect: any }, actual?: any, expect?: any, status: number }[]) {
  try {
    if (typeof a !== 'object' && typeof b !== 'object' && a !== b) {
      throw new Error('Not match!')
    }
    if (!_.isMatch(a, b)) {
      throw new Error('Not match!')
    }
    errors.push({ msg: des || `Matched`, status: 1 })
  } catch (err) {
    errors.push({
      msg: `${des} (${err.message})`, status: -1, child: {
        actual: a,
        expect: b
      }
    })
  }
}
