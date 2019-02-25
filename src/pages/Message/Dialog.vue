<template>
  <div class="box" :style="{overflow:'hidden'}">
    <!-- {{msgData}} -->
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div class="map-headerBox potFStyle potF borBottm">
      <div class="map-go-back" @click="$router.go(-1)"></div>
      <h3 class="map-headerTitle">{{user_info.nickname}}</h3>
      <router-link
        tag="div"
        :to="{path:'/tadetail/'+dialogId, query:{detailId:dialogId}}"
        class="Homepage fr"
      >
        <img src="../../assets/images/Homepage.png"> 主页
      </router-link>
      <!-- <div class="Homepage fr">
        <img src="../../assets/images/Homepage.png"> 主页
      </div>-->
    </div>
    <div class="x-messageBox padlr" id="data-list-content" style="height:100px">
      <div
        v-for="(msg,index) in msgData"
        :key="index"
        :class="msg.from_id==dialogId?'x-message-right':'x-message-left'"
      >
        <div class="x-message-imgBox x-message-left-img">
          <!-- {{msg.content.msg_body.extras}} -->
          <!-- {{MyuserAvatar}} -->
          <img
            :src="msg.from_id==dialogId?msg.msg_body.extras==undefined?require('../../assets/images/myFans-Mask.png'):msg.msg_body.extras.userAvatar==undefined?require('../../assets/images/myFans-Mask.png'):msg.msg_body.extras.userAvatar:MyuserAvatar"
            height="50px;"
          >
          <!-- <img
            :src="msg.content.msg_body.extras==undefined || msg.content.msg_body.extras.userAvatar==undefined?require('../../assets/images/myFans-Mask.png'):msg.content.msg_body.extras.userAvatar"
            height="50px;"
          >-->
        </div>
        <div class="x-message-TextBox x-message-self">{{msg.msg_body.text}}</div>
      </div>
    </div>
    <div class="x-messageFormBox potF">
      <div class="x-messageTabBtn fl" @click="showVoice=!showVoice">
        <img
          :src="showVoice?require('../../assets/images/x-msg-voice.png'):require('../../assets/images/x-msg-text.png')"
        >
      </div>
      <div class="x-msg-formBox fl">
        <div v-if="showVoice" class="x-msg-form">
          <x-input v-model="value" placeholder="想对Ta说点什么" show-clear></x-input>
        </div>
        <div v-else>
          <div></div>

          <x-button type="default" mini :style="{width:'100%'}">按住 说话</x-button>
        </div>
      </div>

      <div class="x-msg-sendBtn fr" @click="sendSingleMsg">发送</div>
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
  XInput,
  XButton,
  Loading,
  TransferDomDirective as TransferDom
} from "vux";
export default {
  name: "Dialog",
  directives: {
    TransferDom
  },
  components: {
    XInput,
    XButton,
    Loading
  },
  data() {
    return {
      show2: true,
      showVoice: true,
      value: "",
      dialogId: "",
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
    getMyInfochange() {
      let _that = this;
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
            this.Myinfo = res.data.data;
            this.MyuserAvatar = res.data.data.mainPic;
            JIMinitchange(this.JIMlogin);
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/login");
            }, 500);
          }
        });
      });
    },
    //登录IM
    JIMlogin() {
      //创建初始化JIM
      let _that = this;
      let userId = getStorage("userToken").userId;

      JIM.login({
        username: userId,
        password: userId
      }).onSuccess(function(data) {
        JIM.onMsgReceive(function(OnData) {
          // console.log(OnData);
          _that.fromUserAvatar =
            OnData.messages[0].content.msg_body.extras.userAvatar;
          _that.msgData.push(OnData.messages[0].content);
        });
        _that.getConvers();
        _that.getUserInfo();
      });
    },
    //获取离线消息
    getConvers() {
      let _that = this;
      JIM.onSyncConversation(function(Pdata) {
        //离线消息同步监听
        let arr = [],
          newArr = [];
        arr = Pdata.filter(e => {
          return e.from_username == _that.$route.query.dialogId;
        })[0].msgs;
        arr.forEach(el => {
          newArr.push(el.content);
        });
        // console.log(newArr)
        // _that.fromUserAvatar = newArr[newArr.length-1].msg_body.extras.userAvatar
        _that.msgData = newArr;
        // console.log(_that.msgData)

        JIM.resetUnreadCount({
          username: _that.$route.query.dialogId
        });
      });
    },
    //获取会话人信息
    getUserInfo() {
      let _that = this;
      JIM.getUserInfo({
        username: this.dialogId,
        appkey: "21c14066bd7b213c7822caa9"
      })
        .onSuccess(function(data) {
          _that.user_info = data.user_info;
          _that.show2 = false;
        })
        .onFail(function(data) {
          //data.code 返回码
          //data.message 描述
        });
    },
    //发送单聊消息
    sendSingleMsg() {
      let _that = this;

      if (this.value != "") {
        JIM.sendSingleMsg({
          target_username: this.$route.query.dialogId,
          appkey: "21c14066bd7b213c7822caa9",
          content: _that.value,
          extras: {
            msgType: 1,
            userAvatar: _that.MyuserAvatar == "" ? "no" : _that.MyuserAvatar
          },
          no_offline: false,
          no_notification: false,
          need_receipt: true
        })
          .onSuccess(function(data, msg) {
            _that.msgData.push(msg.content);
            _that.value = "";
          })
          .onFail(function(data) {
            console.log("error:" + JSON.stringify(data));
          });
      } else {
        // console.log("空的");
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var div = document.getElementById("data-list-content");
        div.scrollTop = div.scrollHeight;
      });
    }
  },
  mounted() {
    this.dialogId = this.$route.query.dialogId;
    this.getMyInfochange();
    // this.JIMlogin();
  },
  watch: {
    msgData() {
      this.scrollToBottom();
    }
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
</style>


