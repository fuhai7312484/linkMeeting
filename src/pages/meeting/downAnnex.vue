<template>
  <div class="box">
    <!-- {{this.$route.query}} -->
    <div>
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">相关附件</h3>
          </div>
        </sticky>
      </div>

      <div class="ticket-contentBox padlr">
        <ul class="AnnexListBox">
          <li class="AnnexList" v-for="i in 10" :key="i">
            <div class="AnnexTitleBox">
<div class="AnnexImg fl">
  <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg">
</div>
<div class="AnnexTitle fr">
  <h4> 第四届中国制造强国论坛暨2018中国第四届中国制造.doc</h4>
  <span>
    7.26MB
  </span>
</div>
            </div>
<div class="AnnexBtnsBox">
<span>分享</span>
<span>保存</span>
</div>

          </li>

        </ul>

        <!-- <p v-for="i in 40" :key="i">{{i}}</p> -->
    
      </div>
      <!-- <div class="der"></div> -->
    </div>

 
  </div>
</template>
<script>
import { Sticky,Card } from "vux";
export default {
  name: "Ticket",
  components: { Sticky,Card
  },
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),

    };
  },
  methods: {
   

  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.router-link-active {
  color: #fff;
}
</style>


