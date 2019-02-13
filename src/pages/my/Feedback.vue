<template>
  <div class="box">
   
<div style="height:74px;">
   
<sticky :check-sticky-support="false" :offset="0">
   <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">用户反馈</h3>
              <div class="my-saveBtn fr" @click="submitInputForm">
           提交
          </div>
          </div>
    </sticky>
 <group class="feedbackGroup">
    
      <x-textarea :max="200" 
      placeholder="您的宝贵建议将是我们为之努力的目标" 
      style="font-size:1rem;color:#C8C8C8;"
      v-model="feedbackData.content"
      @on-focus="onEvent('focus')"
       @on-blur="onEvent('blur')" 
       :height="200" :rows="8"
       ></x-textarea>

      
    </group>
 <group class="feedbackGroup">
<x-input title="您的联系方式"  v-model="feedbackData.contact" placeholder="QQ/邮箱/电话" style="font-size:1rem;"></x-input>
 </group>

    </div>

     <toast
      v-model="toastInfo.showPositionValue"
      width="10em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>
  
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo
} from "../../assets/lib/myStorage.js";
  import {
    XTextarea,
    Sticky,
     Group, XInput,
     Toast
  } from "vux";

  export default {
    name: "MyFan",
    components: {
      Sticky,
      XTextarea,
       Group, XInput,
       Toast
    },
    data() {
      return {
        toastInfo:{ 
     showMsg: "",
   showPositionValue: false,
   toastType:"success",
   },
    feedbackData:{
      content:'',
      contact:'',
    },
      }
    },

    methods: {
       onEvent (event) {
      // console.log('on', event)
    },
      //反馈信息提交
      submitInputForm(){
        if(this.feedbackData.content == ''){
          this.toastInfo = {
            toastType:'cancel' ,
            showMsg:'请填写反馈内容',
            showPositionValue:true
          }
        }else{
          let _that = this;
          let feedObj = this.feedbackData;
          feedObj.userId = getStorage("userToken").userId,
        
             checkToken().then(Pdata => {
        getDataInfo("post", "/feedback/feedback", feedObj).then(res => {
          console.log(res)
          if(res.data.code ==200){
            
      this.toastInfo = {
              toastType:'success' ,
              showMsg:'反馈提交成功！',
              showPositionValue:true
            }
              setTimeout(function() {
              _that.$router.go(-1);
            }, 1000);
          }else if (res.data.code == 400 || res.data.code == 100101) {
             this.toastInfo = {
            toastType:'cancel' ,
            showMsg:'请先登录后反馈',
            showPositionValue:true
          }
            setTimeout(function() {
              _that.$router.push("/login");
            }, 1000);
          }
        });
      });


         
        }
      
      },
       getMyFanData() {

   
    },
   
    },
    mounted () {
  
    },
 
  };
</script>

<style lang="less">
  @import "../../assets/style/tools.less";
  @import "../../assets/style/global.less";
  @import "~vux/src/styles/reset.less";
.feedbackGroup{
  .weui-cells{
margin-top:0; 
.weui-input{color:#C8C8C8}
  }
  .weui-cells::before{
    border: none;
  }
   .weui-cells::after{
    border: none;
  }
  .weui-cell::before{
    border: none;
  }
   .weui-cell{
    border-bottom: 1px solid #E6E6E6;
    .vux-label{
      font-size: 1rem;
      font-weight: bold;
      color: #323232;
    }
   
  }
}

</style>
