<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <h2>跳转</h2>
    {{myData}}
    <ul>
   
      <router-link tag="li" to="/siteindex">场地首页</router-link>
      <router-link tag="li" to="/siteSearch">场地搜索</router-link>
      <router-link tag="li" to="/sitedetail">场地详情</router-link>
      <router-link tag="li" to="/roomdetail">会议室详情</router-link>
      <router-link tag="li" to="/gallery">场地全部图片列表</router-link>
      <router-link tag="li" to="/city">切换城市</router-link>

      <router-link tag="li" to="/codelogin">验证码登录</router-link>


      <router-link tag="li" to="/login">登录</router-link>
      <router-link tag="li" to="/reg">注册</router-link>
      <router-link tag="li" to="/retpass">找回密码</router-link>
      <router-link tag="li" to="/meeting">会议首页</router-link>
      <router-link tag="li" to="/meetDetail">会议详情</router-link>
      <router-link tag="li" to="/downannex">下载附件</router-link>

      <router-link tag="li" to="/navmap">会议导航</router-link>
      <router-link tag="li" to="/ticket">报名参会</router-link>
      <router-link tag="li" to="/signinfo">报名信息</router-link>

      <router-link tag="li" to="/msgindex">消息</router-link>
      <router-link tag="li" to="/dialog">消息对话框</router-link>
      <router-link tag="li" to="/ordermsg">订单消息</router-link>
      <router-link tag="li" to="/myindex">我的</router-link>
         <router-link tag="li" to="/detailsList">TA的发布</router-link>
            <router-link tag="li" to="/myInfo">基本资料</router-link>


      <div @click="submitData">用户登录</div>
      <div @click="submitData1">获取个人信息</div>

      <!-- <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>-->
    </ul>
    <!-- <h2>Ecosystem</h2> -->
    <!-- <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>-->
    {{myData2}}
  </div>
</template>

<script>
import axios from "axios";
import { getDataInfo,getStorage,checkToken,getCookie,setCookie,setStorage} from "../assets/lib/myStorage.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      myData: {},
       myData2: {},
        show2: false,
    };
  },
  methods:{
    submitData(){
      
      let _that = this;
      this.show2 = true;
      // let token = getCookie("accessToken");
       let loginObj = {
        mobile: '13051376806',
        password:'fu123456789'
      };
    //  checkToken().then(Pdata => {

      //  getDataInfo("post", "user/login", loginObj).then(res => {
      //   if (res.data.code == 200) {
      //     this.showPositionValue = true;
      //     this.showMsg = res.data.msg;
      //     this.userData = res.data.data;
      //     let tokenInfo = res.data.data.tokenMap
      //     let userInfo={
      //       userId:res.data.data.user.id,
      //       access_token:tokenInfo.access_token,
      //       refresh_token:tokenInfo.refresh_token,
      //     }
      //     setCookie('accessToken',tokenInfo.access_token)
      //     setStorage('userToken',userInfo)
      //     setTimeout(function() {
      //       _that.$router.push("/myindex");
      //     }, 1000);
      //   } else if (res.data.code == 1003) {
      //     this.showPositionValue = true;
      //     this.showMsg = res.data.msg;
      //   }
      // });

alert(111111)
    getDataInfo("post", "user/login", loginObj).then(res => {
      this. myData = res.data.data
       let tokenInfo = res.data.data.tokenMap
 let userInfo={
            userId:res.data.data.user.id,
            access_token:tokenInfo.access_token,
            refresh_token:tokenInfo.refresh_token,
          }
       setCookie('accessToken',tokenInfo.access_token)
          setStorage('userToken',userInfo)


      console.log(res)
        // if (res.data.code == 200) {
        //   this.showPositionValue = true;
        //   this.showMsg = res.data.msg;
        //   this.userData = res.data.data;
        //   let tokenInfo = res.data.data.tokenMap
        //   let userInfo={
        //     userId:res.data.data.user.id,
        //     access_token:tokenInfo.access_token,
        //     refresh_token:tokenInfo.refresh_token,
        //   }
        //   setCookie('accessToken',tokenInfo.access_token)
        //   setStorage('userToken',userInfo)
        //   setTimeout(function() {
        //     _that.$router.push("/myindex");
        //   }, 1000);
        // } else if (res.data.code == 1003) {
        //   this.showPositionValue = true;
        //   this.showMsg = res.data.msg;
        // }
      });
    // });
    },
    submitData1(){
  
    let token = getCookie("accessToken");
      let userObj = {
        params: {
          id: getStorage("userToken").userId
        },
        // headers:{"APP-User-Token":token}
      };
      alert(2222)
//        getDataInfo("get", "user/userById", userObj).then(res => {
// console.log(res)
// this.myData2 = res.data.data
//        })

      
// checkToken(getDataInfo("get", "user/userById", userObj))
// .then(res=>{
//   console.log(res)
//   // alert(res)
//   // this.myData2 = res.data.data
//   this.myData2 = res.data.data

// })
       
      checkToken().then(Pdata => {
   getDataInfo("get", "user/userById", userObj).then(res => {
        //  console.log(res)

        // alert(res)
       
        console.log(res)
          if (res.data.code == 200) {
         
            this.myData2 = res.data.data;
            // console.log(res.data.data)
            // setTimeout(function(){
            //   _that.show2 = false;

            // },500)
            console.log(token)
              
          }else if(res.data.code == 100101 || res.data.code == 400){
            alert('请重新登录！')
          }
        });



         
       
      
      });



    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
