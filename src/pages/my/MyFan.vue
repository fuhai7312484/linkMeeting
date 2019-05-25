<template>
  <div class="box">
    <div style="height:44px;">
      <sticky :check-sticky-support="false" :offset="0">
        <div class="map-headerBox borBottm">
          <div class="map-go-back" @click="$router.go(-1)"></div>
          <h3 class="map-headerTitle">我的粉丝</h3>
        </div>
        <div v-if="myfanLen!=0" class="myfan-FollowNum padlr">共{{myfanLen}}人关注了我</div>
      </sticky>

      <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>
      <div v-if="!show2">
        <div class="noData-default"  v-if="myfanLen==0">
          <p>
            <img :src="require('../../assets/images/noData.png')">
          </p>
          <p>暂时还没有人关注你</p>
        </div>
        <group class="myfan-fanlistBox" v-if="myfanLen!=0">
          <cell
            v-for="(fan,index) in myfanData"
            :key="index"
            :title="fan.name"
            is-link
            :link="{path:'/tadetail/'+fan.id}"
          >
         
            <img
              slot="icon"
              width="45"
              height="45"
              style="display:block;margin-right:.8rem;border-radius:50%;"
              :src="fan.mainPic==null?require('../../assets/images/myFans-Mask.png'):fan.mainPic"
            >
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getStorage,
  checkToken,
  getDataInfo
} from "../../assets/lib/myStorage.js";
import {
  Group,
  Cell,
  Sticky,
  Loading,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  name: "MyFan",
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Sticky,
    Loading
  },
  data() {
    return {
      show2: true,
      myfanData: [
      ],
      myfanLen: 0
    };
  },

  methods: {
    getMyFanData() {
      let _that = this;
      let fansObj = {
        params: {
          userId: getStorage("userToken").userId
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "/refollow/follow/fans", fansObj).then(res => {
          if (res.data.code == 200) {
            // console.log(res)
            this.myfanData = res.data.data.myFens;
            this.myfanLen = res.data.data.fensNum;
            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/codelogin");
            }, 500);
          }
        });
      });
    }
  },
  mounted() {
    this.getMyFanData();
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
// .box{
//   background: #000;
//   // overflow: hidden;
//   height: 100%;
// }
.myfan-fanlistBox {
  .weui-cells {
    margin-top: 0;
  }
  .weui-cells::before {
    border: none;
  }
  .weui-cells::after {
    border: none;
  }
  .weui-cell::before {
    border: none;
  }
  .weui-cell {
    border-bottom: 1px solid #e6e6e6;
    padding-top: 1rem;
    padding-bottom: 1rem;
    .vux-label {
      font-size: 1rem;
      font-weight: bold;
      color: #323232;
    }
  }
}
</style>
