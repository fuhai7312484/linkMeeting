<template>
  <div class="box" :style="{height:OrderHight+'px'}">
    <div class="map-headerBox">
      <div class="map-go-back" @click="$router.go(-1)"></div>
      <!-- <router-link tag="div" class="backLogin fr" to="/login" v-if="showNext==='1'">登录</router-link> -->
    </div>
    <div class="login-contentBox" v-if="showNext==='1'">
      <h1 class="login-contentTitle">手机验证码登录</h1>
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

          <div class="loginBtn fr">
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
       <h1 class="login-contentTitle">请输入验证码登录</h1>
      
      <div class="login-formBox">
     
        <group class="login-account">
          <div class="fl" :style="{width:'100%'}">
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

          <div class="loginBtn fr">
            <x-button
            v-if="!Resend"
              action-type="submit"
              class="custom-primary"
              :disabled="!Resend"
              @click.native="ReacquireCode"
            >{{time}}s</x-button>
            <x-button
            v-if="Resend"
              action-type="submit"
              class="custom-primary-red"
              :disabled="Resend"
              @click.native="ReacquireCode"
            >重新获取</x-button>


          </div>
        </div>
      </div>
    </div>

    <div class="loginFooter">注册即表示同意链会议 服务条款 和 隐私条款</div>
  </div>
</template>
<script>
import { getDataInfo } from "../../assets/lib/myStorage.js";
import { Group, XInput, XButton, Toast } from "vux";
import axios from "axios";
export default {
  components: {
    Group,
    XInput,
    XButton,
    Toast
  },
  name: "reg",
  data() {
    return {
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
    //重新获取验证码
    ReacquireCode() {
        let _that = this;
    //   this.Resend = false;
      //这里单独请求获取验证码接口
    //   this.Reacquire();


        let SmsObj = {
          type: "login",
          mobile: this.maskValue
        };
        // console.log(this.showNext, SmsObj);
        getDataInfo('post',"user/sendSms", SmsObj).then(res => {
          let data = res.data;
          if (data.code === 200) {
              console.log(data.data)
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
        //showNext为1时这里请求发送验证码接口并且把showNext状态改为2
        // console.log("验证码已经发送至：" + this.maskValue);
      
        let SmsObj = {
          type: "login",
          mobile: this.maskValue
        };
        // console.log(SmsObj);
       
        getDataInfo('post',"user/sendSms", SmsObj).then(res => {
         alert(SmsObj)
          let data = res.data;
          if (data.code === 200) {
              console.log(data.data)
              alert(data.data)
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


          // getDataInfo('post',"user/register", regObj).then(res => {
          //   //   console.log(res)
          //     if(res.data.code ==200){
          //        _that.showPositionValue = true;
          //    _that.showMsg = res.data.msg;
          //    let loginObj={
          //       mobile: _that.maskValue,
          //        password:_that.passW,
          //    }
          //     getDataInfo('post',"user/login", loginObj).then(resd=>{
          //         if(resd.data.code==200){
          //                _that.showPositionValue = true;
          //            _that.showMsg = resd.data.msg;
          //            setTimeout(function(){
          //                 _that.$router.push('/myindex')
          //            },800)
                    
          //         }
          //       //   console.log(resd)
          //     })
          //     }else if(res.data.code==1004){
          //          _that.showPositionValue = true;
          //    _that.showMsg = res.data.msg;
          //     }
          // });

      
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
      let _that = this;
      if(this.$refs.refcode.valid == true){
        let codeObj={
          mobileCode:ev,
          mobile:this.maskValue,
        }

           getDataInfo('post',"user/user", codeObj).then(res=>{
         
                  if(res.data.code==200){
                       this.showPositionValue = true;
                     this.showMsg = res.data.msg;
                     console.log(res)
                     setTimeout(function(){
                          _that.$router.push('/myindex')
                     },500)
                    
                  }else if(res.data.code==1004){
                      this.showMsg = res.data.msg;
                       this.showPositionValue = true;
                  }
            
              })


        
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
}
</style>
