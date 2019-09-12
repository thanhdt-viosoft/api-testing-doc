export default function (des: string, a: any, isExits: boolean, errors: { msg?: string, child?: { actual: any, expect: any }, actual?: any, expect?: any, status: number }[]) {
  try {
    if (isExits) {
      if (a === null || a === undefined) throw new Error('Null or undefined!')
      if (typeof a === 'string' && (a as string).trim().length === 0) {
        throw new Error(`Empty!`)
      }
      errors.push({ msg: des || `Existed`, status: 1 })
    } else {
      if (a !== null && a !== undefined) throw new Error('Got value!')
      if (typeof a === 'string' && (a as string).trim().length !== 0) {
        throw new Error(`Not empty!`)
      }
      errors.push({ msg: des || `Not existed`, status: 1 })
    }
  } catch (err) {
    errors.push({
      msg: `${des} (${err.message})`, status: -1, child: {
        actual: a,
        expect: isExits ? 'Must NOT be in [null, undefined, ""]' : 'Must be in [null, undefined, ""]'
      }
    })
  }
}