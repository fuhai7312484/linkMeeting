<template>
  <div class="box">
    <!-- {{myData}} -->




    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>
    <div v-if="!show2">
      <div class="my-UserInfoBox padlr">
        <router-link v-if="isLogin" tag="div" to="/detailsList" class="my-Homepage">我的主页</router-link>
        <router-link tag="div" class="my-UserInfoAvatar fl" to="/myInfo">
          <img :src="isLogin?myData.mainPic==null?require('../../assets/images/myFans-Mask.png'):myData.mainPic:require('../../assets/images/myFans-Mask.png')"> 
        </router-link>
        <div class="my-UserInfoName fl" v-if="isLogin">
          <router-link tag="h3" to="/myInfo">{{myData.name==null?'昵称':myData.name}}</router-link>

                    <span class="spang"  v-if="idensChange(1,myData.idens)">
                      <img src="../../assets/images/meeting-v.png">
                     
                      认证场地方
                    </span>
                    <span v-if="idensChange(0,myData.idens)">
                    <img :src="require('../../assets/images/v.png')">   认证主办方
                    </span>

                   <span v-if="idensChange(0,myData.idens)==0" style="color:#ccc;">
                      <img src="../../assets/images/icon-uncertified.png">未认证
                    </span>



          <!-- <span>
            <img src="../../assets/images/v.png">认证场地方
          </span>
           <span class="spang">
            <img src="../../assets/images/meeting-v.png">认证主办方
          </span> -->



        </div>
         <div class="my-UserInfoName fl" v-if="!isLogin">
          <router-link tag="h3" to="/myInfo">登录/注册</router-link>
          <!-- <span>
            <img src="../../assets/images/v.png">已认证
          </span> -->
        </div>
      </div>
      
      <div class="my-CollectionBox">
        <router-link tag="div" to="/mycolle" class="my-CollectionIcos fl">
        <!-- <badge></badge> -->
          <div> 
            <img src="../../assets/images/my-Collection.png">
          </div>
          我的收藏
        </router-link>

        <router-link tag="div" to="/myfollow" class="my-CollectionIcos fl">
          
          <div>
            
            <img src="../../assets/images/my-Attention.png">
          </div>
           我关注的
        </router-link>

        <router-link tag="div" to="/myfan" class="my-CollectionIcos fl">
          <div>
            <img src="../../assets/images/my-Fan.png">
          </div>
          我的粉丝
        </router-link>
      </div>

      <group class="my-navList">
        <!-- <cell is-link title="场地订单" link="/"></cell> -->
        <cell is-link title="会议票券" link="/MyTicket"></cell>
        <!-- <cell is-link title="浏览记录" link="/mybrowse"></cell>
        <cell is-link title="用户反馈" link="/feedback"></cell> -->
        <cell is-link title="设置" link="/setting"></cell>
      </group>
      <br>
      <br>
    </div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import {
  getDataInfo,
  setCookie,
  getStorage,
  getCookie,
  checkToken,
  isLogin,setStorage,isweixin,WeChatLogin
} from "../../assets/lib/myStorage.js";
import { Group, Cell, Loading, TransferDomDirective as TransferDom,Badge  } from "vux";
import FooterNav from "@/components/footerNav";
// import axios from "axios";
export default {
  name: "MyIndex",
  data() {
    return {
      myData: {},
      isRefreshing: true,
      show2: false,
      text1: "Processing",
      isLogin:false,
    };
  },
  directives: {
    TransferDom
  },
  components: {
    FooterNav,
    Loading,
    Group,
    Cell,Badge 
  },
  methods: {
 
  //检查是否认证
    idensChange(typeNum, arr) {
    
      if (arr) {
        //  console.log(typeNum,arr)
        if (arr.indexOf(typeNum) != -1) {
          return true;
        } else {
          return false;
        }
      }else{
         return 0;
      }
    },

    //获取当前用户信息
    getMyData() {
      let _that = this;
      // this.show2 = true;
      let token = getCookie("accessToken");
      let userObj = {
        params: {
          id: getStorage("userToken").userId
        }
      };

      checkToken().then(Pdata => {
        // console.log(Pdata)
        getDataInfo("get", "user/userById", userObj).then(res => {
          // console.log(res )
          if (res.data.code == 200) {
            // console.log(res.data.data)
            this.myData = res.data.data;

            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/codelogin");
            }, 500);
          }
        });
      });
    }
  },

  mounted() {
      let wx_Url = 'myindex'
      setStorage('wx_url',wx_Url)
      
          if(isweixin()){
          WeChatLogin()
            }

    if(isLogin()){
      this.isLogin = isLogin()
      this.getMyData()
    }else{
      // console.log('没登录')
    }
 
  
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.my-navList {
  .weui-cells:before {
    border: none;
  }
  .weui-cells:after {
    border: none;
  }

  .weui-cell:before {
    left: -2px;
  }
  .weui-cell {
    padding: 1rem 15px;
  }
  .vux-cell-primary {
    font-size: 0.9rem;
    color: #000;
    font-weight: bold;
  }
}
</style>


