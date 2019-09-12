import { TestTag } from '../item/TestTag'

export default async function ({ value }) {
  const vl = await TestTag.replaceVars(value, undefined)
  console.log(vl)
}
