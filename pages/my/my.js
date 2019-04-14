
Page({
  data: {
    xbwcode:'',
    paycode:'',
    jxccode:'',
  },

  onLoad: function () {
    
    this.getqrcode()
  },

  getpayimage:function(){
    var temp = this.data.paycode
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [temp] // 需要预览的图片http链接列表
    })
  },

  getxbwimage: function () {
    var temp = this.data.xbwcode
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [temp] // 需要预览的图片http链接列表
    })
  },

  getjxcimage: function () {
    var temp = this.data.jxccode
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [temp] // 需要预览的图片http链接列表
    })
  },

  getqrcode: function () {
    var that = this;
    wx.request({
      url: 'https://godaibuy.xyz/getqrcode',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          paycode: res.data['pay'],
          jxccode: res.data['jxc'],
          xbwcode: res.data['xbw'],
        })
      },
      fail: function (res) {
        wx.showModal({
          title: "提示",
          content: "获取二维码失败",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      },
    })

  },
})

