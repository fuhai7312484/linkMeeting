<template>
  <div class="box">
    <div>
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
          >
            <div class="ticketTitleBox">
              <div class="ticketTitle fl">{{ Titem.title }}</div>
              <div class="ticketPrice fr">
                {{ Titem.price == 0 ? "免费" : "¥" + Titem.price + "/人" }}
              </div>
            </div>
            <div class="ticketInfo">{{ Titem.ticketInfo }}</div>
          </checker-item>
        </checker>
      </div>
      <div class="der"></div>
    </div>
    <div class="footer">
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
          <!-- <router-link tag="div" class="footer-nav-destineBtn" to="/ticket">下一步</router-link> -->
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
    </div>
  </div>
</template>
<script>
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
          {
            id: "0001",
            title: "免费票",
            price: 0,
            ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇"
          },
          {
            id: "0002",
            title: "普通门票",
            price: 300,
            ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇"
          },
          {
            id: "0003",
            title: "超值非常商务贵宾套商务贵宾套票",
            price: 10000,
            ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇；不含交 通、住宿"
          },
          {
            id: "0004",
            title:
              "超值非常商务贵宾套商务贵宾套票超值非常商务贵宾套商务贵宾套票",
            price: 20000,
            ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇；不含交 通、住宿"
          },
          {
            id: "0005",
            title:
              "超值非常商务贵宾套商务贵宾套票超值非常商务贵宾套商务贵宾套票",
            price: 30000,
            ticketInfo: "活动两天通票+活动会刊资料+午餐+茶歇；不含交 通、住宿"
          }
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
      next() {
        // console.log(this.ticketValue)
        console.log(this.ticketValue.price);

        this.$router.push({
          path: "/signinfo",
          query: {
            meeting_id: this.$route.query.meeting_id,
            ticket_id: this.ticketValue.id,
            ticket_name: this.ticketValue.title,
            ticket_price: this.ticketValue.price
          }
        });
        // alert("会议ID:"+this.$route.query.meeting_id + ',当前的价格是：'+this.ticketValue.price)
      }
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
  .ticket-item-selected {
    background: #ffffff url(../../assets/images/Filters-item-selected.png)
      no-repeat right bottom;
    background-size: 35px;
    border-color: #fe666b;
  }
</style>
