<template>
  <div class="box">

  


    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div class="msgBox padlr" v-if="!show2">
      <h3 class="msgTitle">消息</h3>

      <div class="msgContent">
        <swipeout>
          <!-- :disabled="msgList.status==0?true:false" -->
          <swipeout-item
            @on-close="handleEvents('on-close')"
            @on-open="handleEvents('on-open')"
            transition-mode="follow"
            v-for="(msgList,index) in sysData"
            :key="index"
          >
            <div slot="right-menu">
              <!-- <swipeout-button @click.native="onButtonClick('fav')" type="primary">是</swipeout-button> -->
              <swipeout-button
                @click.native="onSysMsgClick(index,msgList)"
                :type="msgList.status==0?'default':'warn'"
                :style="{height:'65px'}"
              >删除</swipeout-button>
            </div>
            <div
              slot="content"
              class="demo-content vux-1px-t"
              @click="sysLinkChange(msgList.msg.msg_body.extras.type,msgList.name)"
            >
              <div class="msgAvatar fl">
                <badge
                  v-if="msgList.unread_msg_count!=0 && msgList.unread_msg_count<=99"
                  class="msgAvatarBadge"
                  :text="msgList.unread_msg_count"
                ></badge>
                <badge
                  v-else-if="msgList.unread_msg_count!=0 && msgList.unread_msg_count>99"
                  class="msgAvatarDian"
                ></badge>
                <div class="msgAvatarImg">
                  <!-- {{msgList.msg_body.extras==undefined?'':''}} -->
                  <img :src="msgList.msg.msg_body.extras.image">
                </div>
              </div>
              <div class="msgListBox fl">
                <div class="msgListTopBox">
                  <h4 class="msgListTitle fl">{{getAdminName(msgList.msg.msg_body.extras.type)}}</h4>
                  <div class="msgListTime fr">{{getToTimeschange(msgList.msg.create_time,'C')}}</div>
                </div>
                <div
                  class="msgListInfo"
                  :style="{color:msgList.type=='voice'?'#F76369':'#A0A0A0'}"
                  v-html="msgList.msg.msg_body.extras.content"
                ></div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>
        <swipeout>
          <swipeout-item
            @on-close="handleEvents('on-close')"
            @on-open="handleEvents('on-open')"
            transition-mode="follow"
            v-for="(userInfo,key) in userMsgData"
            :key="key"
          >
            <div slot="right-menu">
              <!-- <swipeout-button @click.native="onButtonClick('fav')" type="primary">是</swipeout-button> -->
              <swipeout-button
                @click.native="onButtonClick(key,userInfo)"
                :type="userInfo.status==0?'default':'warn'"
                :style="{height:'65px'}"
              >删除</swipeout-button>
            </div>

            <div slot="content" class="demo-content vux-1px-t" @click="LinkChange(userInfo.name)">
              <div class="msgAvatar fl">
                <badge
                  v-if="userInfo.unread_msg_count!=0 && userInfo.unread_msg_count<=99"
                  class="msgAvatarBadge"
                  :text="userInfo.unread_msg_count"
                ></badge>
                <badge
                  v-else-if="userInfo.unread_msg_count!=0 && userInfo.unread_msg_count>99"
                  class="msgAvatarDian"
                ></badge>

                <div class="msgAvatarImg">
                  <!-- <img :src="userInfo.msg.msg_body.extras.userAvatar==' '?require('../../assets/images/myFans-Mask.png'):userInfo.msg.msg_body.extras.userAvatar"> -->
                  <img :src="require('../../assets/images/myFans-Mask.png')">
                  <!-- {{userInfo.avatar}} -->
                  <!-- <img
                    :src="userInfo.avatar==''?require('../../assets/images/myFans-Mask.png'):userInfo.avatar"
                  >-->
                </div>
              </div>
              <div class="msgListBox fl">
                <div class="msgListTopBox">
                  <h4 class="msgListTitle fl">{{userInfo.nickName}}</h4>
                  <div class="msgListTime fr">{{getToTimeschange(userInfo.msg.create_time,'C')}}</div>
                </div>
                <div
                  class="msgListInfo"
                  :style="{color:userInfo.type=='voice'?'#F76369':'#A0A0A0'}"
                >{{userInfo.msg.msg_body.text}}</div>
              </div>
            </div>
          </swipeout-item>
        </swipeout>

        <div></div>
      </div>
      <toast
        v-model="toastInfo.showPositionValue"
        width="10em"
        :type="toastInfo.toastType"
        position="middle"
        :time="1500"
        is-show-mask
      >{{toastInfo.showMsg}}</toast>
    </div>
    <div style="height:50px"></div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import FooterNav from "@/components/footerNav";
import {
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Badge,
  Loading,
  TransferDomDirective as TransferDom,
  Toast
} from "vux";
import {
  getStorage,
  checkToken,
  getDataInfo,
  JIMinitchange,
  getToTime,
  transDate,
  getGetAxios
} from "../../assets/lib/myStorage.js";
export default {
  name: "MsgIndex",
  directives: {
    TransferDom
  },
  data() {
    return {
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      show2: true,
      sysData: [
        // {
        //   Avatar: require("../../assets/images/msgIcons-dd.png"),
        //   status: 0,
        //   name: "订单消息",
        //   time: "刚刚",
        //   msgInfo: "[世外桃源会议室]已付款,请查看",
        //   unread: 101
        // },
        // {
        //   Avatar: require("../../assets/images/msgIcons-tx.png"),
        //   status: 0,
        //   name: "参会提醒",
        //   time: "12:50",
        //   msgInfo: "[中国互联网云计算论坛峰会]-还有2天开始",
        //   unread: 0
        // },
        // {
        //   Avatar: require("../../assets/images/msgIcons-yq.png"),
        //   status: 0,
        //   name: "邀请通知",
        //   time: "12:23",
        //   msgInfo: "您收到了2个参会邀请,请查看",
        //   unread: 9
        // },
        // {
        //   Avatar: require("../../assets/images/msgIcons-yq.png"),
        //   status: 0,
        //   name: "认证通知",
        //   time: "12:23",
        //   msgInfo: "您有新的认证消息，请查收",
        //   unread: 12
        // },
        // {
        //   Avatar: require("../../assets/images/msgIcons-dt.png"),
        //   status: 0,
        //   name: "关注动态",
        //   time: "12:21",
        //   msgInfo: "[易博科技]发布了新的会议,请查看",
        //   unread: 2
        // }
      ],

      userMsgData: [
        // {
        //   Avatar: require("../../assets/images/812ac9992b9cee396b9b836f405b1fd9.jpg"),
        //   status: 1,
        //   name: "曹伟",
        //   time: "12:21",
        //   msgInfo: "您好我这有一场会挺适合您的，来看看吧",
        //   type: "text",
        //   unread: 2
        // },
        // {
        //   Avatar: require("../../assets/images/201511023251225044.gif"),
        //   status: 1,
        //   name: "汪秀英",
        //   time: "12:15",
        //   type: "voice",
        //   msgInfo: "[语音]",
        //   unread: 1
        // },
        // {
        //   Avatar: require("../../assets/images/20146216561084761.gif"),
        //   status: 1,
        //   name: "赵勇",
        //   time: "12:15",
        //   type: "text",
        //   msgInfo: "我是会议承办方需求合作",
        //   unread: 1
        // }
      ]
    };
  },
  components: {
    FooterNav,
    Badge,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Loading,
    Toast
  },
  methods: {
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
          return "特邀嘉宾回执";
          break;
      }
    },
    //时间戳转换时间格式
    getToTimeschange(timeStamp,type) {
      if ((timeStamp + "").length == 10) {
        return transDate(timeStamp * 1000,type);
      } else if ((timeStamp + "").length == 13) {
        return transDate(timeStamp,type);
      }
    },
    //系统消息
    sysLinkChange(type, id) {
      this.$router.push({
        path: "/ordermsg",
        query: { type: type, dialogId: id }
      });
    },
    //消息会话框
    LinkChange(id) {
      this.$router.push({ path: "/dialog/" + id, query: { dialogId: id } });
      // console.log(id);
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
        // console.log("success:" + JSON.stringify(data));
        //监听聊天变化
        JIM.onMsgReceive(function(res) {
          // console.log(res)
          // console.log(res);
          if (res.messages[0].content.from_type == "admin") {
            // 如果数组里面本身不存在这个对象则把这个加进去
        
               var result =  _that.sysData.some(item=>{
                  if(item.from_username==res.messages[0].from_username){
                      return true 
                  } 
                });
                if(result){
              _that.sysData.forEach(e => {
              if (e.msg.msg_body.extras == undefined) {
                e.msg.msg_body.extras = {
                  userAvatar: " "
                };
              }
              if (e.msg.msg_body.extras.userAvatar == undefined) {
                e.msg.msg_body.extras.userAvatar = " ";
              }
              if (e.from_username == res.messages[0].from_username) {
                e.unread_msg_count = e.unread_msg_count + 1;
                e.msg = res.messages[0].content;
               
              } 
            });
                }else{
                    _that.sysData.unshift({
                  from_username: res.messages[0].from_username,
                  msg: res.messages[0].content,
                  unread_msg_count: 1
                });
                }


                _that.sysData = _that.sysData.sort((a, b) => {
          return b.msg.create_time - a.msg.create_time;
        });
          } else {
            _that.userMsgData.forEach(e => {
              if (e.from_username == res.messages[0].from_username) {
                e.unread_msg_count = e.unread_msg_count + 1;
                e.msg = res.messages[0].content;
              
              }
            });
          }
        });

 
        _that.getConvers();
        // console.log(_that.userMsgData)
        // _that.getConversation()
      });
    },
    //获取离线消息
    getConvers() {
      console.log(111111111)
      let _that = this;
      JIM.onSyncConversation(function(Pdata) {
        //离线消息同步监听
        // _that.getConversation();
        console.log(Pdata,"---------")
        let arr = [];
        Pdata.forEach(e => {
          arr.push({
            from_username: e.from_username,
            msg: e.msgs[e.msgs.length - 1].content
          });
        });
        JIM.getConversation()
          .onSuccess(function(data) {
            // console.log(data)
            if (data.code == 0) {
              let newArr = [],
                userArr = [],
                sysMsgsArr = [];
              arr.forEach(e => {
                if (e.msg.msg_body.extras == undefined) {
                  e.msg.msg_body.extras = {
                    userAvatar: " "
                  };
                }
                if (e.msg.msg_body.extras.userAvatar == undefined) {
                  e.msg.msg_body.extras.userAvatar = " ";
                }

                data.conversations.forEach(el => {
                  //  _that.getResource(el.avatar)
                  if (el.name == e.from_username) {
                    // console.log(el)
                    newArr.push({ ...e, ...el });
                  }
                });
              });
              newArr.forEach(e => {
                if (e.msg.from_type == "admin") {
                  sysMsgsArr.push(e);
                } else if (e.msg.from_type == "user") {
                  userArr.push(e);
                }
              });
              _that.sysData = sysMsgsArr;
              _that.sysData = sysMsgsArr.filter(e => {
                return e.msg.msg_body.extras.image != undefined;
              }).sort((a, b) => {
          return b.mtime - a.mtime;
        });
              _that.userMsgData = userArr;
              _that.show2 = false;
            
            }





          })
          .onFail(function(data) {
            console.log("error:" + JSON.stringify(data));
          });
      });
    },
    //系统消息删除
    onSysMsgClick(index, itme) {
      this.sysData.splice(index, 1);
    },
    //用户消息删除
    onButtonClick(index, itme) {
      if (itme.status === 0) {
        alert("当前为系统消息，不可删除！");
      } else {
        this.userMsgData.splice(index, 1);
        //  console.log(index)
      }

      // alert('on button click ' + type)
    },
    handleEvents(type) {
      // console.log('event: ', type)
    }
  },
  created() {
    // JIMinitchange()
  },
  mounted() {
    // this.JIMlogin();

    // getGetAxios()

    JIMinitchange(this.JIMlogin);
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.demo-content {
  overflow: hidden;
  margin: 0 1rem;
}
</style>
