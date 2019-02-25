<template>
  <div class="box" :style="{overflow:'hidden'}">
    <!-- {{msgData}} -->
    <!-- <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>-->
    <div class="map-headerBox potFStyle potF borBottm">
      <div class="map-go-back" @click="$router.go(-1)"></div>
      <h3 class="map-headerTitle">参会提醒</h3>

      <!-- <div class="Homepage fr">
        <img src="../../assets/images/Homepage.png"> 主页
      </div>-->
    </div>
    <div class="reminder-contentBox">
      <div class="padlr">
        <h2>2018第二届金融衍生品&风险管理论坛</h2>

        <div class="reminder-dlBox">
        
          <dl><dt class="fl">会议时间:</dt><dd class="fl"><b>明天</b>09:00至21:00</dd>
          </dl>

            <dl><dt class="fl">场地地址:</dt><dd class="fl">北京市朝阳区工体北路88号 国家会议中心1号楼3层延展厅会第一间会议室</dd>
          </dl>
 <dl><dt class="fl">主办单位:</dt><dd class="fl">中国财商智慧</dd>
          </dl>
           <dl><dt class="fl">承办单位:</dt><dd class="fl"><p>中国财商智慧</p><p>中国财商智慧</p><p>中国财商智慧</p></dd>
          </dl>
      <div class="reminder-checkerBox">
         <checker v-model="ReqVal" radio-required default-item-class="ReqVal-item" 
         selected-item-class="ReqVal-item-selected"
         >
      <checker-item value="1"><span>√</span>不参会</checker-item>
      <checker-item value="2"><span>√</span>待定</checker-item>
      <checker-item value="3"><span>√</span>确认参会</checker-item>
     
      </checker>


      </div>
        </div>
      </div>

      <div class="reminder-btn" v-if="!valchange">确定</div>
       <div class="reminder-btn reT-s6" v-if="valchange" @click="submitVal">确定</div>
    </div>
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo,
  JIMinitchange
} from "../../assets/lib/myStorage.js";
import {
  Loading,
  TransferDomDirective as TransferDom,
  Checker, CheckerItem 
} from "vux";
export default {
  name: "Dialog",
  directives: {
    TransferDom
  },
  components: {
   Checker,
    CheckerItem,
    Loading
  },
  data() {
    return {
      show2: true,
      showVoice: true,
      ReqVal: "",
      valchange:false,
      ReminderId: "",
      MyuserAvatar: "",
      fromUserAvatar: "",
      user_info: {},
      Myinfo: {},
      msgData: [
        // {
        //   Avatar: "../../assets/images/mainpic.jpg",
        //   id: "12122111",
        //   msg: "您好,在吗"
        // },
        // {
        //   Avatar: "../../assets/images/mainpic.jpg",
        //   id: "12122111",
        //   msg: "还行"
        // }
      ]
    };
  },
  methods: {
    //获取本地服务器用户信息
    getMyInfochange() {},
    //提交选择
    submitVal(){
      console.log(this.ReqVal)
    }
  },
  mounted() {
    this.ReminderId = this.$route.query.ReminderId;
  },
  watch: {
    ReqVal(n,o){
     if(this.ReqVal!=''){
       this.valchange = true;
     }
      console.log(this.ReqVal)
    }
  },
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.ReqVal-item {
  width: 30%;
  border: 1px solid #ececec;
  border-radius:5rem;  
  text-align:center;
  padding: 5px 0;
  color: #787878;
  span{
    display:none;
  }
}
.ReqVal-item-selected {
  span{
 display: inline-block;
  }
 
  color: #fff;
  background: #FF576B;
  border: 1px solid #FF576B;
}
</style>


