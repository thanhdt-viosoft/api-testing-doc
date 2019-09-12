import * as _ from 'lodash'

export default function (des: string, a, b, errors: { msg?: string, child?: { actual: any, expect: any }, actual?: any, expect?: any, status: number }[]) {
  try {
    let isValid = false
    if (!Array.isArray(a)) a = [a]
    if (!Array.isArray(b)) {
      const idx = a.findIndex(e => _.isMatch(e, b))
      if (idx !== -1) isValid = true
    } else {
      for (let c of b) {
        const idx = a.findIndex(e => _.isMatch(e, c))
        if (idx !== -1) {
          isValid = true
          break
        }
      }
    }
    if (!isValid) throw new Error(`Not in some!`)
    errors.push({ msg: des || `Included️`, status: 1 })
  } catch (err) {
    errors.push({
      msg: `${des} (${err.message})`, status: -1, child: {
        actual: a,
        expect: b
      }
    })
  }
}