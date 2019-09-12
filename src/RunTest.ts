import * as path from 'path'
import chalk from 'chalk'
import TestCase from './item/TestCase'

export default async function runTest(inputFile: string) {
  const beginTime = Date.now()
  console.group('- Testing...')
  console.log('')
  const root = new TestCase(path.resolve(inputFile), undefined)
  root.init()
  result.title = root.title
  result.des = root.des
  if (root.slient) {
    console.log(chalk.yellow('Slient mode'))
    console.log = console.error = function () { }
  }
  // Run test
  console.group(`${result.title.toUpperCase()}`)
  console.log('')
  await root.exec()
  console.log('\n')
  if (result.status.failed === 0) {
    console.log(`${chalk.bgGreen.white(` PASSED: ${chalk.bold(result.status.passed.toString())}/${result.status.passed + result.status.failed} `)} ${chalk.grey(`- ${Date.now() - beginTime}ms`)}`)
  } else {
    console.log(`${chalk.bgRed.white(` FAILED: ${chalk.bold(result.status.failed.toString())}/${result.status.passed + result.status.failed}`)} ${chalk.grey(`- ${Date.now() - beginTime}ms`)}`)
  }
  console.log('\n')
  console.groupEnd()
  console.groupEnd()
}