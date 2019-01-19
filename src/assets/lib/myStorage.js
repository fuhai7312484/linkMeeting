import axios from "axios";
//post接口请求公共调用
export function getPostInfo(url, obj) {
  //测试环境
  let ipUrl = "http://192.168.1.179:8080/v0.1/api/";
   //测试环境
  //  let ipUrl = "http://47.94.251.93:8081/";
  //正式环境
  // let ipUrl = "http://59.110.95.211:8080/";
  var qs = require("qs");
  return axios.post(ipUrl + url, qs.stringify(obj));
}

