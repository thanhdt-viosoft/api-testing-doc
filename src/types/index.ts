import * as yaml from 'js-yaml'
import * as fs from 'fs'

const schema = []

fs.readdirSync(__dirname).filter(e => !['AbsType.js', 'index.js'].includes(e) && e.endsWith('.js')).map(name => {
  const klasses = require(`./${name}`)
  for (let k in klasses) {
    const klass = klasses[k] as any
    schema.push(new (klass as any)().toYamlTag())
  }
})

export default yaml.Schema.create(schema)