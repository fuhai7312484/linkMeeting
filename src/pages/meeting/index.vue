<template>
<div class="box">

  <div class="siteHeaderBox">
      <h3 class="fl siteHeaderTitle">找会议</h3>
      <router-link tag="div" class="fl siteCity" to="/city">
      {{city}}
        <i class="el-icon-caret-bottom"></i>
      
      </router-link>
     

<div class="siteListIcosBox fr">

      <router-link tag="div" to="siteSearch" class="fl HeaderSearch" >
        <img src="../../assets/images/HeaderSearch.png">
        </router-link>
         <!-- @click="gotoMapChange" -->
       <div class="fr HeaderSearch">
        <img src="../../assets/images/b-map-position.png">
      </div>


</div>
    </div>
<!-- 
<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
      <tab :line-width=1>
        <tab-item :selected="demo4 === item" v-for="(item, index) in list4" @click="demo4 = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky> -->


         <sticky :check-sticky-support="false" :offset="0">
             <div class="meeting-tabBox">
             <div class="meeting-tab fl">
        <tab
          active-color="#fe666b"
          default-color="#a0a0a0"
          custom-bar-width="33%"
          v-model="tabsIndex"
          :line-width="2"

         
        
        >
          <tab-item
            v-for="(tabs,index) in tabMunes"
            :key="index"
            :selected="tabTitle === tabs"
            @on-item-click="tabClick(index)"
            >{{ tabs }}</tab-item
          >
        </tab>

             </div>
      
        <div class="meetingfilterIcon fl">
            <img src="../../assets/images/meetingfilterIcon.png">
        </div>
        </div>
      </sticky>
      <div v-if="tabsIndex==0">
<!-- {{tabsIndex}} -->

 <swiper :list="baseList"
  loop auto 
 :show-desc-mask="false" 
 dots-position="center"
 v-model="demo01_index" @on-index-change="demo01_onIndexChange" class="meeting-swiperBox"></swiper>

<div class="meetingIndexConten padlr">
<div class="meetingIcons">
 <div class="meetingIconBox fl" v-for="(i,index) in 10" :key="index">
      <div class="meetingIcon-img">
      <img class="meetingIcon-content" src="../../assets/images/icon_Internet.png"/>
      </div>
      <p>IT互联网</p>

  </div>

    
</div>


</div>

      </div>

      <div v-if="tabsIndex==1" class="padlr">
{{tabsIndex}}


      </div>

 <!-- <br v-for="i in 40"> -->


 <footer-nav>


</footer-nav>

</div>
    
</template>

<script>
import {mapState} from 'vuex'
import { Tab, TabItem, Sticky,Swiper} from 'vux'
import FooterNav from "@/components/footerNav";
export default {
name:'MeetingIndex',
  components: {
    Tab,
    TabItem,
    Sticky,
    FooterNav,Swiper
    },
data(){
return {
  
     tabMunes: ["推荐", "关注", "IT互联网", "创业", "科技","创业", "科技"],
        tabTitle: "推荐",
    tabsIndex:0,
    baseList:[{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}],
   demo01_index: 0,
}
},
   computed:{
          ...mapState(['city']),
          },
           methods: {
      tabClick(index) {
        // this.infoTab = !this.infoTab
       
      },
      demo01_onIndexChange (index) {
      this.demo01_index = index
    },
      }

}
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";



</style>
