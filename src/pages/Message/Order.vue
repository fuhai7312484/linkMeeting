<template>
  <div class="box">
 
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div >
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">{{getAdminName(type)}}</h3>
          </div>
        </sticky>
      </div>
      <div class="msgOrderlistBox">
        <ul class="msgOrderlistUl padlr" v-if="!show2">
          <li
            class="msgOrderlist"
            v-for="(sysMsg,index) in msgsData"
            :key="index"
            @click="sysMsgChange(sysMsg.msg_body.extras.type,sysMsg.msg_body.extras.eid)"
          >
            <div class="msgOrderTitleBox padlr">
              <h4 class="msgOrderTitle fl">{{sysMsg.msg_body.text?sysMsg.msg_body.text:'订单消息'}}</h4>
              <div class="msgOrderMark fr"> {{sysMsg.msg_body.extras.eid}}已读</div>
            </div>
            <div class="msgOrderInt padlr" v-html="sysMsg.msg_body.extras.content">
              <!-- {{sysMsg.msg_body.extras.content}} -->
              <!-- 您预订的场地
              <span>[世外桃源会议室-C1]</span>,场地方已确认,请尽快付款。超过30分钟订单将自动取消-->
            </div>
            <time class="padlr">时间：{{getTimeStamp(sysMsg.create_time*1000,'-')}}</time>
            <div class="msgOrderSeeDetailsBox">
              <div class="msgOrderSeeDetails fl">查看详情</div>
              <div class="msgOrderIcon fr">
                <x-icon type="ios-arrow-forward" size="15"></x-icon>
              </div>
              <div></div>
            </div>
          </li>
        </ul>
      </div>

      <!-- <p v-for="i in 100">{{i}}<br></p> -->
    </div>
  </div>
</template>
<script>
import {
  JIMinitchange,
  getStorage,
  getToTime
} from "../../assets/lib/myStorage.js";
import { Sticky,Loading,  TransferDomDirective as TransferDom, } from "vux";
export default {
  components: {
    Sticky,Loading,
  },
  name: "OrderMsg",
  directives: {
    TransferDom
  },
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),
      dialogId: "",
      type: "",
      msgsData: [],
      show2: true,
    };
  },
  methods: {
    //点击消息链接
    sysMsgChange(type,id) {
      // console.log(type)
      switch(type){
        case '1':
        return console.log('订单')
        break;
         case '2':
        return this.$router.push({
        path: "/Reminder/"+id,
        query: { ReminderId: id }
      })
        break;
         case '3':
        return this.$router.push({
        path: "/meetDetail/"+id,
        query: { meetingId: id }
      })
        break;


      }
       


      // console.log(type,id);
    },
    //获取当前系统消息会话
    JIMlogin() {
      let _that = this;
      let userId = getStorage("userToken").userId;
      JIM.login({
        username: userId,
        password: userId
      }).onSuccess(function(data) {
        JIM.onMsgReceive(function(OnData) {
          _that.msgsData.unshift({
            msg_id: OnData.messages[0].msg_id,
            ...OnData.messages[0].content
          });
        });

        _that.getConvers();
      });
    },
    //获取离线消息
    getConvers() {
      //  JIM.addSingleReceiptReport({
      //               'username' : 'admin@dingdan',
      //               'msg_ids' : [2835672476,2836480743]
      //              }).onSuccess(function(data,msg_ids){
      //                console.log(data,msg_ids)
      //                // data.code 返回码
      //                // data.appkey 目标 appkey
      //                // data.username 目标 username
      //                // msg_ids 消息数组
      //              }).onFail(function(data,msg_ids){

      //              })

      let _that = this;
      JIM.onSyncConversation(function(Pdata) {
        //离线消息同步监听
        // console.log(Pdata)
        let arr = [],
          newArr = [];
        arr = Pdata.filter(e => {
          return e.from_username == _that.$route.query.dialogId;
        })[0].msgs;
        arr.forEach(el => {
          newArr.push({
            msg_id: el.msg_id,
            ...el.content
          });
        });

        _that.msgsData = newArr.sort((a, b) => {
          return b.create_time - a.create_time;
        });
        // console.log(_that.msgData)
      });
 JIM.resetUnreadCount({
                            'username' : _that.$route.query.dialogId
                           });

      _that.show2 = false
    },
    //统一时间格式
    getTimeStamp(TimeStamp, str) {
      return getToTime(TimeStamp, str);
    },
    //管理员消息type转换
    getAdminName(num) {
      switch (num) {
        case "1":
          return "订单提醒";
          break;
        case "2":
          return "参会提醒";
          break;
        case "3":
          return "邀请通知";
          break;
        case "4":
          return "关注动态";
          break;
        case "5":
          return "系统消息";
          break;
           case "6":
          return "嘉宾回执";
          break;
      }
    }
  },
  mounted() {
    (this.dialogId = this.$route.query.dialogId),
      (this.type = this.$route.query.type);
    JIMinitchange(this.JIMlogin);
    // console.log(this.$route.params.dialogId,this.$route.params.type)
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
</style>


