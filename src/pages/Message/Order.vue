<template>
    <div class="box">
       
<div>
<div style="height:44px;">
      <sticky
      
        ref="sticky"
    
        :check-sticky-support="false"
        :disabled="disabled">
     <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)">
            </div>
            <h3 class="map-headerTitle">
            订单消息
            </h3>
         </div>
      </sticky>
    </div>


        






         <div class="msgOrderlistBox">
<ul class="msgOrderlistUl padlr">
<li class="msgOrderlist" v-for="(i,index) in 5" :key="index">
    <div class="msgOrderTitleBox padlr">
        <h4 class="msgOrderTitle fl">订单通知</h4>
        <div class="msgOrderMark fr">已读</div>
    </div>
<div class="msgOrderInt padlr">
您预订的场地<span>[世外桃源会议室-C1]</span>,场地方已确认,请尽快付款。超过30分钟订单将自动取消
</div>
<time class="padlr">时间：2018-10-09 10:00</time>
<div class="msgOrderSeeDetailsBox">
<div class="msgOrderSeeDetails fl">
    查看详情
</div>
<div class="msgOrderIcon fr">  <x-icon type="ios-arrow-forward" size="15"></x-icon></div>
<div>


</div>

</div>

</li>

</ul>

         </div>


 <!-- <p v-for="i in 100">{{i}}<br></p> -->


 </div>

    </div>
</template>
<script>
import { Sticky } from 'vux'
export default {
   components: {
    Sticky
  },
    name:'OrderMsg',
    data(){
        return{
          
      disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
        }
    }
}
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

</style>


