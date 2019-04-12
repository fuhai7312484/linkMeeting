// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import router from "./router"
import App from './App'
import store from './store'
import { getCookie } from "./assets/lib/myStorage";



// import Home from './components/HelloFromVux'

// Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })
import wx from "weixin-js-sdk";
Vue.use(wx)

import VideoPlayer from 'vue-video-player'
import Video from 'video.js'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)



Vue.use(ElementUI);
Vue.prototype.$video = Video

FastClick.attach(document.body)

Vue.config.productionTip = false

// router.afterEach((to, from)=>{
//   console.log('即将进入：', to);
//   console.log('即将离开：', from);
// });
router.beforeEach((to, from, next) => {
  // console.log(to,from)
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限

    if (getCookie("accessToken") || store.state.isLogin == 100) {
      // 判断当前的token是否存在
      
      next();
    } else {
      // console.log('请先登录！')
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});



/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
