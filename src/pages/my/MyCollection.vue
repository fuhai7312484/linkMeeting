<template>
  <div class="box">
   
 

<!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div> -->
<div>
    <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">我的收藏</h3>
          </div>
<sticky :check-sticky-support="false" :offset="0">
  
    <tab
      active-color="#fe666b"
      default-color="#a0a0a0"
      custom-bar-width="43%"
      v-model="index"
    >
      <tab-item
        @on-item-click="handler"
        :selected="tabTitle === item"
        v-for="(item,index) in list2"
        :key="index"
      >
        {{ item }}
      </tab-item>
    </tab>
    </sticky>
    </div>
    <swiper ref="swiperHeight" v-model="index" 
    :show-dots="false" 
    :style="{height:swiperH}" 
    :height="swiperH" 
    :autoheight="true" 
    :loop="true" 
    :min-moving-distance="120"  >
      <swiper-item> 
        <div ref="pubUiHF0">

 <div class="noData-default" v-if="TaPosted.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无收藏</p>
          </div>

       <!-- {{TaPosted}} -->
        <ul class="my-tab-swiper vux-center" >
         
          <li v-for="(taPos,index) in TaPosted" :key="index" @click="gotoSiteDetail(taPos.id)">
            <flexbox>
              <flexbox-item :span="1/4">
                <div class="my-tab-swiperListImg">
                  <span
                    class="my-tab-imgTag"
                    v-if="taPos.ptype!=null"
                  >{{taPos.ptype==1?'政采':taPos.ptype==2?'央采':''}}</span>
                  
 <img :src="taPos.homepagePic?taPos.homepagePic:require('../../assets/images/noimg.png')"/>

                  
                  <!-- <img :src="taPos.img" /> -->
                  </div>
              </flexbox-item>
              <flexbox-item :span="3/4">
                <div class="my-tab-listContent">
                  <h3>{{ taPos.name }}</h3>
                </div>

                <div class="my-tab-listContent mylistInfo">
                  距离:{{ taPos.distance!=null?taPos.distance+'米':'暂无距离' }} &nbsp;&nbsp;&nbsp;{{ taPos.zone?taPos.zone.name:'' }}
                </div>

                <div class="my-tab-listContent mylistInfo">
                面积:{{ taPos.area!=null?taPos.area+'㎡':'暂无面积' }} &nbsp;&nbsp;&nbsp; 容纳:{{ taPos.falleryful!=null?taPos.falleryful+'人':'暂无人数' }}
                </div>

                <div class="my-tab-listContent mylistInfo">
                  会议室:{{ taPos.count}}间 &nbsp;&nbsp;&nbsp; 内高: {{ taPos.high!=null?taPos.high+'米':''}}
                </div>
                <flexbox :gutter="0">
                    <flexbox-item :span="2/3" class="listContent-tagbox">
                    <span v-if="taPos.type!=null" class="listContent-tags sang">{{taPos.type}}</span>
                    <span
                      v-for="(tag,index) in taPos.features"
                      v-if="index<1"
                      :key="index"
                      class="listContent-tags"
                    >{{ tag.name }}</span>
                  </flexbox-item>
                  <flexbox-item :span="1/3"> <h4 style="text-align: right;">¥{{ taPos.priceHalfday!=null?taPos.priceHalfday:'0.0' }}起</h4> </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>

            <!-- <flexbox v-if="taPos.type=='par'">
              <flexbox-item :span="2/3">
                <div class="listContentPar">
                <h3> {{ taPos.title }}</h3>
                </div>
                <div class="mylistInfo">{{taPos.time}}</div>
                <h4>¥{{ taPos.price }}</h4>
              </flexbox-item>
              <flexbox-item :span="1/3"> 
              
              <div class="my-tab-parListImg">
              
                <img :src="taPos.img" />
                </div>
              
              </flexbox-item>
            </flexbox> -->
          </li>
        </ul>
         </div>
      </swiper-item>

      <swiper-item> 
        <div ref="pubUiHF1">
         <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>

<div class="noData-default" v-if="myCollData.length==0">
            <p>
              <img :src="require('../../assets/images/noData.png')">
            </p>
            <p>暂无收藏</p>
          </div>
       <ul class="tabMeetingListUl padlr"  v-if="!show2">

           <li class="tabMeetingList"
              v-for="(DataItem,index) in myCollData"
              :key="index"
              @click="gotoDetails(DataItem.id)"
            >
            
              <div>
                <!-- {{DataItem.meetingFileList}} -->
                <div class="tabMeetingImg fl">
                  <span
                    v-for="(img,index) in DataItem.meetingFileList"
                    :key="index"
                    v-if="img.belong==1"
                  >
                    <img
                      :src="img.fileUrl==null?require('../../assets/images/myFans-Mask.png'):img.fileUrl"
                    >
                  </span>
                </div>




                <div class="tabMeetingTextBox fl">
                  <h4 class="tabMeetingTextTitle">{{DataItem.theme}}</h4>
                  <div class="tabMeetingTime">
                    <span>{{CountdownTime(DataItem.beginTime)}}</span>
                    <span>{{DataItem.region}}</span>
                  </div>
                  <div class="tabMeetingTagBox">
                    <div class="tabMeetingTag fl">
                      <span v-if="DataItem.status==2" class="IsOver">已结束</span>
                      <span
                        v-else-if="DataItem.status==3 || DataItem.status==1"
                        class="processing"
                      >进行中</span>
                      <span v-else-if="DataItem.status==0" class="notStarted">未开始</span>
                    </div>
                    <div class="tabMeetingNum fr">{{DataItem.msg}}</div>
                  </div>
                </div>

              </div>
            </li>



        </ul>

</div>

         </swiper-item>
     
    </swiper>
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,meetingBeTime
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
    Toast, Loading,TransferDomDirective as TransferDom,
  } from "vux";

  export default {
    name: "MyColle",
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
        attention:false,
        swiperH:'',
        show2:true,
        list2: ["场地", "会议"],
        myCollData:[],
        TaPosted:[],
         position: 'default',
      showPositionValue: false,
      textInfo:'',
      InfoType:'success',
      };
    },

    methods: {
     CountdownTime(time) {
      // return time
      // console.log(time)
      return meetingBeTime(time);
    },
      //页面跳转
       gotoDetails(id) {
       this.$router.push({
          path: "/meetDetail/" + id,
          query: { meetingId: id }
        });

      // console.log(type,id)
    },
    gotoSiteDetail(id){
 this.$router.push({
          path: "/sitedetail/" + id,
          query: { detailId: id }
        });
    },


      handChange() {
        // console.log("11111111");
      },
      handler(index) {
        // console.log(index);
      },
      attChange(){
        if(this.attention){
              this.attention = false;
              this.InfoType = 'success'
               this.textInfo = '关注成功！'
              
              this.showPosition('middle')
              

        }else{
           this.attention = true;
            this.InfoType = 'cancel'
          this.textInfo = '已取消关注'
            this.showPosition('middle')
        }

      },
      getCollData(){
           let _that = this;
            let siteObj={
                params: {
               type:'1',
          flag:'0',
          user: getStorage("userToken").userId,
          currentPage: "1",
          pageSize: "9999"
            }
            }

      let collObj = {
        params: {
          type:'1',
          flag:'1',
          user: getStorage("userToken").userId,
          currentPage: "1",
          pageSize: "9999"
        }
      };
      // console.log(siteObj)
      checkToken().then(Pdata => {
       
              getDataInfo("get", "reCollection/reCollection", siteObj).then(resd => {
                // console.log(resd)
                if(resd.data.code==200){
                  this.TaPosted = resd.data.data
                }else if (resd.data.code == 100101) {
            _that.$router.push("/codelogin");
          }
              })


        getDataInfo("get", "reCollection/reCollection", collObj).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
     
            this.myCollData =  res.data.data;

           
            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 100101) {
            _that.$router.push("/codelogin");
          }
        });


         

              
      });
      },

       showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    },
    updated() {
this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height = this.$refs['pubUiHF'+this.index].offsetHeight +'px'
  },
    mounted () {
      this.getCollData()
    
     this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height = this.$refs.pubUiHF0.offsetHeight +'px'
    },
    watch: {
      index(n,o){
         this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =  this.$refs['pubUiHF'+n].offsetHeight +'px'
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
</style>
