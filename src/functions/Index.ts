import * as fs from 'fs'

global['functions'] = {} as any

fs.readdirSync(__dirname).filter(e => e !== 'Index.js' && e.endsWith('.js')).map(name => {
  const obj = require(`./${name}`)
  for (let funcName in obj) {
    if (name === 'default') {
      functions[name.replace('.js', '')] = obj[funcName]
    } else {
      functions[funcName.toLowerCase()] = obj[funcName]
    }
  }
  functions[name.replace('.js', '').toLowerCase()] = require(`./${name}`).default
})
