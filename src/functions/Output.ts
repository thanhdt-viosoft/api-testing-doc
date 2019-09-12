import * as _ from 'lodash'
import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'
import { TestTag } from '../item/TestTag'

function format(rs: any, pretty: boolean) {
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

export default async function ({ value, attr }) {
  const rs = await TestTag.replaceVars(value, undefined)
  const title = attr.title && await TestTag.replaceVars(attr.title, undefined)
  TestTag.setVar(attr.var, rs)
  TestTag.setVars(attr.vars, rs)
  const color = attr.color || 'grey'
  if (!attr.file) {
    if (title) console.log(chalk.cyan(`- ${title}`))
    if (!attr.slient) {
      if (rs) console.log(chalk[color](`${format(rs, attr.pretty).toString()}`))
      else console.log()
    }
  } else {
    const file = attr.file && await TestTag.replaceVars(attr.file, undefined)
    const output = path.join(attr.curDir, file)
    fs.writeFileSync(output, format(rs, attr.pretty))
    if (!attr.slient) {
      console.log(chalk[color](`- ${title ? (title + ' ') : ''}${output}`))
    }
  }
}
