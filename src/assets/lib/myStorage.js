import axios from "axios";
//post接口请求公共调用
export function getDataInfo(mode, url, obj) {
  let token = getCookie("accessToken");
  axios.defaults.headers["APP-User-Token"] = token;
  //测试环境
  let ipUrl = "http://192.168.1.179/lhy/v0.1/api/";
  var qs = require("qs");

  // axios.defaults.headers.common["APP-User-Token"] = token;
  switch (mode) {
    case "put":
      return axios.put(ipUrl + url, qs.stringify(obj));
      break;
    case "post":
      return axios.post(ipUrl + url, qs.stringify(obj));
      break;
      case "patch":
      return axios.patch(ipUrl + url, qs.stringify(obj));
      break;
    case "get":
    
      return axios.get(ipUrl + url, obj);
      break;
  }
}
// 请求拦截器
export function checkToken() {
  let token = getCookie("accessToken");
  let p = new Promise(function(resolve, reject) {
    if (token) {
      const TokenInfo = getStorage('userToken')
      const refreshToken = TokenInfo.refresh_token;
      getDataInfo("put", "token", { refreshToken: refreshToken }).then(res => {
      //  console.log(res)
      // alert(refreshToken)
        if(res.data.code==200){
          TokenInfo.access_token = res.data.data.access_token
          setCookie("accessToken", res.data.data.access_token);
          setStorage('userToken',TokenInfo)
          resolve()
        }else if(res.data.code==400){
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
        console.log("信息已过期");
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
