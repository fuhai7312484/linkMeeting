<template>
  <div>
      <div v-if="iswx">
          

            <div class="wxLotbtnsBox">
                <div @click="NotBegun">
                    <img :src="require('../../assets/images/lotteryBtn1.png')"/>
                </div>
                <div  @click="NotBegun">
                  <img :src="require('../../assets/images/lotteryBtn2.png')"/>
                </div>
  <!-- {{wxData}} -->

            </div>

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
  isweixin,
  WeChatLogin,
  setStorage,
  getStorage
} from "../../assets/lib/myStorage.js";
import {
  Toast,
} from "vux";
export default {
  name: "Lottery",
  components: {
 Toast,
  },
  data() {
    return {
      wxData: null,
      iswx:true,
        toastInfo:{
          showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
    };
  },
  methods: {
    NotBegun(){
this.toastInfo = {
     showMsg: "即将开放 敬请期待！！",
        showPositionValue: true,
        toastType: "text"
}
    }
  },
  mounted() {
      let _that=this
    if (getStorage("xwData")) {
      this.wxData = getStorage("xwData");
    }

    let wx_Url = "lottery";
    setStorage("wx_url", wx_Url);
    if (isweixin()) {
      WeChatLogin();
   
    } else {
this.toastInfo = {
     showMsg: "请用微信登录此页！",
        showPositionValue: true,
        toastType: "text"
}
this.iswx = false
setTimeout(function(){
    _that.$router.push('/meeting')
},2000)
    
    }
  }
};
</script>
<style lang="less">
@import "~vux/src/styles/reset.less";
.wxLotbtnsBox{
    width: 80%;
    height: 200px;
    // background: #000;
    margin: 10rem auto 2rem auto; 


    div{
      margin: 1rem auto;
      text-align: center;
      width: 100%;
      img{width: 220px}
    }
}
</style>


