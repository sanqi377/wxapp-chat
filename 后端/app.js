let express = require('express')
let websocket = require('ws')

let app = express()

let wss = new websocket.Server({ port: 3001 })

wss.on('connection', (ws) => {
  console.log('socket 已启动')
  ws.on('message', (message) => {
    let data = JSON.parse(Buffer.from(message).toString())
    switch (data.type) {
      // 发送欢迎信息
      case 'welcome':
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({ type: 'welcome', msg: `欢迎${data.nickname}进入群聊` }))
        })
        break;

      default:
        wss.clients.forEach((client) => {
          client.send(JSON.stringify({ msg: data.msg }))
        })
        break;
    }
    console.log(data)
  })
})


app.listen(3000, () => {
  console.log('express 启动')
})