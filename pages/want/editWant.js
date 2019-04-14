var app     = getApp();
var common  = require('../../utils/util.js');
var picdefault = '/images/wantpic/wants1.jpeg';

Page({
  data: {
    want: {
      id:'',
      brand: '',
      name: '',
      size: '',
      num: '',
      pic: picdefault
    },
    picforshow:'',
    openid:''
  },

  

  onLoad: function(e) {
    var that = this
    //console.log('editwant.js e',e)
    that.data.want.id = e.id;
    wx.getStorage({
      key: 'login',
      success: function (res) {
        //console.log(res.data.openid)
       
        that.data.openid = res.data.openid
      }
    })
  },

  setName: function (e) {
    this.data.want.name = e.detail.value;
  },

  setBrand: function(e) {
    this.data.want.brand = e.detail.value;
    
  },
  setSize: function(e) {
    this.data.want.size = e.detail.value;
  },

  setNum:function(e){
    this.data.want.num = e.detail.value;
  },

  setPic: function () {
    var that = this
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        console.log('editwant.js 上传图片的temppath', tempFilePath);

        that.setData({
          picforshow: tempFilePath
        })

        wx.uploadFile({
          url: 'https://godaibuy.xyz/uploadfile',
          filePath: tempFilePath,
          name: 'uploadpic',
          formData: {
            'imgIndex': that.data.want.id,
            'openid': that.data.openid
          },
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log('upload-return', data.url, typeof (data.url));
            that.data.want.pic = data.url;

          }
        })


        /*启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })  */
      }
    })
  },

  saveWant: function() {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    //console.log(prevPage.wantListTemp)

    prevPage.wantListTemp.push(this.data.want)
    //console.log(prevPage.wantListTemp)
   
    
    wx.navigateBack({
      delta: 1
    })
  }
})