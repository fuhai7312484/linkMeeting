import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login/login'
import Reg from '@/pages/Login/reg'
import Retpass from '@/pages/Login/Retpass'
import MyDetailsList from '@/pages/my/MydetailsList'
import SiteIndex from '@/pages/site/index'
import SiteSearch from '@/pages/site/siteSearch'
import SiteDetail from '@/pages/site/siteDetail'
import roomDetail from '@/pages/site/RoomDetail'
import MeetingIndex from '@/pages/meeting/index'
import MeetDetail from '@/pages/meeting/meetDetail'
import NavMap from '@/components/NavMap'
import Ticket from '@/pages/meeting/Ticket'
import SignInfo from '@/pages/meeting/signUpInfo'
import MsgIndex from '@/pages/Message/index'
import OrderMsg from '@/pages/Message/Order.vue'
import Dialog from '@/pages/Message/Dialog.vue'
import MyIndex from '@/pages/my/index'
import gallery from '@/components/gallery'
import city from '@/components/City'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // meta: {
      //   index: 0,
      // },
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      // meta: {
      //   index: 2,
      // },
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      // meta: {
      //   index: 2,
      // },
      component: Reg
    },
    {
      path: '/retpass',
      name: 'retpass',
      // meta: {
      //   index: 2,
      // },
      component: Retpass
    },
    {
      path: '/detailsList',
      name: 'MyDetailsList',
      component: MyDetailsList
    },
     {
      path: '/sitedetail',
      name: 'SiteDetail',
      component: SiteDetail
    },
    {
      path: '/siteSearch',
      name: 'siteSearch',
      component: SiteSearch
    },
    {
      path: '/siteindex',
      name: 'SiteIndex',
      // meta: {
      //   index: 1,
      // },
      component: SiteIndex
    },
    {
      path: '/meeting',
      name: 'MeetingIndex',
      // meta: {
      //   index: 1,
      // },
      component: MeetingIndex
    },
    {
      path: '/meetDetail',
      name: 'MeetDetail',
      // meta: {
      //   index: 1,
      // },
      component: MeetDetail
    },
    {
      path: '/navmap',
      name: 'NavMap',
      // meta: {
      //   index: 1,
      // },
      component: NavMap
    },
    {
      path: '/ticket',
      name: 'Ticket',
      // meta: {
      //   index: 1,
      // },
      component: Ticket
    },
    {
      path: '/signinfo',
      name: 'SignInfo',
      // meta: {
      //   index: 1,
      // },
      component: SignInfo
    },



    {
      path: '/msgindex',
      name: 'MsgIndex',
      // meta: {
      //   index: 1,
      // },
      component: MsgIndex
    },
    {
      path: '/ordermsg',
      name: 'OrderMsg',
      // meta: {
      //   index: 1,
      // },
      component: OrderMsg
    },
    {
      path:'/dialog',
      name:'Dialog',
      component:Dialog,
    },
    {
      path: '/myindex',
      name: 'MyIndex',
      // meta: {
      //   index: 1,
      // },
      component: MyIndex
    },
    {
      path: '/roomdetail',
      name: 'roomDetail',
      component: roomDetail
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: gallery
    },
    {
      path: '/city',
      name: 'city',
      // meta: {
      //   index: 2,
      // },
      component: city
    },
    
  ]
})
