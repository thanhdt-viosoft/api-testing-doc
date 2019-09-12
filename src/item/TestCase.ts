import * as _ from 'lodash'
import * as path from 'path'
import * as fs from 'fs'
import chalk from 'chalk'
import * as yaml from 'js-yaml'
import AbsStep from './AbsStep'
import TestJob from './TestJob'
import { TestTag } from './TestTag'
import SCHEMA from '../types'

export default class TestCase extends AbsStep {
  static TestURL = 'http://test.onapis.com'
  static steps = [] as TestTag[]
  static root: TestCase

  yamlSteps: any[]
  docs: any
  title = ''
  saveTo: string
  des: string
  vars: any
  doc: any
  force: boolean
  debug: boolean
  stepByStep: boolean
  filename: string
  curDir: string
  forces: boolean
  slient: boolean

  private steps: TestTag[]

  init() {
    let yamlSteps: any
    if (this.yamlConfig) {
      yamlSteps = yaml.safeLoad(fs.readFileSync(this.yamlConfig, 'utf8'), {
        schema: SCHEMA
      })
      // console.log(`Async load TestCase: ${this.yamlConfig} ...`)
      this.filename = path.basename(this.yamlConfig)
    } else {
      yamlSteps = this.yamlSteps
    }
    if (yamlSteps) {
      this.steps = []
      if (Array.isArray(yamlSteps)) {
        yamlSteps = {
          steps: yamlSteps
        }
      } else {
        _.extend(this, _.omit(yamlSteps, ['steps']))
      }

      // if (this.forces === undefined) this.forces = this.tc ? this.tc.forces : TestCase.root.forces
      // if (this.force === undefined) this.force = this.tc ? this.tc.force : TestCase.root.force
      if (this.debug === undefined) this.debug = this.tc ? this.tc.debug : TestCase.root.debug
      if (this.stepByStep === undefined) this.stepByStep = this.tc ? this.tc.stepByStep : TestCase.root.stepByStep
      if (this.doc === undefined) this.doc = this.tc ? this.tc.doc : TestCase.root.doc

      if (yamlSteps.steps && yamlSteps.steps.length > 0) {
        const vl = new TestJob(undefined, this, this)
        vl.value = yamlSteps.steps
        vl.attr = _.merge({}, vl.attr, _.pick(this, ['forces', 'force']))
        Object.assign(vars, this.vars)
        this.steps.push(vl)
        TestCase.steps.push(vl)
      }
    } else {
      // if (this.forces === undefined) this.forces = this.tc ? this.tc.forces : TestCase.root.forces
      // if (this.force === undefined) this.force = this.tc ? this.tc.force : TestCase.root.force
      if (this.debug === undefined) this.debug = this.tc ? this.tc.debug : TestCase.root.debug
      if (this.stepByStep === undefined) this.stepByStep = this.tc ? this.tc.stepByStep : TestCase.root.stepByStep
      if (this.doc === undefined) this.doc = this.tc ? this.tc.doc : TestCase.root.doc
    }
  }

  constructor(public yamlConfig: string, public tc: TestCase) {
    super()
    this.curDir = yamlConfig ? path.dirname(yamlConfig) : this.tc.curDir
    if (!tc) TestCase.root = this
  }

  async exec() {
    this.init()
    const asyncJobs = []
    async function executeAsyncASAP() {
      if (asyncJobs.length > 0) {
        await Promise.all(asyncJobs.map(async (e) => {
          try {
            await e
          } catch (e) {
            if (!this.attr.forces) throw e
          }
        }))
        asyncJobs.splice(0, asyncJobs.length)
      }
    }
    if (this.title) console.group(chalk.grey(`➤  ${this.title} - ${this.filename}`))
    try {
      for (let i in this.steps) {
        const t = this.steps[i] as TestCase | TestJob

        if (! await t.conditionValid()) continue
        if (t instanceof TestJob && t.attr.async) {
          asyncJobs.push(t.exec())
          continue
        }
        await executeAsyncASAP()
        try {
          await t.exec()
        } catch (e) {
          if (!this.forces) throw e
        }
      }
      await executeAsyncASAP()
    } catch (e) {
      if (!this.force) throw e
    }
    if (this.title) console.groupEnd()
    if (this.saveTo) this.save()
  }

  async getAllOfSteps(items: { [key: string]: TestTag[] }, steps: TestTag[]) {
    let testSteps = await Promise.all(steps.map(async (e) => {
      e['isValid'] = await e.conditionValid()
      return e
    })) as (TestTag | TestJob | TestCase)[]
    testSteps = steps.filter(e => e['isValid'] && (e instanceof TestJob || e instanceof TestCase || (e instanceof TestTag && e.name === 'api'))) as (TestTag | TestJob | TestCase)[]
    if (!items[this.title]) items[this.title] = []
    for (let t of testSteps) {
      if (t instanceof TestJob) {
        await this.getAllOfSteps(items, t.steps || [])
      } else if (t instanceof TestCase) {
        if (!t.saveTo || t.title === this.title) {
          await t.getAllOfSteps(items, t.steps || [])
        }
      } else if (t instanceof TestTag) {
        if (t.value.doc) {
          items[this.title].push(t)
        }
      }
    }
    return items
  }

  applyDocument(s: TestTag) {
    // const docs = this.docs
    // if (s.attr.body) {
    //   const docBody = [] as any
    //   docBody.push('-------------- REQUEST BODY --------------')
    //   for (let k in s.attr.body) {
    //     docBody.push(`${k}: ${docs[k]}`)
    //   }
    //   s.attr.note += '\n' + docBody.join('\n')
    // }
    return !!s
  }

  static toTestOnapisCom(api: TestTag) {
    const docs = {} // this.tc.docs || {}
    const item = {
      id: api.attr.id,
      name: api.attr.testApiName,
      _url: api.attr.testApiUrl,
      method: api.attr.method,
      url: api.attr.url,
      headers: [...Object.keys(api.attr.headers || [])
        .filter(e => !["pragma", "cache-control", "accept", "accept-language"].includes(e))
        .map(e => {
          return { key: e, value: api.attr.headers[e], des: docs[e] };
        }), {}],
      body: {
        text: undefined,
        json: {},
        form: [{}]
      },
      note: api.attr.note,
      response: _.pick(api.attr.response, ['headers', 'status', 'data', 'statusMessage']),
      contentType: api.attr.headers["content-type"] || "application/json"
    }

    if (item.response && Array.isArray(item.response.data)) {
      item.response.data = item.response.data.slice(0, 1)
    }
    if (item.contentType.includes("application/json")) {
      item.contentType = "application/json";
    } else if (item.contentType.includes("multipart/form-data")) {
      item.contentType = "multipart/form-data";
    } else if (item.contentType.includes("text/plain")) {
      item.contentType = "text/plain";
    } else {
      item.contentType = "application/x-www-form-urlencoded";
    }
    if (item.contentType === "application/json") {
      if (api.attr.body) item.body.json = api.attr.body;
    } else if (item.contentType === "text/plain") {
      if (api.attr.body) item.body.text = api.attr.body;
    } else if (item.contentType === "multipart/form-data") {
      item.body.form = [...Object.keys(api.attr.body || []).map(e => {
        return { key: e, value: api.attr.body[e], type: (api.attr.body[e] ? api.attr.body[e].type : undefined) || 'field' };
      }), {}]
    } else {
      item.body.form = [...Object.keys(api.attr.body || []).map(e => {
        return { key: e, value: api.attr.body[e] };
      }), {}]
    }
    if (item.response && item.response.headers) {
      item.response.headers = _.omit(item.response.headers, ['server', 'date', 'content-length', 'connection', 'access-control-expose-headers', 'vary'])
    }
    return item
  }

  async save() {
    const testcases = await this.getAllOfSteps({}, this.steps)
    let idx = 0
    const md = [`# ${this.title}`, '']
    const mdDetails = ['', `## API Document`]
    if (this.des) md.push(`_${this.des}_`)

    md.push(`| <a name="ANCHOR_-1"></a>Quick view  |  |`)
    md.push(`| ------ | ------ |`)

    for (let tcTitle in testcases) {
      const testSteps = testcases[tcTitle]
      if (testSteps.length === 0) continue
      // Export document.md
      const items = testSteps.map(s => this.applyDocument(s) && TestCase.toTestOnapisCom(s))
      const links = `${TestCase.TestURL}/Test?cmd=${encodeURIComponent(Buffer.from(unescape(encodeURIComponent(JSON.stringify(items)))).toString('base64'))}`
      md.push(`| **${tcTitle}** - ***${testSteps.length} APIs*** | **[Import](${links})** |`)
      mdDetails.push(`### ${tcTitle}`)
      for (let i in testSteps) {
        const s = testSteps[i]
        const item = TestCase.toTestOnapisCom(s)
        const link = `${TestCase.TestURL}/Test?cmd=${encodeURIComponent(Buffer.from(unescape(encodeURIComponent(JSON.stringify(item)))).toString('base64'))}`
        md.push(`| ${++idx}. [${s.attr.title.replace(/\|/g, '\\|')}](${link}) | [View](#${s.attr.id}) |`)
        mdDetails.push(`${idx}. <a name="${s.attr.id}"></a>[**${s.attr.title}**](${link}) - [TOP ⇪](#ANCHOR_-1)`)
        mdDetails.push(`
**\`${item.method}\`** **${item.response.status}** \`${s.attr.mdUrl}\`

${Object.keys(s.attr.headers).length === 0 ? `~~Request Header~~` : `Request Header:\n\`\`\`json
${JSON.stringify(s.attr.headers, null, '  ')}
\`\`\``}

${Object.keys(item.body.json || item.body.form).length === 0 ? `~~Request Body~~` : `Request Body:\n\`\`\`json
${JSON.stringify(item.body.json || item.body.form, null, '  ')}
\`\`\``}

${Object.keys(item.response.headers).length === 0 ? `~~Response Header~~` : `Response Header:\n\`\`\`json
${JSON.stringify(item.response.headers, null, '  ')}
\`\`\``}

${!item.response.data ? `~~Response Data~~` : `Response Data:\n\`\`\`json
${JSON.stringify(item.response.data, null, '  ')}
\`\`\``}

${!item.note ? '' : `**Notes:**
\`\`\`
${item.note}
\`\`\``}
`.split('\n').join('\n    '))
      }
    }
    if (this.saveTo.startsWith('.')) {
      this.saveTo = path.resolve(this.saveTo.replace('.', path.join(path.dirname(this.yamlConfig))))
    } else {
      this.saveTo = path.resolve(this.saveTo)
    }
    fs.writeFileSync(this.saveTo, md.concat(mdDetails).join('\n'))
    console.log()
    console.log(chalk.magenta(`----------------${(this.saveTo + this.yamlConfig).split('').map(() => '-').join('')}`))
    console.log(chalk.magenta(`Result file: ${this.saveTo} ${chalk.grey(`- ${this.yamlConfig}`)}`))
    console.log(chalk.magenta(`----------------${(this.saveTo + this.yamlConfig).split('').map(() => '-').join('')}`))
  }

}