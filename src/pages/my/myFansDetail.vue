<template>
  <div class="box">
    <div
      class="my-top-boxs"
      :style="{backgroundImage: 'url(' + img + ')' }"
    ></div>
    <div class="my-top-boxsMak"></div>
    <div class="my-top-boxsContent">

        <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">
        
          </x-header>

        
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
      </x-header> -->
      <div class="my-top-AvatarBox">
        <flexbox>
          <flexbox-item :span="1/3">
            <div class="my-top-Avatar">
              <img src="../../assets/images/a.jpeg" />
            </div>
          </flexbox-item>
          <flexbox-item :span="2/3">
            <div class="my-top-userNamebox">
              <flexbox orient="vertical" :gutter="0">
                <flexbox-item class="my-top-userName">
                  柳林东 <img src="../../assets/images/v.png" />
                </flexbox-item>
                <flexbox-item
                  ><div class="flex-demo">
                    中国建设集团 建造师
                  </div></flexbox-item
                >
              </flexbox>
            </div>
          </flexbox-item>
        </flexbox>

        <flexbox class="my-top-SubBtnsBox">
          <flexbox-item :span="2/3" class="my-top-SubtotalInfo">
            2 场地 | 0 会议 | 5 粉丝
          </flexbox-item>
          <flexbox-item :span="1/3">
            <div class="my-top-attention" @click="attChange" :style="{background:attention?'#FF576B':'#C8C8C8'}">{{attention?'关注':'已关注'}}</div>
          <toast 
          v-model="showPositionValue"
           :type="InfoType" 
           :time="800" 
           is-show-mask 
           :text="textInfo" 
           :position="position">
          </toast>
          </flexbox-item>
        </flexbox>
      </div>
    </div>


<!-- <sticky :check-sticky-support="false" :offset="0">
      <tab :line-width=1>
        <tab-item :selected="tabTitle === item" v-for="(item, index) in list2" @click="tabTitle = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>
    <div v-for="(i,index) in 40" :key="index">{{i}}</div> -->
<div style="height:44px;">
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
        <ul class="my-tab-swiper vux-center" ref="pubUiHF">
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
      </swiper-item>

      <swiper-item> 
        
         <ul class="my-tab-swiper vux-center" ref="parUiHF">
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


        </ul>
         </swiper-item>
     
    </swiper>
  </div>
</template>
<script>
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
        attention:false,
        swiperH:'',
        list2: ["Ta发布的", "Ta参与的"],
        TaPosted: [
          {
            type: "pub",
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            city: "北京",
            area: "朝阳地区",
            title: "昆泰国家大酒店",
            distance: "130米",
            proportion: "320㎡",
            hold: "30人",
            meetingRoom: "50间",
            guestRoom: "10间",
            tag: ["机场", "餐厅", "无柱"],
            price: "5000半天起"
          },
          {
            type: "pub",
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            city: "北京",
            area: "朝阳地区",
            title: "昆泰国家大酒店",
            distance: "130米",
            proportion: "320㎡",
            hold: "30人",
            meetingRoom: "50间",
            guestRoom: "10间",
            tag: ["机场", "餐厅", "无柱"],
            price: "5000半天起"
          },
           {
            type: "pub",
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
            city: "北京",
            area: "朝阳地区",
            title: "昆泰国家大酒店",
            distance: "130米",
            proportion: "320㎡",
            hold: "30人",
            meetingRoom: "50间",
            guestRoom: "10间",
            tag: ["机场", "餐厅", "无柱"],
            price: "5000半天起"
          },
          {
            type: "par",
            title:'2018第二届金融衍生品&风险管理论坛',
             city: "北京",
            img:
              "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
              time:'2018.10.09',
              price: "1800"
          }
        ],
         position: 'default',
      showPositionValue: false,
      textInfo:'',
      InfoType:'success',
      };
    },

    methods: {
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

       showPosition (position) {
      this.position = position
      this.showPositionValue = true
    },
    },
    mounted () {
     this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height = this.$refs.pubUiHF.offsetHeight +'px'
    },
    watch: {
      index(n,o){
        if(n==0){
this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height = this.$refs.pubUiHF.offsetHeight +'px'
        }else if(n==1){
 this.swiperH = this.$refs.swiperHeight.$el.children[0].style.height =  this.$refs.parUiHF.offsetHeight +'px'
 
        }
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
