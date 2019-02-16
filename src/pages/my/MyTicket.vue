<template>
  <div class="box">
    <!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div>-->
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
    <!-- {{index}} -->
    <swiper
      ref="swiperHeight"
      v-model="index"
      :show-dots="false"
      :style="{height:swiperH}"
      :height="swiperH"
      :autoheight="true"
      :loop="true"
      :min-moving-distance="120"
    >
      <swiper-item>
        <!-- {{swiperH}} -->
        <div ref="pubUiHF">
          <div class="Ticket-listBox"  v-for="(taPos,index) in TaPosted" :key="index">
            <group>
            <!-- <div class="padlr">
              公司标题
              </div> -->
               <cell class="Ticket-companyBox">
                 <img slot="icon" :src="require('../../assets/images/bind-mobile-failure.png')" width="25" />
                 <div slot="title" class="Ticket-company">盈东科技</div>
                 <span slot class="Ticket-company-status T-s1">待付款</span>
               </cell>
            <cell class="Ticket-meetingInfoBox" link="/">
              <img slot="icon" :src="taPos.img" width="100">
              <h4 slot="title">第四届中国制造强国论坛暨2018中国制造年底盛典</h4>
              <div slot="inline-desc" class="Ticket-inline-desc">
               <p>时间：11-24 09:00至21:00</p> 
               <p>地点：朝阳区工体北路88号 三里屯广场</p> 
                </div>
            </cell>
            <div class="Ticket-piaoInfoBox padlr">
              <h4 class="fl">普通票</h4>
              <div class="Ticket-piaoInfoSpan fr">
                <span class="piaoInfoNun">共2张</span>
                <span class="piaoInfoPrice">合计：¥300</span>
              </div>
              
              </div>
           
          </group>
        <div class="Ticket-btns padlr">
         
          <span>取消订单</span>
           <span class="Ticket-PayBtn">马上支付</span>
          </div>
          </div>

<div class="der"></div>

         
        </div>
      
      </swiper-item>

      <swiper-item>
    
         <div ref="pubUiHF">
          <div class="Ticket-listBox"  v-for="(taPos,index) in TaPosted" :key="index">
            <group>
            <!-- <div class="padlr">
              公司标题
              </div> -->
               <cell class="Ticket-companyBox">
                 <img slot="icon" :src="require('../../assets/images/bind-mobile-failure.png')" width="25" />
                 <div slot="title" class="Ticket-company">盈东科技</div>
                 <span slot class="Ticket-company-status T-s3">待付款</span>
               </cell>
            <cell class="Ticket-meetingInfoBox" link="/">
              <img slot="icon" :src="taPos.img" width="100">
              <h4 slot="title">第四届中国制造强国论坛暨2018中国制造年底盛典</h4>
              <div slot="inline-desc" class="Ticket-inline-desc">
               <p>时间：11-24 09:00至21:00</p> 
               <p>地点：朝阳区工体北路88号 三里屯广场</p> 
                </div>
            </cell>
            <div class="Ticket-piaoInfoBox padlr">
              <h4 class="fl">普通票</h4>
              <div class="Ticket-piaoInfoSpan fr">
                <span class="piaoInfoNun">共2张</span>
                <span class="piaoInfoPrice">合计：¥300</span>
              </div>
              
              </div>
           
          </group>
        <div class="Ticket-btns padlr">
         
          <span>取消订单</span>
           <span class="Ticket-PayBtn">马上支付</span>
          </div>
          </div>

<div class="der"></div>

         
        </div>


      </swiper-item>
      <swiper-item>待参会</swiper-item>

      <swiper-item>退款</swiper-item>

      <swiper-item>已完成</swiper-item>
    </swiper>
  </div>
</template>
<script>
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
  Toast
} from "vux";

export default {
  name: "MyTicket",
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
    Toast
  },
  data() {
    return {
      img: require("../../assets/images/a.jpeg"),
      tabTitle: "全部",
      index: 0,
      attention: false,
      swiperH: "",
      list2: ["全部", "待付款", "待参会", "退款", "已完成"],
      TaPosted: [
        {
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起"
        },
        {
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起"
        },
        {
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起"
        },
        {
          type: "par",
          title: "2018第二届金融衍生品&风险管理论坛",
          city: "北京",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          time: "2018.10.09",
          price: "1800"
        }
      ],
      position: "default",
      showPositionValue: false,
      textInfo: "",
      InfoType: "success"
    };
  },

  methods: {
    handChange() {
      // console.log("11111111");
    },
    handler(index) {
      console.log(index);
    },
    attChange() {
      if (this.attention) {
        this.attention = false;
        this.InfoType = "success";
        this.textInfo = "关注成功！";

        this.showPosition("middle");
      } else {
        this.attention = true;
        this.InfoType = "cancel";
        this.textInfo = "已取消关注";
        this.showPosition("middle");
      }
    },

    showPosition(position) {
      this.position = position;
      this.showPositionValue = true;
    }
  },
  mounted() {
    this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
      this.$refs.pubUiHF.offsetHeight + "px";
  },
  watch: {
    index(n, o) {
      if (n == 0) {
        this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
          this.$refs.pubUiHF.offsetHeight + "px";
      } else if (n == 1) {
        this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
          this.$refs.parUiHF.offsetHeight + "px";
      }
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

.Ticket-listBox{
  .weui-cells::before{
    border: none;
  }
  .weui-cell::before{
    border: none;
  }
}
</style>
