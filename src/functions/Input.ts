import * as _ from 'lodash'
import chalk from 'chalk'
import * as readline from 'readline'
import { TestTag } from '../item/TestTag'

function question(title: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve => {
    const question = () => {
      rl.question(chalk.cyan.bold(`> ${title}`), async (txt: string) => {
        rl.close();
        resolve(txt)
      });
    }
    question()
  })
}

async function input({ value, attr }) {
  let txt = await question(value)
  TestTag.setVar(attr.var, txt)
  if (attr.error) {
    const errorMessage = await TestTag.replaceVars(attr.error, undefined)
    while (errorMessage) {
      await input({ value: errorMessage, attr })
    }
  }
}

export default input