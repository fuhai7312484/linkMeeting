<template>
    <div class="box" :style="{height:OrderHight+'px'}">
        
<div class="map-headerBox">
<div class="map-go-back" @click="$router.go(-1)">
</div>
</div>


<div class="login-contentBox">
<h1 class="login-contentTitle">您好</h1>
<p class="login-subtitle">欢迎来到链会议,立即 <router-link tag="span" to="/reg">注册</router-link></p>
<div class="login-formBox">

  <group class="login-account" :style="{borderBottom:'1px solid #e4e4e4'}">
      <x-input placeholder="请输入手机号"></x-input>
    </group>

     <group class="login-account" :style="{borderBottom:'1px solid #e4e4e4'}">
      <x-input placeholder="请输入密码" class="fl" type="password"></x-input>
      <div class="forgetPass fr">忘记密码</div>
    </group>

<div class="loginBtnBox">
<div class="weixinBtns fl">
<span>
    <img src="../../assets/images/QQLogin.png" />
</span>
<span>
    <img src="../../assets/images/weixin.png" />
</span>
</div>
<div class="loginBtn fr">
<x-button action-type="submit" :class="disabled?'custom-primary':'custom-primary-red'"
:disabled="disabled"
 @click.native="submitData"
  >登录</x-button>
</div>
</div>
</div>


</div>
<div class="loginFooter">

登录即表示同意链会议 服务条款 和 隐私条款 

</div>
      
    </div>
</template>
<script>
import {
 Group, XInput,XButton
} from "vux";
export default {
     components: {
   Group, XInput,XButton
  },
    name:'login',
    data(){
        return{
            OrderHight:0,
            disabled:true,
        }
    },
    methods:{
        getOrderHight() {
      var orderHight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.OrderHight = orderHight;
    },
    },
    created() {
          this.getOrderHight()
    },
    mounted() {
      
    },
    
}
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.loginFooter{
    position: absolute;
    bottom:2rem;
    width: 100%;
    text-align:center ;
    color: #A0A0A0;
    font-size: .8rem;
}

</style>
