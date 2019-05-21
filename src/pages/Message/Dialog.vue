<template>
  <div class="box" :style="{overflow:'hidden'}">
    <!-- {{getResource("qiniu/voice/i/307FBFB5D1B89601F201CD078C54F897")}} -->
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
        :class="msg.from_id==dialogId?'x-message-left':'x-message-right'"
      >

         
        <!-- {{msg}} -->
        <div class="x-message-imgBox x-message-left-img">
          <!-- {{msg.content.msg_body.extras}} -->
          <!-- {{MyuserAvatar}} -->
          <!-- {{msg.msg_body}} -->
      
          <img
            :src="msg.from_id==dialogId?msg.msg_body.extras==undefined?require('../../assets/images/myFans-Mask.png'):msg.msg_body.extras.userAvatar=='no'?require('../../assets/images/myFans-Mask.png'):msg.msg_body.extras.userAvatar:MyuserAvatar"
            height="50px;"
          >
          <!-- <img
            :src="msg.content.msg_body.extras==undefined || msg.content.msg_body.extras.userAvatar==undefined?require('../../assets/images/myFans-Mask.png'):msg.content.msg_body.extras.userAvatar"
            height="50px;"
          >-->
        </div>
        <div class="x-message-TextBox x-message-self">
          <!-- <span v-if="msg.msg_body.url">1111111{{msg.msg_body.url}}</span> -->
          <span v-if="msg.msg_type=='text'">{{msg.msg_body.text}}</span>
          <!-- @click="typeVoicePlay(msg.msg_body.media_id,index,msg.msg_body.hash)" -->
          <!-- @touchstart.stop.prevent='typeVoicePlay(msg.msg_body.media_id,index,msg.msg_body.hash)' -->
          <div
            v-if="msg.msg_type=='voice'"
            @click="typeVoicePlay(msg.msg_body.url,index,msg.msg_body.hash)"
          >
            <!-- {{VoiceUrl}} -->
            <p
              class="weixinAudio fl"
              :id="'media'+''+index"
              :ref="'media'+''+index"
              data-play="false"
              :style="{width:msg.msg_body.duration<=10?'20px':msg.msg_body.duration+'px',height:'25px'}"
            >
              <audio
                :data="index"
                @canplay="playing(index)"
                @ended="ended(index)"
                width="1"
                height="1"
                type="audio/mpeg"
                class="mx-audio"
                preload
              >
                <!-- <source :src="VoUrl" type="audio/mpeg"> -->
              </audio>

              <!-- {{VoUrl}} -->
              <span id="audio_area" class="db audio_area">
                <span class="audio_wrp db">
                  <span class="audio_play_area">
                    <i class="icon_audio_default"></i>
                    <i class="icon_audio_playing"></i>
                  </span>
                  <!-- <span id="audio_length" class="audio_length tips_global">{{item.messageBody.duration}}"</span> -->
                </span>
              </span>
            </p>
            <div
              v-if="msg.msg_type=='voice'"
              class="x-message-voice fl"
            >{{msg.msg_body.duration+'"'}}</div>
          </div>
        </div>
        <!-- <div v-if="msg.msg_type=='voice'" class="x-message-voice fl">
 {{msg.msg_body.duration+'"'}}
        </div>-->
      </div>
    </div>
    <div class="x-messageFormBox potF">
      <div class="x-messageTabBtn fl">
        <!-- <img
          :src="showVoice?require('../../assets/images/x-msg-voice.png'):require('../../assets/images/x-msg-text.png')"
        > -->
      </div>
      <div class="x-msg-formBox fl" @click="msgFChange">
        <div class="x-msg-form">
          <x-input v-model="value" placeholder="想对Ta说点什么" ref="msgF" show-clear></x-input>
        </div>
        <!-- <div v-else>
          <div></div>

          <x-button type="default" mini :style="{width:'100%'}">按住 说话</x-button>
        </div> -->
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
      targetAvatar: "",
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
    //语音部分
    msgFChange(){
      this.$refs.msgF.focus()
    },
    playing(id) {
      // console.log('开始');
      // console.log(id)
    },
    ended(index) {
      var Pdom = this.$refs["media" + "" + index][0];
      var audio = Pdom.querySelector(".mx-audio");
      var defaultIcon = Pdom.querySelector(".icon_audio_default");
      var playingIcon = Pdom.querySelector(".icon_audio_playing");
      Pdom.dataset.play = false;
      defaultIcon.style.display = "inline-block";
      playingIcon.style.display = "none";
    },

    //获取本地服务器用户信息
    getMyInfochange() {
      let _that = this;
      let userObj = {
        params: {
          id: getStorage("userToken").userId
        }
      };

      //获取对方头像
      let targetObj = {
        params: {
          id: this.$route.query.dialogId
        }
      };

      checkToken().then(Pdata => {
        getDataInfo("get", "user/userById", userObj).then(res => {
          // console.log(111111111, res);
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

        getDataInfo("get", "user/userById", targetObj).then(res => {
          // console.log(2222222, res);
          if (res.data.code == 200) {
            this.targetAvatar = res.data.data.mainPic;
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
        // console.log(data)
        _that.show2 = false
        
        JIM.onMsgReceive(function(OnData) {
          //  console.log(OnData)
          _that.fromUserAvatar =
            OnData.messages[0].content.msg_body.extras.userAvatar;
          if (OnData.messages[0].content.msg_type == "voice") {
            JIM.getResource({
              media_id: OnData.messages[0].content.msg_body.media_id
            }).onSuccess(function(data) {
              _that.show2 = false
              // console.log(data)
              OnData.messages[0].content.msg_body.url = data.url;
              _that.msgData.push(OnData.messages[0].content);
            });
          } else {
            _that.msgData.push(OnData.messages[0].content);
          }
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
        // console.log(Pdata);

        arr = Pdata.filter(e => {
          return e.from_username == _that.$route.query.dialogId;
        });
        // console.log(arr);
        if (arr.length != 0) {
          arr = Pdata.filter(e => {
            return e.from_username == _that.$route.query.dialogId;
          })[0].msgs;
        }

        arr.forEach(el => {
          newArr.push(el.content);
        });

        newArr.forEach((e, index) => {
          if (e.msg_type == "voice") {
            JIM.getResource({ media_id: e.msg_body.media_id })
              .onSuccess(function(data) {
                e.msg_body.url = data.url;
                _that.msgData = newArr;
              })
              .onFail(function(data) {
                // console.log(data);
              });
          }
        });

        _that.show2 = false;

        JIM.resetUnreadCount({
          username: _that.$route.query.dialogId
        });
      });
    },

    //语音消息播放
    typeVoicePlay(url, index, hash) {
      let _that = this;
      Object.keys(_that.$refs).forEach(function(key) {
        if (_that.$refs[key][0]) {
          _that.$refs[key][0].dataset.play = false;
          _that.$refs[key][0].querySelector(".mx-audio").pause();
          _that.$refs[key][0].querySelector(
            ".icon_audio_playing"
          ).style.display = "none";
          _that.$refs[key][0].querySelector(
            ".icon_audio_default"
          ).style.display = "inline-block";
        }
      });

      var Pdom = this.$refs["media" + "" + index][0];

      var audio = Pdom.querySelector(".mx-audio");

      //  audio.play();

      var defaultIcon = Pdom.querySelector(".icon_audio_default");
      var playingIcon = Pdom.querySelector(".icon_audio_playing");
      audio.currentTime = 0;
      audio.src = url;

      if (Pdom.dataset.play == "false") {
        audio.play();
        defaultIcon.style.display = "none";
        playingIcon.style.display = "inline-block";
        Pdom.dataset.play = true;
      } else {
        audio.pause();
        defaultIcon.style.display = "inline-block";
        playingIcon.style.display = "none";
        Pdom.dataset.play = false;
      }
    },
    //获取会话人信息
    getUserInfo() {
      let _that = this;
      JIM.getUserInfo({
        username: this.dialogId,
        appkey: "21c14066bd7b213c7822caa9"
      })
        .onSuccess(function(data) {
          // console.log(data)
          _that.user_info = data.user_info;
          // _that.show2 = false;
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
            userAvatar: _that.MyuserAvatar == "" ? "no" : _that.MyuserAvatar,
            targetAvatar: _that.targetAvatar == "" ? "no" : _that.targetAvatar
          },
          no_offline: false,
          no_notification: false,
          need_receipt: true
        })
          .onSuccess(function(data, msg) {
            // console.log(data,msg)
            _that.msgData.push(msg.content);
            _that.value = "";
          })
          .onFail(function(data) {
            // console.log("error:" + JSON.stringify(data));
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
  created() {
    this.$nextTick(function() {
      this.getMyInfochange();
    });
  },
  mounted() {
    this.dialogId = this.$route.query.dialogId;

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


