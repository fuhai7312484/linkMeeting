<template>
  <div class="box">
    <!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div>-->
    <div>
      <div class="map-headerBox borBottm">
        <div class="map-go-back" @click="$router.go(-1)"></div>
        <h3 class="map-headerTitle">我关注的</h3>
      </div>
      <!-- <sticky :check-sticky-support="false" :offset="0">
        <tab active-color="#fe666b" default-color="#a0a0a0" custom-bar-width="43%" v-model="index">
          <tab-item
            @on-item-click="handler"
            :selected="tabTitle === item"
            v-for="(item,index) in list2"
            :key="index"
          >{{ item }}</tab-item>
        </tab>
      </sticky>-->
    </div>
    <!-- {{siteData}} -->
    <!-- {{index}} -->
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <!-- <swiper
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
      
        <div ref="siteer">
          <div v-if="!show2">
            <div class="myfan-FollowNum padlr">已关注{{siteData.length}}个场地方</div>
            <div class="Follow-listBox" v-for="(site,index) in siteData" :key="index">
              <group>
                <cell link="/" class="Follow-HotelList">
                  <img
                    slot="icon"
                    :src="require('../../assets/images/myFans-Mask.png')"
                    width="50"
                    style="margin-right:.5rem;vertical-align: middle;"
                  >
                  <div slot="title" class="Follow-HotelInfo">
                    <h4 class="fl">{{site.details.name}}</h4>
                    <img
                      src="../../assets/images/v.png"
                      width="12"
                      style="margin-left:.5rem;vertical-align: middle;"
                    >
                  </div>
                  <div slot="inline-desc" class="Ticket-inline-desc">北京昆泰国际酒店</div>
                </cell>
              </group>
              <div class="Follow-xian"></div>
              <flexbox :gutter="0" class="Follow-position padlr">
                <flexbox-item>
                  <div class="Follow-posis">朝阳区 双井</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="Follow-posis">会议室：50间</div>
                </flexbox-item>
                <flexbox-item>
                  <div class="Follow-posis">被预定：300次</div>
                </flexbox-item>
              </flexbox>
            </div>

            <div class="der"></div>
          </div>
        </div>
    </swiper-item>-->
    <!-- <swiper-item> -->
    <!-- {{swiperH}} -->

    <!-- <div ref="Organizer">
          <div class="myfan-FollowNum padlr">已关注{{Organiz.length}}个承办方</div>
          <div class="Follow-listBox" v-for="(Org,index) in Organiz" :key="index">
            <group>
              <cell link="/" class="Follow-HotelList">
                <img
                  slot="icon"
                  :src="require('../../assets/images/myFans-Mask.png')"
                  width="50"
                  style="margin-right:.5rem;vertical-align: middle;"
                >
                <div slot="title" class="Follow-HotelInfo">
                  <h4 class="fl">杨涛</h4>
                  <img
                    src="../../assets/images/v.png"
                    width="12"
                    style="margin-left:.5rem;vertical-align: middle;"
                  >
                </div>
                <div slot="inline-desc" class="Ticket-inline-desc">腾讯科技有限公司</div>
              </cell>
            </group>
            <div class="Follow-xian"></div>
            <flexbox :gutter="0" class="Follow-position padlr">
              <flexbox-item>
                <div class="Follow-posis">会议:500场</div>
              </flexbox-item>
              <flexbox-item>
                <div class="Follow-posis">报名：8900人</div>
              </flexbox-item>
            </flexbox>
          </div>

          <div class="der"></div>
    </div>-->

    <!-- </swiper-item> -->
    <!-- <swiper-item>-->

    <div ref="Membership">
      <div class="myfan-FollowNum padlr">已关注{{Organiz.length}}个会友</div>
      <div class="Follow-listBox" v-for="(fan,index) in Organiz" :key="index">
        <!-- {{fan}} -->
        <group class="myfan-fanlistBox">
          <cell
            :key="index"
            is-link
            :link="{path:'/tadetail/'+fan.id}"
            :inline-desc="fan.fensCount+'位粉丝'"
          >
            <div slot="title" class="myFillowIdens">
              <h4 class="myFillowTitle fl">
                {{fan==null?'真懒！什么都没写':fan.name==null?'真懒！什么都没写':fan.name}}
                <!-- {{fan.idens}} -->
                  </h4>
                <span class="fl" v-if="idensChange(1,fan.idens)">
                  <img :src="require('../../assets/images/v.png')">
                  认证场地方
                </span>
                <span class="fl" v-if="idensChange(0,fan.idens)">
                  <img src="../../assets/images/meeting-v.png">认证主办方
                </span>
              
            </div>

            <img
              slot="icon"
              width="45"
              height="45"
              style="display:block;margin-right:.8rem;border-radius:50%;"
              :src="fan.mainPic==null?require('../../assets/images/myFans-Mask.png'):fan.mainPic"
            >
          </cell>
        </group>
        <div class="Follow-xian"></div>
      </div>
      <div class="der"></div>
    </div>
    <!-- </swiper-item>
    </swiper>-->
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo
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
  Loading,
  Flexbox,
  FlexboxItem,
  Sticky,
  Toast,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  name: "MyFollow",
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
    Loading
  },
  data() {
    return {
      img: require("../../assets/images/a.jpeg"),
      tabTitle: "全部",
      index: 0,
      attention: false,
      swiperH: "",
      list2: ["场地方", "承办方", "会友"],
      siteData: [],
      Organiz: [],
      myfanData: [],
      position: "default",
      showPositionValue: false,
      textInfo: "",
      InfoType: "success",
      show2: true
    };
  },
  directives: {
    TransferDom
  },
  methods: {
    //检查是否认证
    idensChange(typeNum, arr) {
      if (arr) {
        //  console.log(typeNum,arr)
        if (arr.indexOf(typeNum) != -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return 0;
      }
    },
    handChange() {
      // console.log("11111111");
    },
    handler(index) {
      // console.log(index);
    },

    getFollowData() {
      let _that = this;
      let followObj = {
        params: {
          // type:'0',
          user: getStorage("userToken").userId,
          currentPage: "1",
          pageSize: "5"
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "refollow/follow", followObj).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            let data = res.data.data.myFollowList;
            this.Organiz = data;
            // this.siteData = data.filter(e => {
            //   return e.type == "0";
            // });
            // this.Organiz = data.filter(e => {
            //   return e.type == "1";
            // });
            // this.myfanData = data.filter(e => {
            //   return e.type == "2";
            // });

            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 100101) {
            _that.$router.push("/login");
          }
        });
      });
    },

    showPosition(position) {
      this.position = position;
      this.showPositionValue = true;
    }
  },
  created() {
    this.getFollowData();
  },
  mounted() {
    // console.log(_that.$refs.swiperHeight.$el)
    // this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
    //   this.$refs.siteer.offsetHeight + "px";
    // let _that = this;
    // setTimeout(function() {
    //   _that.swiperH = _that.$refs.swiperHeight.$el.children[0].style.height =
    //     _that.$refs.siteer.offsetHeight + "px";
    //   // console.log(_that.index,_that.$refs,_that.$refs.siteer.offsetHeight,_that.show2)
    // }, 1000);
  },
  watch: {
    // index(n, o) {
    //   if (n == 0) {
    //     this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
    //       this.$refs.siteer.offsetHeight + "px";
    //   } else if (n == 1) {
    //     //  console.log(this.$refs.parUiHF.offsetHeight)
    //     this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
    //       this.$refs.Organizer.offsetHeight + "px";
    //   } else if (n == 2) {
    //     //  console.log(this.$refs.parUiHF.offsetHeight)
    //     this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
    //       this.$refs.Membership.offsetHeight + "px";
    //   }
    // }
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

.Follow-listBox {
  .weui-cells {
    margin-top: 0;
  }
  .weui-cells::before {
    border: none;
  }
  .weui-cells::after {
    border: none;
  }
}
</style>
