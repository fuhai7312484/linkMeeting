<template>
  <div class="box" :style="{height:OrderHight+'px'}">
    <div class="map-headerBox">
      <div class="map-go-back" @click="$router.go(-1)"></div>
      <router-link tag="div" class="backLogin fr" to="/login" v-if="showNext==='1'">登录</router-link>
    </div>
    <div class="login-contentBox" v-if="showNext==='1'">
      <h1 class="login-contentTitle">手机号注册</h1>
      <!-- <p class="login-subtitle">欢迎来到链会议,立即<span>注册</span></p> -->
      <div class="login-formBox">
        <!-- @on-click-error-icon="mobileErrorChange"    :should-toast-error="false" -->
        <group class="login-account">
          <x-input
            placeholder="请输入手机号"
            mask="99999999999"
            v-model="maskValue"
            :max="11"
            is-type="china-mobile"
            :should-toast-error="false"
            @on-click-error-icon="mobileErrorChange"
            @on-change="mobileChange"
            ref="mobile"
          ></x-input>
        </group>

        <div class="loginBtnBox">
          <toast
            v-model="showPositionValue"
            type="text"
            width="20em"
            position="middle"
            :time="1000"
            is-show-mask
          >{{showMsg}}</toast>

          <div class="loginBtn">
            <x-button
              action-type="submit"
              :class="disabled?'custom-primary':'custom-primary-red'"
              :disabled="disabled"
              @click.native="submitData"
            >获取验证码</x-button>
          </div>
        </div>
      </div>
    </div>

    <div class="login-contentBox" v-else-if="showNext==='2'">
      <h5 class="login-contentinfoTitle">验证码已经发送至 {{maskValue}}</h5>
      <!-- <p class="login-subtitle">欢迎来到链会议,立即<span>注册</span></p> -->
      <div class="login-formBox">
        <!-- @on-click-error-icon="mobileErrorChange"    :should-toast-error="false" -->
        <group class="login-account">
          <div class="fl" :style="{width:'70%'}">
            <x-input
              placeholder="请输入验证码"
              ref="refcode"
              type="text"
              :is-type="codeValuefun"
              :min="6"
              :max="6"
              width="30%"
              v-model="codeValue"
              @on-change="refCodeChange"
            ></x-input>
          </div>

          <div
            class="forgetPass fr"
            v-if="!Resend"
            :style="{width:'30%',textAlign:'center'}"
          >{{time}}s后重发</div>
          <div
            class="forgetPass fr"
            v-if="Resend"
            :style="{width:'30%',textAlign:'center',color:'#FE666B'}"
            @click="ReacquireCode"
          >获取验证码</div>
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

          <div
            class="forgetPass fr"
            :style="{width:'15%',fontSize:'0.8rem'}"
            @click="showPass=!showPass"
          >{{showPass?'隐藏':'显示'}}</div>
        </group>

        <div class="loginBtnBox">
          <toast
            v-model="showPositionValue"
            type="text"
            width="20em"
            position="middle"
            :time="1000"
            is-show-mask
          >{{showMsg}}</toast>

          <div class="loginBtn">
            <x-button
              action-type="submit"
              :class="ResBtn?'custom-primary':'custom-primary-red'"
              :disabled="ResBtn"
              @click.native="submitData"
              :show-loading="showLoading"
            >注册</x-button>
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
      
      
      注册即表示同意链会议 <span @click="gotoTerms('FW')">服务条款</span> 和 <span @click="gotoTerms('YS')">隐私条款</span></div>
  </div>
</template>
<script>
import Terms from "@/components/Terms";
import { getDataInfo,setCookie,setStorage,JIMinitchange,sendSysMsg} from "../../assets/lib/myStorage.js";
import { Group, XInput, XButton, Toast,  XDialog } from "vux";
export default {
  components: {
    Group,
    XInput,
    XButton,
    Toast,Terms,  XDialog
  },
  name: "reg",
  data() {
    return {
        TermsTitle:'',
       showHideOnBlur: false,
      termsType:'',
      OrderHight: 0,
      maskValue: "",
      disabled: true,
      showPositionValue: false,
      showMsg: "",
      showNext: "1",
      time: 60,
      codeValue: "",
      passW: "",
      Resend: true,
      showPass: false,
      ResBtn: true,
      showLoading: false,
      VerCode: "",
      codeMsg: "",

      codeValuefun: function(value) {
        let regExp = /^\d{6}\b/;
        let r = value.match(regExp);
        return {
          valid: r != null,
          msg: "验证码不正确!"
        };
      },
      codePassValue: function(value) {

         if (value.length < 3 || value.length >= 18) {
          return {
            valid: false,
            msg: "密码格式不正确!"
          };
        } else {
          return {
            valid: true
          };
        }

        
        // let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        // let r = value.match(regExp);

        // return {
        //   // valid: value.match(regExp),
        //   valid: r != null,
        //   msg: "密码格式不正确!"
        // };
      }
    };
  },

  methods: {
    //服务条款
    gotoTerms(type){
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
    },
    //重新获取验证码
    ReacquireCode() {
        let _that = this;
        let SmsObj = {
          type: "register",
          mobile: this.maskValue
        };
        getDataInfo('post',"user/sendSms", SmsObj).then(res => {
          let data = res.data;
          if (data.code === 200) {
            // alert(data.data)
            //   console.log(data.data)
            _that.VerCode = data.data;
            _that.Resend = false;
            _that.Reacquire();
          } else if (data.code === 400) {
              _that.showPositionValue = true;
             _that.showMsg = data.msg;
          }
        });
    },
    //验证码倒数
    Reacquire() {
      let _that = this;
      let dx_djs = setInterval(() => {
        if (_that.time-- <= 0) {
          _that.time = 60;
          _that.Resend = true;
          clearInterval(dx_djs);
        }
      }, 1000);
    },
  
    //提交手机号表单
    submitData() {
      let _that = this;
      if (this.showNext == "1") {
        let SmsObj = {
          type: "register",
          mobile: this.maskValue
        };
        // console.log(this.showNext, SmsObj);
        getDataInfo('post',"user/sendSms", SmsObj).then(res => {
          let data = res.data;
          if (data.code === 200) {
            // alert(data.data)
              // console.log(data.data)
            _that.VerCode = data.data;
            _that.showNext = "2";
            _that.Resend = false;
            _that.Reacquire();
          } else if (data.code === 400) {
              _that.showPositionValue = true;
             _that.showMsg = data.msg;
          }
        });
      } else if (this.showNext == "2") {
        if (this.codeValue === this.VerCode) {
          (this.showLoading = true), (this.ResBtn = true);
          let regObj = {
            mobile: this.maskValue,
            password: this.passW,
            mobileCode: this.VerCode
          };
          getDataInfo('post',"user/register", regObj).then(res => {
              
              if(res.data.code ==200){
                // console.log(res.data.data.user.id)
                let userId = res.data.data.user.id
                 _that.showPositionValue = true;
             _that.showMsg = res.data.msg;
             let loginObj={
                mobile: _that.maskValue,
                 password:_that.passW,
             }

               

              getDataInfo('post',"user/login", loginObj).then(resd=>{
                  if(resd.data.code==200){
                         _that.showPositionValue = true;
                     _that.showMsg = resd.data.msg;

                     let tokenInfo = resd.data.data.tokenMap
                    let userInfo={
                      userId:resd.data.data.user.id,
                      access_token:tokenInfo.access_token,
                      refresh_token:tokenInfo.refresh_token,
                    }
                      setCookie('accessToken',tokenInfo.access_token)
                     setStorage('userToken',userInfo)
              


                     setTimeout(function(){
                        //发送注册成功后的系统消息
                // let Obj={
                //   userid:res.data.data.user.id,
                //   type:'5',
                //   eid:'',
                //   content:'恭喜您成功注册<链会议>！',
                // }
                // sendSysMsg(Obj)
                          _that.$router.push('/myindex')
                     },1000)
                    
                  }
                //   console.log(resd)
              })

              }else if(res.data.code==1004){
                   _that.showPositionValue = true;
             _that.showMsg = res.data.msg;
              }
          });

      
        } else {
              this.showPositionValue = true;
               this.showMsg = "验证码输入不正确";
        }
    
      }
    },
 
    

    getOrderHight() {
      var orderHight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.OrderHight = orderHight;
    },
    refCodeChange(ev) {
      if (this.codeValue.length == 0 || this.passW.length == 0) {
        this.ResBtn = true;
      } else {
        if (
          this.$refs.refcode.valid == true &&
          this.$refs.refpass.valid == true
        ) {
          this.ResBtn = false;
        } else {
          this.ResBtn = true;
        }
      }
    },
    //验证输入的手机号是否正确来控制btn是否可点 refcode
    mobileChange(ev) {
      if (this.$refs.mobile.valid == false || this.maskValue.length == 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    //手机号填写错误提示信息
    mobileErrorChange(ev) {
      this.showPositionValue = true;
      this.showMsg = "填写的手机号格式不正确！";
    }
  },
  watch: {},
  created() {
    this.getOrderHight();
  },
  mounted() {


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
 
}
</style>
