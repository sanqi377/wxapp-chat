// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    text: '',
    message: []
  },
  getText(e) {
    this.setData({
      text: e.detail.value
    })
  },
  send() {
    let info = wx.getStorageSync('info')
    info.msg = this.data.text
    app.globalData.io.send({
      data: JSON.stringify(info),
      success: () => {
        this.setData({
          text: ''
        })
        console.log('消息发送成功')
      }
    })
  },
  onLoad() {
    app.globalData.handleMessage((msg) => {
      let data = JSON.parse(msg.data)
      switch (data.type) {
        case 'welcome':
          this.data.message.push(data)
          this.setData({
            message: this.data.message
          })
          break

        default:
          this.data.message.push(data)
          this.setData({
            message: this.data.message
          })
          break
      }
    })
  },
  onShow() {
    let info = wx.getStorageSync('info')
    info.type = 'welcome'
    app.globalData.welcome(info)
  }
})
