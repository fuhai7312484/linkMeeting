<template>
  <div class="box" :style="{overflow:'hidden'}">
    <!-- <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>-->
    <!-- <div class="map-headerBox potFStyle potF borBottm">
      <div class="map-go-back" @click="$router.go(-1)"></div>
      <h3 class="map-headerTitle">参会提醒</h3>

    
    </div> -->

    <div>
      <div style="height:50px;position: relative; z-index: 9997;">
        <sticky :check-sticky-support="false">
          <div class="downloadAppBox padlr">
            <div class="downLogo fl">
              <img :src="require('../../assets/images/lianhuiyiLogo.png')">
            </div>
            <div class="downAppTitle fl">
 <img :src="require('../../assets/images/bzj.png')">

              <!-- <h4>链会议</h4> -->
            </div>
            <div class="downAppBtn fr" @click="godown">下载APP</div>
          </div>
        </sticky>
      </div>
    </div>


    <div class="reminder-contentBox" v-if="meetingData.meetingDetails">
      <div class="padlr">
        <h2>{{meetingData.meetingDetails.theme}}</h2>

        <div class="reminder-dlBox">
          <dl>
            <dt class="fl">会议时间:</dt>
            <dd class="fl">
              <b>明天</b>
              {{InterceptTime(meetingData.meetingDetails.beginTime)}}至{{InterceptTime(meetingData.meetingDetails.endTime)}}
            </dd>
          </dl>

          <dl>
            <dt class="fl">场地地址:</dt>
            <dd class="fl">{{meetingData.meetingDetails.address}}</dd>
          </dl>
          <dl>
            <dt class="fl">主办单位:</dt>
            <dd class="fl">
              <p v-for="(org,index) in comTypeList('主办单位')" :key="index">{{org.companyName}}</p>
            </dd>
          </dl>
          <dl v-if="comTypeList('承办单位').length!=0">
            <dt class="fl">承办单位:</dt>
            <dd class="fl">
              <p v-for="(und,index) in comTypeList('承办单位')" :key="index">{{und.companyName}}</p>
            </dd>
          </dl>

          <dl  v-if="isRestore.isReceipt=='1'">
            <dt class="fl">当前状态:</dt>
            <dd class="fl">
              <p>{{isRestore.status==0?'不参会':isRestore.status==2?'待定':'确认参会'}}</p>
            </dd>
          </dl>
  <load-more  v-if="isRestore.isReceipt=='0'" :tip="'请您选择'" :show-loading="false" background-color="#A0A0A0" class="Tip-loadMore" ></load-more>
         
         
           <div class="meetSuccessBtn"  v-if="isRestore.isReceipt=='1'" @click="gotoMeeting">
      查看会议详情
      </div>
<!-- <router-link tag="div" to="/meeting" class="meetSuccessByHome" > 更多精彩会议</router-link> -->

      <div class="meetSuccessByHome"  v-if="isRestore.isReceipt=='1'" @click="godown">
        更多精彩会议
      </div>


         
          <div class="reminder-checkerBox" v-if="isRestore.isReceipt=='0'">
            <checker
              v-model="ReqVal"
              radio-required
              default-item-class="ReqVal-item"
              selected-item-class="ReqVal-item-selected"
            >
              <checker-item value="0" @on-item-click="checkerChange">
                <span>√</span>不参会
              </checker-item>
              <checker-item value="2" @on-item-click="checkerChange">
                <span>√</span>待定
              </checker-item>
              <checker-item value="1" @on-item-click="checkerChange">
                <span>√</span>确认参会
              </checker-item>
            </checker>
          </div>
          <div class="reminder-GotoInfo">
<div class="reminder-GotoApp fl" @click="godown">更多精彩会议查看APP版</div>
 <div class="reminder-meetingDetails fr" v-if="isRestore.isReceipt=='0'" @click="gotoMeeting">查看会议详情</div>
          </div>
         
        </div>
      </div>

      <!-- <div class="reminder-btn" v-if="!valchange">确定</div>
      <div class="reminder-btn reT-s6" v-if="valchange" @click="submitVal">确定</div>-->
    </div>

    <div v-transfer-dom class="reminder-confirm">
      <confirm
        v-model="valchange"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        @on-show="onShow"
        @on-hide="onHide"
        cancel-text="再想想"
        :confirm-text="ReqValtext"
      >
        <p
          style="text-align:center;font-weight: bold;"
        >{{ReqVal==1?'确认参加此次会议?':ReqVal==2?'暂不确定是否参加此次会议?':ReqVal==0?'确定不参加此次会议?':''}}</p>
      </confirm>
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
  JIMinitchange,wakeApp
} from "../../assets/lib/myStorage.js";
import {
  Loading,
  TransferDomDirective as TransferDom, Sticky,
  Checker,
  CheckerItem,
  Confirm,  Toast,LoadMore
} from "vux";
export default {
  name: "Reminder",
  directives: {
    TransferDom
  },
  components: {
    Checker,
    CheckerItem,
    Loading,
    Confirm,  Toast,LoadMore, Sticky,
  },
  data() {
    return {
      show2: true,
      showVoice: true,
      ReqVal: "",
      ReqValtext: "",
      valchange: false,
      ReminderId: "",
      meetingData: {},
      isRestore:{},
       toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
    };
  },
  methods: {
     godown() {
       wakeApp()
      // this.$router.push("/downApp");
      // wakeApp()
      // window.location.href = "https://www.pgyer.com/NSM9";
    },
    checkerChange(val, itemDisabled) {
      this.valchange = true;
      this.ReqVal = val;
      // console.log(val);
      switch (val) {
        case "1":
          this.ReqValtext = "确定参会";
          break;
        case "2":
          this.ReqValtext = "待定";
          break;
        case "0":
          this.ReqValtext = "不参加";
          break;
      }
      //   console.log(this.ReqVal)
      // console.log(11111111111,val,itemDisabled)
    },
    //获取当前会议信息
    getMeetingData() {
      // console.log(this.$route.params.id, this.$route.query.mobile)
let _that = this
      let Obj = {
        params: {
          id: this.$route.params.id
        }
      };
      getDataInfo("get", "meetingdetails/meetingDetailsById", Obj).then(res => {
       
        if (res.data.code == 200) {
        
          this.meetingData = res.data.data.draftsVo;

            let findObj = {
        params: {
          meetingId: this.$route.params.id,
          mobile:this.$route.query.mobile
        }
      };
      getDataInfo("get", "ordermeeting/findPeopleReceipt", findObj).then(resd => {

        if (resd.data.code == 200) {
        this.isRestore = resd.data.data
          // this.meetingData = res.data.data.draftsVo;
          // console.log(res);
        }
      });


          // console.log(res);
        }else if(res.data.code ==401){

             this.toastInfo = {
            showMsg: "当前会议已删除",
            showPositionValue: true,
            toastType: "cancel"
          };

          setTimeout(function() {
            _that.$router.push("/meeting");
          }, 2000);


        }
      });
    },
    //筛选承办方主办方
    comTypeList(str) {
      let arr = [];

      switch (str) {
        case "主办单位":
          arr = this.meetingData.companyTypeList.filter(e => {
            return e.companyType == "主办单位";
          })[0];
          break;
        case "承办单位":
          arr = this.meetingData.companyTypeList.filter(e => {
            return e.companyType == "承办单位";
          })[0];
          break;
        default:
          arr = this.meetingData.companyTypeList.filter(e => {
            return e.companyType != "承办单位" && e.companyType != "主办单位";
          })[0];
          break;
      }

      return arr != undefined ? arr.companyNameList : [];
    },
    //截取时间
    InterceptTime(time) {
      // console.log(time)
      let arr = time.split(" ");
      return arr[1];
    },
    //获取本地服务器用户信息
    gotoMeeting() {
      this.$router.push({
        path: "/meetDetail/" + this.$route.params.id,
        query: { meetingId: this.$route.params.id }
      });
      // console.log(this.ReminderId);
    },

    onCancel() {
      // console.log('on cancel')
    },
    onConfirm(msg) {
      let ReceiptObj = {
        params: {
          meetingId: this.$route.params.id,
          mobile: this.$route.query.mobile,
          joinStatus: this.ReqVal
        }
      };
     
      getDataInfo("get", "ordermeeting/ticketReceipt", ReceiptObj).then(res => {
      
        if (res.data.code == 200) {
          this.$router.push({ path: "/Success/" + this.$route.params.id });
        }
      });
    },
    onShow() {
      // console.log('on show')
    },
    onHide() {
      // console.log('plugin hide')
    },
    getMyInfochange() {

     
    }
    //   //提交选择
    //   submitVal() {

    //     let ReceiptObj={
    //         params: {
    //       meetingId:this.$route.params.id,
    //       mobile:this.$route.query.mobile,
    //       joinStatus:this.ReqVal,
    //         }

    //     }

    // getDataInfo("get", "ordermeeting/ticketReceipt", ReceiptObj).then(res => {
    //      console.log(res)

    //     });

    //   }
  },
  mounted() {
    this.ReminderId = this.$route.params.id;
    this.getMeetingData();
  },
  watch: {
    // ReqVal(n, o) {
    //   if (this.ReqVal != "") {
    //     this.valchange = true;
    //   }
    //   console.log(this.ReqVal);
    // }
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.reminder-checkerBox{
  overflow: hidden;
  .vux-checker-box{
    overflow: hidden;
     display: flex;
     justify-content:space-between;
      flex-direction: row;
            flex-wrap: wrap;
          
  }
}
.ReqVal-item {
  width: 30%;
  border: 1px solid #FE666B;
  border-radius: 5rem;
  text-align: center;
  padding: 5px 0;
  color: #FE666B;
  // float: left;
  span {
    display: none;
  }
}
.ReqVal-item-selected {
  span {
    display: inline-block;
  }

  color: #fff;
  background: #ff576b;
  border: 1px solid #ff576b;
}
.Tip-loadMore{
  margin: 1.5rem auto .8rem auto !important;
  .Tip-loadMore::after{
   width: 90px !important;
  }
}
.reminder-confirm{
  .weui-dialog__btn{
    text-align: center;
  }
}
</style>


