<template>
   <div class="footerNavBox">
<flexbox>
      <flexbox-item :span="1/6">
      
      <router-link tag="div" to="/siteindex" class="footerNavIcons">
          <span class="siteBg">
            <!-- <img :src="require('../assets/images/menu-field-red.png')"/> -->
          </span>
          场地
          </router-link>
          
          </flexbox-item>
      <flexbox-item :span="1/6">
      <router-link tag="div" to="/meeting" class="footerNavIcons">
          <span class="meetingBg">
           <!-- <img :src="require('../assets/images/menu-meeting-gray.png')"/> -->
          </span>
          会议
          </router-link></flexbox-item>
      <flexbox-item><div class="footerNavRelease">
      
          <img :src="require('../assets/images/menu-release.png')"/>
       
         
          </div></flexbox-item>
      <flexbox-item :span="1/6">

 <router-link tag="div" to="/msgindex" class="footerNavIcons">
             <span class="menuMsgBg">
            <!-- <img :src="require('../assets/images/menu-news-gray.png')"/> -->
          </span>
          消息
 </router-link>

      <!-- <div class="footerNavIcons">
            <span>
            <img :src="require('../assets/images/menu-news-gray.png')"/>
          </span>
          消息
          </div> -->

          </flexbox-item>
      <flexbox-item :span="1/6">

      <router-link tag="div" to="/myindex" class="footerNavIcons">
             <span class="menuMyBg">
            <!-- <img :src="require('../assets/images/menu-news-gray.png')"/> -->
          </span>
            我的
 </router-link>


</flexbox-item>
      
    </flexbox>
</div>
</template>
<script>
import {  Flexbox,
    FlexboxItem } from 'vux'
export default {
    name:'footerNav',
    components: {
    Flexbox,
    FlexboxItem
  },
}
</script>
<style lang="less">

</style>

