import axios from "axios";
import wx from 'weixin-js-sdk'
// let staus = false;
//post接口请求公共调用
export function getDataInfo(mode, url, obj) {
  let token = getCookie("accessToken");
  axios.defaults.headers["APP-User-Token"] = token;
  // axios.defaults.headers.common["Content-Type"] = 'application/json;charset=UTF-8';

  //测试环境
  // let ipUrl = "http://192.168.1.165/lhy/v0.1/api/";
  //服务器正式环境
  // let ipUrl = "http://lianhuiyi.woneast.com/lhy/v0.1/api/";
  // 外网测试服务器
  // let ipUrl = "http://47.92.227.226:8081/lhy/v0.1/api/";
  // let ipUrl = "http://192.168.1.170:8080/v0.1/api/";
  // let ipUrl = "http://192.168.1.125:8080/v0.1/api/";
  // let ipUrl = 'http://192.168.1.152:8080/v0.1/api/'  
    let ipUrl = 'http://192.168.1.149:8080/v0.1/api/'  
  
  var qs = require("qs");

  // axios.defaults.headers.common["APP-User-Token"] = token;
  switch (mode) {
    case "put":
      return axios.put(ipUrl + url, qs.stringify(obj));
      break;
    case "post":
      return axios.post(ipUrl + url, qs.stringify(obj));
      // return axios.post(ipUrl + url, obj);
      break;
      case "post2":
      return  axios({
        method: 'post',
        url:ipUrl + url,
         headers: {"Content-Type":"application/json;charset=UTF-8"},
        data: JSON.stringify(obj.Obj),
        })
      // return axios.post(ipUrl + url, obj);
      break;
    case "patch":
      return axios.patch(ipUrl + url, qs.stringify(obj));
      break;
    case "delete":
      return axios.delete(ipUrl + url, obj);
      break;
    case "get":
      return axios.get(ipUrl + url, obj);
      break;
  }
}
//判断用户是否登录
export function isLogin() {
  let token = getCookie("accessToken");
  if (token) {
    return true;
  } else {
    return false;
  }
}
//获取当前是否是微信内页打开
export function isweixin() {
  const ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
  } else {
      return false;
  }
}
//微信授权
export function WeChatLogin(){
    let _that = this;
    let code = GetQueryString("code");
    var callback = "http%3a%2f%2f192.168.1.118%3a8080%2f%23%2fwxlogin";
  //  var callback ='http%3a%2f%2flianhuiyi.woneast.com%2f%23%2fwxlogin';
    // 正式版
    // var appId = "wx837aea6e0dd3f50e";
    // 开放平台APPID
    // var appId = "wx74e86a6fcd9d2166";
    // 测试版
    var appId = "wx41dad60740c7be25";
    // var redirect_url = window.location.origin + window.location.pathname;
    //获取code值


    var wx_link =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      appId +
      "&redirect_uri=" +
      callback +
      "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect";
      // var wx_link = " https://open.weixin.qq.com/connect/qrconnect?appid="+appId +"&redirect_uri="+callback +"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
     
      // snsapi_base
      // scope=snsapi_userinfo
    if (code == null) {
      // console.log(getStorage("wx_url"))
      window.location.href = wx_link;
      code = GetQueryString("code");
    } else {
      // return code
      let CodeObj = {
        params: {
          code: code
        }
      };
      return getDataInfo("get", "wechat/webWeChatAuth", CodeObj)
     
    }
}
//微信直接登录

//截取出code字符串
export function GetQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return unescape(r[2]); return null;
  
  }

// 请求拦截器
export function checkToken() {
  let token = getCookie("accessToken");
  let p = new Promise(function(resolve, reject) {
    if (token) {
      const TokenInfo = getStorage("userToken");
      const refreshToken = TokenInfo.refresh_token;
      getDataInfo("put", "token", { refreshToken: refreshToken }).then(res => {
        //  console.log(res)
        // alert(refreshToken)
        if (res.data.code == 200) {
          TokenInfo.access_token = res.data.data.access_token;
          setCookie("accessToken", res.data.data.access_token);
          setStorage("userToken", TokenInfo);
          resolve();
        } else if (res.data.code == 400) {
          // console.log(res)
          resolve(400);

          // _that.$router.push('/login')
        }
      });
    } else {
      resolve();
    }
  });
  return p;
}
//设置localStorage
export function setStorage(key, val, time) {
  localStorage.setItem(key, JSON.stringify(val));
}
//获取localStorage
export function getStorage(key) {
  var json = localStorage.getItem(key);
  let dataObj = JSON.parse(json);
  if (dataObj) {
    if (dataObj.time) {
      let newDate = new Date().getTime();
      if (newDate - dataObj.time > 3000) {
        // console.log("信息已过期");
        stoRemove(key);
      } else {
        return dataObj;
      }
    } else {
      return dataObj;
    }
  }
}
//删除localStorage某个key
export function stoRemove(key) {
  localStorage.removeItem(key);
}
//清空localStorage
export function stClear() {
  localStorage.clear();
}
//设置Cookie
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  // console.log(c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString()))
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}
//获取Cookie
export function getCookie(key) {
  var arr1 = document.cookie.split("; "); //由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
  for (var i = 0; i < arr1.length; i++) {
    var arr2 = arr1[i].split("="); //通过=截断，把name=Jack截断成[name,Jack]数组；
    if (arr2[0] == key) {
      return decodeURI(arr2[1]);
    }
  }
}
//清除Cookie
export function removeCookie(key) {
  setCookie(key, "", -1); //把cookie设置为过期
}
//定位当前用户位置
// export function getPositioning() {
//   let self = this;
//   let obj = {
//     lng: "",
//     lat: "",
//     province:'',
//     city:'',
//   };
//   var geolocation = new BMap.Geolocation();
//   geolocation.getCurrentPosition(
//     function(r) {
//       if (this.getStatus() == BMAP_STATUS_SUCCESS) {

//         obj.lng = r.point.lng;
//         obj.lat = r.point.lat;
//         obj.province = r.address.province
//         obj.city = r.address.city
//         // console.log(r)
//         // console.log(obj)
//         // return obj;
//       } else {
//         // return this.getStatus()
//         alert("failed" + this.getStatus());
//       }
//     },
//     { enableHighAccuracy: true }
//   );

//   //关于状态码
//   //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
//   //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
//   //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
//   //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
//   //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
//   //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
//   //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
//   //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
//   //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)

//   return obj;
// }

export function getPositioning() {
  let read = new Promise(function(resolve, reject) {
    let self = this;
    let obj = {
      lng: "",
      lat: "",
      province: "",
      city: ""
    };
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          obj.lng = r.point.lng;
          obj.lat = r.point.lat;
          obj.province = r.address.province;
          obj.city = r.address.city;

          // console.log(r)
          // console.log(obj)
          resolve(obj);
          // return obj;
        } else {
          // return this.getStatus()
          alert("failed" + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );

    //关于状态码
    //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)

    // return obj;
  });

  return read;
}

//初始化IM
export function JIMinitchange(callback) {
  window.JIM = new JMessage({
    debug: true
  });

  JIMinit(callback);
}
function JIMinit(callback) {
  let Obj = {};
  checkToken().then(Pdata => {
   
    getDataInfo("get", "jpush/im/auth", Obj).then(res => {
      // console.log(res);
      if (res.data.code == 200) {
        let stringObj = res.data.data;
        stringObj.flag = 1;
        JIM.init(stringObj)
          .onSuccess(function(data) {
            // console.log("success:" + JSON.stringify(data));
            callback();
         
          })
          .onFail(function(data) {
            // console.log("error:" + JSON.stringify(data));
          });
      } else if (res.data.code == 400 || res.data.code == 100101) {
      }
    });
  });
}
//登录IM
export function JIMlogin(callback) {
  let _that = this;
  let userId = getStorage("userToken").userId;
  JIM.login({
    username: userId,
    password: userId
  }).onSuccess(function(data) {
    // console.log(data)
    
    callback();
  });
}

export function sendSysMsg(obj) {
  // let sysObj={
  //   userid:'',
  //   type:'5',
  //   eid:'',
  //   content:'恭喜您成功注册<链会议>！',
  // }
  // console.log(obj);
  checkToken().then(Pdata => {
    getDataInfo("post", "jpush/im/smsg", obj).then(res => {
      // console.log(res);
    });
  });
}
//处理开始时间和结束时间显示方式
export function timeLimit(beginTime,endTime){
 
  let begin = beginTime.split(' ')
  let end = endTime.split(' ')
  let beginM = begin[0].split('-')

  if(begin[0] == end[0]){
 
    return beginM[1] +'-'+ beginM[2] +' '+ begin[1]+' 至 '+end[1]
  }else{
    let endM = end[0].split('-')
    return beginM[1] +'-'+ beginM[2] +' '+ begin[1]+' 至 '+ endM[1]+'-'+endM[2]+' '+ end[1]
  }
}
//时间戳转时间
export function getToTime(timeStamp, str) {
  if (!timeStamp) return;
  function toDou(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  str = str
    ? { dateY: str, dateM: str, dateD: " " }
    : { dateY: "年", dateM: "月", dateD: "日" };
  var date = new Date(timeStamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + str.dateY;
  let M = toDou(date.getMonth() + 1) + str.dateM;
  let D = toDou(date.getDate()) + str.dateD;
  let h = toDou(date.getHours()) + ":";
  let m = toDou(date.getMinutes()) + ":";
  let s = toDou(date.getSeconds());
  return Y + M + D + h + m + s;
}
//已报名时间规范
export function RegTime(time){
  
  let arr = time.split(' ')
  let strArr = arr[0].split('-')
  return strArr[1]+'月'+ strArr[2]+'日'

}
// 时间统一函数
export function transDate(time,type) {
  // var $time =document.getElementById("share-time");
  
if(type=='C'){
  var date = time;
}else if(type=='T'){
  var date = Date.parse(time) ;
}

function toDou(n) {
  return n < 10 ? "0" + n : "" + n;
}

  var weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var tt = new Date(parseInt(date));
  var days = parseInt((new Date().getTime() - date) / 86400000);
  var today = new Date().getDate();
  var year = tt.getFullYear();
  var mouth = tt.getMonth() + 1;
  var day = tt.getDate();
  var time = tt.getHours() < 10 ? "0" + tt.getHours() : tt.getHours();
  var min = tt.getMinutes() < 10 ? "0" + tt.getMinutes() : tt.getMinutes();
  var day = tt.getDate();
  var week = tt.getDay();
  var result, offset;
  offset = Math.abs(today - day);
  if (offset === 0) {
    result = "今天" + time + ":" + min;
  }else if(offset === 1){
    result = "昨天" + time + ":" + min;
  }else if(offset >= 2 && offset <= 6){
    result = weekday[week] + time + ':' + min;
  }else{
    result = year + "-" + toDou(mouth) + "-" + toDou(day);
  }



  // if (days < 2 && offset < 6) {
  //   if (offset === 0) {
  //     result = "今天" + time + ":" + min;
  //   } else if (offset === 1) {
  //     result = "昨天" + time + ":" + min;
  //   } else if (offset > 2 && offset <= 4) {
  //     result = weekday[week] + time + ':' + min;
  //   }
  // } else {
  //   result = year + "-" + toDou(mouth) + "-" + toDou(day);
  // }
  return result;
}
//会议开始时间倒计时
export function meetingBeTime(time) {

  // 指定日期和时间
  var EndTime = new Date(time);
  // 当前系统时间
  var NowTime = new Date();
  var t = EndTime.getTime() - NowTime.getTime();
  var d = Math.floor(t / 1000 / 60 / 60 / 24);
  var h = Math.floor(t / 1000 / 60 / 60 % 24);
  var m = Math.floor(t / 1000 / 60 % 60);
  var s = Math.floor(t / 1000 % 60);
  if(t>0){
    if(d>=1){
      return '还剩' + d+'天开始'
    }else if(d<1){
      if(h>=1){
        return '还剩' + h +'小时开始'
      }else{
        if(m>=1){
          return '还剩' + m +'分钟开始'
        }else{
          return '即将开始'
        }
       
      }
    }
  }
  }


export function getGetAxios() {
  // console.log(1111)
  axios
    .get("https://api.im.jpush.cn/v1/resource", {
      // headers: {
      //     'Authorization':'YXBwS2V5JTNBNmRiMTc4M2M0YjdhMDJhNjcwMTJlMGNl',
      // },
      params: {
        mediaId: "qiniu/image/j/CC24BF3978905DACCBABB2B6FFF29ABE.png"
      }
    })

    .then(function(response) {
      // console.log(response);
    })
    .catch(function(error) {
      // console.log(error);
    });
}

//判断当前系统
export function getNavigator(){
  var u = navigator.userAgent;
  // console.log(u)
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  
  if(isAndroid){
      return 'Android'
  }
  if(isiOS){
      return 'IOS'
  }

}


//唤醒APP

export function  wakeApp(){
//  console.log(getNavigator())

  if(getNavigator() =='Android'){
       
        window.location.href = 'lianhuiyi://com.chain.meeting/openwith'
         window.setTimeout(function(){
           window.location.href = "https://www.pgyer.com/NSM9"; /***打开app的协议，有安卓同事提供***/
        },2000);
     
      }else if(getNavigator() =='IOS'){
        window.location.href = 'com.lianhuiyi://com.lianhuiyi'
        window.setTimeout(function(){
           window.location.href = "https://www.pgyer.com/NSM9"; /***下载app的地址***/
        },2000)
      }
}
//分享初始化配置
export function wxRegister(url,callback){
     let wxchatObj = {
      params:{
        shareUrl:url,
      }
     }
    
    getDataInfo("get", "wechat/webShare", wxchatObj).then(
      res => {
      // console.log(res)
        if (res.data.code == 200) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr:res.data.data.noncestr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名，见附录1
            jsApiList: [
              "onMenuShareWeibo",
              "onMenuShareAppMessage",
              "onMenuShareTimeline",
              "onMenuShareQQ",
              "onMenuShareQZone",
           
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready((resd) => {
            // 如果需要定制ready回调方法
            if (callback) {
              callback()
            }
          })
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
          });
        }
      })
}
//分享到朋友圈
export function  ShareTimeline (option) {
  wx.onMenuShareTimeline({
    title: option.title, // 分享标题
    link: option.link, // 分享链接
    imgUrl: option.imgUrl, // 分享图标
    success () {
      // 用户成功分享后执行的回调函数
      option.success()
    },
    cancel () {
      // 用户取消分享后执行的回调函数
      option.error()
    }
  })
}
//分享到微信好友
export function  ShareAppMessage (option) {
  wx.onMenuShareAppMessage({
    title: option.title, // 分享标题
    link: option.link, // 分享链接
    desc:option.desc,
    imgUrl: option.imgUrl, // 分享图标
    success () {
      // 用户成功分享后执行的回调函数
      option.success()
    },
    cancel () {
      // 用户取消分享后执行的回调函数
      option.error()
    }
  })
}
//分享到QQ
export function ShareAppShareQQ(option){

  wx.onMenuShareQQ({
    title: option.title, // 分享标题
    desc:option.desc,
    link: option.link, // 分享链接
    imgUrl: option.imgUrl, // 分享图标
    success: function () {
    // 用户确认分享后执行的回调函数
    },
    cancel: function () {
    // 用户取消分享后执行的回调函数
    }
    });

}

//分享到QQ空间
export function ShareQZone(option){

  wx.onMenuShareQZone({
    title: option.title, // 分享标题
    desc:option.desc,
    link: option.link, // 分享链接
    imgUrl: option.imgUrl, // 分享图标
    success: function () {
    // 用户确认分享后执行的回调函数
    },
    cancel: function () {
    // 用户取消分享后执行的回调函数
    }
    });

}
//分享到微博

export function ShareWeibo(option){
  wx.onMenuShareWeibo({
    title: option.title, // 分享标题
    desc:option.desc,
    link: option.link, // 分享链接
    imgUrl: option.imgUrl, // 分享图
    success: function () {
    // 用户确认分享后执行的回调函数
    },
    cancel: function () {
    // 用户取消分享后执行的回调函数
    }
    });
}

