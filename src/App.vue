<template>
  <div id="app">
    <!-- {{codeUrl}} -->
    <!-- <transition :name="transitionName"> -->
    <router-view class="child-view"></router-view>
    <!-- </transition> -->
    <!-- <router-view></router-view> -->

  </div>
</template>

<script>
// import {JIMinitchange} from "./assets/lib/myStorage.js";
import axios from "axios";
// import { mapState, mapMutations } from "vuex";
// import {
//   Popup,
//   Group,
//   XInput,
//   TransferDomDirective as TransferDom,
//   XButton,
//   Toast
// } from "vux";
// import {
//   stoRemove,
//   removeCookie,
//   getStorage,
//   checkToken,
//   getDataInfo,
//   isweixin,
//   GetQueryString,
//   JIMinitchange,
//   setCookie,
//   setStorage,getCookie,WeChatLogin
// } from "./assets/lib/myStorage.js";
export default {
  name: "app",
  // directives: {
  //   TransferDom
  // },
  // components: {
  //   Popup,
  //   Group,
  //   XInput,
  //   XButton,
  //   Toast
  // },
  data() {
    return {
      // transitionName: "",
      // wxData: null,
      // wxshow1: false,
      // wxValue: "",
      // time: 60,
      // BindCodeVal: "",
      // Resend: true,
      // ResBtn: true,
      // ResendTitle: "获取验证码",
      // showLoading: false,
      // dx_djs: null,
      // wxNext: 1,
      // toastInfo: {
      //   showMsg: "",
      //   showPositionValue: false,
      //   toastType: "success"
      // },
      // codeValuefun: function(value) {
      //   let regExp = /^\d{6}\b/;
      //   let r = value.match(regExp);
      //   return {
      //     valid: r != null,
      //     msg: "验证码不正确!"
      //   };
      // }
    };
  },
  computed: {
   
  },
  methods: {
  
   
  },
  created() {
    // JIMinitchange()
  },
  mounted() {
   
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
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
body {
  background-color: #fff;
}
// .WXPopupBox {
//   .vux-popup-dialog {
//     z-index: 503;
//   }
// }
// .WXPopup1 {
//   z-index: 9999;
//   padding: 0.8rem;
//   h4 {
//     font-size: 1.5rem;
//   }
//   .WXbindInfo {
//     font-size: 0.8rem;
//     color: #a0a0a0;
//   }
// }

// .wxCodeBindSussBox {
//   margin: 2rem 0;
//   text-align: center;
//   .wxCodeBindSussImg {
//     img {
//       width: 100px;
//     }
//   }
//   .wxCodeBindSussInfo {
//     color: #505050;
//     font-size: 0.8rem;
//     margin: 0.8rem 0;
//     span {
//       color: #4a90e2 !important;
//     }
//   }
//   .Bind-succ-primary-red {
//     background: red;
//     color: #fff;
//   }
// }
// /*路由切换动画*/
// // .slide-right-enter-active,
// // .slide-right-leave-active,
// // .slide-left-enter-active,
// // .slide-left-leave-active {
// //   will-change: transform;
// //   transition: all 400ms;
// //   position: absolute;
// // }
// // .slide-right-enter {
// //   opacity: 0;
// //   transform: translate3d(-100%, 0, 0);
// // }
// // .slide-right-leave-active {
// //   opacity: 0;
// //   transform: translate3d(100%, 0, 0);
// // }
// // .slide-left-enter {
// //   opacity: 0;
// //   transform: translate3d(100%, 0, 0);
// // }
// // .slide-left-leave-active {
// //   opacity: 0;
// //   transform: translate3d(-100%, 0, 0);
// // }
</style>
