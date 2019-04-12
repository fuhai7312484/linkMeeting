<template>
  <div class="DownBox" :style="{backgroundImage:'url('+require('../assets/images/downAppBg.png')+')'}">
  <div class="DownLogon">
<img :src="require('../assets/images/logo.png')" />
  </div>
  <div class="DownInfo">
    链会议是用于场地发布和预订，会议组织、报名、参会管理、内容分享等服务平台
  </div>
  <div class="DownBtns">
<div class="downIos" @click="iosChange">
<img :src="require('../assets/images/iPhone.png')"/> iPhone版下载
</div>
<div class="downAndroid" @click="AndChange">
<img :src="require('../assets/images/android.png')"/> Android版下载

</div>

  </div>
<div class="DownSlogan">
<img :src="require('../assets/images/slogen.png')"/>
</div>
  <div class="DownCopyright">
   <img :src="require('../assets/images/copyright.png')"/> 2019盈东科技
  </div>
  </div>
</template>
<script>
export default {
  name: "downApp",
 
  components: {
  
  },
  data() {
    return {
     
    };
  },
  methods: {
  iosChange(){
   window.location.href = 'com.lianhuiyi://com.lianhuiyi'
        window.setTimeout(function(){
           window.location.href = "https://itunes.apple.com/cn/app/%E9%93%BE%E4%BC%9A%E8%AE%AE/id1448444294?mt=8"; /***下载app的地址***/
        },1500)
  },
  AndChange(){
     window.location.href = 'lianhuiyi://com.chain.meeting/openwith'
         window.setTimeout(function(){
           window.location.href = "https://www.pgyer.com/0Abs"; /***打开app的协议，有安卓同事提供***/
        },1500);
  },

  },

};
</script>
<style lang="less">
.DownBox{
  width: 100%;
  height: 100vh;
  background: no-repeat left bottom;
  background-size:100%; 
  overflow: hidden;
  position: relative;
  
.DownLogon{
  text-align: center;
  margin:5rem 0 1rem 0; 
  img{
    
 width: 120px;
  }
 
}
.DownInfo{
  font-size: .9rem;
  padding: 0 2rem;
  text-align: center;
  color: #505050;
  line-height: 22px;
  box-sizing: border-box;

}
.DownBtns{
  text-align: center;
  margin-top:4rem; 
  div{
    width: 60%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin:1.5rem auto;
    border: 2px solid #FE666B;
    border-radius: 8px;
    img{
      width: 20px;
      margin-right:.2rem; 
      vertical-align: middle;
    }
  }
  .downIos{
    color: #fff;
    background: #FF576B;
  }
  .downAndroid{
     color: #FF576B;
    background: #fff;
  }
}
.DownSlogan{
  position: absolute;
  bottom: 4rem;
  left: 0;
  text-align: center;
  img{
    width: 65%;
  }
}
.DownCopyright{
  position: absolute;
  text-align: center;
  left: 0;
  bottom: .8rem;
  font-size: .6rem;
  width: 100%;
  color: #C8C8C8;
  img{
    width: 10px;
    margin-right:.2rem;
  }
}
 
}
</style>
