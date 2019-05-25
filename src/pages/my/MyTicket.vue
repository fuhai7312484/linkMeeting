<template>
  <div class="box">
    <!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div>-->
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div style="height:84px;">
      <div class="map-headerBox borBottm">
        <div class="map-go-back" @click="$router.go(-1)"></div>
        <h3 class="map-headerTitle">会议票券</h3>
      </div>
      <sticky :check-sticky-support="false" :offset="0">
        <tab active-color="#fe666b" default-color="#a0a0a0" custom-bar-width="43%" v-model="index">
          <tab-item
            @on-item-click="handler"
            :selected="tabTitle === item"
            v-for="(item,index) in list2"
            :key="index"
          >{{ item }}</tab-item>
        </tab>
      </sticky>
    </div>
    <swiper
      ref="swiperHeight"
      v-model="index"
      :show-dots="false"
      :style="{height:swiperH}"
      :height="swiperH"
      :autoheight="true"
      :min-moving-distance="80"
      :loop="true"
    >
      <swiper-item v-for="(lis,i) in list2" :key="i">
        <div :ref="'pubUiHF'+i">
          <div class="noData-default" v-if="TaPosted.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无数据</p>
          </div>

          <div class="Ticket-listBox" v-for="(taPos,index) in TaPosted" :key="index" v-if="!show2">
            <group>
              <cell class="Ticket-companyBox">
                <img
                  slot="icon"
                  :src="taPos.userMainPic?taPos.userMainPic:require('../../assets/images/myFans-Mask.png')"
                  width="25"
                  height="25"
                >
                <div slot="title" class="Ticket-company">{{taPos.userName}}</div>
                <span
                  slot
                  class="Ticket-company-status"
                  :class="taPos.status==0?'T-s1':taPos.status==2?'T-s2':taPos.status==1?'T-s2':taPos.status==8||taPos.status==6||taPos.status==4||taPos.status==20?'T-s4':taPos.status==4?'T-s1':taPos.status==5?'T-s3':''"
                >{{taPos.status==0?'待付款':taPos.status==2?'待参会':taPos.status==4?'已完成':taPos.status==5?'退款中':taPos.status==6?'已退款':taPos.status==8?'交易关闭':taPos.status==20?'退款失败':''}}</span>
              </cell>
              <cell class="Ticket-meetingInfoBox" :link="'/orderdetail/'+taPos.orderId">
                <div slot="icon" class="Ticket-meetingIconBox">
                  <img :src="taPos.cover" width="100">
                </div>

                <h4 slot="title">{{taPos.meetingName}}</h4>
                <div slot="inline-desc" class="Ticket-inline-desc">
                  <p>时间：{{getTimeLimit(taPos.beginTime,taPos.endTime)}}</p>
                  <p>地点：{{taPos.address}}</p>
                </div>
              </cell>
              <div class="Ticket-piaoInfoBox padlr">
                <h4 class="fl">{{taPos.ticketName}}</h4>
                <div class="Ticket-piaoInfoSpan fr">
                  <span class="piaoInfoNun">共{{taPos.ticketNum}}张</span>
                  <span class="piaoInfoPrice">合计：{{taPos.price==0?'¥ 0.00':'¥ '+taPos.price}}</span>
                </div>
              </div>
            </group>
            <div class="Ticket-btns padlr">
              <!-- <span>取消订单</span> -->
              <span
                class="Ticket-PayBtn"
                v-if="taPos.status==2"
                @click="getETicket(taPos.orderId)"
              >查看电子票</span>
              <span v-if="taPos.status==0" @click="cancelOrder(taPos.orderId)">取消订单</span>
              <span v-if="taPos.status==4" @click="getETicket(taPos.orderId)">查看电子票</span>
              <span class="Ticket-PayBtn" v-if="taPos.status==4">评价</span>
              <span class="Ticket-PayBtn" v-if="taPos.status==0">马上支付</span>
            </div>
          </div>

          <!-- <div class="der"></div> -->
        </div>
      </swiper-item>
    </swiper>

    <div v-transfer-dom>
      <confirm v-model="show" @on-cancel="onCancel" @on-confirm="onConfirm(CancelId)">
        <p style="text-align:center;">是否取消该订单?</p>
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
  timeLimit,setStorage,isweixin,WeChatLogin
} from "../../assets/lib/myStorage.js";
import {
  Group,
  Cell,
  XButton,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  XHeader,
  Flexbox,
  FlexboxItem,
  Sticky,
  Toast,
  Loading,
  TransferDomDirective as TransferDom,
  Confirm
} from "vux";

export default {
  name: "MyTicket",
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    XButton,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XHeader,
    Flexbox,
    FlexboxItem,
    Sticky,
    Toast,
    Loading,
    Confirm
  },
  data() {
    return {
      img: require("../../assets/images/a.jpeg"),
      tabTitle: "全部",
      index: 0,
      attention: false,
      swiperH: "",
      list2: ["全部", "待付款", "待参会", "退款", "已完成"],
      TaPosted: [],
      position: "default",
      showPositionValue: false,
      textInfo: "",
      InfoType: "success",
      show2: true,
      show: false,
      CancelId: "",
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      }
    };
  },

  methods: {
    //确认是否取消订单
    onCancel() {
      this.CancelId = "";
    },
    onConfirm(msg) {
      // console.log(msg);

      let CanceObj = {
        id: msg
      };
      checkToken().then(Pdata => {
        getDataInfo("patch", "ordermeeting/ordermeeting/cancel", CanceObj).then(
          res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.toastInfo = {
                showMsg: "订单取消成功！",
                showPositionValue: true,
                toastType: "success"
              };
               this.TaPosted = this.TaPosted.filter(e => {
                return e.orderId != msg
              });
            }
          }
        );
      });
    },
    //取消订单
    cancelOrder(id) {
      (this.show = true), (this.CancelId = id);
    },
    //查看电子票
    getETicket(Eid) {
      this.$router.push("/Eticket/" + Eid);
      // console.log(Eid)
    },
    handChange() {
      // console.log("11111111");
    },
    handler(index) {
      // console.log(index,this.index)
    },

    //处理时间范围
    getTimeLimit(beginTime, endTime) {
      if (beginTime || endTime) {
        return timeLimit(beginTime, endTime);
      }
    },
    //获取订单数据
    getTicketData(status) {
      this.show2 = true;
      let _that = this;
      let TicketObj = {
        params: {
          // type:'0',
          
          pageNum:1,
          pageSize:20,
          userId: getStorage("userToken").userId
        }
      };
      if (status != undefined) {
        TicketObj.params.status = status;
      }
      // console.log(TicketObj)
      checkToken().then(Pdata => {
        getDataInfo("get", "myMeeting/myMeeting/myCoupon", TicketObj).then(
          res => {
      console.log(res)
            if (res.data.code == 200) {
              this.TaPosted = res.data.data.myCoupons;
              this.show2 = false;
            } else if (res.data.code == 100101) {
              _that.$router.push("/codelogin");
            }
          }
        );
      });
    },

    showPosition(position) {
      this.position = position;
      this.showPositionValue = true;
    }
  },
  updated() {
    this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
      this.$refs.pubUiHF0[0].offsetHeight + "px";
  },
  mounted() {
     let wx_Url = 'MyTicket'
      setStorage('wx_url',wx_Url)
          if(isweixin()){
          WeChatLogin()
            }

    this.getTicketData();
    
    this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
      this.$refs.pubUiHF0[0].offsetHeight + "px";
  },
  watch: {
    index(n, o) {
      // console.log(n);
      switch (n) {
        case 0:
          this.getTicketData();
          break;
        case 1:
          this.getTicketData(n - 1);
          break;
        case 2:
          this.getTicketData(2);
          break;
        case 3:
          this.getTicketData(5);
          break;
        case 4:
          this.getTicketData(4);
          break;
      }

      this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
        this.$refs["pubUiHF" + n][0].offsetHeight + "px";

      // if (n == 0) {
      //   this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
      //     this.$refs.pubUiHF.offsetHeight + "px";
      // } else if (n == 1) {
      //   this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
      //     this.$refs.parUiHF.offsetHeight + "px";
      // }
    }
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.swiper-container {
  /* Specify Swiper's Size: */
  width: 100%;
  height: 5rem;
}
.swiper-slide {
  /* Specify Slides's Size: */
  width: 100%;
  height: 100%;
}
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
.info1 {
  background: #000;
  width: 100%;
  height: 50px;
}

.Ticket-listBox {
  .weui-cells::before {
    border: none;
  }
  .weui-cell::before {
    border: none;
  }
}
</style>
