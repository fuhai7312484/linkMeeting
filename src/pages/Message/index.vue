<template>
  <div class="box">
    <div class="msgBox padlr">
      <h3 class="msgTitle">消息</h3>
      <div class="msgContent">



        <div v-for="(msgList,index) in msgData" :key="index">
          <div class="msgAvatar fl">
               
            <badge v-if="msgList.unread!=0 && msgList.unread<=99" class="msgAvatarBadge" :text='msgList.unread'></badge>
              <badge v-else-if="msgList.unread!=0 && msgList.unread>99" class="msgAvatarDian"></badge>
           
            <img :src="msgList.Avatar">
          </div>
          <div class="msgListBox fl">
            <div class="msgListTopBox">
              <h4 class="msgListTitle fl">{{msgList.name}}</h4>
              <div class="msgListTime fr">{{msgList.time}}</div>
            </div>
            <div class="msgListInfo">{{msgList.msgInfo}}</div>
          </div>
        </div>

        <div></div>
      </div>
    </div>

    <footer-nav></footer-nav>
  </div>
</template>
<script>
import FooterNav from "@/components/footerNav";
import { Badge } from "vux";
export default {
  name: "MsgIndex",
  data() {
    return {
        msgData:[
            {
            Avatar:require('../../assets/images/msgIcons-dd.png'),
            name:'订单消息',
            time:'刚刚',
            msgInfo:'[世外桃源会议室]已付款,请查看',
            unread:101,
        },
         {
            Avatar:require('../../assets/images/msgIcons-tx.png'),
            name:'参会提醒',
            time:'12:50',
            msgInfo:'[中国互联网云计算论坛峰会]-还有2天开始',
            unread:0,
        },
            {
            Avatar:require('../../assets/images/msgIcons-yq.png'),
            name:'邀请通知',
            time:'12:23',
            msgInfo:'您收到了2个参会邀请,请查看',
            unread:12,
        },
        {
            Avatar:require('../../assets/images/msgIcons-dt.png'),
            name:'关注动态',
            time:'12:21',
            msgInfo:'[易博科技]发布了新的会议,请查看',
            unread:2,
        },
        
        ]

    };
  },
  components: {
    FooterNav,
    Badge
  },
  methods: {}
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
</style>
