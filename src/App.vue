<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
    <router-view class="child-view"></router-view>
    <!-- </transition> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import {JIMinitchange} from "./assets/lib/myStorage.js";
import axios from "axios";
import {
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo,
  isweixin,
  GetQueryString,
  JIMinitchange
} from "./assets/lib/myStorage.js";
export default {
  name: "app",
  data() {
    return {
      transitionName: ""
    };
  },
  methods: {
  
  },
  created() {
    // JIMinitchange()
  },
  mounted() {
  


 


  //   if (isweixin()) {

  //     // let express = require("express");
  //     // const https = require('https');
  //     //   let app = express();


  //     let code = GetQueryString("code");
  //     var callback = "http://lianhuiyi.woneast.com";
  //     var appId = "wx837aea6e0dd3f50e";
  //     // var redirect_uri = window.location.origin + window.location.pathname;
  //     var wx_link ='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+callback+'&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect'
        
  //        if(code==null){
  //          console.log(wx_link)
  //       window.location.href = wx_link;
  //       code = GetQueryString('code');
       
  //       }else{
  //         // console.log(code)
  //         let secret = '4718c6d43523afd38d37ade653ec5db8'
  //         let getaccess = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=` + `${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`
  //         // https.get(getaccess,(res)=>{
  //         //   console.log(res)
  //         // })
  //         // console.log(getaccess)
  //         window.location.href = getaccess
          
  // // var wx_TokenLink = 'https://api.weixin.qq.com/sns/oauth2/access_token'
  //       // console.log('wx_TokenLink',wx_TokenLink)
  //     //   let TokenObj = {
  //     //     headers: {"Access-Control-Allow-Origin":"*"},
  //     //   params: {
  //     //    appId:appId,
  //     //    secret:secret,
  //     //    code:code,
  //     //    grant_type:'authorization_code',
  //     //   }
  //     // };
  //     // console.log(TokenObj)
  //     // axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', TokenObj).then(res=>{
  //     //   console.log(res)
  //     // })
  //     // getDataInfo(
  //     //   "get",
  //     //   "https://api.weixin.qq.com/sns/oauth2/access_token",
  //     //   TokenObj
  //     // ).then(res => {
  //     //   console.log(res)
  //     //   // if (res.data.code == 200) {
  //     //   //   this.goodData = res.data.data.meetingShowList;
  //     //   // }
  //     // });
       
       
  //     //  axios.get(wx_TokenLink).then(res=>{
  //     //     console.log(res)
  //     //   })
  //         //  window.location.href = wx_TokenLink
  //         //  var r = window.location.search;

        
  //         //  console.log('r',r)
  //       //  let token =  GetQueryString('access_token')
         

  //       }
      

  //     // this.$router.push('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx837aea6e0dd3f50e&redirect_uri=http://lianhuiyi.woneast.com/test.html&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect')
  //   }
  },
  watch: {
    //路由跳转 添加动画
    // $route(to, from) {
    //   //如果to索引大于from索引,判断为前进状态,反之
    //   if (to.meta.index > from.meta.index) {
    //     this.transitionName = 'slide-left';
    //   } else {
    //     this.transitionName = 'slide-right';
    //   }
    // }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
body {
  background-color: #fff;
}

/*路由切换动画*/
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform;
//   transition: all 400ms;
//   position: absolute;
// }
// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
</style>
