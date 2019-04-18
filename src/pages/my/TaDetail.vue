<template>
  <div class="box">
    <div class="my-top-boxs" :style="{backgroundImage: 'url(' + TaData.mainPic + ')' }"></div>
    <div class="my-top-boxsMak"></div>
    <div class="my-top-boxsContent">
      <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true"></x-header>

      <!-- <x-header
        :right-options="{showMore: true}"
        @on-click-more="showMenus = true"
      >
        <span slot="overwrite-left"><img :src="img"/></span>
        <x-icon
          slot="overwrite-left"
          type="navicon"
          size="35"
          style="fill:#fff;position:relative;top:-8px;left:-3px;"
        ></x-icon>
      </x-header>-->

       <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>


      <div class="my-top-AvatarBox">
        <flexbox>
          <flexbox-item :span="1/3">
            <div class="my-top-Avatar">
              <img :src="TaData.mainPic?TaData.mainPic:require('../../assets/images/myFans-Mask.png')">
            </div>
          </flexbox-item>
          <flexbox-item :span="2/3">
            <div class="my-top-userNamebox">
              <flexbox orient="vertical" :gutter="0">
                <flexbox-item class="my-top-userName">{{TaData.name}}</flexbox-item>
                <flexbox-item>
                  <div class="my-top-userjobTitle">{{TaData.company}} {{TaData.technical}}</div>
                </flexbox-item>

                <flexbox-item>
                  <!-- {{idensChange(0,TaData.idens)}} -->

                  <div class="my-top-userIdens">
                    <span v-if="idensChange(1,TaData.idens)">
                      <img :src="require('../../assets/images/v.png')">
                      认证场地方
                    </span>
                    <span v-if="idensChange(0,TaData.idens)">
                      <img src="../../assets/images/meeting-v.png">认证主办方
                    </span>
                  </div>
                </flexbox-item>
              </flexbox>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox class="my-top-SubBtnsBox">
          <flexbox-item
            :span="2/3"
            class="my-top-SubtotalInfo"
          >{{TaData.placeNum}} 场地 | {{TaData.meetingNum}} 会议 | {{TaData.fensNum}} 粉丝</flexbox-item>
          <flexbox-item :span="1/3">
            <div
              class="my-top-attention"
              @click="attChange"
              :style="{background:TaData.isMyFollow==2?'#FF576B':'#C8C8C8'}"
            >{{TaData.isMyFollow==2?'关注':'已关注'}}</div>
            <toast
              v-model="showPositionValue"
              :type="InfoType"
              :time="800"
              is-show-mask
              :text="textInfo"
              :position="position"
            ></toast>
          </flexbox-item>
        </flexbox>
      </div>
    </div>

    <!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div>-->
    <div style="height:44px;">
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
    <!-- {{TaPosted}} -->
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
      <!-- {{TaPosted}} -->
      <swiper-item>
        <ul class="my-tab-swiper vux-center" ref="pubUiHF">
          <li
            v-for="(taPos,index) in TaPosted"
            :key="index"
            @click="gotoDetails(taPos.typeCode,taPos.id)"
          >
            <flexbox v-if="taPos.typeCode=='pub'">
              <flexbox-item :span="1/4">
                <div class="my-tab-swiperListImg">
                  <img
                    :src="taPos.homepagePic==null?require('../../assets/images/noimg.png'):taPos.homepagePic"
                  >
                </div>
              </flexbox-item>
              <flexbox-item :span="3/4">
                <div class="my-tab-listContent">
                  <h3>{{ taPos.name }}</h3>
                </div>

                <div
                  class="my-tab-listContent mylistInfo"
                >距离:{{ taPos.distance!=null?taPos.distance+'米':'暂无距离' }} &nbsp;&nbsp;&nbsp;{{ taPos.zone?taPos.zone.name:'' }}</div>

                <div
                  class="my-tab-listContent mylistInfo"
                >面积:{{ taPos.area!=null?taPos.area+'㎡':'暂无面积' }} &nbsp;&nbsp;&nbsp; 容纳:{{ taPos.falleryful!=null?taPos.falleryful+'人':'暂无人数' }}</div>

                <div
                  class="my-tab-listContent mylistInfo"
                >会议室:{{ taPos.count}}间 &nbsp;&nbsp;&nbsp; 内高: {{ taPos.high!=null?taPos.high+'米':''}}</div>
                <flexbox :gutter="0">
                  <flexbox-item :span="2/3" class="listContent-tagbox">
                    <span v-if="taPos.type!=null" class="listContent-tags sang">{{taPos.type}}</span>
                    <span
                      v-for="(tag,index) in taPos.features" v-if="index<1"
                      :key="index"
                      class="listContent-tags"
                    >{{ tag.name }}</span>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <h4
                      style="text-align: right;"
                    >¥{{ taPos.priceHalfday!=null?taPos.priceHalfday:'0.0' }}起</h4>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>

            <flexbox v-if="taPos.typeCode=='par'">
              <!-- {{taPos}} -->

              <flexbox-item :span="1/3">
                <div class="my-tab-parListImg">
                  <img :src="taPos.cover">
                </div>
              </flexbox-item>

              <flexbox-item :span="2/3">
                <div class="listContentPar">
                  <h3>{{ taPos.theme }}</h3>
                </div>
                <div class="mylistInfoPar">{{taPos.beginTime}}</div>
                <div class="tabMeetingTag">
                  <span v-if="taPos.status=='0'" class="IsOver">已结束</span>
                  <span v-else-if="taPos.status=='1'" class="LiveIn">直播中</span>
                  <span v-else-if="taPos.status=='2'" class="processing">进行中</span>
                  <span v-else-if="taPos.status=='3'" class="notStarted">未开始</span>
                </div>
              </flexbox-item>
            </flexbox>
          </li>
        </ul>
      </swiper-item>

      <swiper-item>
        <ul class="my-tab-swiper vux-center" ref="parUiHF">
          <li
            v-for="(taPos,index) in releaseCase"
            :key="index"
            @click="gotoDetails(taPos.typeCode,taPos.id)"
          >
            <flexbox v-if="taPos.typeCode=='pub'">
              <flexbox-item :span="1/4">
                <div class="my-tab-swiperListImg">
                  <img
                    :src="taPos.homepagePic==null?require('../../assets/images/noimg.png'):taPos.homepagePic"
                  >
                </div>
              </flexbox-item>
              <flexbox-item :span="3/4">
                <div class="my-tab-listContent">
                  <h3>{{ taPos.name }}</h3>
                </div>

                <div
                  class="my-tab-listContent mylistInfo"
                >距离:{{ taPos.distance!=null?taPos.distance+'米':'暂无距离' }} &nbsp;&nbsp;&nbsp;{{ taPos.zone?taPos.zone.name:'' }}</div>

                <div
                  class="my-tab-listContent mylistInfo"
                >面积:{{ taPos.area!=null?taPos.area+'㎡':'暂无面积' }} &nbsp;&nbsp;&nbsp; 容纳:{{ taPos.falleryful!=null?taPos.falleryful+'人':'暂无人数' }}</div>

                <div
                  class="my-tab-listContent mylistInfo"
                >会议室:{{ taPos.count}}间 &nbsp;&nbsp;&nbsp; 内高: {{ taPos.high!=null?taPos.high+'米':''}}</div>
                <flexbox :gutter="0">
                  <flexbox-item :span="2/3" class="listContent-tagbox">
                    <span v-if="taPos.type!=null" class="listContent-tags sang">{{taPos.type}}</span>
                    <span
                      v-for="(tag,index) in taPos.features" v-if="index<1"
                      :key="index" 
                      class="listContent-tags"
                    >{{ tag.name }}</span>
                  </flexbox-item>
                  <flexbox-item :span="1/3">
                    <h4
                      style="text-align: right;"
                    >¥{{ taPos.priceHalfday!=null?taPos.priceHalfday:'0.0' }}起</h4>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>

            <flexbox v-if="taPos.typeCode=='par'">
              <!-- {{taPos}} -->

              <flexbox-item :span="1/3">
                <div class="my-tab-parListImg">
                  <img :src="taPos.cover">
                </div>
              </flexbox-item>

              <flexbox-item :span="2/3">
                <div class="listContentPar">
                  <h3>{{ taPos.theme }}</h3>
                </div>
                <div class="mylistInfoPar">{{taPos.beginTime}}</div>
                <div class="tabMeetingTag">
                  <span v-if="taPos.status=='0'" class="IsOver">已结束</span>
                  <span v-else-if="taPos.status=='1'" class="LiveIn">直播中</span>
                  <span v-else-if="taPos.status=='2'" class="processing">进行中</span>
                  <span v-else-if="taPos.status=='3'" class="notStarted">未开始</span>
                </div>
              </flexbox-item>
            </flexbox>
          </li>
        </ul>
      </swiper-item>
    </swiper>
    <div class="der"></div>
    <div class="taDetailIMBox" @click="gotoMsg">给Ta发消息</div>
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,
  isLogin,
  transDate
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
  Sticky, Loading,
  Toast,  TransferDomDirective as TransferDom,
} from "vux";

export default {
  name: "TaDetail",
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
    Toast, Loading,
  },
  data() {
    return {
      img: require("../../assets/images/a.jpeg"),
      tabTitle: "Ta发布的",
      index: 0,
      attention: false,
      swiperH: "",
      list2: ["Ta发布的", "Ta参与的"],
      TaData: {},
      releaseCase: [],
      show2:true,
      TaPosted: [
        // {
        //   type: "pub",
        //   img:
        //     "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
        //   city: "北京",
        //   area: "朝阳地区",
        //   title: "昆泰国家大酒店",
        //   distance: "130米",
        //   proportion: "320㎡",
        //   hold: "30人",
        //   meetingRoom: "50间",
        //   guestRoom: "10间",
        //   tag: ["机场", "餐厅", "无柱"],
        //   price: "5000半天起"
        // },
        // {
        //   type: "pub",
        //   img:
        //     "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
        //   city: "北京",
        //   area: "朝阳地区",
        //   title: "昆泰国家大酒店",
        //   distance: "130米",
        //   proportion: "320㎡",
        //   hold: "30人",
        //   meetingRoom: "50间",
        //   guestRoom: "10间",
        //   tag: ["机场", "餐厅", "无柱"],
        //   price: "5000半天起"
        // },
        // {
        //   type: "pub",
        //   img:
        //     "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
        //   city: "北京",
        //   area: "朝阳地区",
        //   title: "昆泰国家大酒店",
        //   distance: "130米",
        //   proportion: "320㎡",
        //   hold: "30人",
        //   meetingRoom: "50间",
        //   guestRoom: "10间",
        //   tag: ["机场", "餐厅", "无柱"],
        //   price: "5000半天起"
        // },
        // {
        //   type: "par",
        //   title: "2018第二届金融衍生品&风险管理论坛",
        //   city: "北京",
        //   img:
        //     "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
        //   time: "2018.10.09",
        //   price: "1800"
        // }
      ],
      position: "default",
      showPositionValue: false,
      textInfo: "",
      InfoType: "success"
    };
  },

  methods: {
    gotoDetails(type, id) {
      if (type == "par") {
        this.$router.push({
          path: "/meetDetail/" + id,
          query: { meetingId: id }
        });
      } else if (type == "pub") {
        this.$router.push({
          path: "/sitedetail/" + id,
          query: { detailId: id }
        });
      }

      // console.log(type,id)
    },
    //给Ta发消息
    gotoMsg() {
      if(isLogin()){
 this.$router.push({
        path: "/dialog/" + this.$route.params.id,
        query: { dialogId: this.$route.params.id }
      });

      }else{
         this.$router.push('/login');
      }
     
    },
    handChange() {
      // console.log("11111111");
    },
    handler(index) {
      // console.log(index);
    },
    //点击关注或取消关注承办方
    attChange() {

     if(isLogin()){
if (this.TaData.isMyFollow == 1) {
        let followObj = {
          params: {
            userId: getStorage("userToken").userId,
            target: this.$route.params.id
          }
        };
        checkToken().then(Pdata => {
          getDataInfo("delete", "refollow/follow", followObj).then(res => {
            if (res.data.code == 200) {
              this.TaData.isMyFollow = 2;
              this.InfoType = "cancel";
              this.textInfo = "已取消关注";
              this.showPosition("middle");
            } else if (res.data.code == 400 || res.data.code == 100101) {
              setTimeout(function() {
                _that.$router.push("/login");
              }, 500);
            }
          });
        });
      } else if (this.TaData.isMyFollow == 2) {
        let followObj = {
          user: getStorage("userToken").userId,
          taget: this.$route.params.id,
          type: "1"
        };
        checkToken().then(Pdata => {
          getDataInfo("post", "refollow/follow", followObj).then(res => {
            if (res.data.code == 200) {
              this.TaData.isMyFollow = 1;
              this.InfoType = "success";
              this.textInfo = "关注成功！";
              this.showPosition("middle");
            } else if (res.data.code == 400 || res.data.code == 100101) {
              setTimeout(function() {
                _that.$router.push("/login");
              }, 500);
            }
          });
        });
      }

     }else{
       this.$router.push('/login')
     }
      

      // console.log(this.TaData.isMyFollow);
      // if (this.attention) {
      //   this.attention = false;
      //   this.InfoType = "success";
      //   this.textInfo = "关注成功！";

      //   this.showPosition("middle");
      // } else {
      //   this.attention = true;
      //   this.InfoType = "cancel";
      //   this.textInfo = "已取消关注";
      //   this.showPosition("middle");
      // }
    },

    showPosition(position) {
      this.position = position;
      this.showPositionValue = true;
    },
    //获取他的主页的数据
    getTaDetailData() {
      
      let _that = this;
   
        // console.log(this.$route.params.id);
        let TaObj = {
          params: {
            userId: this.$route.params.id,
            
          }
        };
        if(isLogin()){
          TaObj.params.meId = getStorage("userToken").userId
        }
          getDataInfo("get", "myMeeting/myMeeting/me", TaObj).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.TaData = res.data.data;
              res.data.data.release.meetingList.forEach(e => {
                e.typeCode = "par";
              });
              res.data.data.release.placeListItemList.forEach(e => {
                e.typeCode = "pub";
              });
              res.data.data.releaseCase.meetingList.forEach(e => {
                e.typeCode = "par";
              });
              res.data.data.releaseCase.placeListItemList.forEach(e => {
                e.typeCode = "pub";
              });
              this.TaPosted = [
                ...res.data.data.release.meetingList,
                ...res.data.data.release.placeListItemList
              ];
              this.releaseCase = [
                ...res.data.data.releaseCase.meetingList,
                ...res.data.data.releaseCase.placeListItemList
              ];
              this.show2 = false

              setTimeout(function() {
                _that.swiperH = _that.$refs.swiperHeight.$el.children[0].style.height =
                  _that.$refs.pubUiHF.offsetHeight + "px";
              }, 500);
            } else if (res.data.code == 400 || res.data.code == 100101) {
              setTimeout(function() {
                _that.$router.push("/login");
              }, 500);
            }
          });
      
     
    },
    //检查是否认证
    idensChange(typeNum, arr) {
      if (arr) {
        //  console.log(typeNum,arr)
        if (arr.indexOf(typeNum) != -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  mounted() {
    this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =
      this.$refs.pubUiHF.offsetHeight + "px";
    this.getTaDetailData();
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
.taDetailIMBox {
  height: 40px;
  background: #fff;
  color: #fe666b;
  position: fixed;
  bottom: 0;
  line-height: 40px;
  //   left: 0;
  //   right: 0;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
}

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
</style>
