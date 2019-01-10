<template>
  <div class="box">



    <div class="footer">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="1/6" :order="1">
          <div class="footer-nav-icons">
        <span> <img src="../../assets/images/like.png" /></span>
          点赞
        </div></flexbox-item>
        <flexbox-item :span="1/6" :order="2">
          <div class="footer-nav-icons">
              <span> <img src="../../assets/images/collection-a.png" /></span>
            收藏</div>
        </flexbox-item>
        <flexbox-item :span="1/6" :order="3">
          <div class="footer-nav-icons">
              <span> <img src="../../assets/images/comment.png" /></span>
            评论</div></flexbox-item>
        <flexbox-item :span="1/2" :order="4"
          ><div class="footer-nav-destineBtn" @click="goAnchor('#anchor')">立即预定</div></flexbox-item
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
        <flexbox-item :span="4/5"
          ><h3 class="site-flex-title">北京昆泰国际酒店</h3></flexbox-item
        >
        <flexbox-item :span="1/5">
          <div class="site-flex-v">
            <img :src="require('../../assets/images/v.png')" />认证
          </div></flexbox-item
        >
      </flexbox>
      <flexbox :gutter="0" class="linH padlr">
        <flexbox-item class="listContent-tagbox">
          <span class="listContent-Ttags"> 五星酒店 </span>
          <span class="listContent-tags"> 餐饮 </span>
          <span class="listContent-tags"> 游泳 </span>
        </flexbox-item>
      </flexbox>

      <flexbox class="linH padlr">
        <flexbox-item
          ><div class="flex-demo">
            营业时间：周一至周日 09:00-21:00
          </div></flexbox-item
        >
      </flexbox>
      <grid
        :show-vertical-dividers="false"
        :show-lr-borders="false"
        class="padlr"
      >
        <grid-item>
       
          <img slot="icon" src="../../assets/images/siteicon.png" />
           <span class="siteAmountTitle" slot="label">会场/场地</span>
          <span class="siteAmount">60间</span>
        </grid-item>

     

        <grid-item>
          <img slot="icon" src="../../assets/images/siteicon.png" />
           <span class="siteAmountTitle" slot="label">最大面积</span>
          <span class="siteAmount">500㎡</span>
        </grid-item>

        <grid-item>
          <img slot="icon" src="../../assets/images/siteicon.png" />
           <span class="siteAmountTitle" slot="label">最多容纳</span>
          <span class="siteAmount">1800人</span>
        </grid-item>
      </grid>

      <group>
        <cell
          is-link
          class="potR"
          :border-intent="false"
          inline-desc="朝阳区 CBD商圈 建外大街650米"
        >
          <div slot="title">
            <div class="addressTitle">{{ addressTitle }}</div>
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
          />
        </cell>
      </group>

      <group title="联系我们" class="site-onPhoneBox-title">
        <ul class="site-conPhone padlr">
          <li>
            <span>138****2456</span> <span>张先森</span>
            <span
              ><img width="15" :src="require('../../assets/images/phone.png')"
            /></span>
            <span
              ><img width="15" :src="require('../../assets/images/msg.png')"
            /></span>
          </li>
          <li>
            <span>138****2456</span> <span>张先森</span>
            <span
              ><img width="15" :src="require('../../assets/images/phone.png')"
            /></span>
            <span
              ><img width="15" :src="require('../../assets/images/msg.png')"
            /></span>
          </li>
        </ul>
      </group>
    </div>

    <div class="borBottm padlr">
      <flexbox class="site-room-title">
        <flexbox-item :span="1/3"
          ><h3 id="anchor">会议室</h3>
          <span> {{ roomData.length }}间</span></flexbox-item
        >
      </flexbox>

      <div class="site-room-listBox">
        <div
          v-for="(roomItme, index) in showdetailList"
          :key="index"
          class="site-room-list"
        >
          <flexbox>
            <flexbox-item :span="1/4" class="site-room-imgBox">
              <img :src="roomItme.img" />
            </flexbox-item>

            <flexbox-item :span="3/4">
              <flexbox>
                <flexbox-item :span="1.8/3"
                  ><h4 class="site-room-title">
                    {{ roomItme.title }}-A{{ index + 1 }}
                  </h4></flexbox-item
                >
                <flexbox-item :span="1.1/3"
                  ><div class="site-room-price">
                    ¥{{ roomItme.price }}<span>起</span>
                  </div></flexbox-item
                >
              </flexbox>
              <flexbox>
                <flexbox-item
                  ><div class="site-room-TagInfo">
                    <span>{{ roomItme.proportion }}</span>
                    <span>{{ roomItme.distance }}</span>
                    <span>{{ roomItme.hold }}</span>
                  </div></flexbox-item
                >
                <flexbox-item></flexbox-item>
              </flexbox>
              <flexbox>
                <flexbox-item :span="3/4">
                  <div class="site-room-timesBox">
                    <div
                      v-for="(rootTime,index) in roomItme.times"
                      :key="index"
                      class="site-room-timesTag fl"
                      :class="rootTime.status==0?'timesBox-active':''"
                    >
                      <span class="fl">{{ rootTime.time }}</span>
                      <span
                        class="room-full fl"
                        :class="rootTime.status==0?'':'room-idle'"
                        >{{ rootTime.status == 0 ? "已满" : "有空" }}</span
                      >
                    </div>
                    <div class="site-room-timesTag fl">
                      <span class="fl">更多</span>
                      <span class="room-idle fl">有空</span>
                    </div>
                  </div>
                </flexbox-item>
                <flexbox-item :span="0.9/4">
                  <div class="site-room-destine">预定</div>
                </flexbox-item>
              </flexbox>
            </flexbox-item>
          </flexbox>
        </div>
      </div>

      <div class="site-room-dropDown" @click="showRoomsChange()">
        查看更多会场(<countup
          :start-val="0"
          :end-val="computeRoomDatelen"
          :duration="2"
          class="demo1"
        ></countup
        >)

        <x-icon
          v-if="roomShow"
          type="ios-arrow-up"
          class="site-icon-down"
          size="20"
        ></x-icon>
        <x-icon
          v-else-if="!roomShow"
          type="ios-arrow-down"
          class="site-icon-down"
          size="20"
        ></x-icon>
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
            >{{ tabs }}</tab-item
          >
         
        </tab>
        <div v-if="tabsIndex==0" class="site-room-Introduction">
          <p>
            北京昆泰酒店是由北京昆泰嘉豪房地产开发有限公司酒店分公司运营，坐落在世界百强企业云集的望京科技创业园区，毗邻著名的北京第二CBD“大望京商圈”。
          </p>
          <p>
            北京昆泰酒店是由北京昆泰嘉豪房地产开发有限公司酒店分公司运营，坐落在世界百强企业云集的望京科技创业园区，毗邻著名的北京第二CBD“大望京商圈”。
          </p>
        </div>

        <div v-else-if="tabsIndex==1">
          <div
            class="site-room-setting"
            v-for="(setting,index) in roomSettingData"
            :key="index"
          >
            <h4>{{ setting.titleName }}</h4>
            <span v-for="(SettingTags,index) in setting.tags" :key="index">{{
              SettingTags
            }}</span>
          </div>
        </div>

        <div v-else-if="tabsIndex==2">
          <div
            class="site-room-setting"
            v-for="(facility,index) in roomFacilityData"
            :key="index"
          >
            <h4>{{ facility.titleName }}</h4>
            <span v-for="(facilityTags,index) in facility.tags" :key="index">{{
              facilityTags
            }}</span>
          </div>
        </div>

        <div v-else-if="tabsIndex==3">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item v-for="i in 4" :key="i" :span="1/2">
            <div class="meetingList">
              <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg"/>
              <h4>A{{i}}-历史会议名称中国国际交流会</h4>
              <time>2018-10-26</time>

            </div>
            </flexbox-item>
           
          </flexbox>
        </div>
      </div>
    </div>

  <div class="padlr">
      <flexbox class="site-room-title">
        <flexbox-item :span="1/3"
          ><h3>会友评价</h3>
          </flexbox-item>
      </flexbox>
 <tab
          active-color="#fe666b"
          default-color="#a0a0a0"
          custom-bar-width="43%"
          v-model="assessIndex"
        >
          <tab-item
            v-for="(assess,index) in assessMunes"
            :key="index"
            :selected="assessTitle === assess"
            @on-item-click="tabClick(index)"
            >{{ assess }}({{assessLenChange(index)}})</tab-item
          >
        </tab>

        <div v-if="assessIndex==0">
          <div class="site-assess-Box" v-for="(as,index) in assessData" v-if="index<5" :key="index">
    <flexbox>
      <flexbox-item :span="1/6">
      <div class="assess-Avatar">
        <img :src="as.userAvatar" />
        </div>
        </flexbox-item>
      <flexbox-item :span="5/6">
      
      <flexbox orient="vertical" :gutter="0">
      <flexbox-item>
        <flexbox>
<flexbox-item :span="2.4/4"><h4>{{as.userName}}</h4></flexbox-item>
<flexbox-item :span="1.4/4">
<time> {{as.time}} </time>
</flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item> <rater v-model="as.star" disabled></rater></flexbox-item>
      <flexbox-item><div class="assess-content">{{as.msg}}</div></flexbox-item>
    </flexbox>
      </flexbox-item>
    </flexbox>
        </div>
</div>


     <div v-if="assessIndex==1">
          <div class="site-assess-Box" v-for="(as,index) in assessData" :key="index" v-if="as.status==1">
    <flexbox>
      <flexbox-item :span="1/6">
      <div class="assess-Avatar">
        <img :src="as.userAvatar" />
        </div>
        </flexbox-item>
      <flexbox-item :span="5/6">
      
      <flexbox orient="vertical" :gutter="0">
      <flexbox-item>
        <flexbox>
<flexbox-item :span="2.4/4"><h4>{{as.userName}}</h4></flexbox-item>
<flexbox-item :span="1.4/4">
<time> {{as.time}} </time>
</flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item> <rater v-model="as.star" disabled></rater></flexbox-item>
      <flexbox-item><div class="assess-content">{{as.msg}}</div></flexbox-item>
    </flexbox>
      </flexbox-item>
    </flexbox>
        </div>
</div>

  <div v-if="assessIndex==2">
          <div class="site-assess-Box" v-for="(as,index) in assessData" :key="index" v-if="as.status==2">
    <flexbox>
      <flexbox-item :span="1/6">
      <div class="assess-Avatar">
        <img :src="as.userAvatar" />
        </div>
        </flexbox-item>
      <flexbox-item :span="5/6">
      
      <flexbox orient="vertical" :gutter="0">
      <flexbox-item>
        <flexbox>
<flexbox-item :span="2.4/4"><h4>{{as.userName}}</h4></flexbox-item>
<flexbox-item :span="1.4/4">
<time> {{as.time}} </time>
</flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item> <rater v-model="as.star" disabled></rater></flexbox-item>
      <flexbox-item><div class="assess-content">{{as.msg}}</div></flexbox-item>
    </flexbox>
      </flexbox-item>
    </flexbox>
        </div>
</div>



  <div v-if="assessIndex==3">
          <div class="site-assess-Box" v-for="(as,index) in assessData" :key="index" v-if="as.status==3">
    <flexbox>
      <flexbox-item :span="1/6">
      <div class="assess-Avatar">
        <img :src="as.userAvatar" />
        </div>
        </flexbox-item>
      <flexbox-item :span="5/6">
      
      <flexbox orient="vertical" :gutter="0">
      <flexbox-item>
        <flexbox>
<flexbox-item :span="2.4/4"><h4>{{as.userName}}</h4></flexbox-item>
<flexbox-item :span="1.4/4">
<time> {{as.time}} </time>
</flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item> <rater v-model="as.star" disabled></rater></flexbox-item>
      <flexbox-item><div class="assess-content">{{as.msg}}</div></flexbox-item>
    </flexbox>
      </flexbox-item>
    </flexbox>
        </div>
</div>


      <div class="site-room-dropDown">
        查看更多评价(<countup
          :start-val="0"
          :end-val="assessData.length"
          :duration="2"
          class="demo1"
        ></countup
        >)
        <x-icon type="ios-arrow-right"
          class="site-icon-down"
          size="20"
        ></x-icon>
    
      </div>


 <flexbox class="site-room-title">
        <flexbox-item :span="1/3"
          ><h3>周边推荐</h3>
          </flexbox-item>
      </flexbox>

<div>
  <div class="site-room-list" v-for="(i,index) in 3" :key="index">
 <flexbox>
      <flexbox-item :span="1/4" class="site-room-imgBox">
      <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg"/>
      </flexbox-item>
      <flexbox-item :span="2/4">
<flexbox orient="vertical" :gutter="0">
 <flexbox-item>
<h4 class="site-recommend-title">北京凯宾斯基会议中心</h4>
 </flexbox-item>

 <flexbox-item>
   <flexbox>
<flexbox-item class="site-recommend-info">面积320㎡</flexbox-item>
<flexbox-item class="site-recommend-info">容纳30人</flexbox-item>
   </flexbox>
 </flexbox-item>
 <flexbox-item>
     <flexbox>
        <flexbox-item class="site-recommend-info">会场50间</flexbox-item>
        <flexbox-item class="site-recommend-info">客房10间</flexbox-item>
   </flexbox>
 </flexbox-item>

</flexbox>


      </flexbox-item>
       <flexbox-item :span="0.8/4">

       <flexbox orient="vertical">
        <flexbox-item class="site-recommend-distance">距离130米</flexbox-item>
        <flexbox-item>
           <x-button  mini plain type="warn" style="border-color:#fe666b; color:#fe666b;">询价</x-button>
          
          </flexbox-item>
   </flexbox>


   
       </flexbox-item>
    </flexbox>
</div>
</div>



         <div class="site-room-dropDown">
        查看更多推荐
        <x-icon type="ios-arrow-right"
          class="site-icon-down"
          size="20"
        ></x-icon>
      </div>
<div>
</div>
  </div>
    <div class="Placeholder"></div>
  </div>
</template>
<script>
  import {
    XHeader,
    XButton,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    Swiper,
    XAddress,
    ChinaAddressV4Data,
    Group,
    Cell,
    Timeline,
    TimelineItem,
    Tab,
    TabItem,
    Countup,
    Rater 
  } from "vux";
  export default {
    name: "siteDetail",

    components: {
      XHeader,
      Flexbox,
      FlexboxItem,
      Grid,
      GridItem,
      Swiper,
      XAddress,
      Group,
      Cell,
      Timeline,
      TimelineItem,
      XButton,
      Tab,
      TabItem,
      Countup,
      Rater 
    },
    data() {
      return {
        roomData: [
          {
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            title: "【世外桃园】洽谈会议室",
            price: "5000/半天",
            proportion: "320㎡",
            hold: "30人",
            distance: "4.2m",
            times: [
              {
                time: "明天",
                status: 0
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "http://img.zcool.cn/community/01991d5541a1d5000001a64bb80f00.jpg",
            title: "【世外桃园】中型会议室",
            price: "9000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=500816895,1453900421&fm=26&gp=0.jpg",
            title: "【世外桃园】会议大厅",
            price: "12000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            title: "【世外桃园】洽谈会议室",
            price: "5000/半天",
            proportion: "320㎡",
            hold: "30人",
            distance: "4.2m",
            times: [
              {
                time: "明天",
                status: 0
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "http://img.zcool.cn/community/01991d5541a1d5000001a64bb80f00.jpg",
            title: "【世外桃园】中型会议室",
            price: "9000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=500816895,1453900421&fm=26&gp=0.jpg",
            title: "【世外桃园】会议大厅",
            price: "12000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            title: "【世外桃园】洽谈会议室",
            price: "5000/半天",
            proportion: "320㎡",
            hold: "30人",
            distance: "4.2m",
            times: [
              {
                time: "明天",
                status: 0
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "http://img.zcool.cn/community/01991d5541a1d5000001a64bb80f00.jpg",
            title: "【世外桃园】中型会议室",
            price: "9000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=500816895,1453900421&fm=26&gp=0.jpg",
            title: "【世外桃园】会议大厅",
            price: "12000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            title: "【世外桃园】洽谈会议室",
            price: "5000/半天",
            proportion: "320㎡",
            hold: "30人",
            distance: "4.2m",
            times: [
              {
                time: "明天",
                status: 0
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "http://img.zcool.cn/community/01991d5541a1d5000001a64bb80f00.jpg",
            title: "【世外桃园】中型会议室",
            price: "9000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          },
          {
            img:
              "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=500816895,1453900421&fm=26&gp=0.jpg",
            title: "【世外桃园】会议大厅",
            price: "12000/半天",
            proportion: "520㎡",
            hold: "90人",
            distance: "7.2m",
            times: [
              {
                time: "明天",
                status: 1
              },
              {
                time: "后天",
                status: 1
              }
            ]
          }
        ],
        addressTitle: "默认地址为空",
        addressValue: [],
        addressData: ChinaAddressV4Data,
        demo01_index: 0,
        count: 5,
        roomShow: false,
        infoTab: true,
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
        tabsIndex: 0,
        tabMunes: ["会场介绍", "外部环境", "配套设施", "历史会议"],
        tabTitle: "会场介绍",
        roomSettingData: [
          {
            titleName: "交通",
            tags: [
              "机场",
              "公交站",
              "地铁站",
              "出租车",
              "多条公交线路",
              "公交站"
            ]
          },
          {
            titleName: "绿化",
            tags: ["草坪", "生态公园", "郊野公园"]
          },
          {
            titleName: "餐饮",
            tags: ["中餐厅", "西餐厅", "美食广场"]
          },
          {
            titleName: "商城",
            tags: ["万达广场", "物美超市"]
          },
          {
            titleName: "娱乐",
            tags: ["KTV", "游乐场"]
          }
        ],

        roomFacilityData: [
          {
            titleName: "招待",
            tags: ["大厅接待", "前台服务", "一站式服务", "停车位"]
          },
          {
            titleName: "休闲",
            tags: ["茶饮", "咖啡", "电影"]
          },
          {
            titleName: "健身",
            tags: ["健身", "游泳", "网球", "高尔夫"]
          },
          {
            titleName: "体验游戏",
            tags: ["真人CS", "AR游戏"]
          }
        ],
         assessIndex: 0,
        assessMunes: ["全部", "好评", "中评", "差评"],
        assessTitle: "全部",
        assessData:[
          {
            userName:"王小姐",
            time:'2018.10.03',
            star:'5',
            status:'1',
            userAvatar:'https://www.qqtouxiang.com/d/file/dongtai/2016-11-28/ed5be90cba48bb1a470fb09ca4e1c38f.gif',
            msg:'很好,服务环境都挺好的,价格也挺合适的。',

          },
           {
            userName:"李铁柱",
            time:'2018.10.02',
            star:'3',
            status:'2',
            userAvatar:'http://tupian.qqw21.com/article/UploadPic/2017-1/2017118188867920.jpg',
            msg:'还可以，这里给你个中评吧。',

          },
           {
            userName:"王钢蛋",
            time:'2018.10.01',
            star:'3',
            status:'2',
            userAvatar:'https://5b0988e595225.cdn.sohucs.com/images/20180601/f2cabd562ffe4e83b95458d863ba7271.jpeg',
            msg:'还可以，这里给你个中评吧。',

          },
           {
            userName:"王二麻子",
            time:'2018.09.03',
            star:'1',
            status:'3',
            userAvatar:'http://www.qqtouxiang.com/d/file/dongtai/2016-11-28/140d0b919802d23235ab331db1b5c741.gif',
            msg:'这是什么，有问题差评。',

          }
        ],
        raterData:'4',
        // img: require("../../assets/images/a.jpeg")
      };
    },
    methods: {
      //锚点跳转
        goAnchor(selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop; //chrome
        document.documentElement.scrollTop = anchor.offsetTop; //firefox
    },
      swiporArrListChange() {
        console.log(this.demo01_index, this.swiperType);
        // console.log(type);
      },
      //查看更多会场按钮
      showRoomsChange() {
        this.roomShow = !this.roomShow;
      },
      tabClick(index) {
        // this.infoTab = !this.infoTab
        console.log(index);
      },
      assessLenChange(index){
        switch(index){
          case 0:
          return this.assessData.length
          break;
          case 1:
          return this.assessData.filter(e=>{return e.status==1}).length
          break;
          case 2:
          return this.assessData.filter(e=>{return e.status==2}).length
          break;
           case 3:
          return this.assessData.filter(e=>{return e.status==3}).length
          break;
        }
        // console.log(index)
      },
    },
    computed: {
      showdetailList() {
        if (this.roomShow) {
          return this.roomData;
        } else {
          let arr = this.roomData.slice(0, this.count);
          return arr;
        }
      },
      computeRoomDatelen() {
        if (this.roomShow) {
          return 0;
        } else {
          // roomShow?0:roomData.length-count< 0?0:roomData.length-count
          if (this.roomData.length - this.count < 0) {
            return 0;
          } else {
            return this.roomData.length - this.count;
          }
        }
      }
    },
    watch: {
      demo01_index() {
        if (this.swiperType == "img") {
          console.log(this.demo01_index * 1 + 1, this.SImgList.length);
          if (this.demo01_index * 1 + 1 > this.SImgList.length) {
            this.swiperType = "video";
            console.log("切换视频");
          }
        }
      },
      swiperType(n, o) {
        // this.swiporArrListChange()
        // console.log(n,o)
      }
    }
  };
</script>

<style lang="less">
  @import "../../assets/style/tools.less";
  @import "../../assets/style/global.less";
  @import "~vux/src/styles/reset.less";
</style>
