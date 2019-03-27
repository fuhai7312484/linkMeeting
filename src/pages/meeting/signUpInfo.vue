<template>
  <div class="box">
    <!-- {{this.$route.query}} -->
    <!-- {{TicketData}} -->

     <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>


    <div class="ticket-Box" v-if="!show2">
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">添加报名人</h3>
          </div>
        </sticky>
      </div>
      <div class="ticket-contentBox">
        <div class="padlr" style="overflow: hidden;">
          <div class="signUpInfoBox">
            <div class="signUpInfoImg fl">
              <span
                v-for="(img,index) in meetingData.meetingFileList"
                :key="index"
                v-if="img.belong==1"
              >
                <img
                  :src="img.fileUrl==null?require('../../assets/images/myFans-Mask.png'):img.fileUrl"
                >
              </span>

              <!-- <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg"> -->
            </div>
            <div class="signUpInfoContent fl">
              <h4>{{meetingData.theme}}</h4>
              <p class="signUpTime">时间：{{meetingData.beginTime}}</p>
              <p class="signUpTime">地点：{{meetingData.address}}</p>
            </div>
          </div>

          <div class="signUpTicket">
            <div class="signUpTicketTitle fl">
              <h4>{{TicketData.name}}</h4>
              <img v-if="TicketData.isRefund ==3 " src="../../assets/images/Non-refundable.png">
            </div>

            <div class="signUpTicketPrice fr">
              <span v-if="TicketData.type!=0">{{'¥'+ TicketData.price}}</span>{{TicketData.type==0?'免费':'/人'}}
            </div>
          </div>
          <div></div>



        </div>

        <div class="signUpFormBox">
          <!-- <div class="signUpInputs borBm padlr">
            <div class="signUpLabel fl">姓名</div>
           
            <div class="signUpInput fr">
              <x-input name="username" ref="username" placeholder="你的姓名（必填）" v-model="username" is-type="china-name" @on-change="InputChange"></x-input>
            </div>
          </div>-->

          <!-- <div class="signUpInputs padlr">
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
          </div>-->
        </div>
      </div>

      <ul class="signUpMobilleBox">
        <swipeout class="vux-1px-tb">
          <swipeout-item
            transition-mode="follow"
            v-for="(Contact,index) in ContactData"
            :key="index"
          >
            <div slot="right-menu">
              <swipeout-button :type="TicketData.type==0?'default':'warn'" @click.native="deleteContact(index,Contact)">删除</swipeout-button>
            </div>
            <li slot="content">
              <h5>
                <span>{{Contact.name}}</span>
                <span>{{Contact.mobile}}</span>
              </h5>
              <div class="signUpCompany">{{Contact.company}}</div>
            </li>
          </swipeout-item>
        </swipeout>

        <!-- <li v-for="(Contact,index) in ContactData">
<h4>{{Contact.mobile}}</h4>

        </li>-->
      </ul>

      <div class="der"></div>
    </div>

    <div class="footer" v-if="!show2">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="3/5" :order="1">
          <div
            class="footer-nav-price"
          >{{TicketData.type!=0?'合计:¥'+this.$route.query.price:'免费'}}</div>
        </flexbox-item>
        <flexbox-item :span="2/5" :order="2">
          <!-- <router-link tag="div" class="footer-nav-destineBtn" to="/ticket">下一步</router-link> -->
          <div class="footer-nav-destineBtn" @click="next">立即报名</div>
          <!-- <div v-if="!signUpBtn" class="footer-nav-destineBtn bgDC">提交订单</div> -->
        </flexbox-item>
      </flexbox>
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
  getDataInfo,
  isLogin,
  transDate
} from "../../assets/lib/myStorage.js";
import {
  Flexbox,
  FlexboxItem,
  Sticky,
  XInput,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,Toast, TransferDomDirective as TransferDom,Loading,
} from "vux";
export default {
  name: "Ticket",
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Sticky,
    XInput,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,Toast,Loading,
  },
  data() {

    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),

      ticketValue: "",
      // signUpBtn: false,
      meetingData: {},
      TicketData: {},
      ContactData: [],
       toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      show2: true,
    };
  },
  methods: {
    //删除某个联系人
    deleteContact(index, itme) {
      if(this.TicketData.type==0){

        this.toastInfo = {
        showMsg: "当前用户不可删除",
        showPositionValue: true,
        toastType: "text",
      }


      }else{
          this.ContactData.splice(index, 1);
      }
    
    },
    getTicketData() {
     
      //获取订单里的会议信息
      let detailObj = {
        params: {
          id: this.$route.query.meeting_id,
          userId: getStorage("userToken").userId
        }
      };
      getDataInfo("get", "meetingdetails/meetingDetailsById", detailObj).then(
        res => {
          if (res.data.code == 200) {
            this.meetingData = res.data.data.draftsVo.meetingDetails;
          }
        }
      );
      //获取当前票种信息
      let tickObj = {
        params: {
          tickId: this.$route.query.tickId
        }
      };

      checkToken().then(Pdata => {
        getDataInfo("get", "myMeeting/getMeTicketById", tickObj).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.TicketData = res.data.data;
            if (res.data.data.type == 0) {
              //如果当前是免费票请求接口获取当前用户的手机号
              let userObj = {
                params: {
                  id: getStorage("userToken").userId
                }
              };

              checkToken().then(Pdata => {
                getDataInfo("get", "user/userById", userObj).then(res => {
                  // console.log(res);
                  if (res.data.code == 200) {
                    this.ContactData.push(res.data.data);
                     this.show2 = false
                  } else if (res.data.code == 400 || res.data.code == 100101) {
                    setTimeout(function() {
                      _that.$router.push("/login");
                    }, 500);
                  }
                });
              });
            }else{
               this.show2 = false
            }
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/login");
            }, 500);
          }
        });
      });
      // this.TicketData = this.$route.query;
      // console.log(this.$route.query.meeting_id,this.$route.query)
    },
    next() {
      console.log(
        "先调用创建订单（返回订单ID）接口，再调用针对免费票种的订单支付接口"
      );
      console.log(
        "会议ID：" +
          this.$route.query.meeting_id +
          ",当前的价格是:" +
          this.$route.query.price
      );
    }

    //姓名和手机号输入框输入事件监听
    // InputChange(ev) {
    //   if (this.username.length != 0 && this.mobile.length != 0) {
    //     if (
    //       this.$refs.username.valid == true &&
    //       this.$refs.mobile.valid == true
    //     ) {
    //       this.signUpBtn = true;
    //     }
    //   } else {
    //     this.signUpBtn = false;
    //   }
    // }
  },
  mounted() {
    this.getTicketData();
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
.ticket-Box {
  background: rgba(245, 245, 245, 1);
  height: 100vh;
}
.ticket-contentBox {
  background: #fff;
  margin-top: 8px;
  padding-top: 10px;
}
</style>


