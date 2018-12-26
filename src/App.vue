<template>
  <div id="app">
    <!-- <transition :name="transitionName"> -->
          <router-view class="child-view"></router-view>
        <!-- </transition> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'app',
data(){
  return {
     transitionName: '',
  }
},
  watch: {
    //路由跳转 添加动画
    // $route(to, from) {
    //   //如果to索引大于from索引,判断为前进状态,反之
    //   if (to.meta.index > from.meta.index) {
    //     this.transitionName = 'slide-left';
    //   } else {
    //     this.transitionName = 'slide-right';
    //   }
    // }
  },

}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
body {
  background-color: #fff;


}

/*路由切换动画*/
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
//   will-change: transform; 
//   transition: all 400ms;
//   position: absolute;
// }
// .slide-right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
</style>
