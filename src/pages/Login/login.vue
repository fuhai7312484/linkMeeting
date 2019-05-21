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
          <router-link tag="div" class="loginCodeBox" to="/codelogin">验证码登录</router-link>
          <div class="loginBtn">
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
import Terms from "@/components/Terms";
import { mapState, mapMutations } from "vuex";
import {
  getDataInfo,
  setCookie,
  setStorage,
  getCookie,
  removeCookie,
  checkToken,isweixin,WeChatLogin,GetQueryString,getStorage,stoRemove
} from "../../assets/lib/myStorage.js";
import {
  Group,
  XInput,
  XButton,
  Toast,
  XDialog,  Popup,
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
    XDialog,Popup
  },
  name: "login",

  data() {
    return {
      toastInfo:{
          showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
        wxNext: 1,
         wxValue: "",
      time: 60,
      BindCodeVal: "",
      TermsTitle:'',
      showHideOnBlur: false,
       Resend: true,
      ResBtn: true,
      ResendTitle: "获取验证码",
      termsType: "",
      userData: {},
      maskValue: "",
      OrderHight: 0,
      passW: "",
      showPass: false,
      showLoading: false,
      dx_djs: null,
      ResBtnP: true,
      wxshow1: false,
      wxData:null,
      disabled: true,
       codeValuefun: function(value) {
        let regExp = /^\d{6}\b/;
        let r = value.match(regExp);
        return {
          valid: r != null,
          msg: "验证码不正确!"
        };
      },
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
 computed: {
    ...mapState({
      codeUrl: state => state.codeUrl
    })
  },
  methods: {

    //点击绑定
    submitDataP() {
      let _that = this;
      let wxBObj = {
        wxOpenid: this.wxData.openid,
        wxNickname: this.wxData.nickname,
        mobile: this.wxValue,
        qrcode: this.BindCodeVal,
        wxHeadimgurl: this.wxData.headimgurl,
        wxProvince: this.wxData.province,
        wxCity: this.wxData.city,
        wxCountry: this.wxData.country,
        wxUnionid:this.wxData.unionid
      };
    
      this.wxlogin(wxBObj, "sub");
    },
     //验证输入的手机号是否正确来控制btn是否可点 refcode
    refCodeChangeP(ev) {
      if (this.wxValue.length == 0 || this.BindCodeVal.length == 0) {
        this.ResBtnP = true;
      } else {
        if (
          this.$refs.bindmobile.valid == true &&
          this.$refs.bindCode.valid == true
        ) {
          this.ResBtnP = false;
        } else {
          this.ResBtnP = true;
        }
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
            // console.log(res)
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
      
       this.toastInfo = {
              showMsg: '填写的手机号格式不正确',
              showPositionValue: true,
              toastType: "text"
            };
            
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
           this.toastInfo = {
              showMsg: res.data.msg,
              showPositionValue: true,
              toastType: "text"
            };
        
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
              if (getStorage('login_url')) {
                _that.$router.push(getStorage('login_url'));
                console.log(getStorage('login_url'))
                setTimeout(function() {
                  stoRemove("login_url");
                }, 500);
              } else {
                _that.$router.push("/myindex");
              }
            }, 500);


          // setTimeout(function() {
            
          //   // location.hash = '/myindex'

          //   // console.log(window.location.hash,location.hash)
          // // location.hash='/myindex'
          // //   console.log(location.hash)
          //   _that.$router.push("/meeting");
          // }, 1000);
        } else if (res.data.code == 1003) {
           this.toastInfo = {
              showMsg: res.data.msg,
              showPositionValue: true,
              toastType: "text"
            };

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
    },
    //微信直接登录
    wxlogin(obj, type) {
      let _that = this;
  
        let wxBObj = {
                wxOpenid: obj.wxOpenid,
                wxNickname: obj.wxNickname,
                wxHeadimgurl: obj.wxHeadimgurl,
                wxProvince: obj.wxProvince,
                wxCity:obj.wxCity,
                wxCountry: obj.wxCountry,
                wxUnionid:obj.wxUnionid,
                // wxUnionid:obj.Unionid,
              };
              
          if(type == 'sub'){
            wxBObj.mobile = obj.mobile
            wxBObj.qrcode = obj.qrcode
          }
        
      getDataInfo("post", "user/wlogin", wxBObj).then(res => {
        // console.log(res)
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

             if(getStorage('wx_url')){
                // stoRemove('wx_url')
              // console.log(getStorage('wx_url'))
              if(getStorage('wx_url')!= '/'||getStorage('wx_url')!='/meeting'){
                // console.log(window.location.href.split('login'))
                window.location.href = window.location.href.split('login')[0]+getStorage('wx_url')
                setTimeout(function(){
                   stoRemove('wx_url')
                },500)
               
              }
            }else{
                this.$router.push("/meeting");
            }
            
            // console.log(getCookie('wx_url'))
            // _that.$router.push("/meeting");
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
  },
  created() {
    this.getOrderHight();
  },

  mounted() {
    if(isweixin()){
 WeChatLogin()

    }
  

  }
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

</style>
