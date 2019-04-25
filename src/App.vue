<template>
  <div id="app">
    <!-- {{codeUrl}} -->
    <!-- <transition :name="transitionName"> -->
    <router-view class="child-view"></router-view>
    <!-- </transition> -->
    <!-- <router-view></router-view> -->

    <div v-transfer-dom class="WXPopupBox">
      <popup v-model="wxshow1" height="100%">
        <div class="WXPopup1" v-if="wxNext==2">
          <div class="wxCodeBindSussBox">
            <div class="wxCodeBindSussImg">
              <img :src="require('./assets/images/bind-mobile-success.png')">
            </div>
            <h4>绑定成功</h4>
            <div class="wxCodeBindSussInfo">
              您可以通过
              <span>{{wxValue}}</span> 登录当前链会议账号
            </div>

            <x-button
              action-type="submit"
              :class="'Bind-succ-primary-red'"
              @click.native="wxshow1=false"
              :show-loading="showLoading"
            >确认</x-button>
          </div>
        </div>

        <div class="WXPopup1" v-if="wxNext==1">
          <h4>绑定手机号</h4>
          <div class="WXbindInfo">为了您的账号安全,请绑定手机号</div>
          <div>
            <group>
              <x-input
                placeholder="请输入手机号"
                mask="99999999999"
                v-model="wxValue"
                :max="11"
                is-type="china-mobile"
                :should-toast-error="false"
                @on-click-error-icon="mobileErrorChange"
                @on-change="refCodeChange"
                ref="bindmobile"
              ></x-input>
            </group>

            <div class="bind-mobile-step1 padlr">
              <div class="bind-mobile-title fl">
                <x-input
                  placeholder="请输入短信验证码"
                  ref="bindCode"
                  type="text"
                  :is-type="codeValuefun"
                  :min="6"
                  :max="6"
                  width="30%"
                  v-model="BindCodeVal"
                  @on-change="refCodeChange"
                ></x-input>
              </div>
              <div
                v-if="Resend"
                class="bind-mobile-oldMob bind-col borL1 fr"
                @click="BindCode"
              >{{ResendTitle}}</div>
              <div class="bind-mobile-oldMob bind-col borL1 fr" v-if="!Resend">{{time+'s重新获取'}}</div>
            </div>

            <div class="bind-mobile-loginBtn fr">
              <x-button
                action-type="submit"
                :class="ResBtn?'bind-custom-primary':'bind-custom-primary-red'"
                :disabled="ResBtn"
                @click.native="submitData"
                :show-loading="showLoading"
              >立即绑定</x-button>
            </div>
          </div>
        </div>
      </popup>
    </div>

    <toast
      v-model="toastInfo.showPositionValue"
      width="15em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>
  </div>
</template>

<script>
// import {JIMinitchange} from "./assets/lib/myStorage.js";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import {
  Popup,
  Group,
  XInput,
  TransferDomDirective as TransferDom,
  XButton,
  Toast
} from "vux";
import {
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo,
  isweixin,
  GetQueryString,
  JIMinitchange,
  setCookie,
  setStorage
} from "./assets/lib/myStorage.js";
export default {
  name: "app",
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Group,
    XInput,
    XButton,
    Toast
  },
  data() {
    return {
      transitionName: "",
      wxData: null,
      wxshow1: false,
      wxValue: "",
      time: 60,
      BindCodeVal: "",
      Resend: true,
      ResBtn: true,
      ResendTitle: "获取验证码",
      showLoading: false,
      dx_djs: null,
      wxNext: 1,
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      codeValuefun: function(value) {
        let regExp = /^\d{6}\b/;
        let r = value.match(regExp);
        return {
          valid: r != null,
          msg: "验证码不正确!"
        };
      }
    };
  },
  computed: {
    ...mapState({
      codeUrl: state => state.codeUrl
    })
  },
  methods: {
    ...mapMutations(["codeUrlChange"]),

    //点击绑定
    submitData() {
      let _that = this;
      let wxBObj = {
        wxOpenid: this.wxData.openid,
        wxNickname: this.wxData.nickname,
        mobile: this.wxValue,
        qrcode: this.BindCodeVal,
        wxHeadimgurl: this.wxData.headimgurl,
        wxProvince: this.wxData.province,
        wxCity: this.wxData.city,
        wxCountry: this.wxData.country
      };
      this.wxlogin(wxBObj, "sub");
    },

    //微信直接登录
    wxlogin(obj, type) {
      let _that = this;
      getDataInfo("post", "user/wlogin", obj).then(res => {
    
        if (res.data.code == 200) {
          let tokenInfo = res.data.data.tokenMap;
          let userInfo = {
            userId: res.data.data.user.id,
            access_token: tokenInfo.access_token,
            refresh_token: tokenInfo.refresh_token
          };
          setCookie("accessToken", tokenInfo.access_token);
          setStorage("userToken", userInfo);
          if (type == "auto") {
            this.toastInfo = {
              showMsg: "登录成功！",
              showPositionValue: true,
              toastType: "success"
            };

            _that.$router.push("/meeting");
          } else if (type == "sub") {
            this.wxNext = 2;
            setTimeout(() => {
              _that.wxshow1 = false;
              _that.$router.push("/meeting");
            }, 2000);
          }

          //  this.wxNext = 2
          //  setTimeout(function(){
          //   _that.wxshow1 = false
          //  },2000)
        }else if(res.data.code == 400){
           this.toastInfo = {
              showMsg: res.data.msg,
              showPositionValue: true,
              toastType: "text"
            };
        }
      });
    },
    //发送验证码
    BindCode() {
      clearTimeout(this.dx_djs);
      let _that = this;
      //   this.Resend = false;
      //这里单独请求获取验证码接口
      //   this.Reacquire();
      if (this.wxValue != "" && this.$refs.bindmobile.valid) {
        let SmsObj = {
          mobile: this.wxValue,
          type: "thirdLogin"
        };

        getDataInfo("post", "user/sendSms", SmsObj).then(res => {
          if (res.data.code == 200) {
            _that.Resend = false;

            this.toastInfo = {
              showMsg: res.data.msg,
              showPositionValue: true,
              toastType: "text"
            };
            _that.Reacquire();
          } else if (res.data.code == 400) {
            this.toastInfo = {
              showMsg: res.data.msg,
              showPositionValue: true,
              toastType: "text"
            };
          }
        });
      } else {
        this.toastInfo = {
          showMsg: "请输入正确的手机号",
          showPositionValue: true,
          toastType: "text"
        };
      }
    },

    //验证码倒数
    Reacquire() {
      let _that = this;
      this.dx_djs = setInterval(() => {
        if (_that.time-- <= 0) {
          _that.time = 60;
          _that.Resend = true;
          _that.ResendTitle = "重新获取验证码";
          clearInterval(_that.dx_djs);
        }
      }, 1000);
    },

    oldCodeChange(val) {
      // if (this.step === 1) {
      //   if (val == this.OldCode && val != "") {
      //     this.showBtn = true;
      //   } else {
      //     if (val.length == 6) {
      //       this.toastInfo = {
      //         showMsg: "验证码输入不正确",
      //         showPositionValue: true,
      //         toastType: "text"
      //       };
      //     }
      //     this.showBtn = false;
      //   }
      // } else if (this.step === 2) {
      //   if (
      //     this.newMobile != "" &&
      //     this.$refs.newMobile.valid &&
      //     val == this.newCode &&
      //     val != ""
      //   ) {
      //     this.showBtn = true;
      //   } else {
      //     this.showBtn = false;
      //   }
      // }
    },
    //手机号填写错误提示信息
    mobileErrorChange(ev) {
      this.showPositionValue = true;
      this.showMsg = "填写的手机号格式不正确！";
    },
    //验证输入的手机号是否正确来控制btn是否可点 refcode
    refCodeChange(ev) {
      if (this.wxValue.length == 0 || this.BindCodeVal.length == 0) {
        this.ResBtn = true;
      } else {
        if (
          this.$refs.bindmobile.valid == true &&
          this.$refs.bindCode.valid == true
        ) {
          this.ResBtn = false;
        } else {
          this.ResBtn = true;
        }
      }
    }
  },
  created() {
    // JIMinitchange()
  },
  mounted() {
    if (isweixin()) {
      console.log('微信')
      // let express = require("express");
      // const https = require('https');
      //   let app = express();

      let _that = this;
      let code = GetQueryString("code");
      // var callback = "http://192.168.1.118:8080";
     var callback ='http://lianhuiyi.woneast.com/'
      // 正式版
      var appId = "wx837aea6e0dd3f50e";
      // 测试版
      // var appId = "wx41dad60740c7be25";
      // var redirect_uri = window.location.origin + window.location.pathname;
      //获取code值
      var wx_link =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appId +
        "&redirect_uri=" +
        callback +
        "&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect";

      if (code == null) {
        window.location.href = wx_link;
        code = GetQueryString("code");
      } else {
        let CodeObj = {
          params: {
            code: code
          }
        };
        console.log(CodeObj)

        getDataInfo("get", "wechat/webWeChatAuth", CodeObj).then(res => {
    console.log(res)
          if (res.data.code == 200) {
            if (res.data.data.isRegistered == 0) {
              this.wxshow1 = true;
              this.wxData = res.data.data.userInfo;
            } else if (res.data.data.isRegistered == 1) {
              let wxBObj = {
                wxOpenid: res.data.data.userInfo.openid,
                wxNickname: res.data.data.userInfo.nickname,
                wxHeadimgurl: res.data.data.userInfo.headimgurl,
                wxProvince: res.data.data.province,
                wxCity: res.data.data.city,
                wxCountry: res.data.data.country
              };
              this.wxlogin(wxBObj, "auto");

              // console.log("这里是绑定过直接登录");
            }
          } else if (res.data.code == 401) {
            this.toastInfo = {
              showMsg: "微信授权登录失败",
              showPositionValue: true,
              toastType: "text"
            };
            setTimeout(() => {
              _that.$router.push("/meeting");
            }, 500);
          }
        });
      }
    }else{
      console.log('不是微信')
    }
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
.WXPopupBox {
  .vux-popup-dialog {
    z-index: 503;
  }
}
.WXPopup1 {
  z-index: 9999;
  padding: 0.8rem;
  h4 {
    font-size: 1.5rem;
  }
  .WXbindInfo {
    font-size: 0.8rem;
    color: #a0a0a0;
  }
}

.wxCodeBindSussBox {
  margin: 2rem 0;
  text-align: center;
  .wxCodeBindSussImg {
    img {
      width: 100px;
    }
  }
  .wxCodeBindSussInfo {
    color: #505050;
    font-size: 0.8rem;
    margin: 0.8rem 0;
    span {
      color: #4a90e2 !important;
    }
  }
  .Bind-succ-primary-red {
    background: red;
    color: #fff;
  }
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
