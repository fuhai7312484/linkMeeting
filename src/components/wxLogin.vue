<template>
  <div>
    <!-- 登录跳转中{{wxData?wxData:''}} -->
    <div v-transfer-dom class="WXPopupBox">
      <popup v-model="wxshow1" height="100%">
        <div class="WXPopup1" v-if="wxNext==2">
          <div class="wxCodeBindSussBox">
            <div class="wxCodeBindSussImg">
              <img :src="require('../assets/images/bind-mobile-success.png')">
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
                @on-change="refCodeChangeP"
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
                  @on-change="refCodeChangeP"
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
                :class="ResBtnP?'bind-custom-primary':'bind-custom-primary-red'"
                :disabled="ResBtnP"
                @click.native="submitDataP"
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
import {
  WeChatLogin,
  getStorage,
  GetQueryString,getDataInfo,setCookie,setStorage,stoRemove
} from "../assets/lib/myStorage.js";
import {
  XInput, Group,
  XButton,
  Toast,
  Popup,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  name: "wxLogin",
  directives: {
    TransferDom
  },
  components: {
    XInput, Group,
    XButton,
    Toast,
    Popup
  },
  data() {
    return {
      wxshow1: false,
      wxData: null,
      wxNext: 1,
      wxValue: "",
      showLoading: false,
      Resend: true,
      ResendTitle: "获取验证码",
      time: 60,
      ResBtnP: true,
         BindCodeVal: "",
          dx_djs: null,
       toastInfo:{
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
      },
    };
  },
  methods: {
    //微信直接登录
    wxlogin(obj, type) {
      let _that = this;

      let wxBObj = {
        wxOpenid: obj.wxOpenid,
        wxNickname: obj.wxNickname,
        wxHeadimgurl: obj.wxHeadimgurl,
        wxProvince: obj.wxProvince,
        wxCity: obj.wxCity,
        wxCountry: obj.wxCountry,
        wxUnionid: obj.wxUnionid
        // wxUnionid:obj.Unionid,
      };

      if (type == "sub") {
        wxBObj.mobile = obj.mobile;
        wxBObj.qrcode = obj.qrcode;
      }
      console.log(wxBObj)
      getDataInfo("post", "user/wlogin", wxBObj).then(res => {
        console.log(res)
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
            console.log(getStorage("wx_url"))
            if (getStorage("wx_url")) {
              // stoRemove('wx_url')
              // console.log(getStorage('wx_url'))
              if (
                getStorage("wx_url") != "/" ||
                getStorage("wx_url") != "/meeting"
              ) {
                // console.log(window.location.href.split('login'))
               
                setTimeout(function() {
                     window.location.href =
                  window.location.href.split("wxlogin")[0] + getStorage("wx_url");
                  stoRemove("wx_url");
                }, 1000);
              }
            } else {
                 setTimeout(function() {
                   _that.$router.push("/meeting");
                }, 1000);

             
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
        } else if (res.data.code == 400) {
          this.toastInfo = {
            showMsg: res.data.msg,
            showPositionValue: true,
            toastType: "text"
          };
        }
      });
    },
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
        wxUnionid: this.wxData.unionid
      };

      this.wxlogin(wxBObj, "sub");
    },
    //手机号填写错误提示信息
    mobileErrorChange(ev) {
      this.toastInfo = {
        showMsg: "填写的手机号格式不正确",
        showPositionValue: true,
        toastType: "text"
      };
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
  },
  mounted() {
 
    if (getStorage("wx_url") && getStorage("wx_url") == "lottery") {
    
       WeChatLogin().then(res => {
      
        if(res.data.code == 200){
              setStorage("xwData",res.data.data.userInfo);
               this.toastInfo = {
          showMsg: "授权成功！正在跳转页面",
          showPositionValue: true,
          toastType: "text"
        };
                setTimeout(function() {
                     window.location.href =
                  window.location.href.split("wxlogin")[0] + getStorage("wx_url");
                  stoRemove("wx_url");
                }, 1000);

        }else if (res.data.code == 401) {
          console.log("code过期");
        }
       
         
       })
    } else {
 
      WeChatLogin().then(res => {
        console.log(res);
        let code = GetQueryString("code");
        if (res.data.code == 200) {
          if (res.data.data.isRegistered == 0) {
            this.wxshow1 = true;
            this.wxData = res.data.data.userInfo;
          } else if (res.data.data.isRegistered == 1) {
               let wxBObj = {
              wxOpenid: res.data.data.userInfo.openid,
              wxNickname: res.data.data.userInfo.nickname,
              wxHeadimgurl: res.data.data.userInfo.headimgurl,
              wxProvince: res.data.data.userInfo.province,
              wxCity:res.data.data.userInfo.city,
              wxCountry: res.data.data.userInfo.country,
              code:code,
              wxUnionid:res.data.data.userInfo.unionid,
            };
              this.wxlogin(wxBObj,'auto')

          }
        } else if (res.data.code == 401) {
          console.log("code过期");
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "../assets/style/tools.less";
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";
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
.WXPopup1{
  input{ padding: .5rem 0;}
}
</style>
