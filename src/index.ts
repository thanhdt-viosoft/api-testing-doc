import * as fs from 'fs'
import * as path from 'path'
import * as unzip from 'unzip'
import * as os from 'os'
import * as rimraf from 'rimraf'
import axios from 'axios'
import runTest from './RunTest'
// import export2MD from './export/toMD'

import './functions'

global['vars'] = {
  get ENV() {
    return process.env
  }
} as any
// global['teststeps'] = [] as any[]
let index = 0
global['result'] = {
  testurl: 'http://test.onapis.com',
  debug: false,
  title: '',
  des: '',
  get index() {
    return ++index
  },
  status: {
    passed: 0,
    failed: 0
  },
  saveto: '',
  // teststeps: {} as { [key: string]: TestStep[] | any },
  // testcases: {} as { [key: string]: TestStep[] }
}

async function main() {
  const { inputFile, isUnzip } = await handleInputFile()
  try {
    // Run test
    await runTest(inputFile)
  } finally {
    if (isUnzip) {
      rimraf.sync(path.dirname(inputFile))
    }
  }
}

async function downloadFile(inputFile: string) {
  console.log(`+ Downloading file "${inputFile}"`)
  const response = await axios.get(inputFile, {
    responseType: 'stream'
  })
  inputFile = path.join(os.tmpdir(), path.basename(inputFile))
  const writer = fs.createWriteStream(inputFile)
  response.data.pipe(writer)

  return new Promise<string>((resolve, reject) => {
    writer.on('finish', () => {
      resolve(inputFile)
    })
    writer.on('error', reject)
  })
}

async function unzipFile(inputFile: string) {
  console.log(`+ Unziping file "${inputFile}"`)
  const outputFolder = path.join(os.tmpdir(), path.basename(inputFile).replace('.zip', ''))
  const reader = fs.createReadStream(inputFile).pipe(unzip.Extract({ path: outputFolder }))
  inputFile = outputFolder
  return new Promise<string>((resolve, reject) => {
    reader.on('close', () => {
      resolve(inputFile)
    })
    reader.on('error', reject)
  })
}

async function handleInputFile() {
  let [, , inputFile] = process.argv

  if (process.env.SRC) inputFile = process.env.SRC

  if (!inputFile) inputFile = '.'

  let isUnzip = false

  console.group(`- Checking file ${inputFile}`)

  if (/^https?:\/\//.test(inputFile)) {
    inputFile = await downloadFile(inputFile)
  }

  if (inputFile.endsWith('.zip')) {
    inputFile = await unzipFile(inputFile)
    isUnzip = true
  }

  if (fs.statSync(inputFile).isDirectory()) {
    console.log(`+ Auto detect file "${path.join(inputFile, 'index.yaml')}"`)
    inputFile = path.join(inputFile, 'index.yaml')
  }

  if (!fs.existsSync(inputFile)) throw `Could not input file at "${inputFile}"`

  console.groupEnd()

  return { inputFile, isUnzip }
}

main()