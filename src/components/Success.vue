<template>
  <div class="box">
    <div class="ticket-Box">
      <!-- <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="gotoMeeting"></div>
            <h3 class="map-headerTitle">提交成功</h3>
       
            
          </div>
        </sticky>
      </div>-->
      <!-- {{ticketValue}} -->

      <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>

      <div class="meetSuccessTop">
        <h3>
          <img :src="require('../assets/images/icon-success.png')">提交成功
        </h3>
        <p>谢谢您的回复，更多精彩会议尽在链会议APP</p>
      </div>
      <!-- <div @click="weixinShareTimeline('这里是标题','这块是简介','http://www.baidu.com','logo.png')">分享给微信好友</div>
      <div>分享到朋友圈</div> -->
      <div class="der"></div>
    </div>

    <!-- <div class="footer">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="3/5" :order="1">
          <div
            :class="ticketValue==''?'footer-nav-price colB4':'footer-nav-price' "
          >
            {{
              ticketValue == "" ? "请选择票种" : "合计:¥" + ticketValue.price
            }}
          </div>
        </flexbox-item>

        <flexbox-item :span="2/5" :order="2">
       
          <div
            v-if="ticketValue!=''"
            class="footer-nav-destineBtn"
            @click="next"
          >
            下一步
          </div>
          <div v-if="ticketValue==''" class="footer-nav-destineBtn bgDC">
            下一步
          </div>
        </flexbox-item>
      </flexbox>
    </div>-->
  </div>
</template>
<script>
import wx from "weixin-js-sdk";
import {
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo,
  wxRegister,
  ShareTimeline
} from "../assets/lib/myStorage.js";
import {
  Sticky,
  Card,
  TransferDomDirective as TransferDom,
  Loading
} from "vux";
export default {
  name: "Success",
  directives: {
    TransferDom
  },
  components: {
    Sticky,
    Card,
    Loading
  },
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),

      orderInfo: {},
      show2: true,
      ticketData: [
        // {
        //   id: "0001",
        //   title: "免费票",
        //   price: 0,
        //   ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇"
        // },
        // {
        //   id: "0002",
        //   title: "普通门票",
        //   price: 300,
        //   ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇"
        // },
        // {
        //   id: "0003",
        //   title: "超值非常商务贵宾套商务贵宾套票",
        //   price: 10000,
        //   ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇；不含交 通、住宿"
        // },
        // {
        //   id: "0004",
        //   title:
        //     "超值非常商务贵宾套商务贵宾套票超值非常商务贵宾套商务贵宾套票",
        //   price: 20000,
        //   ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇；不含交 通、住宿"
        // },
        // {
        //   id: "0005",
        //   title:
        //     "超值非常商务贵宾套商务贵宾套票超值非常商务贵宾套商务贵宾套票",
        //   price: 30000,
        //   ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇；不含交 通、住宿"
        // }
      ]
    };
  },
  methods: {
    weixinShareTimeline(title, desc, link, imgUrl) {
      WeixinJSBridge.invoke("shareTimeline", {
        img_url: imgUrl,
        //"img_width":"640",
        //"img_height":"640",
        link: link,
        desc: desc,
        title: title
      });
    },
    wxRegCallback() {
      this.ShareTApp();
    },
    ShareTApp() {
      let option = {
        title: "限时团购周 挑战最低价", // 分享标题, 请自行替换
        link: window.location.href.split("#")[0], // 分享链接，根据自身项目决定是否需要split
        imgUrl: "logo.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      ShareTimeline(option);
    },
    //我的票券
    gotoMyTicket() {
      this.$router.push("/MyTicket");
    },
    //返回会议详情
    gotoMeeting() {
      this.$router.push({
        path: "/meetDetail/" + this.$route.query.meeting_id,
        query: { meetingId: this.$route.query.meeting_id }
      });
    },
    //获取当前会议的票价信息
    getOrderdata() {
      // console.log(this.$route.query.meeting_id,this.$route.query.orderId)
      this.show2 = false;

      // wxRegister(this.wxRegCallback);
      //获取订单信息
      // let orderObj = {
      //   params: {
      //     id: this.$route.query.orderId,
      //   }
      // };
      // getDataInfo("get", "ordermeeting/ordermeeting", orderObj).then(
      //   res => {
      //     // console.log(res)
      //     if (res.data.code == 200) {
      //       console.log(res.data.data)
      //       this.orderInfo = res.data.data
      //       this.show2 = false;
      //     }
      //   }
      // );
    },
    //选择票价后的下一步
    next(val) {
      this.$router.push({
        path: "/signinfo",
        query: {
          meeting_id: this.$route.query.meeting_id,
          tickId: val.id
        }
      });
    }
  },
  mounted() {
    this.getOrderdata();
  }
};
</script>
<style lang="less">
@import "../assets/style/tools.less";
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.ticket-Box {
  background: rgba(245, 245, 245, 1);
  height: 100vh;
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
// .ticket-item-selected {
//   background: #ffffff url(../../assets/images/Filters-item-selected.png)
//     no-repeat right bottom;
//   background-size: 35px;
//   border-color: #fe666b;
// }

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
}
.card-demo-flex span {
  color: #f74c31;
}
.vux-1px-r {
  border-right: 1px solid #e6e6e6;
}
.card-demo-left {
  img {
    // vertical-align: middle;

    vertical-align: middle;
    width: 15px;
    margin-right: 0.2rem;
    margin-top: -0.3rem;
  }
}
.meetSuccessGoHomeBox {
  .weui-panel::after {
    border: none;
  }
}
</style>
