var app    = getApp();
var common = require('../../utils/util.js'); 


Page({
  data: {
    paraforshare:''
  },



  onLoad: function(e) {
    let data = JSON.parse(e.datastr);
    //console.log('goodsdetail', e.datastr)

    this.setData({
      paraforshare:e.datastr,
      goodInfo: data,

    })
  },

  gobuy: function(){
    wx.switchTab({
      url: "../my/my",
      success: function (res) {
      },
    }) 
  },

  onShareAppMessage: function (res) {
    let tempdata = this.data.paraforshare;
    return {
      title: '商品详情',
      path: '/pages/gooddetail/goodsDetail?datastr=' + tempdata
    }
  }
})