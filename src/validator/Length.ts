export default function (des: string, a: any[], len: number | number[], errors: { msg?: string, child?: { actual: any, expect: any }, actual?: any, expect?: any, status: number }[]) {
  try {
    if (!Array.isArray(len)) len = [len]
    if (!len.includes(a.length)) {
      throw new Error(`Not match length!`)
    }
    errors.push({ msg: des || `Array size️`, status: 1 })
  } catch (err) {
    errors.push({
      msg: `${des} (${err.message})`, status: -1, child: {
        actual: a.length,
        expect: len
      }
    })
  }
}