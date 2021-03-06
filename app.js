//app.js
App({

  globalData: {
    userInfo: null,
  },

  onLaunch: function () {

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://godaibuy.xyz/onlogin',
            data: {
              code: res.code
            },
            method: 'POST',
            header: {'content-type': 'application/x-www-form-urlencoded'},

            success: function (res) {
              wx.setStorageSync('login', res.data)
            
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        wx.showModal({
          title: "提示",
          content: "登陆失败",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      },
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


  },

  


})