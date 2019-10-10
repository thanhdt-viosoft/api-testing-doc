import chalk from 'chalk'
import * as readline from 'readline'

export default function ({ value }) {
  return new Promise(resolve => {
    if (value) {
      value = typeof value === 'number' ? value : eval(value.replace('s', '*1000').replace('m', '*60000'))
      console.log(chalk.grey(`*** Resume after ${value}ms***`))
      setTimeout(resolve, value)
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.question(chalk.red(`▶ Continue`), () => {
        rl.close();
        resolve()
      });
    }
  })
}
