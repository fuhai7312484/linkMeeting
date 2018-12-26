<template>
  <div class="box">
    <div class="msgBox padlr">
      <h3 class="msgTitle">消息</h3>
      <div class="msgContent">



<swipeout>
<!-- :disabled="msgList.status==0?true:false" -->
      <swipeout-item @on-close="handleEvents('on-close')"
       @on-open="handleEvents('on-open')"  transition-mode="follow"
        v-for="(msgList,index) in msgData" :key="index">
        <div slot="right-menu">
          <!-- <swipeout-button @click.native="onButtonClick('fav')" type="primary">是</swipeout-button> -->
          <swipeout-button @click.native="onButtonClick(index,msgList)" 
          :type="msgList.status==0?'default':'warn'"
          :style="{height:'65px'}"
          >删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
     
       <div class="msgAvatar fl">
               
            <badge v-if="msgList.unread!=0 && msgList.unread<=99" class="msgAvatarBadge" :text='msgList.unread'></badge>
              <badge v-else-if="msgList.unread!=0 && msgList.unread>99" class="msgAvatarDian"></badge>
           <div class="msgAvatarImg">
          <img :src="msgList.Avatar">
             
           </div>
            
          </div>
          <div class="msgListBox fl">
            <div class="msgListTopBox">
              <h4 class="msgListTitle fl">{{msgList.name}}</h4>
              <div class="msgListTime fr">{{msgList.time}}</div>
            </div>
            <div class="msgListInfo" :style="{color:msgList.type=='voice'?'#F76369':'#A0A0A0'}">{{msgList.msgInfo}}</div>
          </div>




        </div>
      </swipeout-item>

 </swipeout>


        <!-- <div v-for="(msgList,index) in msgData" :key="index">
          <div class="msgAvatar fl">
               
            <badge v-if="msgList.unread!=0 && msgList.unread<=99" class="msgAvatarBadge" :text='msgList.unread'></badge>
              <badge v-else-if="msgList.unread!=0 && msgList.unread>99" class="msgAvatarDian"></badge>
           <div class="msgAvatarImg">
          <img :src="msgList.Avatar">
             
           </div>
            
          </div>
          <div class="msgListBox fl">
            <div class="msgListTopBox">
              <h4 class="msgListTitle fl">{{msgList.name}}</h4>
              <div class="msgListTime fr">{{msgList.time}}</div>
            </div>
            <div class="msgListInfo" :style="{color:msgList.type=='voice'?'#F76369':'#A0A0A0'}">{{msgList.msgInfo}}</div>
          </div>
        </div> -->

        <div></div>
      </div>
    </div>
<div style="height:50px"></div>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import FooterNav from "@/components/footerNav";
import { Swipeout, SwipeoutItem, SwipeoutButton,Badge} from 'vux'
export default {
  name: "MsgIndex",
  data() {
    return {
        msgData:[
            {

            Avatar:require('../../assets/images/msgIcons-dd.png'),
            status:0,
            name:'订单消息',
            time:'刚刚',
            msgInfo:'[世外桃源会议室]已付款,请查看',
            unread:101,
        },
         {
            Avatar:require('../../assets/images/msgIcons-tx.png'),
            status:0,
            name:'参会提醒',
            time:'12:50',
            msgInfo:'[中国互联网云计算论坛峰会]-还有2天开始',
            unread:0,
        },
            {
            Avatar:require('../../assets/images/msgIcons-yq.png'),
            status:0,
            name:'邀请通知',
            time:'12:23',
            msgInfo:'您收到了2个参会邀请,请查看',
            unread:12,
        },
        {
            Avatar:require('../../assets/images/msgIcons-dt.png'),
            status:0,
            name:'关注动态',
            time:'12:21',
            msgInfo:'[易博科技]发布了新的会议,请查看',
            unread:2,
        },
        {
            Avatar:require('../../assets/images/812ac9992b9cee396b9b836f405b1fd9.jpg'),
            status:1,
            name:'曹伟',
            time:'12:21',
            msgInfo:'您好我这有一场会挺适合您的，来看看吧',
            type:'text',
            unread:2,
        },
        {
            Avatar:require('../../assets/images/201511023251225044.gif'),
            status:1,
            name:'汪秀英',
            time:'12:15',
             type:'voice',
            msgInfo:'[语音]',
            unread:1,
        },
        {
            Avatar:require('../../assets/images/20146216561084761.gif'),
            status:1,
            name:'赵勇',
            time:'12:15',
             type:'text',
            msgInfo:'我是会议承办方需求合作',
            unread:1,
        },
        
        ]

    };
  },
  components: {
    FooterNav,
    Badge,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {

 onButtonClick (index,itme) {
   if(itme.status===0){
     alert('当前为系统消息，不可删除！')
   }else{
this.msgData.splice(index, 1);
//  console.log(index)
   }
  
      // alert('on button click ' + type)


    },
     handleEvents (type) {
      // console.log('event: ', type)
    }

  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.demo-content{
  overflow: hidden;
  margin: 0 1rem;
}
</style>
