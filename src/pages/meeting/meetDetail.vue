<template>
  <div class="box" :style="{ overflow:'hidden',}">
    <!-- <div @click="wakeApp">唤醒APP</div> -->



 <div v-transfer-dom>
      <popup v-model="Support" position="left" width="100%">
        <div class="SupportListBox">
<h3>支持单位</h3>
<ul>
<li>中国工程学会计算机学与信息学委员会</li>
<li>北京市计算机云中心</li>
<li>云计算关键技术与应用重点实验室</li>
<li>深圳维生太科技有限公司</li>
<li>中国企业创新创业专业委员会</li>
<li>中国工程学会计算机学与信息学委员会</li>
<li>北京市计算机云中心</li>
<li>云计算关键技术与应用重点实验室</li>
<li>深圳维生太科技有限公司</li>
<li>中国企业创新创业专业委员会</li>
<li>中国工程学会计算机学与信息学委员会</li>
<li>北京市计算机云中心</li>
<li>云计算关键技术与应用重点实验室</li>
<li>深圳维生太科技有限公司</li>
<li>中国企业创新创业专业委员会</li>
<li>中国工程学会计算机学与信息学委员会</li>
<li>北京市计算机云中心</li>
<li>云计算关键技术与应用重点实验室</li>
<li>深圳维生太科技有限公司</li>
<li>中国企业创新创业专业委员会</li>
</ul>
<div class="Suppor-close" >
   <span class="vux-close" @click="Support = false">  <x-icon type="ios-close-empty" size="40"></x-icon></span>
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

    <div v-transfer-dom>
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
    </div>

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
        <router-link tag="div" class="footer-nav-destineBtn" :to=" {path:'/ticket', query:{meeting_id:'123654'}}">报名参会</router-link>
          <!-- <div class="footer-nav-destineBtn">报名参会</div> -->
        </flexbox-item>
      </flexbox>
    </div>

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
        <div class="meetingAnnex">附件下载 ></div>
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

    <div class="meetingContent padlr">
      <h3 class="meeting-title">第四届中国制造强国论坛暨2018中国制造年度盛典</h3>

      <flexbox :gutter="0" class="linH">
        <flexbox-item :span="4/5" class="listContent-tagbox">
          <span class="listContent-Ttags">五星酒店</span>
          <span class="listContent-tags">餐饮</span>
          <span class="listContent-tags">游泳</span>
        </flexbox-item>
        <flexbox-item :span="1/5">
          <div class="site-flex-v">
            <img :src="require('../../assets/images/v.png')">已认证
          </div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">会议时间：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo">11-24 09:00至21:00</div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">场地地址：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
       <router-link tag="div" class="meetingdetailInfo" :to="{path:'/navmap', query:{address:'北京市朝阳区工体北路88号 国家会议',lng:116.404,lat:39.909}}">
         
            <div class="meetingdetailInfoC fl">北京市朝阳区工体北路88号 国家会议...</div>
            <div class="meetingdetailInfoIcons fr">
              <img width="20" :src="require('../../assets/images/map.png')">
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          

             </router-link>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">主办单位：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo">中国财商智慧</div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">承办单位：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo">中国财商智慧</div>
        </flexbox-item>
      </flexbox>

      <flexbox :gutter="0" class="magrTB" >
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">支持单位：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfo" @click="Support = true" >
            <div class="meetingdetailInfoBox fl">
              <div class="meetingdetailInfoA fl">中国建设集团;中国科技中心</div>
              <div class="meetingdetailInfoB fl">等6家单位</div>
            </div>
            <div class="meetingdetailInfoIcons2 fr">
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox :gutter="0" class="magrTB">
        <flexbox-item :span="1.1/5">
          <span class="meetingdetailTitles">报名费用：</span>
        </flexbox-item>
        <flexbox-item :span="3.9/5">
          <div class="meetingdetailInfoPrice">¥300～4888</div>
        </flexbox-item>
      </flexbox>
      <div class="attentionOrganizerBox">
        <div class="OrganizerLogo fl">
          <img :src="require('../../assets/images/publisher-headportrait.png')">
        </div>
        <div class="OrganizerNameBox fl">
          <h4 class="OrganizerName">中国财商智慧中国财商智慧中国财商智慧</h4>
          <div class="OrganizerInfo">
            <span>10会议</span>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
            <span>360粉丝</span>
          </div>
        </div>
        <div class="attentionBtn fr">关注</div>
      </div>

      <div></div>

      <div>
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
        <div v-if="tabsIndex==0" class="showMeetingContent" :style="{height:showAll?'230px':'',}">
          <div style="font-size:.8rem;">
            <h1 style="text-align:center;color:#E61634">穿越迷茫,慢行的智慧</h1>
            <h2 style="text-align:center">第三届（2018）中国不动产资产管理峰会暨资管新势力年度颁奖盛典</h2>这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容 这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容 这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容 这里是详情内容，是由发布会议者自行上传内容，这里生成的H5内容
            <p
              style="width:100%;height:250px;background:#000;color:#fff;line-height:250px;text-align:center;font-size:2rem;"
            >这里是张图片</p>
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
        <div v-if="tabsIndex==1" class="showMeetingContent">这里是会议嘉宾</div>
        <div v-if="tabsIndex==2" class="showMeetingContent">这里是合作单位</div>
      </div>

      <div class="meetingRegListBox">
        <div class="meetingRegListTitle">
          <h4 class="RegListTitle fl">已报名</h4>
          <div class="RegListPeopleNumBox fr">
            <div class="Reg-PeopleNum">260人
              <x-icon type="ios-arrow-right" :style="{color:'#969696'}" size="20"></x-icon>
            </div>
          </div>
        </div>

        <ul class="RegListUl">
          <li v-for="(i,index) in 40" :key="index">
            <img :src="require('../../assets/images/publisher-headportrait.png')">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
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
  TransferDomDirective as TransferDom
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
    Popup
  },
  name: "meetDetail",
  data() {
    return {
      Support:false,
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
        this.showDialogStyle = true;
      }
    },
   
  },
  mounted() {
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
  }
}

.weui-mask_transparent {
  z-index: 9998 !important;
}
.weui-actionsheet {
  z-index: 9999 !important;
}

.vux-popup-dialog{
  z-index: 9998 !important;
  background: rgba(255,255,255,.93) !important;
}
</style>


