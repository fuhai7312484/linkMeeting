<template>
  <div>
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <ul class="scrollList" :ref="1">
      <li
        class="scrollItem"
        v-for="item of sletter(cities)"
        :key="item"
        :ref="item"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchMove"
        @click="handClick"
      >{{setHotchange(item)}}</li>
    </ul>

    <div class="cityHeaderBox">
      <div class="cityBack" @click="$router.go(-1)">
        <x-icon type="ios-close-empty" size="35"></x-icon>
      </div>
      <h3 class="cityTitle">城市选择</h3>
    </div>

    <div class="cityListWrapper" ref="wrapper">
      <div>

         <div class="cityListBox padlr" ref="Rec">
          <!-- <div class="cityListTitle">当前位置</div> -->
          <ul class="cityList">
            <li @click="handCityClick()">
             全国
            </li>
          </ul>
        </div>


        <div class="cityListBox padlr" v-for="(i,index) in 1" :key="index" ref="Rec">
          <div class="cityListTitle">当前位置</div>
          <ul class="cityList">
            <li @click="handCityClick(positionCity)">
              <img src="../assets/images/b-map-position.png" v-if="positionCity!==''">
              {{positionCity.name}}
            </li>
          </ul>
        </div>
        <!-- {{cities}} -->
        <div
          class="cityListBox padlr"
          v-if="historyCity.length !=0"
          v-for="(i,index) in 1"
          :key="index+1"
          ref="His"
        >
          <div class="cityListTitle">历史记录</div>
          <ul class="cityList">
            <li
              v-for="(his,index) in historyCity"
              :key="index"
              :class="his==positionCity?'positionCity':''"
              @click="handCityClick(his)"
            >{{his.name}}</li>
          </ul>
        </div>

        <div class="cityListBox padlr" v-for="(i,index) in 1" :key="index+2" ref="Hot">
          <div class="cityListTitle">热门城市</div>
          <ul class="cityList">
            <li
              v-for="(Hot,index) in HotCity"
              :key="index"
              :class="Hot==positionCity?'positionCity':''"
              @click="handCityClick(Hot)"
            >{{Hot.name}}</li>
          </ul>
        </div>
        <!-- {{cities}} -->
        <div v-if="!show2">
          <div class="cityArea padlr borBottm" v-for="(item,key) of cities" :key="key" :ref="key">
            <div class="cityAreaTage">{{key}}</div>
            <div
              class="cityAreaItem-list"
              v-for="(e,index) of item"
              :key="index"
              @click="handCityClick(e)"
            >
              <div class="cityAreaItem">{{e.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <toast
      v-model="toastInfo.showPositionValue"
      width="3em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import { mapState, mapMutations } from "vuex";

import {
  checkToken,
  getDataInfo,
  setStorage,
  getStorage
} from "../assets/lib/myStorage.js";
import { Toast, TransferDomDirective as TransferDom, Loading } from "vux";
export default {
  name: "city",
  directives: {
    TransferDom
  },
  components: {
    Toast,
    Loading
  },
  data() {
    return {
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      show2: true,
      positionCity: {},
      historyCity: [],
      HotCity: [],
      touchStatus: false,
      startY: 0,
      timer: 0,
      letter: "",
      cities: {
        // A: [
        //   {
        //     id: 56,
        //     spell: "aba",
        //     name: "阿坝"
        //   },
        //   {
        //     id: 57,
        //     spell: "akesu",
        //     name: "阿克苏"
        //   },
        //   {
        //     id: 58,
        //     spell: "alashanmeng",
        //     name: "阿拉善盟"
        //   }
        // ],
      }
    };
  },
  computed: {
    ...mapState(["city"])
    // sletter() {
    //   const letters = ["Rec", "His", "Hot"];
    //   //    console.log(this.cities)
    //   for (let i in this.cities) {
    //     letters.push(i);
    //   }
    //   // console.log(letters)
    //   return letters;
    // }
  },
  methods: {
    ...mapMutations(["changeCity"]),

    sletter(cities) {
      const letters = ["Rec", "His", "Hot"];
      //    console.log(this.cities)
      for (let i in this.cities) {
        letters.push(i);
      }
      // console.log(letters)
      return letters;
    },
    //点击城市切换城市
    handCityClick(city) {
      // console.log(city);
      if(!city){
        city={
          centerLatitude: null,
          centerLongitude: null,
          higherCode: null,
          hotFlag: 1,
          jianPin: "ZHRMGHG",
          level: 1,
          name: "全国",
          quanPin: "zhonghuarenmingongheguo",
          regionCode: 100000,
          zoneCode: null,
        }
      }
      // console.log(city);
      if (getStorage("historyCity")) {
        let arr = getStorage("historyCity");
        arr = arr.filter(e => {
          return e.regionCode != city.regionCode;
        });
        arr.unshift(city);
        if (arr.length > 3) arr.length = 3;
        setStorage("historyCity", arr);
      } else {
        setStorage("historyCity", [city]);
      }
      this.changeCity(city);
      this.$router.go(-1);
    },
    //获取当前城市列表
    getCityList() {
      let _that = this;
      let obj = {};
      //获取全部城市列表
      getDataInfo("get", "region/cityMeeting", obj).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data;
          data.forEach(e => {
            let key = e.jianPin.substr(0, 1);

            this.cities[key] = [];
          });
          data.forEach(el => {
            this.cities[el.jianPin.substr(0, 1)].push(el);
          });
          this.show2 = false;
        } else if (res.data.code == 400 || res.data.code == 100101) {
          setTimeout(function() {
            _that.$router.push("/login");
          }, 1000);
        }
      });
      //获取热门城市列表
      getDataInfo("get", "region/hotcity", obj).then(res => {
        if(res.data.code==200){
            this.HotCity = res.data.data
        }
      });
      //获取历史城市记录
      if (getStorage("historyCity")) {
        this.historyCity = getStorage("historyCity");
      }
    },
    //初始化定位
    setpositionCity() {
      let _that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            function setCity(city) {
              if (city.charAt(city.length - 1) == "市") {
                return city.slice(0, city.length - 1);
              } else {
                return city;
              }
            }
            // console.log(r);
            let obj={
               params:{
              province:r.address.province,
              city:r.address.city,
              zone:'',
               }
              
            }
            // console.log(obj)
            getDataInfo("get", "region/code", obj).then(res => {
              // console.log(res)
        if(res.data.code==200){
           _that.positionCity = res.data.data[0]
        }
      });

            _that.positionCity = setCity(r.address.city);
          } else {
            switch (this.getStatus()) {
              case 2:
                alert("位置结果未知 获取位置失败.");
                break;
              case 3:
                alert("导航结果未知 获取位置失败..");
                break;
              case 4:
                alert("非法密钥 获取位置失败.");
                break;
              case 5:
                alert("对不起,非法请求位置  获取位置失败.");
                break;
              case 6:
                alert("对不起,当前 没有权限 获取位置失败.");
                break;
              case 7:
                alert("对不起,服务不可用 获取位置失败.");
                break;
              case 8:
                alert("对不起,请求超时 获取位置失败.");
                break;
            }
          }
        },
        { enableHighAccuracy: true }
      );
      //关于状态码
      //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
      //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
      //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
      //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
      //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
      //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
      //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
      //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
      //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
    },
    setHotchange(Hot) {
      switch (Hot) {
        default:
          return Hot;
        case "Rec":
          return "推荐";
          break;
        case "His":
          return "历史";
          break;
        case "Hot":
          return "热门";
          break;
      }
    },
    handClick(ev) {},
    touchStart() {
      this.touchStatus = true;
    },
    touchMove(ev) {
      // console.log(this.sletter())
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        let _that = this;
        this.timer = setTimeout(() => {
          const touchY = ev.touches[0].clientY;
          const index = Math.floor((touchY - this.startY) / 23);
          this.letter = this.sletter()[index];

          if (this.setHotchange(this.letter)) {
            this.toastInfo = {
              showMsg: this.setHotchange(this.letter),
              showPositionValue: true,
              toastType: "text"
            };
          }
        }, 16.7);
      }
    },
    touchEnd() {
      this.touchStatus = false;
    }
  },
  watch: {
    letter() {
      if (this.letter) {
        let el = this.$refs[this.letter][1];
        this.scroll.scrollToElement(el);
      }
    }
  },
  created() {
    this.getCityList();
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, { click: true, taps: true });
    this.startY = this.$refs["1"].offsetTop;
    this.setpositionCity();
  }
};
</script>
<style lang="less">
@import "../assets/style/tools.less";
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.cityListWrapper {
  overflow: hidden;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  // background: #000;
}
.cityAreaTage {
  color: #a0a0a0;
  padding: 0.5rem 0;
}
.cityAreaItem {
  font-size: 0.8rem;
  color: #323232;
  padding: 0.5rem 0;
  font-weight: bold;
}

.scrollList {
  // background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
  right: 0rem;
  top: 3.5rem;
  width: 2rem;
  z-index: 9999;
  //    background: #000;
}
.scrollItem {
  // line-height: .4rem;
  text-align: center;
  color: #969696;
  font-size: 0.9rem;
}
</style>
