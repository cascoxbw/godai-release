var app = getApp()
var common = require('../../utils/util.js');
var picdefault = '/images/wantpic/wants1.jpeg';

Page({

  data: {
   warning: false,
   warnDes: "",
   openid:''
  },
  wantListTemp:[],

  onLoad(){
    this.getWantslist()
  },

  onShow(){
   
    this.refreshWantListTemp(this)
  },

  onHide(){
    this.setWantslist(false)
  },

  refreshWantListTemp:function(that){

    that.setData({
      wantList: that.wantListTemp
    })
  },

  deleteWant:function(e){
    var index = e.currentTarget.dataset.index;
    //console.log("want.js","deletewant",index)
    this.wantListTemp.splice(index,1);
    //console.log("want.js", "deletewant", this.wantListTemp)
    this.setData({
      wantList: this.wantListTemp
    });
    this.setWantslist(true)
    common.alert.call(this, "心愿物品已删除");
  },

  addWant: function () {
    if (this.wantListTemp.length > 9){
      common.alert.call(this, "心愿单已满");
      return 
    }
    var self = this;
    var id = this.wantListTemp.length;
    wx.navigateTo({
      url: "editWant?id=" + id,
      success: function (res) {
        self.refreshWantListTemp(self)
      },
    })

  },

  getWantslist: function(){
    var that = this;
    var url = 'https://godaibuy.xyz/getwantslist';
    wx.getStorage({
      key: 'login',
      success: function (res) {
        //console.log(res.data.openid)
        that.setData({
          openid: res.data.openid
        })
        wx.request({
          url: url,
          data: {
            openid: res.data.openid
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },

          success: function (res) {
            console.log(res.data)
            
            that.setData({
              wantList: res.data
            })
            that.wantListTemp = res.data
            //console.log('3',that.data.goodslist)
          },
          fail: function (res) {
            // fail
            wx.showModal({
              title: "提示",
              content: "获取心愿单失败",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                } else if (res.cancel) {
                }
              }
            })
          },
        })
      }
    })
    
  },

  setWantslist: function (isDelete) {
    var that = this;
    var url = 'https://godaibuy.xyz/setwantslist';
    var templist = common.obj2str(that.wantListTemp)
    wx.request({
      url: url,
      data: {
        openid:that.data.openid,
        wantslist: templist
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },

      success: function (res) {
      
      },
      fail: function (res) {
        wx.showModal({
          title: "提示",
          content: "上传心愿单失败",
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

  onShareAppMessage: function (res) {
    return {
      title: '我的心愿单',
      path: '/pages/want/want'
    }
  }

})