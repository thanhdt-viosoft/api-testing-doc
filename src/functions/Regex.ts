
import { TestTag } from "../item/TestTag"
import chalk from "chalk"

export default async function ({ value, attr }) {
  attr.title && console.log(chalk.grey(`- ${attr.title}`))
  let rs: boolean | RegExpExecArray[] | string[]
  const regex = eval(value)
  const data = await TestTag.replaceVars(attr.data, undefined)
  if (attr.test) {
    rs = regex.test(data) as boolean
  } else if (attr.exec) {
    rs = [] as RegExpExecArray[]
    let m = regex.exec(data)
    while (m) {
      rs.push(m)
      m = regex.exec(data)
    }
  } else {
    rs = data.match(regex) as string[]
  }
  TestTag.setVar(attr.var, rs)
  TestTag.setVars(attr.vars, rs)
}
