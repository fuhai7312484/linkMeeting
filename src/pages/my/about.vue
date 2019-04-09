<template>
  <div class="box">
    <div class="ticket-Box">
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">关于链会议</h3>
          </div>
        </sticky>
      </div>
      <div class="ticket-contentBox padlr">
        <div class="aboutLogoBox">
          <img :src="require('../../assets/images/logo.png')">
          <div class="versionNum">版本号：V 1.0</div>
          <div class="versionInfo">链会议是用于场地发布和预定，会议组织、报名、 参会管理、内容分享等的服务平台。</div>
        </div>
      </div>
<div v-transfer-dom>
      <popup v-model="showInput" height="100%">
  <div class="my-inputsBox">
 <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="showInput=false"></div>
            <h3 class="map-headerTitle">微信公众号</h3>
            <!-- <div class="my-saveBtn fr" @click="submitInputForm">保存</div> -->
          </div>

          <div class="qrCodeBox">
<div class="qrCodeInfo">
您可以在微信中搜索“链会议服务号”<br/>
或长按二维码保存为图片,使用微信扫一扫即可关注

</div>
<div class="qrCodeImg">
<img :src="require('../../assets/images/weixinqrCode.jpg')"/>

</div>


          </div>


  </div>
      </popup></div>
      <group class="aboutMenuBox">
      <cell title="链会议公众号" value="yingdongkeji" is-link @click.native="showInput=!showInput"></cell>
       <cell title="客服电话" value="400-609-8086" is-link @click.native="callPhone"></cell>
    </group>
<div class="copyright">
&#169 2017-2019 盈东科技 版权所有

</div>
      <div class="der"></div>
    </div>
  </div>
</template>
<script>
import {
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo,isweixin
} from "../../assets/lib/myStorage.js";
import { Flexbox, FlexboxItem, Sticky, Checker, CheckerItem ,  Group, TransferDomDirective as TransferDom, Popup,
    Cell,
    CellBox} from "vux";
export default {
   directives: {
    TransferDom
  },
  name: "Lianhuiyi",
  components: {
    Flexbox,
    FlexboxItem,
    Sticky,
    Checker,
    CheckerItem,  Group,
    Cell,
    CellBox, Popup
  },
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),
         showInput: false,
    };
  },
  methods: {

     callPhone() {
      window.location.href = "tel://" + '4006098086';
    },

  },
  mounted() {
if(isweixin()){
// this.$router.push('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx837aea6e0dd3f50e&redirect_uri=http://lianhuiyi.woneast.com/test.html&response_type=code&scope=snsapi_base&state=1&connect_redirect=1#wechat_redirect')

}else{
  alert('不是微信浏览器')
}
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.ticket-Box {
  background: rgba(245, 245, 245, 1);
  height: 100vh;
  position: relative;
  .copyright{
    position: absolute;
    width: 100%;
    font-size: .8rem;
    left: 0;
    right: 0;
    bottom: 2rem;
    text-align:center;
    color: #A0A0A0;
  }
}
.router-link-active {
  color: #fff;
}
.ticket-item {
  line-height: 26px;
  //   text-align: center;
  padding: 0 0.8rem 0.8rem 0.8rem;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #fff;
  background-color: #fff;
  display: block !important;
  width: 100%;
  //   height: 130px;
  margin: 0.8rem 0;
  // margin: 6px 6px 6px 0;
}
.aboutMenuBox{
  .weui-cells{
    margin-top:0 ;
    font-size: 1rem;
  }
}
.qrCodeBox{
.qrCodeInfo{
  font-weight: bold;
  font-size: .8rem;
  text-align: center;
  padding: 3rem 0;
}
.qrCodeImg{
  width: 100%;
  text-align: center;
}
}
// .ticket-item-selected {
//   background: #ffffff url(../../assets/images/Filters-item-selected.png)
//     no-repeat right bottom;
//   background-size: 35px;
//   border-color: #fe666b;
// }
</style>
