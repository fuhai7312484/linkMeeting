import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyDetailsList from '@/pages/my/MydetailsList'
import SiteDetail from '@/pages/site/siteDetail'
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
    
  ]
})
