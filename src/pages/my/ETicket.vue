<template>
  <div class="box" style="background: #F5F5F6;height:100%">
    <!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div>-->
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div>
      <div class="map-headerBox borBottm">
        <div class="map-go-back" @click="$router.go(-1)"></div>
        <h3
          class="map-headerTitle"
        >电子票({{index+1}}/{{!show2?ETicketData.orderMeetingList.length:0}})</h3>
      </div>
    </div>
    <div class="ETicket-box padlr" v-if="!show2">
      <div class="ETBox">
        <swiper
          ref="swiperHeight"
          v-model="index"
          :show-dots="false"
          :autoheight="true"
          height="550px"
          show-dots
          :min-moving-distance="80"
          dots-position="center"
        >
          <swiper-item v-for="(lis,i) in ETicketData.orderMeetingList" :key="i">
            <div class="ETicket-title-info-box">
              <h4>{{ETicketData.meetingShowVo.meetingName}}</h4>
              <p>{{ETicketData.meetingShowVo.beginTime}}-{{ETicketData.meetingShowVo.endTime}}</p>
              <p>
                <span>{{ETicketData.meetingShowVo.address}}</span>
                <i @click="gotoMap">查看地图</i>
              </p>
            </div>

            <div class="ETicket-orderMeetingInfoBox">
              <div class="ETicket-joinType" v-if="lis.joinType==1" >
                  <img :src="require('../../assets/images/Checked-ticket.png')">
              </div>
               <div class="ETicket-joinType" v-if="lis.joinType==2" >
                  <img :src="require('../../assets/images/Checked-ticket1.png')">
              </div>
              <div class="ETicket-QRcode">
                <p :style="{color:lis.joinType==2?'#B4B4B4':''}">票号:{{lis.tnum}}</p>
                <P>
                  <img :src="lis.qrCode">
                </P>
              </div>
            </div>

            <div class="ETicket-orderUserInfo">
              <div class="orderUserDl">
                <div>
                  <span>姓名：</span>
                  {{lis.userName}}
                </div>
                <div>
                  <span>票种：</span>
                  {{lis.ticketName}}
                </div>
                <div>
                  <span>电话：</span>
                  {{lis.userMobile}}
                </div>
                <div>
                  <span>票价：</span>
                  ¥{{lis.ticketPrice}}
                </div>
                <div>
                  <span>状态：</span>
                  <span
                    :style="{ color:lis.joinType==0?'#F33B1D':lis.joinType==1?'#54B105':'#969696'}"
                  >{{lis.joinType==0?'待参会':lis.joinType==1?'已验票':lis.joinType==2?'已退款':''}}</span>
                </div>
                <div>
                  <span>实付金额：</span>
                  ¥{{lis.ticketPrice}}
                </div>
                <p>有效期：{{lis.beginTime}} - {{lis.endTime}}</p>
                <p class="orderUserDlQY">票券权益</p>
                <p>{{lis.des}}</p>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>

      <div class="ETBox">
        <group class="ETicket-orderUser">
          <cell
            :title="ETicketData.meetingShowVo.userName"
            :value="IsFollow?'已关注':'未关注'"
            is-link
            :min-moving-distance="80"
            :link="{path:'/tadetail/'+ETicketData.meetingShowVo.createPerson}"
          >
            <img
              slot="icon"
              width="25"
              height="25"
              style="display:block;margin-right:.8rem;border-radius:50%;"
              :src="ETicketData.meetingShowVo.userMainPic==null?require('../../assets/images/myFans-Mask.png'):ETicketData.meetingShowVo.userMainPic"
            >
          </cell>
        </group>
      </div>
      <div class="ETicket-Tip">
        <h5>温馨提示</h5>
        <p>1、请不要把电子票随意分享给他人，以免被盗用；</p>
        <p>2、入场时，请提前打开电子票，调亮手机屏幕，扫描二维码检 票入场。</p>
      </div>
    </div>
    <!-- <div v-transfer-dom v-if="!show2">
      <div class="ETicketFooter" v-if="ETicketData.orderMeetingList[index].joinType==1">评价</div>
    </div> -->
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,
  timeLimit,isweixin,isLogin,WeChatLogin,setStorage
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
  Card
} from "vux";

export default {
  name: "ETicket",
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
    Card
  },
  data() {
    return {
      ETicketData: {},
      show2: true,
      index: 0,
      IsFollow: false
    };
  },

  methods: {
    gotoMap() {
      this.$router.push({
        path: "/navmap",
        query: {
          address: this.ETicketData.meetingShowVo.address,
          lng: this.ETicketData.meetingShowVo.longitude,
          lat: this.ETicketData.meetingShowVo.latitude
        }
      });
      // console.log(11111111)
    },
    //获取电子票数据
    getETicketData(status) {
      this.show2 = true;
      let _that = this;
      let ETicketObj = {
        params: {
          orderId: this.$route.params.id,
          userId: getStorage("userToken").userId
        }
      };

      checkToken().then(Pdata => {
        getDataInfo("get", "meetingdetails/meETicket", ETicketObj).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.ETicketData = res.data.data;

            let followObj = {
              params: {
                userId: getStorage("userToken").userId,
                taget: res.data.data.meetingShowVo.createPerson
              }
            };
            checkToken().then(oPdata => {
              getDataInfo("get", "refollow/follow/isFollow", followObj).then(
                fres => {
                  if (fres.data.code == 200) {
                    this.IsFollow = fres.data.data == 1 ? true : false;
                    this.show2 = false;
                  } else if (res.data.code == 100101) {
                    _that.$router.push("/login");
                  }
                }
              );
            });
          } else if (res.data.code == 100101) {
            _that.$router.push("/login");
          }
        });
      });
    }
  },

  mounted() {
  

     if(isLogin()){
 this.getETicketData();
     }else{
        let login_url = 'Eticket/'+this.$route.params.id
      setStorage('login_url',login_url)

       if(isweixin()){
           let wx_Url = 'Eticket/'+this.$route.params.id
      setStorage('wx_url',wx_Url)
        WeChatLogin()
       }else{
this.$router.push('/login')
       }

     }

// Eticket/19051714360001

// if(isweixin()){
//   if(isLogin()){
 
//   }else{

//   }
// }else{
//    this.getETicketData();
// }
   
    //     let wx_Url =
    //   "meetDetail/" +
    //   this.$route.query.meetingId +
    //   "?meetingId=" +
    //   this.$route.query.meetingId;
    // setStorage("wx_url", wx_Url);
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
