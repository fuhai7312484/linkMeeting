<template>
  <div class="box">
    
    <div class="my-top-boxs" :style="{backgroundImage: 'url(' + bgChange(TaData.mainPic) + ')' }"></div>
    <div class="my-top-boxsMak"></div>
    <div class="my-top-boxsContent">
      <!-- <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true"></x-header> -->
      <div class="my-X-header">
        <div class="my-X-headerGoback" @click="gotoBack">
<img :src="require('../../assets/images/my-X-headerGoback.png')"/>
        </div>
      </div>

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
              class="my-top-attention-my"
              @click="attChange"
              
            >编辑信息</div>
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
          
          <li class="my-tab-List"
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
         

              <flexbox-item :span="1/3">
                <div class="my-tab-parListImg">
                  <img :src="taPos.cover">
                </div>
              </flexbox-item>

              <flexbox-item :span="2/3">
                <div class="tabMeetingTextBox">
             <h4 class="tabMeetingTextTitle">{{taPos.theme}}</h4>
              <div class="tabMeetingTime">
                      {{addressSplit(taPos.address)}}
                    </div>

                     <div class="tabMeetingTagBox">
                      <div class="tabMeetingTag">
                        <!-- {{DataItem.status}} -->
                        <span
                          v-for="(Tag,index) in taPos.tags"
                          :key="index"
                          v-if="index<4"
                        >{{Tag}}</span>

                        <!-- <span
                        v-else-if="DataItem.status==3 || DataItem.status==1"
                        class="processing"
                      >进行中</span>
                        <span v-else-if="DataItem.status==0" class="notStarted">未开始</span>-->
                      </div>


                              <div class="tabMeetingNumBox">
                <div class="tabMeetingNum fl" :class="taPos.status!=2?'TimeC0':'TimeC2'">
                      {{taPos.status==0?'火热报名中':taPos.status==1 || taPos.status==3?'报名即将截止':'报名已结束'}}
                      
                      </div>
                      <div class="tabMeetingNumStatus fr">
                        <span v-if="taPos.status==0" style="color:#FE7210">
                             <img :src="require('../../assets/images/timeC0.png')">  {{CountdownTime(taPos.beginTime)}}
                        </span>

                         <span v-if="taPos.status==3 || taPos.status==1" style="color:#66C103">
                      <img :src="require('../../assets/images/timeC1.png')" /> 进行中
                    </span>

                    <span v-if="taPos.status==2" style="color:#505050">
                      <img :src="require('../../assets/images/timeC2.png')" /> 已结束
                    </span>

                      </div>
                    </div>
                    </div>

                </div>

              </flexbox-item>
            </flexbox>

          </li>
        </ul>
      </swiper-item>

      <swiper-item>
        <ul class="my-tab-swiper vux-center" ref="parUiHF">
          <li class="my-tab-List"
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
                   <div class="tabMeetingTextBox">
             <h4 class="tabMeetingTextTitle">{{taPos.theme}}</h4>
              <div class="tabMeetingTime">
                      {{addressSplit(taPos.address)}}
                    </div>

                     <div class="tabMeetingTagBox">
                      <div class="tabMeetingTag">
                        <!-- {{DataItem.status}} -->
                        <span
                          v-for="(Tag,index) in taPos.tags"
                          :key="index"
                          v-if="index<4"
                        >{{Tag}}</span>

                        <!-- <span
                        v-else-if="DataItem.status==3 || DataItem.status==1"
                        class="processing"
                      >进行中</span>
                        <span v-else-if="DataItem.status==0" class="notStarted">未开始</span>-->
                      </div>


                              <div class="tabMeetingNumBox">
                <div class="tabMeetingNum fl" :class="taPos.status!=2?'TimeC0':'TimeC2'">
                      {{taPos.status==0?'火热报名中':taPos.status==1 || taPos.status==3?'报名即将截止':'报名已结束'}}
                      
                      </div>
                      <div class="tabMeetingNumStatus fr">
                        <span v-if="taPos.status==0" style="color:#FE7210">
                             <img :src="require('../../assets/images/timeC0.png')">  {{CountdownTime(taPos.beginTime)}}
                        </span>

                         <span v-if="taPos.status==3 || taPos.status==1" style="color:#66C103">
                      <img :src="require('../../assets/images/timeC1.png')" /> 进行中
                    </span>

                    <span v-if="taPos.status==2" style="color:#505050">
                      <img :src="require('../../assets/images/timeC2.png')" /> 已结束
                    </span>

                      </div>
                    </div>
                    </div>

                </div>
              </flexbox-item>
            </flexbox>
          </li>
        </ul>
      </swiper-item>
    </swiper>
    <div class="der"></div>
    <!-- <div class="taDetailIMBox" @click="gotoMsg">给Ta发消息</div> -->
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,
  isLogin,
  transDate,meetingBeTime
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
  Toast
} from "vux";

export default {
  name: "DetailsList",
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
      tabTitle: "Ta发布的",
      index: 0,
      attention: false,
      swiperH: "",
      list2: ["我发布的", "我参与的"],
      TaData: {},
      releaseCase: [],
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
    gotoBack(){
      this.$router.go(-1)
    },
      addressSplit(add) {
      var reg = /.+?(省|市|自治区|自治州|县|区|镇)/g;
      let addArr = add.match(reg);
      let str = "";
      if (addArr) {
        let newArr = [];

        if (addArr.length >= 2) {
          newArr = [addArr[0], addArr[1]];
        } else if (addArr.length < 2) {
          newArr = [addArr[0]];
        }
        newArr.forEach(e => {
          if (e.indexOf("省") != -1) {
            str = e.replace("省", "");
          }
          if (e.indexOf("市") != -1) {
            str += " " + e.replace("市", "");
          }
          if (e.indexOf("区") != -1 && e.length < 5) {
            str += " " + e.replace("区", "");
          }
          if (e.indexOf("镇") != -1 && e.length < 5) {
            str += " " + e.replace("镇", "");
          }
          if (e.indexOf("县") != -1 && e.length < 5) {
            str += " " + e.replace("县", "");
          }
        });
      }

      return str;
    },
      CountdownTime(time) {
      return meetingBeTime(time);
    },

    bgChange(bg){
      if(bg){
        return bg;
      }else{
        return require('../../assets/images/myFans-Mask.png')
      }
    },
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
      this.$router.push({
        path: "/dialog/" + this.$route.params.id,
        query: { dialogId: this.$route.params.id }
      });
    },
    handChange() {
      // console.log("11111111");
    },
    handler(index) {
      // console.log(index);
    },
    //点击关注或取消关注承办方
    attChange() {
     this.$router.push('/myInfo')
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
            userId: getStorage("userToken").userId,
            
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
