import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Terms from "@/components/Terms";
import downApp from "@/components/downApp";

import lot from "@/components/lot";


import Login from "@/pages/Login/login";

import wxLogin from "@/components/wxLogin"

import CodeLogin from "@/pages/Login/CodeLogin";

import Reg from "@/pages/Login/reg";
import Retpass from "@/pages/Login/Retpass";
import MyDetailsList from "@/pages/my/MydetailsList";
// import TaDetail from "@/pages/my/TaDetail";
import SiteIndex from "@/pages/site/index";
import SiteSearch from "@/pages/site/siteSearch";
// import SiteDetail from "@/pages/site/siteDetail";
import roomDetail from "@/pages/site/RoomDetail";
// import MeetingIndex from "@/pages/meeting/index";
import meetingSearch from "@/pages/meeting/meetingSearch";
// import MeetDetail from "@/pages/meeting/meetDetail";
import NavMap from "@/components/NavMap";
import Ticket from "@/pages/meeting/Ticket";
import TicketSuccess from "@/pages/meeting/TicketSuccess.vue";
import Success from "@/components/Success.vue";
import DownAnnex from "@/pages/meeting/downAnnex";

import SignInfo from "@/pages/meeting/signUpInfo";
import MsgIndex from "@/pages/Message/index";
import Reminder from "@/pages/Message/Reminder"


import OrderMsg from "@/pages/Message/Order.vue";
import Dialog from "@/pages/Message/Dialog.vue";
import MyIndex from "@/pages/my/index";
import MyColle from "@/pages/my/MyCollection";
import MyFan from "@/pages/my/MyFan";
import MyfansDetail from "@/pages/my/myFansDetail";
import Feedback from "@/pages/my/Feedback";
import MySetting from "@/pages/my/MySetting";
import BindAccount from "@/pages/my/BindAccount";
import MyBrowse from "@/pages/my/MyBrowse";
import MyTicket from "@/pages/my/MyTicket";
import MyFollow from "@/pages/my/MyFollow"
import Lianhuiyi from "@/pages/my/about";

import OrderDetail from "@/pages/my/OrderDetail";
import ETicket from "@/pages/my/ETicket";


import Cpage from "@/pages/my/myInfo";

import MyInfo from "@/pages/my/myInfo";
import gallery from "@/components/gallery";
import city from "@/components/City";

//抽奖活动
import Lottery from "@/pages/activity/index"
import AwardList from "@/pages/activity/AwardList"
// import PullTod from "@/components/PullTo";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Terms",
      name: "Terms",
      // meta: {
      //   index: 0,
      // },
      component: Terms
    },
    {
      path: "/",
      // name: "HelloWorld",
      // meta: {
      //   index: 0,
      // },
      // component: resolve => require(['/'],resolve)
      component: resolve => require(['@/pages/meeting/index'],resolve)
      // component: MeetingIndex
    },
    // {
    //   path: "/",
    //   name: "MeetingIndex",
    //   // meta: {
    //   //   index: 0,
    //   // },
    //   component: MeetingIndex
    // },
    {
      path: "/login",
      name: "login",
      // meta: {
      //   index: 2,
      // },
      component: Login
    },
    {
      path: "/wxlogin",
      name: "wxLogin",
      // meta: {
      //   index: 2,
      // },
      component: wxLogin
    },
    {
      path: "/reg",
      name: "reg",
      // meta: {
      //   index: 2,
      // },
      component: Reg
    },
    {
      path: "/retpass",
      name: "retpass",
      // meta: {
      //   index: 2,
      // },
      component: Retpass
    },
    {
      path: "/codelogin",
      name: "CodeLogin",
      // meta: {
      //   index: 2,
      // },
      component: CodeLogin
    },
    {
      path: "/detailsList",
      name: "MyDetailsList",
      component: MyDetailsList
    },
    {
      path: "/tadetail/:id",
      name: "TaDetail",
      component: resolve => require(['@/pages/my/TaDetail'],resolve)
      // component: TaDetail
    },
    {
      path: "/sitedetail/:id",
      name: "SiteDetail",
      component: resolve => require(['@/pages/site/siteDetail'],resolve)
      // component: SiteDetail
    },
    {
      path: "/siteSearch",
      name: "siteSearch",
      component: SiteSearch
    },
    {
      path: "/siteindex",
      name: "SiteIndex",
      // meta: {
      //   requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: SiteIndex
    },
    {
      path: "/meeting",
      name: "MeetingIndex",
      // meta: {
      //   index: 1,
      // },
      component: resolve => require(['@/pages/meeting/index'],resolve)
      // component: MeetingIndex
    },
    {
      path: "/meetingSearch",
      name: "meetingSearch",
      component: meetingSearch
    },
    {
      path: "/meetDetail/:id",
      name: "MeetDetail",
      // meta: {
      //   index: 1,
      // },

      component: resolve => require(['@/pages/meeting/meetDetail'],resolve)
      // component: MeetDetail
    },

    {
      path: "/downannex",
      name: "DownAnnex",
      // meta: {
      //   index: 1,
      // },
      component: DownAnnex
    },

    {
      path: "/navmap",
      name: "NavMap",
     
      component: NavMap
    },
    {
      path: "/ticket",
      name: "Ticket",
     
      component: Ticket
    },
    {
      path: "/MeetingSuccess",
      name: "MeetingSuccess",
     
      component: TicketSuccess
    },
    {
      path: "/Success/:id",
      name: "Success",
     
      component: Success
    },
    {
      path: "/signinfo",
      name: "SignInfo",
    
      component: SignInfo
    },

    {
      path: "/msgindex",
      name: "MsgIndex",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: MsgIndex
    },

    {
      path: "/Reminder/:id",
      name: "Reminder",
      component: Reminder
    },


    {
      path: "/ordermsg",
      name: "OrderMsg",
      // meta: {
      //   index: 1,
      // },
      component: OrderMsg
    },
    {
      path: "/dialog/:id",
      name: "Dialog",
      component: Dialog
    },
    {
      path: "/myindex",
      name: "MyIndex",
      // meta: {
      //   requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      // },
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: MyIndex
    },
    {
      path: "/myInfo",
      name: "myInfo",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: MyInfo
    },
    {
      path: "/mycolle",
      name: "MyColle",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: MyColle
    },

    {
      path: "/myticket",
      name: "MyTicket",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: MyTicket
    },

    {
      path: "/Eticket/:id",
      name: "ETicket",

      component: ETicket
    },

    {
      path: "/orderdetail/:id",
      name: "OrderDetail",

      component: OrderDetail
    },

    {
      path: "/about",
      name: "Lianhuiyi",
      component: Lianhuiyi
    },

    {
      path: "/myfollow",
      name: "MyFollow",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: MyFollow
    },


    {
      path: "/mybrowse",
      name: "MyBrowse",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: MyBrowse
    },


    {
      path: "/myfan",
      name: "MyFan",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
     
      component: MyFan,
    },
    {
      path: "/myfan/myfanDetail/:id",
      name: "MyfansDetail",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      // redirect: '/diary/EditDiary',
      component: MyfansDetail,
    
      
    },
    {
      path: "/feedback",
      name: "Feedback",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
     
      component: Feedback,
    },
    {
      path: "/setting",
      name: "MySetting",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
     
      component: MySetting,
    },
    {
      path: "/setting/bindAccount",
      name: "BindAccount",
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },

      component: BindAccount
    },

    {
      path: "/roomdetail",
      name: "roomDetail",
      component: roomDetail
    },
    {
      path: "/gallery/:id",
      name: "gallery",
      component: gallery
    },
    {
      path: "/city",
      name: "city",
      // meta: {
      //   index: 2,
      // },
      component: city
    },

    {
      path: "/downApp",
      name: "downApp",
      // meta: {
      //   index: 2,
      // },
      component: downApp
    },
    {
      path: "/lot",
      name: "lot",
      // meta: {
      //   index: 2,
      // },
      component: lot
    },

//抽奖活动
    {
      path: "/lottery",
      name: "lottery",
      // meta: {
      //   index: 2,
      // },
      component: Lottery
    },
    {
      path: "/awardlist/:id",
      name: "AwardList",
      // meta: {
      //   index: 2,
      // },
      component: AwardList
    },
  ]
});
