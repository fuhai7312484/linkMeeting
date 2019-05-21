<template>
  <div class="box">
    <div class="ticket-Box">
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">选择票种</h3>
          </div>
        </sticky>
      </div>
<!-- {{ticketValue}} -->
      <div class="ticket-contentBox padlr">
        <!-- {{ticketValue}} -->
        <checker
          v-model="ticketValue"
          default-item-class="ticket-item"
          selected-item-class="ticket-item-selected"
        >
          <checker-item
            v-for="(Titem,index) in ticketData"
            :key="index"
            :value="Titem"
            @on-item-click="ticketChange"
          >
            <div :class="!Discontinued(Titem.timeEnd)&&Titem.isOrder!=1?'ticketTitleBox':'ticket-disabled-TitleBox'">
              <div class="ticketTitle fl">{{ Titem.name }} <span class="ticketTitleAnnex" v-if="Titem.authority==0">附件</span> <span class="ticketTitleIsOrder" v-if="Titem.isOrder==1">已购票</span></div>
              <div class="ticketPrice fr">
                {{ Titem.price == 0 ? "免费" : "¥" + Titem.price + "/人" }}
              </div>
            </div>
            <div class="ticketInfo">{{ Titem.remarks }}</div>
            <div class="ticketInfoTimeType" v-if="Titem.timeType==2">
              该票种将于12月20日09:30正式开售
            </div>
          </checker-item>
        </checker>
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
  getDataInfo,setStorage
} from "../../assets/lib/myStorage.js";
  import { Flexbox, FlexboxItem, Sticky, Checker, CheckerItem } from "vux";
  export default {
    name: "Ticket",
    components: {
      Flexbox,
      FlexboxItem,
      Sticky,
      Checker,
      CheckerItem
    },
    data() {
      return {
        disabled:
          typeof navigator !== "undefined" &&
          /iphone/i.test(navigator.userAgent) &&
          /ucbrowser/i.test(navigator.userAgent),
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
        ticketValue:  {
            id: "0001",
            title: "免费票",
            price: 0,
            ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇"
          },
      };
    },
    methods: {
      //当前票种是否为停售
      Discontinued(time){
        var timestamp = Date.parse(new Date())
        var endtime = Date.parse(new Date(time))
        // console.log('当前时间戳：'+timestamp,'结束时间戳：'+endtime)
        if(time){
            if(timestamp>endtime){
            return true
            }else{
              return false
            }
        }
      },
      ticketChange(val,itemDisabled){
 
       if( !this.Discontinued(val.timeEnd) && val.isOrder!=1){
          this.next(val)
       }else{
        //  console.log('不能购买！')
       }
     
     
      },
      //获取当前会议的票价信息
      gotoTheFare(){
        let _that =this
        let TicketObj ={
            params: {
          mobile:'',
          mdId: this.$route.query.meeting_id,
        }
        }
          checkToken().then(Pdata => {
        getDataInfo("get", "ordermeeting/ordermeeting/ticket", TicketObj).then(res => {
    //  console.log(1111111,res)
          if (res.data.code == 200) {
            this.ticketData = res.data.data
            // this.userData = res.data.data;
            // setTimeout(function() {
            //   _that.show2 = false;
            // }, 500);
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/login");
            }, 500);
          }
        });
      });
        // console.log(this.$route.query.meeting_id)

      },
      //选择票价后的下一步
      next(val) {
        // console.log(val)


          this.$router.push({
          path: "/signinfo",
          query: {
            meeting_id: this.$route.query.meeting_id,
            tickId:val.id,
          }
        });


       
      
        // alert("会议ID:"+this.$route.query.meeting_id + ',当前的价格是：'+this.ticketValue.price)
      }
    },
    mounted() {
      this.gotoTheFare()
 
  
    },
  };
</script>
<style lang="less">
  @import "../../assets/style/tools.less";
  @import "../../assets/style/global.less";
  @import "~vux/src/styles/reset.less";
 .ticket-Box{
  //  background: rgba(245,245,245,1);
  //  height: 100vh;
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
</style>
