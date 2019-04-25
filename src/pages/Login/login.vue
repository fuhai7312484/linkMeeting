<template>
  <div class="box" :style="{height:OrderHight+'px'}">
    <!-- <div class="map-headerBox">
      <div class="map-go-back" @click="$router.go(-1)"></div>
    </div>-->
    <div class="login-contentBox">
      <h1 class="login-contentTitle">您好</h1>
      <p class="login-subtitle">
        欢迎来到链会议,立即
        <router-link tag="span" to="/reg">注册</router-link>
      </p>

      <!-- {{userData.tokenMap}}<br/>
      {{userData.user}}-->

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

       <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
          <div class="TermsBox">
            <div class="TermsTitle">
              <div @click="showHideOnBlur=false">
                <span class="TermsClose">
                 <x-icon type="ios-close-empty" size="30"></x-icon>
                </span>
              </div>

              <h3>{{TermsTitle}}</h3>
            </div>
            <div class="TermsContent padlr">

  <terms :termsType="termsType"></terms>

            </div>
          
          </div>
        </x-dialog>

        
      <div class="weixinBtns">
        <!-- <span>
          <img src="../../assets/images/QQLogin.png">
        </span>
        <span>
          <img src="../../assets/images/weixin.png">
        </span>-->

       

        <!-- {{termsType}} -->
      </div>登录即表示同意链会议
      <span @click="gotoTerms('FW')">服务条款</span> 和
      <span @click="gotoTerms('YS')">隐私条款</span>
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
import Terms from "@/components/Terms";
import {
  getDataInfo,
  setCookie,
  setStorage,
  getCookie,
  removeCookie,
  checkToken,isweixin
} from "../../assets/lib/myStorage.js";
import {
  Group,
  XInput,
  XButton,
  Toast,
  XDialog,
  TransferDomDirective as TransferDom
} from "vux";
import axios from "axios";
import router from "../../router";
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    XButton,
    Toast,
    Terms,
    XDialog
  },
  name: "login",

  data() {
    return {
      TermsTitle:'',
      showHideOnBlur: false,
      termsType: "",
      userData: {},
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
    //服务条款
    gotoTerms(type) {
      this.showHideOnBlur = true;
      switch(type){
        case "FW":
      this.TermsTitle = '注册协议及服务条款';
      break;
       case "YS":
      this.TermsTitle = '链会议隐私条款';
      break;
      }
      this.termsType = type;
      // console.log(type)
    },

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
          let tokenInfo = res.data.data.tokenMap;
          let userInfo = {
            userId: res.data.data.user.id,
            access_token: tokenInfo.access_token,
            refresh_token: tokenInfo.refresh_token
          };
          setCookie("accessToken", tokenInfo.access_token);
          setStorage("userToken", userInfo);

          // this.JIMinitchange();

          // if(_that.$router.go() == undefined){
          //   _that.$router.push("/myindex");
          // }else{
          //   _that.$router.go(-1)
          // }

          setTimeout(function() {
            
            // location.hash = '/myindex'

            // console.log(window.location.hash,location.hash)
          // location.hash='/myindex'
          //   console.log(location.hash)
            _that.$router.push("/meeting");
          }, 1000);
        } else if (res.data.code == 1003) {
          this.showPositionValue = true;
          this.showMsg = res.data.msg;
        }
      });
    },
    //初始化IM消息
    JIMinitchange() {
      window.JIM = new JMessage({
        debug: true
      });
      this.JIMinit();
    },
    JIMinit() {
      let strTime = new Date().getTime();
      let string =
        "appkey=21c14066bd7b213c7822caa9&timestamp=" +
        strTime +
        "&random_str=404&key=6db1783c4b7a02a67012e0ce";

      let stringObj = {
        params: {
          str: string
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "/common/md5", stringObj).then(res => {
          if (res.data.code == 200) {
            JIM.init({
              appkey: "21c14066bd7b213c7822caa9",
              random_str: "404",
              signature: res.data.data,
              timestamp: strTime,
              flag: 1
            })
              .onSuccess(function(data) {
                // console.log("success:" + JSON.stringify(data));
              })
              .onFail(function(data) {
                // console.log("error:" + JSON.stringify(data));
              });
          }
        });
      });
    }
  },
  created() {
    this.getOrderHight();
  },

  mounted() {}
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
   .weui-dialog{
    background: #F8F8F8 !important;
  }
}

.login-account {
  .weui-cells {
    border-bottom: 1px solid #e6e6e6;
    .weui-input {
      height: 2rem;
    }
  }
}

</style>
