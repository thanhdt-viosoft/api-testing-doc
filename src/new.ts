import * as path from 'path'
import * as fs from 'fs'
import chalk from 'chalk'

export default function newInput(output: string, tcMore = '') {
  if (output.endsWith('index.yaml')) {
    fs.writeFileSync(output, `---
title: SERVICE_NAME...
des: DESCRIPTION...
saveto: ./../../OUTPUT_FILE.md
debug: false
# Document
docs:
  token: user or admin token
# Variables
vars:/oauth
  url: http://onapis.com/mail

steps:
${tcMore}`)
  } else {
    fs.writeFileSync(output, `---
title: API_TITLE...
# Document
# docs:
# Variables
vars:
  token: \${token}

steps:
  API_DESCRIPTION... | ROLE_IF_EXIST:
    [POST|GET|PUT|DELETE|HEAD]: \${url}/SomeThing?fields={"*":1}
    headers: { token: "$token" }
    body: {
      name: 'Thanh'
    }
    var: myVar
    note: |
      This is add something APIs
`)
  }
}

function main() {
  let [, , baseDir = 'index.yaml', inputFile = ''] = process.argv
  inputFile = path.join(baseDir, inputFile)
  console.group('- Generating testcase template file')
  if (!inputFile.endsWith('.yaml')) inputFile += '.yaml'
  if (!inputFile.endsWith('index.yaml')) {
    const indexFile = path.join(path.dirname(inputFile), 'index.yaml')
    if (!fs.existsSync(indexFile)) {
      console.log(chalk.green(`+ Generating main script "${indexFile}"`))
      newInput(indexFile, `- <import>: ${inputFile}`)
    }
  }
  if (!fs.existsSync(inputFile)) {
    console.log(chalk.green(`+ Generating test script "${inputFile}"`))
    newInput(inputFile)
  } else {
    console.log(chalk.red(`+ Could not create test script "${inputFile}" because it is existed`))
  }
  console.groupEnd()
}

main()
