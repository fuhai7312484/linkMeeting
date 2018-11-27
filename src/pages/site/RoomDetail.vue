<template>
  <div class="box">
    <div class="footer">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="1/4" :order="1">
          <div class="footer-nav-FieldPlace">
            <span> <img src="../../assets/images/like.png"/></span> 联系场地方
          </div></flexbox-item
        >

        <flexbox-item :span="3/4" :order="2"
          ><div class="footer-nav-destineBtn" @click="goAnchor('#anchor')">
            立即预定
          </div></flexbox-item
        >
      </flexbox>
    </div>

    <div class="site-img-showBox">
      <swiper
        :list="swiperType=='img'?SImgList:SVideoList"
        height="240px"
        :show-desc-mask="false"
        v-model="demo01_index"
        :show-dots="false"
        :loop="true"
      >
        <div v-if="swiperType=='video'" class="video-btn-box">
          <div class="jiao"></div>
        </div>
        <div class="site-img-markBox">
          <span
            @click="swiperType='img'"
            :class="swiperType=='img'?'site-img-type':'site-img-length'"
            >照片({{ SImgList.length }})</span
          >
          <span
            @click="swiperType='video'"
            :class="swiperType=='video'?'site-img-type':'site-img-length'"
            >视频({{ SVideoList.length }})</span
          >
          <span class="site-img-length"
            >{{ demo01_index + 1 }}/{{
              swiperType == "img" ? SImgList.length : SVideoList.length
            }}</span
          >
        </div>
      </swiper>
    </div>

    <div class="site-content-box borBottm">
      <flexbox class="linH padlr">
        <flexbox-item :span="3/5"
          ><h4 class="site-flex-title">【世外桃源】会议室-C</h4></flexbox-item
        >
        <flexbox-item :span="2/5">
          <div class="site-flex-price">3000元/半天起</div></flexbox-item
        >
      </flexbox>
      <flexbox class="linH padlr">
        <flexbox-item :span="3/5"
          ><div class="site-siteFather">北京昆泰国家酒店</div></flexbox-item
        >
        <flexbox-item :span="2/5">
          <div class="site-siteFather-info">参考价</div></flexbox-item
        >
      </flexbox>

      <div class="padlr">
        <flexbox class="site-room-title">
          <flexbox-item :span="1/3"> <h4>选择时段</h4> </flexbox-item>
        </flexbox>
        <flexbox class="linH">
          <flexbox-item :span="3/5"
            ><div class="site-siteFather">2018年10月 未选择</div></flexbox-item
          >
          <flexbox-item :span="2/5">
            <div class="site-siteFather-info">
              全部日期

              <x-icon
                type="ios-arrow-right"
                class="site-icon-down"
                size="20"
              ></x-icon></div
          ></flexbox-item>
        </flexbox>
        <div class="site-TimeSlot-box">
          <ul>
            <li class="site-TimeSlot-active">
              <div class="TimeSlot-week">周三</div>
              <h3>2</h3>
              <div class="TimeSlot-price">已预订</div>
            </li>
            <li v-for="i in 14" :key="i">
              <div class="TimeSlot-week">周三</div>
              <h3>{{ i + 2 }}</h3>
              <div class="TimeSlot-price">半天¥5000</div>
            </li>
          </ul>
        </div>

        <div class="padlr">
          <grid class="TimeSlot-btnBox">
            <grid-item class="site-TimeSlot-btn"> 上午 </grid-item>
            <grid-item class="site-TimeSlot-btn"> 下午 </grid-item>
            <grid-item class="site-TimeSlot-btn "> 全天 </grid-item>
            <grid-item class="site-TimeSlot-btn"> 重选 </grid-item>
          </grid>
        </div>
      </div>
    </div>

    <div class="padlr borBottm">
      <flexbox class="site-room-title">
        <flexbox-item> <h4>基本信息</h4> </flexbox-item>
      </flexbox>
      <div class="site-room-BasicInfoBox">
        <div class="fl">所在楼层：2层</div>
        <div class="fl">柱子：无</div>

        <div class="fl">会场面积：60㎡</div>

        <div class="fl">窗户：有</div>
        <div class="fl">长宽高：50m;40m;3m</div>
      </div>
    </div>




  <div class="padlr borBottm">
      <flexbox class="site-room-title">
        <flexbox-item> <h4>布局</h4> </flexbox-item>
      </flexbox>
      <div class="site-room-layoutBox">
        <div class="room-layout fl">
          <div class="room-layout-title">剧院式</div>
          <div class="room-layout-title">
            <img width="30" :src="require('../../assets/images/icon-juyuan-big.png')"
            />
          </div>
          <div class="room-layout-remark">500人</div>
        </div>

         <div class="room-layout fl">
          <div class="room-layout-title">可调节</div>
          <div class="room-layout-title">
            <img width="30" :src="require('../../assets/images/icon-ketiao-big.png')"
            />
          </div>
          <div class="room-layout-remark"></div>
        </div>

      </div>
    </div>


  <div class="padlr borBottm">
<flexbox class="site-room-title">
        <flexbox-item> <h4>会议室设施</h4> </flexbox-item>
      </flexbox>
 <div
            class="site-room-setting"
            v-for="(setting,index) in roomFacilityData"
            :key="index"
          >
            <h4>{{ setting.titleName }}</h4>
            <span v-for="(SettingTags,index) in setting.tags" :key="index">{{
              SettingTags
            }}</span>
          </div>


  </div>

  <div class="padlr">

<flexbox class="site-room-title">
        <flexbox-item> <h4>备注</h4> </flexbox-item>
      </flexbox>
      <p class="site-room-remark">
      房间装修精致、简约，配套设施完善，住宿环境十分温馨另外酒店设有大型宴会厅及不同规格的18间会议室，专业的宴会会议策划与全程跟踪服务，精选的中西式菜单，致力于为宾客提供最高水准的服务，以求每一个细节都达到尽善尽美 

      </p>

  </div>





    <div class="Placeholder"></div>
  </div>
</template>
<script>
  import { Flexbox, FlexboxItem, Swiper, Grid, GridItem } from "vux";
  export default {
    name: "roomDetail",
    components: {
      Flexbox,
      FlexboxItem,
      Swiper,
      Grid,
      GridItem
    },
    data() {
      return {
        swiperType: "img",
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
        demo01_index: 0,
           roomFacilityData: [
          {
            titleName: "通用设施",
            tags: [
              "空调",
              "暖气",
              "有线宽带",
              "Wi-Fi"
            ]
          },
          {
            titleName: "屏幕",
            tags: ["固定投影", "移动投影", "电视屏","LED屏"]
          },
          {
            titleName: "音响",
            tags: ["立体声道", "环绕立体声", "5D立体声"]
          },
          {
            titleName: "扩音",
            tags: ["无线话筒", "有线话筒", "台式话筒",]
          },
          {
            titleName: "灯光",
            tags: ["自然采光", "白织灯","彩色灯光"]
          },
           {
            titleName: "舞台",
            tags: ["移动舞台", "移动讲台","演讲台"]
          },
           {
            titleName: "其他设施",
            tags: ["白板", "宽带接口","茶/水","纸笔","桌卡","指引牌","签到台","鲜花","茶歇"]
          }
        ],
      };
    }
  };
</script>
<style lang="less">
  @import "../../assets/style/tools.less";
  @import "../../assets/style/global.less";
  @import "~vux/src/styles/reset.less";
</style>
