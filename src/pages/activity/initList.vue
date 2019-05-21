<template>
  <div>
    <div class="initListTop">
      已有
      <div class="initListNumBox">
        <b v-for="(i,index) in endvalChange()" :key="index"></b>
        <countup
          :start-val="0"
          :end-val="ListNames.length"
          :options="options"
          :duration="4"
          class="initListTopNum"
        ></countup>
      </div>

      <!-- <span> 0 </span><span> 9 </span> -->
      人参与抽奖
    </div>
<div class="listCententNo" v-if="ListNames.length==0">
  <div class="no-lists">
   <p> <img :src="require('../../assets/images/noData.png')"></p>
    <p>当前无人参与</p>

</div>
 
</div>
    <div class="listCentent" v-if="ListNames.length!=0">
      {{Winer}}
      <ul>
        <li
          v-for="(lister,index) in ListNames"
          :key="index"
          class="listerLi"
          :class="['award'+index,{'active': index==current}]"
        >
          <div class="listMainPic">
            <img :src="lister.mainPic">
          </div>
          <p>{{lister.name}}</p>
        </li>
      </ul>
    </div>

    <div class="footerBtn">
      <div v-if="btnStats==0">
        <img :src="require('../../assets/images/footerBtn-no.png')">
      </div>
      <div v-if="btnStats==1" @click="start">
        <img :src="require('../../assets/images/footerBtn-start.png')">
      </div>
      <div v-if="btnStats==2" @click="shop">
        <img :src="require('../../assets/images/footerBtn-end.png')">
      </div>
    </div>
  </div>
</template>
<script>
import {
  isweixin,
  WeChatLogin,
  setStorage,
  getStorage
} from "../../assets/lib/myStorage.js";
import { Countup, TransferDomDirective as TransferDom } from "vux";
export default {
  name: "initList",
  directives: {
    TransferDom
  },
  components: {
    Countup
  },
  data() {
    return {
      current: 0,
      endval: 9,
      btnStats: 1,
      options: {
        separator: ""
      },
      ListNames: [
        {
          id: '001',
          name: "小猪佩奇小猪佩奇小猪佩奇小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '002',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '003',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '004',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '005',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '006',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '007',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        {
          id: '008',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇小猪佩奇小猪佩奇小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇小猪佩奇小猪佩奇小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // },
        // {
        //   id: 123456,
        //   name: "小猪佩奇",
        //   mainPic: require("../../assets/images/20146216561084761.gif")
        // }
      ],
      Winer:[ {
          id: '007',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
         {
          id: '005',
          name: "小猪佩奇",
          mainPic: require("../../assets/images/20146216561084761.gif")
        },
        ],
         speed: 200,   // 速度
            diff: 15,   // 速度增加的值
            award: {},   // 抽中的奖品
            time: 0   // 记录开始抽奖时的时间
    };
  },
  methods: {
    endvalChange() {
      return (this.ListNames.length + "").length;
    },
    start() {
      // 开始抽奖
      this.btnStats = 2;
      this.move();
      this.time = Date.now();
      this.speed = 200;
      this.diff = 15;
    },
    shop(){
      clearInterval(window.timeout)
        this.btnStats = 1;
        this.Winer.push(this.ListNames[this.current])
      alert('恭喜你'+this.ListNames[this.current].name+'中奖了！')
      console.log(this.ListNames[this.current])
    },
    move() {

       window.timeout = setInterval(() => {
        this.current = Math.floor(Math.random()*this.ListNames.length)
        // alert(this.current)
        // console.log( Math.floor(Math.random()*this.ListNames.length))
      //  if (this.current > this.ListNames.length) {
      //     this.current = 0;
      //   }
       },100)
      

      // window.timeout = setTimeout(() => {
      //   this.current++;
      //   if (this.current > 7) {
      //     this.current = 0;
      //   }

      //   // 若抽中的奖品id存在，则开始减速转动
      //   if ((Date.now() - this.time) / 1000 > 2) {
      //     this.speed += this.diff; // 转动减速

      //     // && this.award.id == this.awards[ this.current ].id
      //     // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
      //     if ((Date.now() - this.time) / 1000 > 4) {
      //       this.award = this.awards[this.current];
      //       // console.log(this.awards[ this.current ])
      //       clearTimeout(window.timeout);
      //       setTimeout(() => {
      //         alert(this.award.name);
      //       }, 0);
      //       return;
      //     }

      //     // 若转动时间超过4秒，并且奖品id等于小格子的奖品id，则停下来！
      //     // if ( ( Date.now() - this.time ) / 1000 > 4 && this.award.id == this.awards[ this.current ].id ) {
      //     //     clearTimeout( window.timeout );
      //     //     setTimeout( () => {
      //     //         alert( this.award.name );
      //     //     }, 0 );
      //     //     return;
      //     // }

      //     // 若抽中的奖品不存在，则加速转动
      //   } else {
      //     this.speed -= this.diff; // 转动加速
      //   }

      //   this.move();
      // }, this.speed);
    }
  },
  mounted() {
    if (this.ListNames.length == 0) {
      this.btnStats = 0;
    } else {
      this.btnStats = 1;
    }
  }
};
</script>
<style lang="less">
@import "../../assets/style/lotStyle.less";
@import "~vux/src/styles/reset.less";
</style>


