import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyDetailsList from '@/pages/my/MydetailsList'
import SiteIndex from '@/pages/site/index'
import SiteSearch from '@/pages/site/siteSearch'
import SiteDetail from '@/pages/site/siteDetail'
import roomDetail from '@/pages/site/RoomDetail'
import gallery from '@/components/gallery'
import city from '@/components/City'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      component: SiteIndex
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
      component: city
    },
    
  ]
})
