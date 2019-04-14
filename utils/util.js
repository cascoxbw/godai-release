function strToArray(input) {
  if (!input) {
    return [];
  } else {
    var arr = input.split(",")
    return arr;
  }

}

//详情属性str => array
function goodsPropFilter(input) {
  var arr = [], arrayStr = JSON.parse(input);
  arrayStr.forEach(function (value) {
    var obj = { value: [] };
    for (var key in value) {
      switch (key) {
        case "name":
          obj.name = value[key];
          break;
        case "code":
          obj.ano = value[key];
          break;
        default:
          obj.value.push(value[key]);
      }
    }
    arr.push(obj);
  })
  return arr;
}

  /*
  copyArray: function(a1,a2){
    for(var i=0;i<a1.length;i++){
      a1[i] = a2[i]
    }
  }*/

function toString(input) {
  return Object.prototype.toString.call(input);
}

function objLength(input) {
  var type = toString(input);
  var length = 0;
  if (type != "[object Object]") {
    //throw "输入必须为对象{}！"
  } else {
    for (var key in input) {
      if (key != "number") {
        length++;
      }

    }
  }
  return length;
}

function alert(des) {
  var self = this;
  self.setData({
    warning: true,
    warnDes: des
  });
  setTimeout(function () {
    self.setData({
      warning: false,
    })
  }, 1000);
}

function formatTime(time, fmt) { //author: meizz
  var o = {
    "M+": time.getMonth() + 1, //月份
    "d+": time.getDate(), //日
    "h+": time.getHours(), //小时
    "m+": time.getMinutes(), //分
    "s+": time.getSeconds(), //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    "S": time.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}  

function obj2str (list) {
  var templist = []
  for (var i = 0; i < list.length; i++) {
    templist.push(JSON.stringify(list[i]))
  }
  return templist
}

module.exports = {
  strToArray: strToArray,
  //getTime: getTime,
  goodsPropFilter: goodsPropFilter,
  objLength: objLength,
  //getAddress: getAddress,
  formatTime: formatTime,
  alert: alert,
  obj2str: obj2str
}