import * as querystring from 'querystring'
import chalk from 'chalk'
import * as io from 'socket.io-client'
import { TestTag } from "../item/TestTag"
import TestTags from '../item/TestTags'
import TestJob from '../item/TestJob'

export async function ws_channel(wsTag: TestTags) {
  const channelName = await TestTag.replaceVars(wsTag.attr.name, undefined)
  if (wsTag.attr.debug) console.log(chalk.gray(`- WS is listening on ${channelName}`))
  wsTag.attr.ws.on(channelName, async (msg) => {
    if (wsTag.attr.debug) console.log(chalk.gray(`- WS received from ${channelName}`), msg)
    TestTag.setVar(wsTag.attr.var, msg)
    TestTag.setVars(wsTag.attr.vars, msg)

    const job = new TestJob(undefined, wsTag.tc, wsTag)
    job.isGlobalJob = false
    job.value = wsTag.value
    await job.exec()
  })
}

export async function ws_emit(wsTag: TestTags) {
  const emitData = await TestTag.replaceVars(wsTag.value, undefined)
  let channel = wsTag as TestTag
  do {
    channel = channel.parent
  } while (channel && channel.name !== 'ws_channel')
  if (!channel) return
  const channelName = await TestTag.replaceVars(wsTag.attr.to || channel.attr.name, undefined)
  if (channel.parent.attr.debug) console.log(chalk.gray(`- WS emited to ${channelName}`), emitData)
  channel.attr.ws.emit(channelName, emitData)
}

export default async function (wsTag: TestTag) {
  let { title, debug } = wsTag.attr
  const url = await TestTag.replaceVars(wsTag.attr.url, undefined)
  const { query = {}, headers = {}, closeWhen, closeWhenDelay } = wsTag.attr
  const [, _query] = url.split('?')
  if (_query) Object.assign(query, querystring.parse(_query))

  if (title) console.log(title)
  return new Promise((resolve, reject) => {
    const ws = wsTag.attr.ws = io.connect(
      url,
      {
        path: "/ws/socket.io",
        query,
        headers
      }
    )
    async function disconnect() {
      await ws.disconnect()
      resolve()
    }
    let channels
    ws.on("connect", async () => {
      if (debug) console.log(chalk.gray(`- WS Connected to ${url}`), query)

      if (!channels) {
        channels = wsTag.value.map(e => {
          const t = new TestTags(undefined, wsTag.tc, wsTag)
          t.loadTag(e)
          t.attr.ws = wsTag.attr.ws
          return t
        }) as TestTags[]

        for (let channel of channels) {
          if (channel.attr.name) {
            try {
              await channel.exec()
            } catch (e) {
              console.log(e)
            }
          }
        }
      }

      ws.on('error', (err) => {
        if (debug) console.log(chalk.gray(`- WS connect to ${url} is error`, err))
        reject(err)
      })

      ws.on('disconnect', () => {
        if (debug) console.log(chalk.gray(`- WS Disconnected`))
      })

      if (closeWhen) {
        let isClose: boolean
        do {
          isClose = await TestTag.replaceVars(closeWhen, undefined)
          if (isClose) await disconnect()
          else await wsTag.sleep(+closeWhenDelay || 1000)
        } while (!isClose)
      }
    })
  })
}
