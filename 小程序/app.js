let io = wx.connectSocket({ url: 'ws://127.0.0.1:3001' })

let info = {
  uid: 0,
  nickname: '叁柒'
}

App({
  onLaunch() {

  },
  globalData: {
    io,
    handleMessage(callback) {
      io.onMessage((msg) => {
        callback(msg)
      })
    },
    welcome(info) {
      wx.onSocketOpen(() => {
        io.send({
          data: JSON.stringify(info),
          success: () => {
            console.log('已加入群聊')
          },
          fail: (e) => {
            console.log(e)
          }
        })
      })
    }
  }
})
