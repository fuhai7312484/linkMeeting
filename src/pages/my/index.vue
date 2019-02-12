<template>
  <div class="box">
    <!-- {{myData}} -->
     <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>
    <div v-if="!show2">
    <div class="my-UserInfoBox padlr">

      <router-link tag='div' to="/detailsList" class="my-Homepage">
      我的主页
      </router-link>

 <router-link tag="div" class="my-UserInfoAvatar fl" to="/myInfo">
 
 <img :src="myData.mainPic" />
 
 </router-link>


<div class="my-UserInfoName fl">
<router-link tag='h3' to="/myInfo">{{myData.name}}</router-link>
<span>
  <img src="../../assets/images/v.png" />已认证
</span>

</div>
    </div>
<div class="my-CollectionBox">
  <router-link tag="div" to="/mycolle" class="my-CollectionIcos fl">
   <span>
      <img src="../../assets/images/my-Collection.png" />
    
    </span>
我的收藏
  
  </router-link>
 
 <div class="my-CollectionIcos fl">
    <span>
         <img src="../../assets/images/my-Attention.png" />
    
    </span>
我关注的
  </div>
   <div class="my-CollectionIcos fl">
    <span>
       <img src="../../assets/images/my-Fan.png" />
     
    </span>
我的粉丝
  </div>
  

</div>




    <group class="my-navList">
      <cell is-link title="场地订单" link="/"></cell>
      <cell is-link title="会议票券" link="/"></cell>
       <cell is-link title="浏览记录" link="/"></cell>
      <cell is-link title="用户反馈" link="/"></cell>
       <cell is-link title="设置" link="/"></cell>
    </group>
<br/><br/>
</div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import {
  getDataInfo,
  setCookie,
  getStorage,
  getCookie,
  checkToken,
 
} from "../../assets/lib/myStorage.js";
import {Group,Cell,Loading, TransferDomDirective as TransferDom } from 'vux'
import FooterNav from "@/components/footerNav";
// import axios from "axios";
export default {
  name: "MyIndex",
  data() {
    return {
      myData: {},
      isRefreshing: true,
      show2: true,
       text1: 'Processing'
    };
  },
   directives: {
    TransferDom
  },
  components: {
    FooterNav,
    Loading,
   Group,
    Cell
  },
  methods: {
    getMyData() {
      let _that = this;
      // this.show2 = true;
      let token = getCookie("accessToken");
      let userObj = {
        params: {
          id: getStorage("userToken").userId
        }
      };
    
      checkToken().then(Pdata => {
        // console.log(Pdata)
        getDataInfo("get", "user/userById", userObj).then(res => {
      
          // console.log(res )
          if (res.data.code == 200) {
            this.myData = res.data.data;
          
            setTimeout(function(){
              _that.show2 = false;
              
            },500)
              
          }else if(res.data.code == 400 || res.data.code == 100101){
            setTimeout(function(){
              _that.$router.push('/login')
            },500)
          
          }
        });
      });
    },
  },

  mounted() {
    this.getMyData();
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.my-navList{
  .weui-cells:before{
    border: none;
  }
  .weui-cells:after{
    border: none;
  }

  .weui-cell:before{
    left: -2px;
  }
  .weui-cell{
    padding: 1rem 15px;
  }
  .vux-cell-primary{
    font-size: .9rem;
    color: #000;
    font-weight: bold;
  }
}
</style>


