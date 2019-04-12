<template>
  <div class="box">
    <div class="ticket-Box">
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="gotoMeeting"></div>
            <h3 class="map-headerTitle">报名成功</h3>
            <!-- <router-link tag="div" to="/" class="my-saveBtn fr" >
我的票券
            </router-link> -->
             <div class="my-saveBtn fr" @click="gotoMyTicket">
               我的票券
               </div>
          </div>
        </sticky>
      </div>
<!-- {{ticketValue}} -->

 <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>


<div class="meetSuccessTop">
  <h3><img :src="require('../../assets/images/icon-success.png')"/>报名成功</h3>
  <p>您已成功报名该会议,点击 <span @click="gotoMyTicket">我的票券</span> 即可查看</p>

</div>
      <div class="meetSuccessContentBox padlr" v-if="orderInfo.meetingShow">
        
        
     <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">会议主题：</div>
<div class="meetSuccessInfoTwo fl">{{orderInfo.meetingShow.theme}}</div>
     </div>

     <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">会议时间：</div>
<div class="meetSuccessInfoTwo fl">{{orderInfo.meetingShow.beginTime}}</div>
     </div>

     <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">会议地址：</div>
<div class="meetSuccessInfoTwo fl">{{orderInfo.meetingShow.address}}</div>
     </div>

      <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">会议票种：</div>
<div class="meetSuccessInfoTwo meTicket fl">{{orderInfo.meTicket.name}} &nbsp;&nbsp;{{orderInfo.orderMeeting.payType}}</div>
     </div>

     <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">电子票号：</div>
<div class="meetSuccessInfoTwo fl">{{orderInfo.orderMeeting.id}}</div>
     </div>

      <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">当前状态：</div>
<div class="meetSuccessInfoTwo fl">已报名</div>
     </div>

     <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">报名用户：</div>
<div class="meetSuccessInfoTwo fl">{{orderInfo.orderMeeting.orderMeetingPersonList[0].name}}</div>
     </div>

     <div class="meetSuccessContent">
<div class="meetSuccessInfoOne fl">联系方式：</div>
<div class="meetSuccessInfoTwo fl">{{orderInfo.orderMeeting.orderMeetingPersonList[0].mobile}}</div>
     </div>



      </div>
      <div class="meetSuccessGoHomeBox">

         <card>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <router-link tag="div" to="/meeting" class="card-demo-left vux-1px-r" >
          <img :src="require('../../assets/images/icon-meetinghome.png')"/> 会议首页
        </router-link>
        <!-- <div class="vux-1px-r">
       
         会议首页
        </div> -->
        
       <!--  <div class="card-demo-left">
        <img :src="require('../../assets/images/icon-share.png')"/> 分享会议
        </div> -->
     
      </div>
    </card>

<!-- 

        <span>
会议首页
        </span>
<span>分享会议</span> -->
      </div>
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
    </div> -->
  </div>
</template>
<script>
import {
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo,wxRegister,
  ShareTimeline,ShareAppMessage,ShareAppShareQQ,ShareQZone,ShareWeibo
} from "../../assets/lib/myStorage.js";
  import { Sticky,Card, TransferDomDirective as TransferDom,  Loading, } from "vux";
  export default {
    name: "TicketSuccess",
     directives: {
    TransferDom
  },
    components: {
      Sticky,Card,Loading,
    },
    data() {
      return {
        disabled:
          typeof navigator !== "undefined" &&
          /iphone/i.test(navigator.userAgent) &&
          /ucbrowser/i.test(navigator.userAgent),
        
          orderInfo:{},
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
        ],
      
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
 let LinkUrl = window.location.href.split('#')[0]+'#/meetDetail/'+this.$route.query.meeting_id+'?meetingId='+this.$route.query.meeting_id
 let option = {
        title: this.orderInfo.meetingShow.theme, // 分享标题, 请自行替换
        link: LinkUrl, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.orderInfo.meetingShow.meetingFileList[0].fileUrl, // 分享图标, 请自行替换，需要绝对路径
        desc: this.orderInfo.meetingShow.theme,
        success: () => {
          alert("分享成功！");
        },
        error: () => {
          alert("已取消分享");
        }
      };


      ShareTimeline(option);
     ShareAppMessage(option);
      ShareAppShareQQ(option);
     ShareQZone(option);
    },
  
      //我的票券
      gotoMyTicket(){
        this.$router.push('/MyTicket')
      },
      //返回会议详情
      gotoMeeting(){
        this.$router.push({path:'/meetDetail/'+this.$route.query.meeting_id,query:{meetingId:this.$route.query.meeting_id}})
      },
      //获取当前会议的票价信息
      getOrderdata(){
        // console.log(this.$route.query.meeting_id,this.$route.query.orderId)
         
  //获取订单信息
      let orderObj = {
        params: {
          id: this.$route.query.orderId,
        }
      };
      // console.log(orderObj)
      getDataInfo("get", "ordermeeting/ordermeeting", orderObj).then(
        res => {
          console.log(res)
          if (res.data.code == 200) {
            // console.log(res.data.data)
            this.orderInfo = res.data.data
            this.show2 = false;
            let shareUrl = window.location.href
             wxRegister(shareUrl,this.wxRegCallback);
          }
        }
      );
      },
      //选择票价后的下一步
      next(val) {
          this.$router.push({
          path: "/signinfo",
          query: {
            meeting_id: this.$route.query.meeting_id,
            tickId:val.id,
          }
        });

      }
    },
    mounted() {
      this.getOrderdata()
    },
  };
</script>
<style lang="less">
  @import "../../assets/style/tools.less";
  @import "../../assets/style/global.less";
  @import "~vux/src/styles/reset.less";
 .ticket-Box{
   background: rgba(245,245,245,1);
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
  font-size: .8rem;
  font-weight: bold;
}
.card-demo-flex span {
  color: #f74c31;
}
.vux-1px-r{
  border-right:1px solid #E6E6E6;
}
.card-demo-left{
  img{
    // vertical-align: middle;
    
    vertical-align: middle;
    width: 15px;
    margin-right: .2rem;
    margin-top:-.3rem;
  }
}
.meetSuccessGoHomeBox{

.weui-panel::after{
  border: none;
}
}


</style>
