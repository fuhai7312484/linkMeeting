<template>
  <div class="box" :style="{height:OrderHight+'px'}">
    <div class="map-headerBox">
      <div class="map-go-back" @click="$router.go(-1)"></div>
    </div>
    <div class="login-contentBox">
      <h1 class="login-contentTitle">您好</h1>
      <p class="login-subtitle">欢迎来到链会议,立即
        <router-link tag="span" to="/reg">注册</router-link>
      </p>
     
      <!-- {{userData.tokenMap}}<br/>
     {{userData.user}} -->

      <div class="login-formBox">
        <group class="login-account">
          <x-input
            placeholder="请输入手机号"
            mask="99999999999"
            v-model="maskValue"
            :max="11"
            is-type="china-mobile"
            :should-toast-error="false"
            @on-click-error-icon="mobileErrorChange"
            @on-change="refCodeChange"
            ref="mobile"
          ></x-input>
        </group>
        <group class="login-account">
          <div class="fl" :style="{width:'80%'}">
            <x-input
              placeholder="请输入密码(8-18位,数字+字母)"
              ref="refpass"
              :is-type="codePassValue"
              @on-change="refCodeChange"
              :type="showPass?'text':'password'"
              v-model="passW"
            ></x-input>
          </div>
          <router-link class="forgetPass fr" tag="div" to="/retpass">忘记密码</router-link>
        </group>
        <div class="loginBtnBox">
          <router-link tag="div" class="loginCodeBox fl" to="/codelogin">验证码登录</router-link>
          <div class="loginBtn fr">
            <x-button
              action-type="submit"
              :class="ResBtn?'custom-primary':'custom-primary-red'"
              :disabled="ResBtn"
              @click.native="submitData"
              :show-loading="showLoading"
            >登录</x-button>
          </div>
        </div>
      </div>
    </div>
    <div class="loginFooter">
      <div class="weixinBtns">
        <span>
          <img src="../../assets/images/QQLogin.png">
        </span>
        <span>
          <img src="../../assets/images/weixin.png">
        </span>
      </div>登录即表示同意链会议 服务条款 和 隐私条款
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      width="20em"
      position="middle"
      :time="1500"
      is-show-mask
    >{{showMsg}}</toast>
  </div>
</template>
<script>
import { getDataInfo,setCookie,setStorage,getCookie,removeCookie} from "../../assets/lib/myStorage.js";
import { Group, XInput, XButton, Toast } from "vux";
import axios from "axios";
import router from "../../router"
export default {
  components: {
    Group,
    XInput,
    XButton,
    Toast
  },
  name: "login",
  data() {
    return {
      userData:{},
      maskValue: "",
      OrderHight: 0,
      passW: "",
      showPass: false,
      showLoading: false,
      ResBtn: true,
      showPositionValue: false,
      showMsg: "",
      disabled: true,
      codePassValue: function(value) {
        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        let r = value.match(regExp);
        return {
          // valid: value.match(regExp),
          valid: r != null,
          msg: "密码格式不正确!"
        };
      }
    };
  },
  
  methods: {
    getOrderHight() {
      var orderHight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.OrderHight = orderHight;
    },
    //手机号填写错误提示信息
    mobileErrorChange(ev) {
      this.showPositionValue = true;
      this.showMsg = "填写的手机号格式不正确！";
    },
    //验证输入的手机号是否正确来控制btn是否可点 refcode
    refCodeChange(ev) {
      if (this.maskValue.length == 0 || this.passW.length == 0) {
        this.ResBtn = true;
      } else {
        if (
          this.$refs.mobile.valid == true &&
          this.$refs.refpass.valid == true
        ) {
          this.ResBtn = false;
        } else {
          this.ResBtn = true;
        }
      }
    },
    submitData() {
      // alert('请求接口')
      let _that = this;
      let loginObj = {
        mobile: this.maskValue,
        password: this.passW
      };
    

      getDataInfo("post", "user/login", loginObj).then(res => {
        if (res.data.code == 200) {
          this.showPositionValue = true;
          this.showMsg = res.data.msg;
          this.userData = res.data.data;
          let tokenInfo = res.data.data.tokenMap
          let userInfo={
            userId:res.data.data.user.id,
            access_token:tokenInfo.access_token,
            refresh_token:tokenInfo.refresh_token,
          }
          setCookie('accessToken',tokenInfo.access_token)
          setStorage('userToken',userInfo)

          // if(_that.$router.go() == undefined){
          //   _that.$router.push("/myindex");
          // }else{
          //   _that.$router.go(-1)
          // }
         
          setTimeout(function() {
            _that.$router.push("/myindex");
          }, 1000);
        } else if (res.data.code == 1003) {
          this.showPositionValue = true;
          this.showMsg = res.data.msg;
        }
      });
    }
  },
  created() {
    this.getOrderHight();
  },
 
  mounted() {

  },
  


};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.loginFooter {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  color: #a0a0a0;
  font-size: 0.8rem;
}
</style>
