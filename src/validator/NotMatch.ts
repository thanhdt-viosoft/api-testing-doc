import * as _ from 'lodash'

export default function (des: string, a: object, b: object, errors: { msg?: string, child?: { actual: any, expect: any }, actual?: any, expect?: any, status: number }[]) {
  try {
    if (_.isMatch(a, b)) {
      throw new Error('Matched!')
    }
    errors.push({ msg: des || `Not matched`, status: 1 })
  } catch (err) {
    errors.push({
      msg: `${des} (${err.message})`, status: -1, child: {
        actual: a,
        expect: b
      }
    })
  }
}
