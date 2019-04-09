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
<!-- <sticky :check-sticky-support="false" :offset="0">
  
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
    </sticky> -->
    </div>
    <!-- <swiper ref="swiperHeight" v-model="index" 
    :show-dots="false" 
    :style="{height:swiperH}" 
    :height="swiperH" 
    :autoheight="true" 
    :loop="true" 
    :min-moving-distance="120"  >
      <swiper-item>  -->
        <!-- <ul class="my-tab-swiper vux-center" ref="pubUiHF">
          <li v-for="(taPos,index) in TaPosted" :key="index">
            <flexbox v-if="taPos.type=='pub'">
              <flexbox-item :span="1/4">
                <div class="my-tab-swiperListImg"><img :src="taPos.img" /></div>
              </flexbox-item>
              <flexbox-item :span="3/4">
                <div class="my-tab-listContent">
                  <h3>{{ taPos.city }}{{ taPos.title }}</h3>
                </div>

                <div class="my-tab-listContent mylistInfo">
                  距离:{{ taPos.distance }} {{ taPos.area }}
                </div>

                <div class="my-tab-listContent mylistInfo">
                  面积:{{ taPos.proportion }} 容纳:{{ taPos.hold }}
                </div>

                <div class="my-tab-listContent mylistInfo">
                  会议室:{{ taPos.meetingRoom }} 客房:{{ taPos.guestRoom }}
                </div>
                <flexbox :gutter="0">
                  <flexbox-item :span="1/2" class="listContent-tagbox">
                    <span
                      v-for="(tag,index) in taPos.tag"
                      :key="index"
                      class="listContent-tags"
                    >
                      {{ tag }}
                    </span>
                  </flexbox-item>
                  <flexbox-item :span="1/2"> <h4>¥{{ taPos.price }}</h4> </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>

            <flexbox v-if="taPos.type=='par'">
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
            </flexbox>
          </li>
        </ul>
      </swiper-item> -->

      <!-- <swiper-item>  -->
         <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>


       <ul class="tabMeetingListUl padlr" v-if="!show2">

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
                    <span>{{DataItem.beginTime}}</span>
                    <span>{{DataItem.region}}</span>
                  </div>
                  <div class="tabMeetingTagBox">
                    <div class="tabMeetingTag fl">
                      <span v-if="DataItem.status==0" class="IsOver">已结束</span>
                      <!-- <span v-else-if="DataItem.status==1" class="LiveIn">直播中</span> -->
                      <span v-else-if="DataItem.status==2 || DataItem.status==1" class="processing">进行中</span>
                      <span v-else-if="DataItem.status==3" class="notStarted">未开始</span>
                    </div>
                    <div class="tabMeetingNum fr">{{DataItem.msg}}</div>
                  </div>
                </div>
              </div>
            </li>



        </ul>




         <!-- <ul class="my-tab-swiper vux-center" v-if="!show2">
 <li v-for="(taPos,index) in TaPosted" :key="index" v-if="taPos.type=='par'">
   <flexbox>
              <flexbox-item :span="2/3">
                <div class="listContentPar">
                <h3> {{ taPos.title }}</h3>
                </div>
                <div>{{taPos.time}}</div>
                <h4>¥{{ taPos.price }}</h4>
              </flexbox-item>
              <flexbox-item :span="1/3"> 
              
              <div class="my-tab-parListImg">
             
                <img :src="taPos.img" />
                </div>
              
              </flexbox-item>
            </flexbox>

 </li>


        </ul> -->
         <!-- </swiper-item>
     
    </swiper> -->
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
         position: 'default',
      showPositionValue: false,
      textInfo:'',
      InfoType:'success',
      };
    },

    methods: {
    
      //页面跳转
       gotoDetails(id) {
       this.$router.push({
          path: "/meetDetail/" + id,
          query: { meetingId: id }
        });

      // console.log(type,id)
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
      let collObj = {
        params: {
          type:'1',
          flag:'1',
          user: getStorage("userToken").userId,
          currentPage: "1",
          pageSize: "9999"
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "reCollection/reCollection", collObj).then(res => {
          console.log(res);
          if (res.data.code == 200) {
     
            this.myCollData =  res.data.data;
            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 100101) {
            _that.$router.push("/login");
          }
        });
      });
      },

       showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    },
    mounted () {
      this.getCollData()
    //  this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height = this.$refs.pubUiHF.offsetHeight +'px'
    },
    watch: {
//       index(n,o){
//         if(n==0){
// this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height = this.$refs.pubUiHF.offsetHeight +'px'
//         }else if(n==1){
//  this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =  this.$refs.parUiHF.offsetHeight +'px'
 
//         }
//       }
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
