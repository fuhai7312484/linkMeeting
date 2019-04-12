<template>
  <div class="footerNavBox">
    <flexbox :gutter="0">
      <flexbox-item>
        <router-link tag="div" to="/meeting" class="footerNavIcons">
          <span class="meetingBg">
            <!-- <img :src="require('../assets/images/menu-meeting-gray.png')"/> -->
          </span>
          会议
        </router-link>
      </flexbox-item>

      <flexbox-item>
        <!-- <router-link tag="div" to="/siteindex" class="footerNavIcons">
          <span class="siteBg">
          
          </span>
          场地
        </router-link>-->
        <div class="footerNavIcons" @click="siteTip=!siteTip">
          <span class="siteBg"></span>

          场地
        </div>
      </flexbox-item>

      <flexbox-item>
      
        <router-link tag="div" to="/msgindex" @click.native="gotoMsg" class="footerNavIcons">
          <span class="menuMsgBg">
         
          </span>
          消息
        </router-link>
      </flexbox-item>
      <flexbox-item>
      
        <router-link tag="div" to="/myindex"  @click.native="gotoMyIndex" class="footerNavIcons">
          <span class="menuMyBg">
           
          </span>
          我的
        </router-link>
      </flexbox-item>
    </flexbox>

    <x-dialog v-model="siteTip" class="dialog-demo" hide-on-blur>
      <div class="footNavBialogBox">


        <div class="TermsCloseBox" @click="siteTip=false">
          <span class="TermsClose">
            <x-icon type="ios-close-empty" size="30"></x-icon>
          </span>
        </div>


        <div class="siteDevelopBox">
<div class="siteDevelopImg">
  <img :src="require('../assets/images/siteDevelopImg.png')"/>
</div>
<div class="siteDevelopTitle">
  场地模块，尽请期待
</div>
<div class="siteDevelopBtn" @click="siteTip=false">
知道了

</div>

        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import {
 setStorage
} from "../assets/lib/myStorage.js";
import { Flexbox, FlexboxItem,XDialog, TransferDomDirective as TransferDom  } from "vux";
export default {
  directives: {
    TransferDom
  },
  name: "footerNav",
  data() {
    return {
      siteTip: false
    };
  },
  components: {
    Flexbox,
    FlexboxItem,
    XDialog
  },
   methods: {
     gotoMyIndex(){
  
         let wx_Url = 'myindex'
      setStorage('wx_url',wx_Url)
       this.$router.push('/myindex')
     },
     gotoMsg(){
         let wx_Url = 'msgindex'
      setStorage('wx_url',wx_Url)
       this.$router.push('/msgindex')
     }
   }
};
</script>
<style lang="less">

</style>

