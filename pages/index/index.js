
var common = require('../../utils/util.js');
var app = getApp();
var cyclepicnum = 4;


Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    curNav: "0",
    circular: true,
    
    warning: false,
    warnDes: "",

    //imageList: [],
    goodsList: [],
    searchInput: '',
  },

  onLoad: function (e) {
    // 获取商品信息
    this.getgoodslist()
  },

  onShow: function () {

  },

  getcyclepic:function(){
    var tempnum = 0
    var templist = []
    for (var i = this.data.goodslist.length - 1; i >= 0; i--) {
      console.log(this.data.goodslist[i]['图片'])
      //templist.push(this.data.goodslist[i]['图片'][0])
      if (-1 == this.data.goodslist[i]['图片'][0].search('png')){
        continue
      }
      templist.push(this.data.goodslist[i])
      tempnum++
      if (tempnum == cyclepicnum){
        break
      }
    }
    this.setData({
      //imageList: templist,
      noticeList: templist
    })
  },

  getgoodslist: function () {
    var that = this;
    var url = 'https://godaibuy.xyz/getgoodslist';
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        that.setData({
          goodslist : res.data,
          GoodsList :res.data
        })
        // 提取公告栏图片
        that.getcyclepic()
      },
      fail: function (res) {
        wx.showModal({
          title: "提示",
          content: "获取商品列表失败",
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

  getDetail: function (e) {
    var data = e.currentTarget.dataset.value
    let datastr = JSON.stringify(data)
    console.log(e)
    wx.navigateTo({
      url: "../gooddetail/goodsDetail?datastr=" + datastr,
      success: function (res) {
      },
    })  
  },

  listenerSearchInput: function (e) {
     this.setData({
      searchInput: e.detail.value
    })
  },

  toSearch: function () {
    var self = this
    var goodslist = self.data.goodslist
    var searchinput = self.data.searchInput

    if (searchinput == '')
      return

    var temp = []
    for (var i = 0; i < goodslist.length; i++) {
      if (-1 != goodslist[i]['名称'].search(searchinput)){
        temp.push(goodslist[i])
        }
    }

    if (temp.length != 0) {
      self.setData({
        GoodsList: temp
      })
    }else{
      common.alert.call(self, "未找到相关商品");
    }

  },

  onPullDownRefresh: function () {
    var temp = this.data.goodslist
    this.setData({
      GoodsList: temp
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '商品列表',
      path: '/pages/index/index'
    }
  }
  
})
