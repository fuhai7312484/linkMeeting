<template>
  <div>
<!-- vux列表 -->
<router-link to="/detailslist">列表</router-link>

    <!-- <router-link to="/detailslist">列表</router-link>
   
    <tab active-color="#fe666b" default-color="#a0a0a0" custom-bar-width="43%" v-model="index" >
 <tab-item @on-item-click="handler" :selected="demo1 === item" v-for="(item,index) in list2" @click="demo2 = item" :key="index">
   {{item}}
 </tab-item>
</tab>
      <swiper v-model="index" height="100px" :show-dots="false" :loop="true">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper> -->


    <!-- <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div> -->
    <!-- <div @click="handChange"  class="info">
这里是文件

    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    <x-button type="primary" text="这个是按钮" @click.native="handChange">
      按钮
    </x-button> -->
  </div>
</template>
<script>
import { Group, Cell, XButton, Tab, TabItem, Swiper, SwiperItem } from "vux";
export default {
   name: 'HelloFromVux',
  components: {
    Group,
    Cell,
    XButton,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: "Hello World!",
      demo1: "Ta发布的",
      index: 0,
      list2: ["Ta发布的", "Ta参与的"]
    };
  },
  methods: {
    handChange() {
      // console.log("11111111");
    },
    handler(index) {
      // console.log(index);
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
.info1 {
  background: #000;
  width: 100%;
  height: 50px;
}
</style>
