<template>
  <div class="box" :style="{ overflow:'hidden',}">


    <!-- <div @click="wakeApp">唤醒APP</div> -->
    <div v-transfer-dom>
      <popup v-model="Support" position="left" width="100%">
        <div class="SupportListBox">
          <h3>{{SupportObj.companyType}}</h3>

          <ul v-if="meetingData">
            <!-- {{comTypeList('支持单位')}} -->
            <li v-for="(stand,index) in SupportObj.companyNameList" :key="index">{{stand.companyName}}</li>
          </ul>
          <div class="Suppor-close">
            <span class="vux-close" @click="Support = false">
              <x-icon type="ios-close-empty" size="40"></x-icon>
            </span>
          </div>
        </div>
      </popup>
    </div>

    <!-- <a href="https://uri.amap.com/marker?position=经度,纬度&name=天安门">高德地图</a> -->
    <!-- <div @click="showHideOnBlur = !showHideOnBlur">111</div> -->
    <div v-transfer-dom>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="../../assets/images/card.png" style="max-width:40%">
        </div>
        <!-- <div @click="showHideOnBlur=false">
          <span class="vux-close">11</span>
        </div>-->
      </x-dialog>
    </div>

    <!-- <div v-transfer-dom>
      <x-dialog
        v-model="showDialogStyle"
        hide-on-blur
        :dialog-style="{'max-width': '80%', width: '80%', height: '26%', 'background-color': '#fff','border-radius':'.8rem'}"
      >
        <div class="howDialogSoltBox">
          <div class="showDialogCancel" @click="showDialogStyle = false">
            <x-icon type="ios-close-empty" size="40"></x-icon>
          </div>
          <div class="showDialogTitle">
            <h4>为确保您的权益,请使用链会议APP在线咨询</h4>
            <div class="showDialogDown">下载链会议APP</div>
          </div>
        </div>
      </x-dialog>
    </div>-->

    <actionsheet
      v-model="showAdvisory"
      :menus="advisoryMenus"
      @on-click-menu="advisoryClick"
      show-cancel
    ></actionsheet>

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

    
   


    <div class="footer" v-if="meetingData">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="1/6" :order="2">
          <div class="footer-nav-icons" @click="Collection">
            <span>
              <img
                :src="IsColl==2?require('../../assets/images/meeting-like.png'):require('../../assets/images/meeting-like-s.png')"
              >
            </span>
            {{IsColl==2?'收藏':'已收藏'}}
          </div>

          <!-- <div class="footer-nav-icons">
            <span>
              <img src="../../assets/images/meeting-like.png">
            </span>
            收藏
          </div>-->
        </flexbox-item>
        <flexbox-item :span="1/6" :order="3">
          <div class="footer-nav-icons" @click="showAdvisory = !showAdvisory">
            <span>
              <img src="../../assets/images/meetingAdvisory.png">
            </span>
            咨询
          </div>
        </flexbox-item>
        <flexbox-item :span="4/6" :order="4">
          <div class="footer-nav-destineBtn" @click="gotoTiaket">报名参会</div>
          <!-- <router-link
            tag="div"
            class="footer-nav-destineBtn"
            :to=" {path:'/ticket', query:{meeting_id:this.$route.query.meetingId}}"
          >报名参会</router-link>-->
          <!-- <div class="footer-nav-destineBtn">报名参会</div> -->
        </flexbox-item>
      </flexbox>
    </div>
    <!-- {{meetingData.draftsVo.meetingDetails.meetingFileList}} -->




    <div class="site-img-showBox" v-if="meetingData">
      <!-- :list="swiperType=='img'?SImgList:SVideoList" -->
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
      </swiper>
    </div>

    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div class="meetingContent" v-if="meetingData">

      
 




      <h3 class="meeting-title padlr">
        <!-- {{meetingData.draftsVo==undefined?'':meetingData.draftsVo.meetingDetails.theme}} -->
        {{meetingData.draftsVo.meetingDetails.theme}}
      </h3>

      <flexbox :gutter="0" class="linH padlr">
        <flexbox-item :span="3.5/5" class="listContent-tagbox">
          <div v-for="(TypeList,index) in meetingData.draftsVo.meetingTypeList" :key="index">
            <span class="listContent-Ttags">{{TypeList.name}}</span>
            <span class="listContent-tags">{{TypeList.industry}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="1.5/5">
          <div :class="idensChange(0,meetingData.idens)?'meeting-flex-v':'meeting-flex-nov'">
            <img
              :src="idensChange(0,meetingData.idens)?require('../../assets/images/meeting-v.png'):require('../../assets/images/icon-uncertified.png')"
            >
            {{idensChange(0,meetingData.idens)?'已认证':'未认证'}}
          </div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB padlr">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">会议时间：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo">
            {{getTimeLimit(meetingData.draftsVo.meetingDetails.beginTime,meetingData.draftsVo.meetingDetails.endTime)}}
            <!-- {{meetingData.draftsVo.meetingDetails.beginTime}}至{{meetingData.draftsVo.meetingDetails.endTime}} -->
            <!-- 11-24 09:00至21:00 -->
          </div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB padlr">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">场地地址：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <router-link
            tag="div"
            class="meetingdetailInfo"
            :to="{path:'/navmap', query:{address:meetingData.draftsVo.meetingDetails.address,lng:meetingData.draftsVo.meetingDetails.longitude,lat:meetingData.draftsVo.meetingDetails.latitude}}"
          >
            <div class="meetingdetailInfoC fl">{{meetingData.draftsVo.meetingDetails.address}}</div>
            <div class="meetingdetailInfoIcons fr">
              <img width="20" :src="require('../../assets/images/map.png')">
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB padlr">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">主办单位：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo">
            <span v-for="(org,index) in comTypeList('主办单位')" :key="index">{{org.companyName}};</span>
            <!-- {{comTypeList('主办单位')}} -->
          </div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB padlr">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">承办单位：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo">
            <span v-for="(und,index) in comTypeList('承办单位')" :key="index">{{und.companyName}};</span>
          </div>
        </flexbox-item>
      </flexbox>


      <flexbox :gutter="0" class="magrTB padlr" v-for="(en,index) in comTypeList('自定义')" :key="index">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">{{en.companyType}}：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo" @click="SupportChange(en)" v-if="en.companyNameList.length>=2">
            <div class="meetingdetailInfoBox fl">
              <div class="meetingdetailInfoA fl">
                <span
                  v-for="(enItem,index) in en.companyNameList"
                  :key="index"
                >{{enItem.companyName}};</span>
           
              </div>
              <div class="meetingdetailInfoB fl">等{{en.companyNameList.length}}家单位</div>
            </div>
            <div class="meetingdetailInfoIcons2 fr">
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>


          <div class="meetingdetailInfo" v-if="en.companyNameList.length<2">
            <div class="meetingdetailInfoBox fl">
              <div class="meetingdetailInfoA fl">
                <span
                  v-for="(enItem,index) in en.companyNameList"
                  :key="index"
                >{{enItem.companyName}};</span>
           
              </div>
              <div class="meetingdetailInfoB fl">等{{en.companyNameList.length}}家单位</div>
            </div>
           
          </div>


        </flexbox-item>
      </flexbox>





       <!-- <flexbox :gutter="0" class="magrTB padlr" v-if="comTypeList('支持单位').length!=0">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">支持单位：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo" @click="Support = true">
            <div class="meetingdetailInfoBox fl">
              <div class="meetingdetailInfoA fl">
                <span
                  v-for="(stand,index) in comTypeList('支持单位')"
                  :key="index"
                >{{stand.companyName}};</span>
            
              </div>
              <div class="meetingdetailInfoB fl">等{{comTypeList('支持单位').length}}家单位</div>
            </div>
            <div class="meetingdetailInfoIcons2 fr">
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>
        </flexbox-item>
      </flexbox> -->


      

      <div class="attentionOrganizerBox" v-if="meetingData.userMeetingInfo!=undefined">
        <div
          class="OrganizerLogo fl"
          @click="goToTaDetail(meetingData.draftsVo.meetingDetails.createPerson)"
        >
          <img
            :src="meetingData.userMeetingInfo.mainPic!=null?meetingData.userMeetingInfo.mainPic:require('../../assets/images/myFans-Mask.png')"
          >
        </div>
        <div class="OrganizerNameBox fl">
          <h4 class="OrganizerName">{{meetingData.userMeetingInfo.name}}</h4>
          <div class="OrganizerInfo">
            <span>{{meetingData.userMeetingInfo.meetingCount}}会议</span>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
            <span>{{meetingData.userMeetingInfo.fensCount}}粉丝</span>
          </div>
        </div>
        <!-- {{meetingData.userMeetingInfo.isMyFollow}} -->
        <div
          class="attentionBtn fr"
          :class="meetingData.userMeetingInfo.isMyFollow==1?'no-attent':'is-attent'"
          @click="followCompany(meetingData.draftsVo.meetingDetails.createPerson)"
        >{{meetingData.userMeetingInfo.isMyFollow==1?'已关注':'关注'}}</div>
      </div>

      <div style="border-bottom:5px solid rgb(245, 245, 245); ">
        <tab
          active-color="#fe666b"
          default-color="#a0a0a0"
          custom-bar-width="23%"
          :line-width="2"
          v-model="tabsIndex"
        >
          <tab-item
            v-for="(tabs,index) in tabMunes"
            :key="index"
            :selected="tabTitle === tabs"
            @on-item-click="tabClick(index)"
          >{{ tabs }}</tab-item>
        </tab>
        <div
          v-if="tabsIndex==0"
          class="showMeetingContent padlr"
          :style="{height:showAll?'230px':'100%',}"
        >
          <div class="padlr" v-html="meetingContent">
            <!-- <h1 style="text-align:center;color:#E61634">穿越迷茫,慢行的智慧</h1>
            <h2 style="text-align:center">第三届（2018）中国不动产资产管理峰会暨资管新势力年度颁奖盛典</h2>这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容 这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容 这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容 这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容
            <p
              style="width:100%;height:250px;background:#000;color:#fff;line-height:250px;text-align:center;font-size:2rem;"
            >这里是张图片</p>-->
            <!-- {{meetingContent}} -->
          </div>
          <div class="bottomMarkBox">
            <div class="bottomMark"></div>
            <div class="bottomMarkTitle" @click="showAll =!showAll">
              {{showAll?'展开详情':'收起详情'}}
              <x-icon v-if="showAll" type="ios-arrow-down" size="15"></x-icon>
              <x-icon v-if="!showAll" type="ios-arrow-up" size="15"></x-icon>
            </div>
          </div>
        </div>
        <div v-if="tabsIndex==1" class="showMeetingContent">
          <div class="noData-default" v-if="meetingData.draftsVo.meCompanyList.guestList.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无嘉宾</p>
          </div>

          <div class="padlr">
            <!-- 这里是会议嘉宾 -->
            <!-- {{meetingData.draftsVo.meCompanyList.guestList}} -->
            <ul class="guest-boxList">
              <li
                v-for="(guest,index) in meetingData.draftsVo.meCompanyList.guestList"
                :key="index"
              >
                <img
                  :src="guest.mainPic!=null?guest.mainPic:require('../../assets/images/myFans-Mask.png')"
                >
                <h4>{{guest.name}}</h4>
                <p>{{guest.technical}}</p>
                <p>{{guest.company}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="tabsIndex==2" class="showMeetingContent padlr">
          <div
            class="noData-default"
            v-if="meetingData.draftsVo.meCompanyList.partnerList.length==0"
          >
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无合作伙伴</p>
          </div>

          <div class="padlr">
            <ul class="meCompany-boxList">
              <li
                v-for="(meCompany,index) in meetingData.draftsVo.meCompanyList.partnerList"
                :key="index"
              >
                <!-- {{meCompany}} -->
                <img
                  :src="meCompany.mainPic!=null?meCompany.mainPic:require('../../assets/images/myFans-Mask.png')"
                >
                <h4>{{meCompany.name}}</h4>
              </li>
            </ul>

            <!-- 这里是合作单位 -->
            <!-- {{meetingData.draftsVo.meCompanyList.partnerList}} -->
          </div>
        </div>
      </div>

      <div class="meetingRegListBox padlr">
        <div class="meetingRegListTitle">
          <h4 class="RegListTitle fl">已报名</h4>
          <div class="RegListPeopleNumBox fr">
            <div class="Reg-PeopleNum">
              {{orderPersonNum}}人
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>
        </div>

        <ul class="RegListUl">
          <li class="orderPeople-nodata" v-if="orderPersonNum==0">暂无人报名</li>
          <li v-for="(orderP,index) in orderPeople" :key="index" class="orderPeopleList">
            <img
              :src="orderP.mainPic?orderP.mainPic:require('../../assets/images/myFans-Mask.png')"
            >
            <p>{{orderP.name}}</p>
          </li>
        </ul>
      </div>

      <div class="meetingAssessBox padlr">
        <div class="meetingRegListTitle">
          <h4 class="RegListTitle fl">会友评价</h4>
          <div class="RegListPeopleNumBox fr">
            <div class="Reg-PeopleNum">
              {{CommentVo.totalCount}}条
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>
        </div>
        <ul>
          <li
            class="orderPeople-nodata"
            v-if="CommentVo.meetingCommentVoList&&CommentVo.meetingCommentVoList.length==0"
          >暂无评论</li>
          <li v-for="(comment,index) in CommentVo.meetingCommentVoList" :key="index" v-if="index<3">
            <div class="meetingAssessListbox">
              <div class="meetingAssess fl">
                <img
                  :src="comment.meetingComment.userPic?comment.meetingComment.userPic:require('../../assets/images/myFans-Mask.png')"
                >
              </div>
              <div class="meetingAssessCenten fl">
                <div class="meetingAssessnameBox">
                  <h4 class="meetingAssessname fl">{{comment.meetingComment.userName}}</h4>
                  <time class="meetingAssessTime fr">{{comment.meetingComment.createTime}}</time>
                </div>
                <!-- {{comment.meetingComment.score}} -->
                <!-- <rater v-model="comment.meetingComment.score" disabled></rater> -->
<span v-for="(itemClass,index) in itemClasses(comment.meetingComment.score)" :key="index" :class="itemClass" class="star-item" track-by="index"></span>
    <!-- <div class="evaStar">
<ul class="star">
<li v-for="(itemClass,index) in itemClasses(comment.meetingComment.score)" :class="itemClass" :key="index"
@click="stars(index)" 
 class="star-item"
 track-by="index">
 </li>

</ul>
</div> -->
                <p>{{comment.meetingComment.content}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="meetingAssessBox padlr">
        <div class="meetingRegListTitle">
          <h4 class="RegListTitle fl">为您推荐</h4>
          <div class="RegListPeopleNumBox fr">
            <ul class="tabMeetingListUl">
              <li
                v-for="(comment,index) in goodData"
                :key="index"
                class="tabMeetingList"
                @click="gotoDetil(comment.id)"
              >
                <!-- {{comment}} -->

                <div>
                  <div class="tabMeetingImg fl">
                    <span
                      v-for="(img,index) in comment.meetingFileList"
                      :key="index"
                      v-if="img.belong==1"
                    >
                      <img
                        :src="img.fileUrl==null?require('../../assets/images/myFans-Mask.png'):img.fileUrl"
                      >
                    </span>
                  </div>
                  <div class="tabMeetingTextBox fl">
                    <h4 class="tabMeetingTextTitle">{{comment.theme}}</h4>
                    <div class="tabMeetingTime">
                      <span>{{comment.beginTime}}</span>
                      <span>{{comment.region}}</span>
                    </div>
                    <div class="tabMeetingTagBox">
                      <div class="tabMeetingTag fl">
                        <span v-if="comment.status==2" class="IsOver">已结束</span>
                        <span
                          v-else-if="comment.status==3 || comment.status==1"
                          class="processing"
                        >进行中</span>
                        <span v-else-if="comment.status==0" class="notStarted">未开始</span>
                      </div>
                      <div class="tabMeetingNum fr">{{comment.msg}}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div class="site-room-dropDown" v-if="pageshow" @click="loadMore">
              查看更多推荐
              <x-icon type="ios-arrow-right" class="site-icon-down" size="20"></x-icon>
            </div>
            <div class="site-room-dropDown1" v-if="!pageshow">
              <!-- 数据已加载完 -->
              <divider>数据已加载完</divider>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-transfer-dom class="gotoLiginChange">
      <confirm
        v-model="showConfirm"
        title="您还没有登录"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        confirm-text="去登录"
      >
        <!-- @on-show="onShow"
        @on-hide="onHide"-->
        <p style="text-align:center; color:#000;">是否先去登录</p>
      </confirm>
    </div>

    <toast
      v-model="toastInfo.showPositionValue"
      width="10em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>


   

  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,
  isLogin,
  transDate,
  timeLimit
} from "../../assets/lib/myStorage.js";
import {
  Sticky,
  Flexbox,
  Swiper,
  Tab,
  TabItem,
  Actionsheet,
  FlexboxItem,
  XDialog,
  Popup,
  Rater,
  TransferDomDirective as TransferDom,
  Toast,
  Loading,
  Divider,
  Confirm
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Sticky,
    Flexbox,
    Swiper,
    FlexboxItem,
    Tab,
    TabItem,
    XDialog,
    Actionsheet,
    Popup,
    Rater,
    Toast,
    Loading,
    Divider,
    Confirm
  },
  name: "meetDetail",
  data() {
    return {
      showConfirm: false,
      pageshow: true,
      goodData: [],
      IsColl: 2,
      show2: false,
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      CommentVo: {},
      orderPersonNum: 0,
      orderPeople: [],
      meetingContent: "",
      meetingData: null,
      Support: false,
      showDialogStyle: false,
      showAdvisory: false,
      advisoryMenus: {
        Tel: "电话咨询",
        Online: "在线咨询"
      },
      phone: "13051365985",
      showAll: true,
      showHideOnBlur: false,
      swiperType: "img",
      demo01_index: 0,
      addressTitle: "默认地址为空",
      SImgList: [],
      SVideoList: [],
      count: 5,
      pageNum: 1,
      showSpace: false,
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),
      tabsIndex: 0,
      tabMunes: ["会议详情", "会议嘉宾", "合作伙伴"],
      tabTitle: "会议详情",
      score: 2,
      SupportObj:{},
    };
  },

  computed: {
    
  },
 
  methods: {
    SupportChange(obj){
      this.Support = true;
      this.SupportObj = obj
    },
    //计算评论星星属性
    itemClasses(scoreInd) {
      let result = []; // 返回的是一个数组,用来遍历输出星星
      let score = Math.floor(scoreInd * 2) / 2; // 计算所有星星的数量
      let hasDecimal = score % 1 !== 0; // 非整数星星判断
      let integer = Math.floor(score); // 整数星星判断
      for (let i = 0; i < integer; i++) {
        // 整数星星使用on
        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
      }
      if (hasDecimal) {
        // 非整数星星使用half
        result.push("half"); // 类似
      }
      while (result.length < 5) {
        // 余下的用无星星补全,使用off
        result.push("off");
      }
      return result;
    },
     stars(index) {
      this.score = index + 1;
    },

    onCancel() {},
    onConfirm(msg) {
      this.$router.push("/login");
    },
    // 加载更多周边推荐
    loadMore() {
      let goodObj = {
        params: {
          currentPage: ++this.pageNum,
          pageSize: this.count
        }
      };
      // console.log(goodObj)
      getDataInfo(
        "get",
        "meetingdetails/meetingdetailsListByGoodMeeting",
        goodObj
      ).then(res => {
        // console.log(res)
        if (res.data.code == 200) {
          if (res.data.data.meetingShowList.length == 0) {
            this.pageshow = false;
          }
          this.goodData = [...this.goodData, ...res.data.data.meetingShowList];
        }
      });
    },

    godown() {
      window.location.href = "https://www.pgyer.com/NSM9";
    },
    gotoDetil(id) {
      // console.log(id)
      this.$router.push({
        path: "/meetDetail/" + id,
        query: { meetingId: id }
      });

      this.$router.go(0);
    },
    //处理时间范围
    getTimeLimit(beginTime, endTime) {
      if (beginTime || endTime) {
        return timeLimit(beginTime, endTime);
      }
    },
    //跳转报名参会页面
    gotoTiaket() {
      if (isLogin()) {
        this.$router.push({
          path: "/ticket",
          query: { meeting_id: this.$route.query.meetingId }
        });
      } else {
        this.$router.push("/login");
        // console.log('去登录')
      }
    },
    //点击收藏或者取消收藏
    Collection() {
      if (isLogin()) {
        let detailId = this.$route.query.meetingId;
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
                  // console.log("登录");
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
                  // console.log("登录");
                }
              }
            );
          });
        }
      } else {
        this.showConfirm = true;

        // console.log("登录");
      }
    },

    //跳转他的详情页面
    goToTaDetail(id) {
      this.$router.push("/tadetail/" + id);
      // console.log(id)
    },

    //过滤封面图片和视频、附件
    processImgType(type, arr) {
      // console.log(arr);
      // switch(type){
      //   case 0:
      //   return arr.filter(e=>{
      //     return e.type == 0;
      //   })
      //   break;
      // }
    },
    //检查是否认证
    idensChange(typeNum, arr) {
      if (arr.indexOf(typeNum) != -1) {
        return true;
      } else {
        return false;
      }
    },
    //点击关注或取消关注承办方
    followCompany(id) {
      if (isLogin()) {
        if (this.meetingData.userMeetingInfo.isMyFollow == 1) {
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
                this.meetingData.userMeetingInfo.isMyFollow = 2;
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
                this.meetingData.userMeetingInfo.isMyFollow = 1;
              } else if (res.data.code == 400 || res.data.code == 100101) {
                setTimeout(function() {
                  _that.$router.push("/login");
                }, 500);
              }
            });
          });
        }
      } else {
        this.showConfirm = true;

        //  this.$router.push("/login");
      }
    },
    //筛选承办方主办方
    comTypeList(str) {
      // let arr = [];
      switch (str) {
        case "主办单位":
          return this.meetingData.draftsVo.companyTypeList.filter(e => {
            return e.companyType == "主办单位";
          })[0].companyNameList;
          break;
        case "承办单位":
         return this.meetingData.draftsVo.companyTypeList.filter(e => {
            return e.companyType == "承办单位";
          })[0].companyNameList;
          break;
        default:
         return this.meetingData.draftsVo.companyTypeList.filter(e => {
            return e.companyType != "承办单位" && e.companyType != "主办单位";
          });
         
          break;
      }
    
    },

    //获取详情数据
    getMeetingData() {
      // console.log(this.$route.query.meetingId)
      //获取详情数据
      this.show2 = true;
      let _that = this;
      // console.log(this.$route.query.meetingId);
      // console.log(getStorage("userToken").userId);

      //判断当前登录状态来获取收藏状态
      if (isLogin()) {
        let Obj = {
          params: {
            target: this.$route.query.meetingId,
            userId: getStorage("userToken").userId
          }
        };
        checkToken().then(Pdata => {
          getDataInfo("get", "reCollection/isCollection", Obj).then(res => {
            // console.log(res)
            if (res.data.code == 200) {
              this.IsColl = res.data.data;
            } else if (res.data.code == 400 || res.data.code == 100101) {
              // console.log("登录");
            }
          });
        });
      }

      let detailObj = {
        params: {
          id: this.$route.query.meetingId
        }
      };

      if (isLogin()) detailObj.params.userId = getStorage("userToken").userId;
      getDataInfo("get", "meetingdetails/meetingDetailsById", detailObj).then(
        res => {
          //  console.log(res)
          if (res.data.code == 200) {
            this.meetingData = res.data.data;
            let imgArr = [],
              videoArr = [];
            res.data.data.draftsVo.meetingDetails.meetingFileList.forEach(e => {
              if (e.fileType == 0) {
                imgArr.push({
                  url: "javascript:",
                  fileType: e.fileType,
                  img: e.fileUrl,
                  fileId: e.fileId,
                  belong: e.belong,
                  createUser: e.createUser,
                  mdId: e.mdId,
                  title: e.bucketName
                });
              } else if (e.fileType == 1) {
                videoArr.push({
                  url: "javascript:",
                  fileType: e.fileType,
                  img: e.fileUrl,
                  fileId: e.fileId,
                  belong: e.belong,
                  createUser: e.createUser,
                  mdId: e.mdId,
                  title: e.bucketName
                });
              }
            });
            // console.log(videoArr)
            this.SImgList = imgArr;
            this.SVideoList = videoArr;

            //获取会议详情介绍

            let SitObj = {
              params: {
                mdId: this.$route.query.meetingId
              }
            };

            if (getStorage("userToken"))
              SitObj.params.userId = getStorage("userToken").userId;
            getDataInfo("get", "meetingdetails/meetingSituation", SitObj).then(
              res => {
                // console.log(res);
                if (res.data.code == 200) {
                  this.show2 = false;
                  this.meetingContent = res.data.data.content;
                }
              }
            );
          } else if (res.data.code == 401) {
            this.show2 = false;

            this.toastInfo = {
              showMsg: "当前会议已删除",
              showPositionValue: true,
              toastType: "cancel"
            };
            setTimeout(function() {
              _that.$router.push("/meeting");
            }, 1000);
          }
        }
      );

      //获取已报名人数
      let personObj = {
        params: {
          mdId: this.$route.query.meetingId,
          currentPage: 0,
          pageSize: 999999
        }
      };
      getDataInfo(
        "get",
        "ordermeeting/ordermeeting/person/list",
        personObj
      ).then(res => {
        if (res.data.code == 200) {
          //  this. personData = res.data.data.content
          this.orderPersonNum = res.data.data.orderPersonNum;
          this.orderPeople = res.data.data.orderPeople;
        }
      });
      //获取评价

      let assessObj = {
        params: {
          mdId: this.$route.query.meetingId,
          type: 1,
          currentPage: 0,
          pageSize: 3
        }
      };
      getDataInfo("get", "meetingcomment/meetingcomment", assessObj).then(
        res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.CommentVo = res.data.data;
          }
        }
      );
      //获取为您推荐
      let goodObj = {
        params: {
          currentPage: this.pageNum,
          pageSize: this.count
        }
      };
      // console.log(obj.counter)
      getDataInfo(
        "get",
        "meetingdetails/meetingdetailsListByGoodMeeting",
        goodObj
      ).then(res => {
        if (res.data.code == 200) {
          this.goodData = res.data.data.meetingShowList;
        }
      });
    },
    spaceChange() {
      this.showSpace = !this.showSpace;
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky();
      });
    },
    tabClick(index) {
      // this.infoTab = !this.infoTab
      // console.log(index);
    },
    showAdBullet() {
      this.showHideOnBlur = false;
      let _that = this;
      setTimeout(function() {
        _that.showHideOnBlur = false;
      }, 3000);
    },
    //点击拨打号码
    callPhone() {
      window.location.href = "tel://" + this.phone;
    },
    //弹出显示咨询菜单
    advisoryClick(key) {
      if (key == "Tel") {
        this.callPhone();
      } else if (key == "Online") {
        // alert('在线咨询')
        // this.showDialogStyle = true;
        // console.log(this.meetingData.draftsVo.meetingDetails.createPerson)
        if (isLogin()) {
          this.$router.push({
            path:
              "/dialog/" +
              this.meetingData.draftsVo.meetingDetails.createPerson,
            query: {
              dialogId: this.meetingData.draftsVo.meetingDetails.createPerson
            }
          });
        } else {
          this.showConfirm = true;
          // alert("请先登录");
        }
      }
    }
  },
  mounted() {
    this.getMeetingData();
    this.showAdBullet();
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.weui-mask {
  z-index: 9998 !important;
}
.weui-dialog {
  z-index: 9999 !important;
}

.space-btn {
  padding: 5px 0;
  margin: 10px;
  text-align: center;
  border: 1px red solid;
}

.space {
  padding: 30px 0;
  margin: 10px;
  text-align: center;
  border: 1px green solid;
}
.dialog-demo {
  .weui-mask {
    z-index: 9998;
  }
  .weui-dialog {
    z-index: 9999;
    background: transparent;
    margin-top: 12rem;
    text-align: center !important;
  }
}

.weui-mask_transparent {
  z-index: 9998 !important;
}
.weui-actionsheet {
  z-index: 9999 !important;
}

.vux-popup-dialog {
  z-index: 9998 !important;
  background: rgba(255, 255, 255, 0.93) !important;
}

.gotoLiginChange {
  .weui-dialog__hd {
    text-align: center;
  }
  .weui-dialog__btn {
    text-align: center;
  }
  .weui-dialog__btn_primary {
    color: #007aff !important;
  }
}



</style>


