<template>
  <div class="box">
    <div>
      <div style="height:50px;position: relative; z-index: 9997;">
        <sticky :check-sticky-support="false">
          <div class="downloadAppBox padlr">
            <div class="downLogo fl">
              <img :src="require('../../assets/images/lianhuiyiLogo.png')">
            </div>
            <div class="downAppTitle fl">
              <h4>链会议</h4>
            </div>
            <div class="downAppBtn fr" @click="godown">下载APP</div>
          </div>
        </sticky>
      </div>
    </div>

    <div class="footer" v-if="sitData">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="1/5" :order="2">
          <div class="footer-nav-icons" @click="showAdvisory = !showAdvisory">
            <span>
              <img src="../../assets/images/meetingAdvisory.png">
            </span>
            咨询
          </div>
        </flexbox-item>
        <flexbox-item :span="1/5" :order="1">
          <div class="footer-nav-icons" @click="Collection">
            <span>
              <img
                :src="IsColl==2?require('../../assets/images/meeting-like.png'):require('../../assets/images/meeting-like-s.png')"
              >
            </span>
            {{IsColl==2?'收藏':'已收藏'}}
          </div>
        </flexbox-item>

        <flexbox-item :span="3/5" :order="3">
          <div class="footer-nav-destineBtn" @click="goAnchor('#anchor')">去预定</div>
        </flexbox-item>
      </flexbox>
    </div>

    <!-- <video-player  class="video-player vjs-custom-skin"
     ref="videoPlayer"
     :playsinline="true"
     :options="playerOptions"
     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
    ></video-player>-->

    <div class="site-img-showBox" v-if="sitData">
       <router-link to="/meeting" class="site-img-showBoxGotoHome" ><img :src="require('../../assets/images/home.png')"/>首页</router-link>
     
      <!-- :list="swiperType=='img'?SImgList:SVideoList" -->

      <!-- <div v-if="swiperType=='video'" class="video-btn-box">
          <div class="jiao"></div>
      </div>-->
      <!-- <router-link tag="div" class="meetingAnnex" to="/downannex">附件下载</router-link> -->
      <!-- <div class="meetingAnnex">附件下载 ></div> -->

      <div class="site-img-markBox">
        <span
          v-if="SImgList.length!=0"
          @click="swiperType='img'"
          :class="swiperType=='img'?'site-img-type':'site-img-length'"
        >照片({{ SImgList.length }})</span>
        <span
          v-if="SVideoList.length!=0"
          @click="swiperType='video'"
          :class="swiperType=='video'?'site-img-type':'site-img-length'"
        >视频({{ SVideoList.length }})</span>
        <span class="site-img-length">
          {{ demo01_index + 1 }}/{{
          swiperType == "img" ? SImgList.length : SVideoList.length
          }}
        </span>
      </div>

      <swiper
        height="390px"
        :show-desc-mask="false"
        :show-dots="false"
        v-if="swiperType=='video'"
        v-model="demo01_index"
      >
        <swiper-item class="swiper-demo-img" v-for="(video,index) in SVideoList" :key="index">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="video.playerOptions"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
          ></video-player>
        </swiper-item>
      </swiper>
      <!-- {{demo01_index}} -->
      <swiper
        v-if="swiperType=='img'"
        :list="swiperType=='img'?SImgList:SVideoList"
        height="240px"
        :show-desc-mask="false"
        v-model="demo01_index"
        :show-dots="false"
        @click.native="currentChan"
        :loop="true"
      >
        <!-- <div v-if="swiperType=='video'" class="video-btn-box">
          <div class="jiao"></div>
        </div>-->
      </swiper>
    </div>

    <!-- 

    <div class="site-img-showBox">
      <swiper
        :list="swiperType=='img'?SImgList:SVideoList"
        height="240px"
        :show-desc-mask="false"
        v-model="demo01_index"
        :show-dots="false"
        :auto="true"
        :loop="true"
      >
        <div v-if="swiperType=='video'" class="video-btn-box">
          <div class="jiao"></div>
        </div>
        <div class="site-img-markBox">
          <span
            @click="swiperType='img'"
            :class="swiperType=='img'?'site-img-type':'site-img-length'"
          >照片({{ SImgList.length }})</span>
          <span
            @click="swiperType='video'"
            :class="swiperType=='video'?'site-img-type':'site-img-length'"
          >视频({{ SVideoList.length }})</span>
          <span class="site-img-length">
            {{ demo01_index + 1 }}/{{
            swiperType == "img" ? SImgList.length : SVideoList.length
            }}
          </span>
        </div>
      </swiper>
    </div>-->

    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div class="site-content-box borBottm" v-if="sitData">
      <flexbox class="linH padlr">
        <flexbox-item :span="3.5/5">
          <h3 class="site-flex-title">{{sitData.name}}</h3>
        </flexbox-item>
        <flexbox-item :span="1.5/5">
          <!-- <div class="site-flex-v">
            <img :src="require('../../assets/images/v.png')">认证
          </div>-->

          <div :class="idensChange(1,sitData.idens)?'site-flex-v':'meeting-flex-nov'">
            <img
              :src="idensChange(1,sitData.idens)?require('../../assets/images/v.png'):require('../../assets/images/icon-uncertified.png')"
            >
            {{idensChange(1,sitData.idens)?'已认证':'未认证'}}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="linH padlr">
        <flexbox-item class="listContent-tagbox">
          <!-- <div v-for="(TypeList,index) in meetingData.draftsVo.meetingTypeList" :key="index">
            <span class="listContent-Ttags">{{TypeList.name}}</span>
            <span class="listContent-tags">{{TypeList.industry}}</span>
          </div>-->

          <span class="listContent-Ttags">{{sitData.type}}</span>
          <span
            class="listContent-tags"
            v-for="(Feat,index) in sitData.placeFeature"
            :key="index"
          >{{Feat.name}}</span>
          <!-- <span class="listContent-tags">餐饮</span>
          <span class="listContent-tags">游泳</span>-->
        </flexbox-item>
      </flexbox>

      <flexbox class="linH padlr">
        <flexbox-item>
          <div class="flex-demo">营业时间：{{sitData.openTime}}-{{sitData.closeTime}}</div>
        </flexbox-item>
      </flexbox>
      <grid :show-vertical-dividers="false" :show-lr-borders="false" class="padlr">
        <grid-item>
          <img slot="icon" src="../../assets/images/siteicon.png">
          <span class="siteAmountTitle" slot="label">会场/场地</span>
          <span class="siteAmount">{{sitData.meetingRoom.length}}间</span>
        </grid-item>

        <grid-item>
          <img slot="icon" src="../../assets/images/siteicon.png">
          <span class="siteAmountTitle" slot="label">最大面积</span>
          <span class="siteAmount">{{rooMMost('area',sitData.meetingRoom)}}㎡</span>
        </grid-item>

        <grid-item>
          <img slot="icon" src="../../assets/images/siteicon.png">
          <span class="siteAmountTitle" slot="label">最多容纳</span>
          <span class="siteAmount">{{rooMMost('falleryful',sitData.meetingRoom)}}人</span>
        </grid-item>
      </grid>

      <group>
        <cell
          is-link
          class="potR"
          :border-intent="false"
          :inline-desc="sitData.remarks?sitData.remarks:' '"
          :link="{path:'/navmap', query:{address:sitData.address,lng:sitData.longitude,lat:sitData.latitude}}"
        >
          <div slot="title">
            <div class="addressTitle">{{ sitData.address }}</div>
            <!--
              <div class="addressTag">
                朝阳区 CBD商圈 建外大街650米
              </div>
            -->
          </div>
          <img
            slot="icon"
            width="20"
            class="cellIcon"
            :src="require('../../assets/images/map.png')"
          >
        </cell>
      </group>

      <group title="联系我们" class="site-onPhoneBox-title">
        <ul class="site-conPhone padlr">
          <li v-for="(Contacts,index) in sitData.placeContacts">
            <span>{{showPhone(Contacts.phone)}}</span>
            <span>{{Contacts.name}}</span>
            <span @click="callPhone(Contacts.phone)">
              <img width="15" :src="require('../../assets/images/phone.png')">
            </span>
            <span @click="smsPhone(Contacts.phone)">
              <img width="15" :src="require('../../assets/images/msg.png')">
            </span>
          </li>
          <!-- <li>
            <span>138****2456</span>
            <span>张先森</span>
            <span>
              <img width="15" :src="require('../../assets/images/phone.png')">
            </span>
            <span>
              <img width="15" :src="require('../../assets/images/msg.png')">
            </span>
          </li>-->
        </ul>
      </group>
    </div>

    <div class="borBottm" v-if="sitData">
      <flexbox class="site-room-title padlr">
        <flexbox-item :span="1/3">
          <h3 id="anchor">会议室</h3>
          <span>{{sitData.meetingRoom.length }}间</span>
        </flexbox-item>
      </flexbox>

      <div class="site-room-listBox padlr">
        <div v-for="(roomItme, index) in showdetailList" :key="index" class="site-room-list">
          <flexbox :gutter="3">
            <flexbox-item :span="1/4" class="site-room-imgBox">
              <img
                :src="roomItme.meetingPic?roomItme.meetingPic:require('../../assets/images/noimg.png') "
                :onerror="errorImg01"
              >
            </flexbox-item>
            <flexbox-item :span="3/4">
              <flexbox>
                <flexbox-item :span="1.8/3">
                  <h4 class="site-room-title">{{ roomItme.name }}</h4>
                </flexbox-item>
                <flexbox-item :span="1.1/3">
                  <div class="site-room-price" v-if="roomItme.priceType==2">
                    ¥{{roomItme.priceHalfday}}半天
                    <span>起</span>
                  </div>

                  <div v-else-if="roomItme.priceType==1" class="site-room-price">价格面议</div>
                </flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item :span="1.8/3">
                  <div class="site-room-TagInfo">
                    <span>{{ roomItme.area}}㎡</span>
                    <span>{{ roomItme.high }}m</span>
                    <span>{{ roomItme.falleryful}}人</span>
                  </div>
                </flexbox-item>

                <flexbox-item :span="1.2/3">
                  <div
                    class="site-room-Deposit"
                    v-if="roomItme.isBargain==1"
                  >{{roomItme.bargainType==1?' 定金:全天价'+roomItme.bargainRatio+'%':' 定金:¥'+roomItme.bargainAmount+'/天'}}</div>
                </flexbox-item>
                <flexbox-item></flexbox-item>
              </flexbox>
              <flexbox :gutter="0">
                <flexbox-item :span="3.2/4">
                  <div class="site-room-timesBox">
                    <div
                      v-for="(rootTime,index) in roomItme.currentRoomWorking"
                      v-if="index>0"
                      :key="index"
                      class="site-room-timesTag fl"
                      :class="rootTime.status==1?'timesBox-active':''"
                    >
                      <span class="fl">{{getDayName(rootTime.xdate) }}</span>
                      <span
                        class="room-full fl"
                        :class="rootTime.status==1?'':'room-idle'"
                      >{{ rootTime.status == 1 ? "已满" : "有空" }}</span>
                    </div>
                    <div class="site-room-timesTag fl">
                      <span class="fl">更多</span>
                      <span class="room-idle fl">有空</span>
                    </div>
                  </div>
                </flexbox-item>
                <flexbox-item :span="0.8/4">
                  <div class="site-room-destine" @click="gotoReserve">预定</div>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </div>

      <div class="site-room-dropDown" @click="showRoomsChange()">
        查看更多会场(
        <countup :start-val="0" :end-val="computeRoomDatelen" :duration="2" class="demo1"></countup>)
        <x-icon v-if="roomShow" type="ios-arrow-up" class="site-icon-down" size="20"></x-icon>
        <x-icon v-else-if="!roomShow" type="ios-arrow-down" class="site-icon-down" size="20"></x-icon>
      </div>

      <div class="attentionOrganizerBox" v-if="sitData.cuser!=undefined">
        <div class="OrganizerLogo fl" @click="goToTaDetail(sitData.cuser.id)">
          <img
            :src="sitData.cuser.mainPic!=null?sitData.cuser.mainPic:require('../../assets/images/myFans-Mask.png')"
          >
        </div>
        <div class="OrganizerNameBox fl">
          <h4 class="OrganizerName">{{sitData.cuser.name}}</h4>
          <div class="OrganizerInfo">
            <span>会议室 {{sitData.cuser.mnum}}</span>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
            <span>粉丝 {{sitData.cuser.fnum}}</span>
          </div>
        </div>

        <div
          class="attentionBtn fr"
          :class="IsFollow==1?'no-attent':'is-attent'"
          @click="followCompany(sitData.cuser.id)"
        >{{IsFollow==1?'已关注':'关注'}}</div>
      </div>

      <div>
        <tab
          active-color="#fe666b"
          default-color="#a0a0a0"
          custom-bar-width="43%"
          v-model="tabsIndex"
        >
          <tab-item
            v-for="(tabs,index) in tabMunes"
            :key="index"
            :selected="tabTitle === tabs"
            @on-item-click="tabClick(index)"
          >{{ tabs }}</tab-item>
        </tab>
        <div v-if="tabsIndex==0" class="site-room-Introduction">
          <p class="padlr">{{sitData.introduce}}</p>
        </div>

        <div v-else-if="tabsIndex==1">
          <div class="noData-default" v-if="sitData.placeEnvir.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无信息</p>
          </div>

          <div
            class="site-room-setting padlr"
            v-for="(setting,index) in sitData.placeEnvir"
            :key="index"
          >
            <h4>{{ setting.name }}</h4>
            <span v-for="(SettingTags,index) in setting.placeEnvir" :key="index">
              {{
              SettingTags.name
              }}
            </span>
          </div>
        </div>

        <div v-else-if="tabsIndex==2">
          <div class="noData-default" v-if="sitData.placeSet.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无信息</p>
          </div>

          <div
            class="site-room-setting padlr"
            v-for="(facility,index) in sitData.placeSet"
            :key="index"
          >
            <h4>{{ facility.name }}</h4>
            <span
              v-for="(facilityTags,index) in facility.placeEnvir"
              :key="index"
            >{{facilityTags.name}}</span>
          </div>
        </div>

        <div v-else-if="tabsIndex==3">
          <div class="noData-default" v-if="sitData.meetingHistory.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无信息</p>
          </div>
          <flexbox :gutter="0" wrap="wrap" v-if="!show2">
            <div
              class="meetingList padlr"
              v-for="(His,index) in sitData.meetingHistory"
              :key="index"
            >
              <h5>{{His.name}}</h5>
            </div>
          </flexbox>
        </div>
      </div>
    </div>

    <div class="meetingAssessBox padlr" v-if="sitData">
      <div class="meetingRegListTitle">
        <h4 class="RegListTitle fl">会友评价</h4>
        <div class="RegListPeopleNumBox fr">
          <div class="Reg-PeopleNum">
            {{assessData.totalCount}}条
            <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
          </div>
        </div>
      </div>
      <ul>
        <li class="orderPeople-nodata" v-if="assessData.totalCount==0">暂无评论</li>
        <li v-for="(comment,index) in assessData.meetingCommentVoList" :key="index">
          <div class="meetingAssessListbox">
            <div class="meetingAssess fl">
              <img :src="comment.meetingComment.userPic">
            </div>
            <div class="meetingAssessCenten fl">
              <div class="meetingAssessnameBox">
                <h4 class="meetingAssessname fl">{{comment.meetingComment.userName}}</h4>
                <time class="meetingAssessTime fr">{{comment.meetingComment.createTime}}</time>
              </div>
              <rater v-model="comment.meetingComment.score" disabled></rater>
              <p>{{comment.meetingComment.content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="padlr" v-if="sitData">
      <!-- {{Surrounding}} -->

      <flexbox class="site-room-title">
        <flexbox-item :span="1/3">
          <h3>周边推荐</h3>
        </flexbox-item>
      </flexbox>

      <div>
        <div
          class="site-room-list"
          v-for="(Surr,index) in Surrounding.data"
          :key="index"
          @click="gotoDetil(Surr.id)"
        >
          <flexbox>
            <flexbox-item :span="1/4" class="site-room-imgBox">
              <img
                :src="Surr.homepagePic?Surr.homepagePic:require('../../assets/images/noimg.png')"
                :onerror="errorImg01"
              >
            </flexbox-item>
            <flexbox-item :span="2/4">
              <flexbox orient="vertical" :gutter="0">
                <flexbox-item>
                  <h4 class="site-recommend-title">{{Surr.name}}</h4>
                </flexbox-item>

                <flexbox-item>
                  <flexbox>
                    <flexbox-item
                      class="site-recommend-info"
                    >{{Surr.area==null?'面积暂无':'面积'+Surr.area+'㎡'}}</flexbox-item>
                    <flexbox-item
                      class="site-recommend-info"
                    >{{Surr.falleryful==null?'容纳暂无':'容纳'+Surr.falleryful+'人'}}</flexbox-item>
                  </flexbox>
                </flexbox-item>
                <flexbox-item>
                  <flexbox>
                    <flexbox-item
                      class="site-recommend-info"
                    >{{Surr.count==0?'暂无会场':'会场'+Surr.count+'间'}}</flexbox-item>
                    <flexbox-item
                      class="site-recommend-info"
                    >{{Surr.high==null?'暂无内高':'内高'+Surr.high+'m'}}</flexbox-item>
                  </flexbox>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
            <flexbox-item :span="0.8/4">
              <flexbox orient="vertical">
                <!-- {{ Surr.distance}} -->
                <flexbox-item
                  class="site-recommend-distance"
                >{{Surr.distance==null?'暂无距离':'距离'+ GetDistance(sitData.latitude,sitData.longitude,Surr.latitude,Surr.longitude)+'米'}}</flexbox-item>
                <flexbox-item>
                  <x-button mini plain type="warn" style="border-color:#505050; color:#505050;">详情</x-button>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <div class="site-room-dropDown" v-if="pageshow" @click="loadMore">
        查看更多推荐
        <x-icon type="ios-arrow-right" class="site-icon-down" size="20"></x-icon>
      </div>
      <div class="site-room-dropDown1" v-if="!pageshow">
        <!-- 数据已加载完 -->
        <divider>数据已加载完</divider>
      </div>
      <div></div>
    </div>
    <div class="Placeholder"></div>

    <toast
      v-model="toastInfo.showPositionValue"
      width="10em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>

    <actionsheet
      v-model="showAdvisory"
      :menus="advisoryMenus"
      @on-click-menu="advisoryClick"
      show-cancel
    ></actionsheet>
  </div>
</template>
<script>
import {
  getDataInfo,
  getPositioning,
  checkToken,
  getStorage,
  isLogin,
  getNavigator,
  wakeApp,ShareTimeline,ShareAppMessage,ShareAppShareQQ,ShareQZone,wxRegister,setStorage
} from "../../assets/lib/myStorage.js";
import {
  Actionsheet,
  TransferDomDirective as TransferDom,
  XHeader,
  XButton,
  Flexbox,
  FlexboxItem,
  Grid,
  GridItem,
  Swiper,
  SwiperItem,
  XAddress,
  ChinaAddressV4Data,
  Group,
  Cell,
  Timeline,
  TimelineItem,
  Tab,
  TabItem,
  Countup,
  Rater,
  Toast,
  Loading,
  Sticky,
  Divider
} from "vux";
export default {
  name: "siteDetail",
  directives: {
    TransferDom
  },
  components: {
    Actionsheet,
    XHeader,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Swiper,
    SwiperItem,
    XAddress,
    Group,
    Cell,
    Timeline,
    TimelineItem,
    XButton,
    Tab,
    TabItem,
    Countup,
    Rater,
    Toast,
    Loading,
    Sticky,
    Divider
  },
  data() {
    return {
      errorImg01: 'this.src="' + require("../../assets/images/noimg.png") + '"',
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      IsFollow: 2,
      show2: false,
      sitData: null,
      showAdvisory: false,
      advisoryMenus: {
        Tel: "电话咨询",
        Online: "在线咨询"
      },
      roomData: [],
      addressTitle: "默认地址为空",
      addressValue: [],
      addressData: ChinaAddressV4Data,
      demo01_index: 0,
      count: 5,
      pageNum: 1,
      pageshow: true,
      roomShow: false,
      infoTab: true,
      swiperType: "img",
      SImgList: [],

      SVideoList: [],
      tabsIndex: 0,
      tabMunes: ["场地介绍", "外部环境", "配套设施", "历史会议"],
      tabTitle: "场地介绍",
      roomSettingData: [],

      roomFacilityData: [],
      assessData: [],
      raterData: "4",
      IsColl: 2,
      Surrounding: {}
      // img: require("../../assets/images/a.jpeg")
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    currentChan(){
      
    },
    onPlayerPlay(player) {
      console.log(player);
    },
    onPlayerPause(player) {
      console.log(player);
    },
    //计算当前场地和周边场地的距离
    GetDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return Math.round(s * 100) / 100;
    },
    //点击关注或取消关注承办方
    followCompany(id) {
      if (isLogin()) {
        if (this.IsFollow == 1) {
          let followObj = {
            params: {
              userId: getStorage("userToken").userId,
              target: id
            }
          };
          checkToken().then(Pdata => {
            getDataInfo("delete", "refollow/follow", followObj).then(res => {
              if (res.data.code == 200) {
                this.toastInfo = {
                  showMsg: res.data.msg,
                  showPositionValue: true,
                  toastType: "text"
                };
                this.IsFollow = 2;
              } else if (res.data.code == 400 || res.data.code == 100101) {
                setTimeout(function() {
                  _that.$router.push("/login");
                }, 500);
              }
            });
          });
        } else {
          let followObj = {
            user: getStorage("userToken").userId,
            taget: id,
            type: "1"
          };
          checkToken().then(Pdata => {
            getDataInfo("post", "refollow/follow", followObj).then(res => {
              if (res.data.code == 200) {
                this.toastInfo = {
                  showMsg: res.data.msg,
                  showPositionValue: true,
                  toastType: "text"
                };
                this.IsFollow = 1;
              } else if (res.data.code == 400 || res.data.code == 100101) {
                setTimeout(function() {
                  _that.$router.push("/login");
                }, 500);
              }
            });
          });
        }
      } else {
        console.log("没登录请先登录！");
        //  this.$router.push("/login");
      }
    },

    //跳转他的详情页面
    goToTaDetail(id) {
      this.$router.push("/tadetail/" + id);
      // console.log(id)
    },

    gotoReserve() {
      wakeApp();
    },
    godown() {
       this.$router.push('/downApp')
      // window.location.href = "https://www.pgyer.com/NSM9";
    },
    gotoDetil(id) {
      // console.log(id)
      this.$router.push({
        path: "/sitedetail/" + id
      });

      this.$router.go(0);
    },
    // 处理今天明天后天
    getDayName(d) {
      var td = new Date();
      td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
      var od = new Date(d);
      od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
      var xc = (od - td) / 1000 / 60 / 60 / 24;
      if (xc < -2) {
        return -xc + "天前";
      } else if (xc < -1) {
        return "前天";
      } else if (xc < 0) {
        return "昨天";
      } else if (xc == 0) {
        return "今天";
      } else if (xc < 2) {
        return "明天";
      } else if (xc < 3) {
        return "后天";
      } else {
        return xc + "天后";
      }
    },
    //处理手机号
    showPhone(phone) {
      var str = phone.substr(0, 3) + "****" + phone.substr(7);
      return str;
    },
    //处理最大面积会议室和最大容量会议室
    rooMMost(type, arr) {
      if(arr.length!=0){
   let m = arr[0][type];
      arr.forEach(e => {
        if (m < e.type) {
          m = e.type;
        }
      });
      return m;
      }
   
      // console.log(m)
    },
    //检查是否认证
    idensChange(typeNum, arr) {
      if (arr) {
        if (arr.indexOf(typeNum) != -1) {
          return true;
        } else {
          return false;
        }
      }
    },

    // 加载更多周边推荐
    loadMore() {
      //获取周边推荐
      let SurrObj = {
        params: {
          longitude: this.sitData.longitude,
          latitude: this.sitData.latitude,
          pageSize: this.count,
          pageNum: ++this.pageNum
        }
      };

      getDataInfo("get", "place", SurrObj).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.data.length == 0) {
            this.pageshow = false;
          }
          this.Surrounding.data = [
            ...this.Surrounding.data,
            ...res.data.data.data
          ];
        }
      });
    },
    //获取数据和查询是否收藏
    getSitedetailData() {
      this.show2 = true;
      let _that = this;
      // console.log(getNavigator())
      let detailId = this.$route.params.id;
      //获取当前场地数据
      let dataObj = {
        params: {
          id: detailId
        }
      };
    

      getDataInfo("get", "place/detail", dataObj).then(res => {
          
        console.log(res)
        if (res.data.code == 200) {
          // console.log(res);
          this.sitData = res.data.data;
          //登录后获取是否关注了当前用户
          if (isLogin()) {
            let followObj = {
              params: {
                userId: getStorage("userToken").userId,
                taget: res.data.data.cuser.id
              }
            };
            checkToken().then(Pdata => {
              getDataInfo("get", "refollow/follow/isFollow", followObj).then(
                res => {
                  if (res.data.code == 200) {
                    this.IsFollow = res.data.data;
                  } else if (res.data.code == 400 || res.data.code == 100101) {
                    // console.log("登录");
                  }
                }
              );
            });
          }

          //获取周边推荐
          let SurrObj = {
            params: {
              longitude: res.data.data.longitude,
              latitude: res.data.data.latitude,
              pageSize: this.count,
              pageNum: this.pageNum
            }
          };

          getDataInfo("get", "place", SurrObj).then(resd => {
            if (res.data.code == 200) {
              // console.log(res.data.data.latitude,res.data.data.longitude,resd.data.data.data[1].latitude,resd.data.data.data[1].longitude)
              // console.log(this.GetDistance(res.data.data.latitude,res.data.data.longitude,res.data.data.data[1].latitude,res.data.data.data[1].longitude))

              this.Surrounding = resd.data.data;
            }
          });

          //  console.log(SurrObj)

          let imgArr = [],
            videoArr = [];
          res.data.data.rePlaceFile.forEach(e => {
            if (e.fileType == 0) {
              imgArr.push({
                url: "/gallery/"+this.$route.params.id,
                fileType: e.fileType,
                img: e.objectKey,
                fileId: e.id,
                belong: e.belong,
                fallbackImg: require("../../assets/images/noimg.png")
              });
            } else if (e.fileType == 1) {
              videoArr.push({
                url: "/gallery/"+this.$route.params.id,
                fileType: e.fileType,
                img: e.objectKey,
                fileId: e.id,
                belong: e.belong,

                playerOptions: {
                  playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                  autoplay: false, //如果true,浏览器准备好时开始回放。
                  muted: false, // 默认情况下将会消除任何音频。
                  loop: false, // 导致视频一结束就重新开始。
                  preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                  language: "zh-CN",
                  aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                  sources: [
                    {
                      type: "video/mp4",
                      src: e.objectKey //url地址
                    }
                  ],
                  poster: "../../static/images/test.jpg", //你的封面地址
                  // width: document.documentElement.clientWidth,
                  notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                  controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                  }
                }
              });
            }
          });

          this.SImgList = imgArr;
          this.SVideoList = videoArr;
          this.show2 = false;
        } else if (res.data.code == 401) {
          //  this.$router.push('/meeting')
          this.show2 = false;

          this.toastInfo = {
            showMsg: "当前场地已删除",
            showPositionValue: true,
            toastType: "cancel"
          };

          setTimeout(function() {
            _that.$router.push("/meeting");
          }, 2000);
        } else if (res.data.code == 400 || res.data.code == 100101) {
          // this.$router.push('/meeting')
        }
      });

      //获取当前场地评论
      let AssObj = {
        params: {
          mdId: this.$route.params.id,
          type: 0,
          currentPage: 1,
          pageSize: 3
        }
      };

      getDataInfo("get", "meetingcomment/meetingcomment", AssObj).then(res => {
        if (res.data.code == 200) {
          this.assessData = res.data.data;
        }
      });

      //判断当前登录状态来获取收藏状态
      if (isLogin()) {
        let UserId = getStorage("userToken").userId;
        let Obj = {
          params: {
            target: detailId,
            userId: UserId
          }
        };
        checkToken().then(Pdata => {
          getDataInfo("get", "reCollection/isCollection", Obj).then(res => {
            if (res.data.code == 200) {
              this.IsColl = res.data.data;
            } else if (res.data.code == 400 || res.data.code == 100101) {
              // console.log("登录");
            }
          });
        });
      }
    },
    //点击收藏或者取消收藏
    Collection() {
      let detailId = this.$route.query.detailId;

      if (isLogin()) {
        let UserId = getStorage("userToken").userId;
        if (this.IsColl == 2) {
          let reColleObj = {
            type: "1",
            user: UserId,
            target: detailId,
            flag: "0"
          };
          checkToken().then(Pdata => {
            getDataInfo("post", "reCollection/reCollection", reColleObj).then(
              res => {
                if (res.data.code == 200) {
                  this.toastInfo = {
                    showMsg: res.data.msg,
                    showPositionValue: true,
                    toastType: "text"
                  };
                  this.IsColl = 1;
                } else if (res.data.code == 400 || res.data.code == 100101) {
                  // console.log('登录')
                }
              }
            );
          });
        } else if (this.IsColl == 1) {
          let reColleObj = {
            params: {
              userId: UserId,
              target: detailId
            }
          };
          checkToken().then(Pdata => {
            getDataInfo("delete", "reCollection/reCollection", reColleObj).then(
              res => {
                if (res.data.code == 200) {
                  this.toastInfo = {
                    showMsg: res.data.msg,
                    showPositionValue: true,
                    toastType: "text"
                  };
                  this.IsColl = 2;
                } else if (res.data.code == 400 || res.data.code == 100101) {
                  // console.log('登录')
                }
              }
            );
          });
        }
      } else {
        console.log("登录");
      }
    },
    //锚点跳转
    goAnchor(selector) {
      var anchor = this.$el.querySelector(selector);
      document.body.scrollTop = anchor.offsetTop; //chrome
      document.documentElement.scrollTop = anchor.offsetTop; //firefox
    },
    swiporArrListChange() {
      // console.log(this.demo01_index, this.swiperType);
      // console.log(type);
    },
    //查看更多会场按钮
    showRoomsChange() {
      this.roomShow = !this.roomShow;
    },
    tabClick(index) {
      // this.infoTab = !this.infoTab
      // console.log(index);
    },
    assessLenChange(index) {
      switch (index) {
        case 0:
          return this.assessData.length;
          break;
        case 1:
          return this.assessData.filter(e => {
            return e.status == 1;
          }).length;
          break;
        case 2:
          return this.assessData.filter(e => {
            return e.status == 2;
          }).length;
          break;
        case 3:
          return this.assessData.filter(e => {
            return e.status == 3;
          }).length;
          break;
      }
      // console.log(index)
    },
    //点击拨打号码
    callPhone(phone) {
      window.location.href = "tel://" + phone;
    },
    //点击拨打号码
    smsPhone(phone) {
      window.location.href = "sms:" + phone;
    },
    //弹出显示咨询菜单
    advisoryClick(key) {
      if (key == "Tel") {
        this.callPhone(this.phone);
      } else if (key == "Online") {
        // alert('在线咨询')
        // this.showDialogStyle = true;
        // console.log(this.meetingData.draftsVo.meetingDetails.createPerson)
        if (isLogin()) {
          this.$router.push({
            path: "/dialog/" + this.sitData.cuser.id,
            query: {
              dialogId: this.sitData.cuser.id
            }
          });
        } else {
          alert("请先登录");
          this.$router.push("/login");
        }
      }
    },
      // 微信分享回调
     wxRegCallback() {
     
 let LinkUrl = window.location.href.split('/?code=')[0]+'/#/sitedetail/'+this.$route.params.id
 let option = {
        title: this.sitData.name, // 分享标题, 请自行替换
        link: LinkUrl, // 分享链接，根据自身项目决定是否需要split
        imgUrl: this.sitData.cuser.mainPic, // 分享图标, 请自行替换，需要绝对路径
        desc: '我在链会议发现一个不错的场地,赶快来看看吧。',
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


  },
  mounted() {
    this.getSitedetailData();

       let wx_Url = 'sitedetail/'+this.$route.params.id
setStorage('wx_url',wx_Url)
      let shareUrl = window.location.href
             wxRegister(shareUrl,this.wxRegCallback);
  },
  computed: {
    showdetailList() {
      if (this.roomShow) {
        return this.sitData.meetingRoom;
      } else {
        // let arr = this.sitData.meetingRoom.slice(0, this.count);
        let arr =
          this.sitData.meetingRoom.length < 5
            ? this.sitData.meetingRoom
            : this.sitData.meetingRoom.slice(0, 5);
        return arr;
      }
    },
    computeRoomDatelen() {
      if (this.roomShow) {
        return 0;
      } else {
        // roomShow?0:roomData.length-count< 0?0:roomData.length-count
        return this.sitData.meetingRoom.length;
        // if (this.sitData.meetingRoom.length - this.count < 0) {
        //   return 0;
        // } else {
        //   return this.sitData.meetingRoom.length;
        // }
      }
    }
  },
  watch: {
    // demo01_index() {
    //   if (this.swiperType == "img") {
    //     // console.log(this.demo01_index * 1 + 1, this.SImgList.length);
    //     if (this.demo01_index * 1 + 1 > this.SImgList.length) {
    //       this.swiperType = "video";
    //       // console.log("切换视频");
    //     }
    //   }
    // },
    // swiperType(n, o) {
    //   // this.swiporArrListChange()
    //   // console.log(n,o)
    // }

    swiperType(n, o) {
      // console.log(n);
      this.demo01_index = 0;
      if (n == "img") {
        // console.log(this.$refs.videoPlayer[0]);
      }
    },
    demo01_index(n, o) {
      if (this.swiperType == "video") {
        // console.log(n);
        if (
          this.$refs.videoPlayer &&
          this.$refs.videoPlayer[o] != undefined &&
          this.$refs.videoPlayer[n] != undefined
        ) {
          this.$refs.videoPlayer[o].player.pause();
          this.$refs.videoPlayer[n].player.play();
          //  console.log(this.$refs.videoPlayer)
        }
      }
    }
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.video-js .vjs-big-play-button {
  width: 70px;
  border-radius: 50px;
}
</style>
