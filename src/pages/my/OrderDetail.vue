<template>
  <div class="box" style="background: #F5F5F6;height:100%">
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div>
      <div class="map-headerBox borBottm">
        <div class="map-go-back" @click="$router.go(-1)"></div>
        <h3 class="map-headerTitle">订单详情</h3>
      </div>
    </div>
    <div v-if="!show2" class="OrderDetailbox">
      <group class="OrderDetailNum">
        <cell
          class="OrderDetailBG"
          :title="'报名人信息'"
          :value="'查看'+detailData.orderCouponShowList.length+'人'"
          is-link
          @click.native="showInput=true"
        ></cell>
      </group>
      <div class="OrderDetailBG magrTB8">
        <group class="OrderDetailMetinfo">
          <cell class="Ticket-meetingInfoBox">
            <div slot="icon" class="Ticket-meetingIconBox" height="70" width="100">
              <img :src="detailData.meetingShowVo.cover" width="100" height="70">
            </div>

            <h4 slot="title">{{detailData.meetingShowVo.meetingName}}</h4>
            <div slot="inline-desc" class="Ticket-inline-desc">
              <p>时间：{{getTimeLimit(detailData.meetingShowVo.beginTime,detailData.meetingShowVo.endTime)}}</p>
              <p>地点：{{detailData.meetingShowVo.address}}</p>
            </div>
          </cell>
        </group>
        <div
          class="OrderTicketListBox"
          v-for="(item,index) in detailData.orderCouponShowList"
          :key="index"
        >
          <div class="OrderTicketList-index fl">{{index+1}}</div>
          <div class="OrderTicketList-content fl">
            <div class="TicketList-top">
              <div
                class="TicketList-top-l fl"
              >{{item.ticketName}} &nbsp;&nbsp;¥ {{item.ticketPrice==0?'0.00':item.ticketPrice}}</div>
              <div
                class="fr"
                :style="{color:item.joinType==0?'#54B105':'#B4B4B4'}"
              >{{item.joinType==0?'待参会':item.joinType==1?'已验票':'已退款'}}</div>
            </div>
            <div class="TicketList-mob">{{item.userName}} &nbsp;&nbsp;{{item.userMobile}}</div>
            <div
              class="TicketList-btn"
              v-if="item.ticketType!=0&&item.joinType==0"
              @click="RequestRefund(item.pid)"
            >申请退款</div>
          </div>
          <div class="OrderTicketList-Etickt fr" @click="gotoEticket"></div>
        </div>
      </div>

      <div class="OrderDetailBG magrTB8">
        <div class="OrderDetailPrice">
          <div class="OrderDetailprice-l fl">票总价</div>
          <div class="OrderDetailprice-r fr">¥ {{detailData.sumMoney}}</div>
        </div>
        <div class="OrderDetailPrice">
          <div class="OrderDetailprice-l fl">订单实际支付金额</div>
          <div class="OrderDetailprice-r fr">
            <span>¥ {{detailData.payMoney}}</span>
          </div>
        </div>
      </div>

      <div class="OrderDetailBG magrTB8">
        <div class="OrderDetailId">
          <p>订单编号：{{ detailData.orderCouponShowList[0].orderId}}</p>
          <p>创建时间：{{ detailData.orderCouponShowList[0].createTime}}</p>
          <p
            v-if="detailData.orderCouponShowList[0].payType"
          >支付方式：{{detailData.orderCouponShowList[0].payType}}</p>
        </div>
      </div>

      <div class="OrderDetailBG magrTB8">
        <group class="ETicket-orderUser">
          <cell
            :title="detailData.meetingShowVo.userName"
            :value="detailData.isMyFollow==1?'已关注':'未关注'"
            is-link
            :min-moving-distance="80"
            :link="{path:'/tadetail/'+detailData.meetingShowVo.createPerson}"
          >
            <img
              slot="icon"
              width="25"
              height="25"
              style="display:block;margin-right:.8rem;border-radius:50%;"
              :src="detailData.meetingShowVo.userMainPic==null?require('../../assets/images/myFans-Mask.png'):detailData.meetingShowVo.userMainPic"
            >
          </cell>
        </group>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="showNav">
        <div class="RefundRadioBox">
          <h4>退款原因</h4>
          <checklist
            :label-position="'left'"
            required
            :options="commonList"
            :max="1"
            v-model="checklist001"
            @on-change="change"
          ></checklist>
          <div class="RefundRadioBtn RBG" v-if="checklist001.length!=0" @click="RadioBtnChange">提交</div>
          <div class="RefundRadioBtn" v-if="checklist001.length==0">提交</div>
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="showInput" height="100%">
        <div class="my-inputsBox">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="showInput=false"></div>
            <h3 class="map-headerTitle">报名人信息</h3>
          </div>

          <div
            class="ApplicantBox"
            v-for="(appli,index) in detailData.orderCouponShowList"
            :key="index"
          >
            <h4>报名人{{index+1}}{{appli.ticketName}}</h4>
            <div>
              <dl>
                <dt>姓名：</dt>
                <dd>{{appli.userName}}</dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt>手机：</dt>
                <dd>{{appli.userMobile}}</dd>
              </dl>
            </div>

            <div v-if="appli.email">
              <dl>
                <dt>邮箱：</dt>
                <dd>{{appli.email}}</dd>
              </dl>
            </div>

            <div v-if="appli.company">
              <dl>
                <dt>公司：</dt>
                <dd>{{appli.company}}</dd>
              </dl>
            </div>

            <div v-if="appli.position">
              <dl>
                <dt>职位：</dt>
                <dd>{{appli.position}}</dd>
              </dl>
            </div>
          </div>

          
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,
  timeLimit
} from "../../assets/lib/myStorage.js";
import {
  Group,
  Cell,
  XHeader,
  Toast,
  Loading,
  TransferDomDirective as TransferDom,
  Popup,
  Checklist
} from "vux";

export default {
  name: "OrderDetail",
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    XHeader,
    Toast,
    Loading,
    Popup,
    Checklist
  },
  data() {
    return {
      detailData: {},
      show2: true,
      showNav: false,
      commonList: [
        "我的行程有变,参加不了了",
        "我的报名信息填写有误",
        "主办方变更了会议信息",
        "实际情况与会议信息不符",
        "其他"
      ],
      checklist001: [],
      RefundId: "",
      showInput: false
    };
  },

  methods: {
    //报名人

    Applicant() {
      // console.log(11111);
    },
    change() {},
    //提交退款原因
    RadioBtnChange() {
      let RefundObj = {
        id: this.RefundId,
        refund: this.checklist001[0],
        endTime: this.detailData.meetingShowVo.endTime
      };
      checkToken().then(Pdata => {
        getDataInfo("patch", "ordermeeting/ordermeeting", RefundObj).then(
          res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.showNav = false;
              this.RefundId = "";
              this.checklist001 = [];
            } else if (res.data.code == 100101) {
              _that.$router.push("/login");
            }
          }
        );
      });
    },
    //申请退款
    RequestRefund(id) {
      this.showNav = true;
      this.RefundId = id;
      // console.log(this.detailData.meetingShowVo.beginTime,id)
    },
    gotoEticket() {
      this.$router.push("/Eticket/" + this.$route.params.id);
    },
    //处理时间范围
    getTimeLimit(beginTime, endTime) {
      if (beginTime || endTime) {
        return timeLimit(beginTime, endTime);
      }
    },
    //获取订单详情数据
    getDetailData() {
      this.show2 = true;
      let _that = this;
      let DetailObj = {
        params: {
          orderId: this.$route.params.id,
          userId: getStorage("userToken").userId
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "meetingdetails/meTicket", DetailObj).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.detailData = res.data.data;
            this.show2 = false;
          } else if (res.data.code == 100101) {
            _that.$router.push("/login");
          }
        });
      });
    }
  },

  mounted() {
    this.getDetailData();
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

// .swiper-container {
//   /* Specify Swiper's Size: */
//   width: 100%;
//   height: 5rem;
// }
// .swiper-slide {
//   /* Specify Slides's Size: */
//   width: 100%;
//   height: 100%;
// }
// .vux-demo {
//   text-align: center;
// }
// .logo {
//   width: 100px;
//   height: 100px;
// }
// .info1 {
//   background: #000;
//   width: 100%;
//   height: 50px;
// }

// .Ticket-listBox {
//   .weui-cells::before {
//     border: none;
//   }
//   .weui-cell::before {
//     border: none;
//   }
// }
</style>
