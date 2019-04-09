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
      <div @click="shard">分享给微信好友</div>
      <div @click="shard">分享到朋友圈</div>

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
  getDataInfo
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
    shard() {
      //处理验证失败的信息
      //   wx.error(function (res) {
      //     console.log(111111111,res)
      //     // logUtil.printLog('验证失败返回的信息:',res);
      //   });
      // wx.onMenuShareTimeline({
      //   title: '这里是分享', // 分享标题
      //   link: 'http://lianhuiyi.woneast.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: './', // 分享图标
      //  success: function (res) {
      //         // 用户确认分享后执行的回调函数
      //         console.log(res)
      //         // logUtil.printLog("分享到朋友圈成功返回的信息为:",res);
      //         // _this.showMsg("分享成功!")
      //       },
      //       cancel: function (res) {
      //         // 用户取消分享后执行的回调函数
      //         console.log(res)
      //         // logUtil.printLog("取消分享到朋友圈返回的信息为:",res);
      //       }
      // })

      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: "您的好友邀请您注册秒单之家", // 分享标题
          desc: "快来注册秒单之家，一大笔订单等你来拿", // 分享描述
          link: "http://lianhuiyi.woneast.com/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:
            window.document.location.protocol +
            "//" +
            window.document.location.host +
            "/zhanghuifeng/static/img/logo.png", // 分享图标
          type: "", // 分享类型,music、video或link，不填默认为link            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户确认分享后执行的回调函数
            alert("分享成功！");
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            // alert('cancel')
            alert("分享失败！");
            //     _this.wxShare()  //这是用户撤销后重新执行第一步验证签名的方法名 根据自己的命名写
          }
        });

        wx.onMenuShareTimeline({
          title: "您的好友邀请您注册秒单之家", // 分享标题
          link: "http://lianhuiyi.woneast.com/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl:
            window.document.location.protocol +
            "//" +
            window.document.location.host +
            "/zhanghuifeng/static/img/logo.png", // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
            alert("成功");
            //     _this.$router.push({path:'/me',query:{}})
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            console.log("失败");
            //       _this.wxShare()
          }
        });
      });

      wx.error(function(res) {
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });

      // wx.onMenuShareAppMessage({
      //   title: '分享标题', // 分享标题
      //   desc: '分享描述', // 分享描述
      //   link:'#/...', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: './', // 分享图标
      //   type: 'video', // 分享类型,music、video或link，不填默认为link
      //   dataUrl: '/s', // 如果type是music或video，则要提供数据链接，默认为空
      //   success: function () {
      //     alert('分享给朋友成功')
      //     // 用户确认分享后执行的回调函数
      //   },
      //   cancel: function () {
      //     // 用户取消分享后执行的回调函数
      //   }
      // })
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

    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: "wx837aea6e0dd3f50e", // 必填，公众号的唯一标识
      timestamp: "1554719019", // 必填，生成签名的时间戳
      nonceStr: "123456", // 必填，生成签名的随机串
      signature: "1f785f1acefc39d59de802fc08dbbbce959b7511", // 必填，签名，见附录1
      jsApiList: [
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "onMenuShareQQ",
        "onMenuShareQZone"
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
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
