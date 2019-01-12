<template>
  <div class="box">
    <!-- {{this.$route.query}} -->
    <div>
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">报名信息</h3>
          </div>
        </sticky>
      </div>

      <div class="ticket-contentBox">
        <div class="padlr" style="overflow: hidden;">
          <div class="signUpInfoBox">
            <div class="signUpInfoImg fl">
              <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg">
            </div>
            <div class="signUpInfoContent fl">
              <h4>第四届中国制造强国论坛暨2018中国制造年度盛典</h4>
              <p class="signUpTime">时间：11-24 09：00至21：00</p>
              <p class="signUpTime">地点：朝阳区工体北路88号 三里屯广场</p>
            </div>
          </div>

          <div class="signUpTicket">
            <div class="signUpTicketTitle fl">
              <h4>{{this.$route.query.ticket_name}}</h4>
              <img src="../../assets/images/Non-refundable.png">
            </div>

            <div class="signUpTicketPrice fr">
              <span>{{'¥'+ this.$route.query.ticket_price}}</span>/人
             
            </div>
          </div>
        </div>

        <div class="signUpFormBox">
          <div class="signUpInputs borBm padlr">
            <div class="signUpLabel fl">姓名</div>
            <!-- {{username}}{{mobile}}{{email}}{{companyName}}{{jobTitle}} -->
            <div class="signUpInput fr">
              <x-input name="username" ref="username" placeholder="你的姓名（必填）" v-model="username" is-type="china-name" @on-change="InputChange"></x-input>
            </div>
          </div>

          <div class="signUpInputs padlr">
            <div class="signUpLabel fl">手机号</div>
            <div class="signUpInput fr">
              <x-input
                name="mobile"
                ref="mobile"
                placeholder="你的手机号码（必填）"
                keyboard="number"
                is-type="china-mobile"
                v-model="mobile"
                @on-change="InputChange"
              ></x-input>
            </div>
          </div>

          <div class="signUpInputs borBm padlr">
            <div class="signUpLabel fl">邮箱地址</div>
            <div class="signUpInput fr">
              <x-input name="email" placeholder="你的常用邮箱（选填）" is-type="email"   v-model="email"></x-input>
            </div>
          </div>

          <div class="signUpInputs padlr">
            <div class="signUpLabel fl">公司名称</div>
            <div class="signUpInput fr">
              <x-input placeholder="所在单位全称（选填）" v-model="companyName"></x-input>
            </div>
          </div>

          <div class="signUpInputs borBm padlr">
            <div class="signUpLabel fl">职位</div>
            <div class="signUpInput fr">
              <x-input placeholder="你的职位（选填）" v-model="jobTitle"></x-input>
            </div>
          </div>
        </div>
      </div>
      <div class="der"></div>
    </div>

    <div class="footer">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="3/5" :order="1">
          <div class="footer-nav-price">{{'合计:¥'+this.$route.query.ticket_price}}</div>
        </flexbox-item>
        <flexbox-item :span="2/5" :order="2">
          <!-- <router-link tag="div" class="footer-nav-destineBtn" to="/ticket">下一步</router-link> -->
          <div v-if="signUpBtn" class="footer-nav-destineBtn" @click="next">提交订单</div>
          <div v-if="!signUpBtn" class="footer-nav-destineBtn bgDC">提交订单</div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Sticky, XInput } from "vux";
export default {
  name: "Ticket",
  components: {
    Flexbox,
    FlexboxItem,
    Sticky,
    XInput
  },
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),

      ticketValue: "",
      username:"",
      mobile:"",
      email:"",
      companyName:"",
      jobTitle:"",
      signUpBtn:false,
    };
  },
  methods: {
    next() {
      // console.log(this.ticketValue)
      
      console.log('会议ID：'+this.$route.query.meeting_id +',当前的价格是:'+this.$route.query.ticket_price)
      console.log(this.username,this.mobile,this.email,this.companyName,this.jobTitle)
      // alert(
      //   "会议ID:" +
      //     this.$route.query.meeting_id +
      //     ",当前的价格是：" +
      //     this.ticketValue.price
      // );
    },

    //姓名和手机号输入框输入事件监听
    InputChange(ev){
    if(this.username.length!=0 && this.mobile.length!=0  ){
     
      if(this.$refs.username.valid== true && this.$refs.mobile.valid==true){
    this.signUpBtn = true;
      }
      
    }else{
       this.signUpBtn = false;
    }
    },
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


