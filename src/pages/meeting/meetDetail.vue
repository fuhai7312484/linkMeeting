<template>
  <div class="box" :style="{ overflow:'hidden',}">
    <!-- <div @click="wakeApp">唤醒APP</div> -->
    <div v-transfer-dom>
      <popup v-model="Support" position="left" width="100%">
        <div class="SupportListBox">
          <h3>支持单位</h3>

          <ul v-if="meetingData.draftsVo!=undefined">
            <!-- {{comTypeList('支持单位')}} -->
            <li v-for="(stand,index) in comTypeList('支持单位')" :key="index">{{stand.companyName}}</li>
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
    </div> -->

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
            <div class="downLogo fl">logo</div>
            <div class="downAppTitle fl">
              <h4>链会议</h4>
            </div>
            <div class="downAppBtn fr">下载APP</div>
          </div>
        </sticky>
      </div>
    </div>

    <div class="footer">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="1/6" :order="2">
          <div class="footer-nav-icons">
            <span>
              <img src="../../assets/images/meeting-like.png">
            </span>
            收藏
          </div>
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
          <router-link
            tag="div"
            class="footer-nav-destineBtn"
            :to=" {path:'/ticket', query:{meeting_id:'123654'}}"
          >报名参会</router-link>
          <!-- <div class="footer-nav-destineBtn">报名参会</div> -->
        </flexbox-item>
      </flexbox>
    </div>
<!-- {{meetingData.draftsVo.meetingDetails.meetingFileList}} -->
    <div class="site-img-showBox" v-if="meetingData.draftsVo!=undefined">
      <!-- :list="swiperType=='img'?SImgList:SVideoList" -->
      <swiper
        :list="SImgList"
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
        <router-link tag="div" class="meetingAnnex" to="/downannex">附件下载</router-link>
        <!-- <div class="meetingAnnex">附件下载 ></div> -->
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
    </div>

    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div class="meetingContent" v-if="meetingData.draftsVo!=undefined">
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
            {{meetingData.draftsVo.meetingDetails.beginTime}}至{{meetingData.draftsVo.meetingDetails.endTime}}
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
      <flexbox :gutter="0" class="magrTB padlr" v-if="comTypeList('支持单位').length!=0">
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
                <!-- 中国建设集团;中国科技中心 -->
              </div>
              <div class="meetingdetailInfoB fl">等{{comTypeList('支持单位').length}}家单位</div>
            </div>
            <div class="meetingdetailInfoIcons2 fr">
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>
        </flexbox-item>
      </flexbox>

      <div class="attentionOrganizerBox" v-if="meetingData.userMeetingInfo!=undefined">
        <div class="OrganizerLogo fl" @click="goToTaDetail(meetingData.draftsVo.meetingDetails.createPerson)">
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
          <li class="orderPeople-nodata" v-if="orderPersonNum==0">
            暂无人报名
          </li>
          <li  v-for="(orderP,index) in orderPeople" :key="index">
            <img :src="require('../../assets/images/myFans-Mask.png')">
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
          <li class="orderPeople-nodata" v-if="CommentVo.meetingCommentVoList.length==0">
            暂无评论
          </li>
          <li v-for="(comment,index) in CommentVo.meetingCommentVoList" :key="index">
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



      
      <div class="meetingAssessBox padlr">
        <div class="meetingRegListTitle">
          <h4 class="RegListTitle fl">为您推荐</h4>
          <div class="RegListPeopleNumBox fr">
           
          </div>
        </div>



        <!-- <ul>
          <li v-for="(comment,index) in CommentVo.meetingCommentVoList" :key="index">
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
        </ul> -->
      
      </div>



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
  transDate
} from "../../assets/lib/myStorage.js";
import {
  Sticky,
  Flexbox,
  Swiper,
  Group,
  Tab,
  TabItem,
  Actionsheet,
  Cell,
  FlexboxItem,
  XDialog,
  Popup,
  Rater,
  TransferDomDirective as TransferDom,
  Toast,
  Loading
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Sticky,
    Flexbox,
    Swiper,
    Group,
    Cell,
    FlexboxItem,
    Tab,
    TabItem,
    XDialog,
    Actionsheet,
    Popup,
    Rater,
    Toast,
    Loading
  },
  name: "meetDetail",
  data() {
    return {
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
      meetingData: {},
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
      SImgList: [
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg", // 404
          title: "送你一次旅行",
          fallbackImg:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg", // 404
          title: "送你一次旅行",
          fallbackImg:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
        }
      ],
      SVideoList: [
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "这里是视频"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "这里是视频"
        }
      ],
      showSpace: false,
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),
      tabsIndex: 0,
      tabMunes: ["会议详情", "会议嘉宾", "合作单位"],
      tabTitle: "会议详情"
    };
  },
  methods: {
    //跳转他的详情页面
    goToTaDetail(id){
      this.$router.push('/tadetail/'+id)
      // console.log(id)
    },

    //过滤封面图片和视频、附件
    processImgType(type,arr){
      console.log(arr)
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
            console.log(Pdata)
            getDataInfo("delete", "refollow/follow", followObj).then(res => {
              console.log(res)
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
              // console.log(res);

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
        console.log("没登录请先登录！");
        //  this.$router.push("/login");
      }
    },
    //筛选承办方主办方
    comTypeList(str) {
      let arr = [];
      switch (str) {
        case "主办单位":
          arr = this.meetingData.draftsVo.companyTypeList.filter(e => {
            return e.companyType == "主办单位";
          })[0];
          break;
        case "承办单位":
          arr = this.meetingData.draftsVo.companyTypeList.filter(e => {
            return e.companyType == "承办单位";
          })[0];
          break;
        default:
          arr = this.meetingData.draftsVo.companyTypeList.filter(e => {
            return e.companyType != "承办单位" && e.companyType != "主办单位";
          })[0];
          break;
      }

      return arr != undefined ? arr.companyNameList : [];
    },

    //获取详情数据
    getMeetingData() {
      //获取详情数据
      this.show2 = true;

      // console.log(this.$route.query.meetingId);
      // console.log(getStorage("userToken").userId);
      let detailObj = {
        params: {
          id: this.$route.query.meetingId
        }
      };

      if (getStorage("userToken"))
        detailObj.params.userId = getStorage("userToken").userId;
      getDataInfo("get", "meetingdetails/meetingDetailsById", detailObj).then(
        res => {
          console.log(res);

          if (res.data.code == 200) {
            this.meetingData = res.data.data;
            // console.log(res.data.data.draftsVo.meetingDetails.meetingFileList)
            let imgArr = [],videoArr = [] 
            res.data.data.draftsVo.meetingDetails.meetingFileList.forEach(e => {
              if(e.fileType==0){
 imgArr.push( {
          url: "javascript:",
          fileType:e.fileType,
          img:e.fileUrl,
          fileId:e.fileId,
          belong: e.belong,
          createUser:e.createUser,
          mdId:e.mdId,
          title: e.bucketName,
        },)
              }else if(e.fileType==1){

                videoArr.push( {
          url: "javascript:",
          fileType:e.fileType,
          img:e.fileUrl,
          fileId:e.fileId,
          belong: e.belong,
          createUser:e.createUser,
          mdId:e.mdId,
          title: e.bucketName,
        },)

              }
             
            });
            // console.log(imgArr)
            this.SImgList = imgArr
            this.SVideoList = 
            this.show2 = false;
          }
        }
      );

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
            this.meetingContent = res.data.data.content;
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
        // console.log(res);
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
    },
    spaceChange() {
      this.showSpace = !this.showSpace;
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky();
      });
    },
    tabClick(index) {
      // this.infoTab = !this.infoTab
      console.log(index);
    },
    showAdBullet() {
      this.showHideOnBlur = true;
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
        if(isLogin()){
 this.$router.push({path: '/dialog/'+this.meetingData.draftsVo.meetingDetails.createPerson, query:{dialogId: this.meetingData.draftsVo.meetingDetails.createPerson}})
        }else{
          alert('请先登录')
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
</style>


