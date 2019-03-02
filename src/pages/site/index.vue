<template>
  <div class="box">
{{PositObj}}
    <div v-if="!IsShowMap">
      <div class="siteHeaderBox">
        <h3 class="fl siteHeaderTitle">搜场地</h3>
        <router-link tag="div" class="fl siteCity" to="/city">
          {{city.name?city.name:PositObj.city}}
          <i class="el-icon-caret-bottom"></i>
        </router-link>
        <!-- <div class="fl siteCity">
        北京
        <i class="el-icon-caret-bottom"></i>
        </div>-->
        <div class="siteListIcosBox fr">
          <router-link tag="div" to="siteSearch" class="fl HeaderSearch">
            <img src="../../assets/images/HeaderSearch.png">
          </router-link>
          <div class="fr HeaderSearch" @click="gotoMapChange">
            <img src="../../assets/images/b-map-position.png">
          </div>
        </div>
      </div>

      <!-- {{filterData}} -->
      <div class="padlr borBottm">
        <flexbox class="siteFiltersBox" :gutter="0">
          <flexbox-item v-for="(menu,index) in filterMenu" :key="index">
            <div
              @click="filterMenuChange(index)"
              :class="menu.show?'siteFilters siteFilters-active':'siteFilters'"
              :style="{color:menu.value=='0'?'#323232':'#FE666B'}"
            >
              {{ menu.value=="0"?menu.title:menu.name }}
              <i
                v-if=" menu.value=='0'"
                :class="menu.show?'el-icon-caret-top':'el-icon-caret-bottom'"
              ></i>
            </div>
          </flexbox-item>

          <flexbox-item>
            <div
              :class="show9?'siteFilters siteFilters-active':'siteFilters'"
              @click="FeaturesMenuChange"
              :style="{color:FeatureData.length==0?'#323232':'#FE666B'}"
            >
              筛选
              <i
                :class="show9?'el-icon-caret-top':'el-icon-caret-bottom'"
                :style="{color:FeatureData.length==0?'#323232':'#FE666B'}"
              ></i>
            </div>
          </flexbox-item>
        </flexbox>
      </div>

      <div v-transfer-dom>
        <popup v-model="show9" position="right" width="90%">
          <div class="FeaturesFilterBox">
            <div class="FeaturesConten">
              {{FeatureData}}
              <div class="FeaturesCheckes padlr" v-for="(feat,index) in Features" :key="index">
                <div class="FeaturesCheckeTitle">
                  <h4 class="fl">{{feat.title}}</h4>
                  <span class="CheckeInfo">{{feat.info}}</span>
                </div>
                <div class="transition-box">
                  <checker
                    v-model="feat.value"
                    radio-required
                    default-item-class="Filters-item"
                    selected-item-class="Filters-item-selected"
                  >
                    <checker-item value="0" @on-item-click="FeaturesChangeValue(0,feat)">不限</checker-item>

                    <checker-item
                      v-for="(feater,index) in feat.showData"
                      :key="index+1"
                      :value="(index+1)+''"
                      @on-item-click="FeaturesChangeValue(index+1,feat)"
                    >{{ feater }}</checker-item>
                  </checker>
                </div>
              </div>
            </div>

            <div class="FeaturesFilterBtns">
              <flexbox :gutter="0" class="footer-nav-box">
                <flexbox-item :span="1/4" :order="1">
                  <div class="footer-nav-FieldPlace" @click="ClearSelection">清空</div>
                </flexbox-item>

                <flexbox-item :span="3/4" :order="2">
                  <div class="footer-nav-destineBtn">确定</div>
                </flexbox-item>
              </flexbox>
            </div>
          </div>

          <!-- <div class="transition-box">
            <checker
              radio-required
              default-item-class="Filters-item"
              selected-item-class="Filters-item-selected"
            >
              <checker-item value="0" @on-item-click="changeValue(0,menuConten)">不限</checker-item>

            </checker>
          </div>-->
        </popup>
      </div>

      <!-- {{OrderHight}} -->
      <!-- {{demo1}} -->
      <div class="siteFiltersContent">
        <!-- 区域筛选 -->
        <el-collapse-transition>
          <div
            class="siteFiltersPublic"
            v-for="(menuConten,index) in filterMenu"
            :key="index"
            v-if="menuConten.show"
            :style="{height:(OrderHight -100 )+'px'}"
          >
            <div
              v-if="menuConten.show"
              class="transition-mak"
              @click="ClearMenuChange"
              :style="{height:(OrderHight - 100 )+'px'}"
            ></div>

            <div class="transition-box">
              <checker
                v-model="menuConten.value"
                radio-required
                default-item-class="Filters-item"
                selected-item-class="Filters-item-selected"
              >
                <checker-item value="0" @on-item-click="changeValue(0,menuConten)">不限</checker-item>

                <checker-item
                  v-for="(region,index) in menuConten.showData"
                  :key="index+1"
                  :value="(index+1)+''"
                  @on-item-click="changeValue(index+1,menuConten)"
                >{{ region }}</checker-item>
              </checker>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="crumbs-nav-main padlr">
        <!-- <span v-for="(vals,index) in filterData" :key="index">
      {{setFilterName(vals.type)}}:{{vals.name}}
           <x-icon type="ios-close-empty" size="30" @click="delFilterTage(index,vals)"></x-icon>
        </span>-->
      </div>

      <footer-nav></footer-nav>
<!-- {{TaPosted}} -->
      <div class="siteIndex-listBox">
        <ul class="my-tab-swiper vux-center" ref="pubUiHF">
          <li v-for="(taPos,index) in TaPosted" :key="index">
            <!-- {{taPos.name}} -->
            <!-- <flexbox v-if="taPos.type=='pub'"> -->
              <flexbox>
              <flexbox-item :span="1/4">
                <div class="my-tab-swiperListImg">
                  <!-- <img :src="taPos.img"> -->
                  <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg"/>
                </div>
              </flexbox-item>
              <flexbox-item :span="3/4">
                <div class="my-tab-listContent">
                  <h3>{{ taPos.city.name}}{{ taPos.name }}</h3>
                </div>

                <div class="my-tab-listContent mylistInfo">距离:{{ taPos.distance }} {{ taPos.area }}</div>

                <div
                  class="my-tab-listContent mylistInfo"
                >面积:{{ taPos.proportion }} 容纳:{{ taPos.hold }}</div>

                <div
                  class="my-tab-listContent mylistInfo"
                >会议室:{{ taPos.meetingRoom.length}}间 客房:{{ taPos.guestRoom }}</div>
                <flexbox :gutter="0">
                  <flexbox-item :span="1/2" class="listContent-tagbox">
                    <span
                      v-for="(tag,index) in taPos.tag"
                      :key="index"
                      class="listContent-tags"
                    >{{ tag }}</span>
                  </flexbox-item>
                  <flexbox-item :span="1/2">
                    <h4>¥{{ taPos.price }}</h4>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>

            <flexbox v-if="taPos.type=='par'">
              <flexbox-item :span="2/3">
                <div class="listContentPar">
                  <h3>{{ taPos.title }}</h3>
                </div>
                <div class="mylistInfo">{{taPos.time}}</div>
                <h4>¥{{ taPos.price }}</h4>
              </flexbox-item>
              <flexbox-item :span="1/3">
                <div class="my-tab-parListImg">
                  <img :src="taPos.img">
                </div>
              </flexbox-item>
            </flexbox>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="IsShowMap">
      <div class="map-headerBox">
        <div class="map-go-back" @click="IsShowMap = !IsShowMap"></div>
        <h3 class="map-headerTitle">找场地</h3>
        <div class="map-headerIcos">
          <img src="../../assets/images/button-search-balck.png">
        </div>

        <div class="map-headerIcos">
          <img src="../../assets/images/button-screen-black.png">
        </div>
      </div>

      <div class="siteMapBox">
        <div class="siteGotoMap" @click="gotoMapChange">
          <img src="../../assets/images/button-backlist.png">
        </div>
        <b-map :OrderHight="OrderHight-40" :data_info="TaPosted"></b-map>
      </div>
    </div>

   
  </div>
</template>
<script>
import { mapState } from "vuex";
import FooterNav from "@/components/footerNav";
import BMap from "@/components/BMap";
import City from "@/components/City";
import { getDataInfo,getPositioning,checkToken } from "../../assets/lib/myStorage.js";
import {
  Flexbox,
  FlexboxItem,
  Checker,
  CheckerItem,
  Popup,
  TransferDom,
  Sticky,
  Group
} from "vux";
export default {
  directives: {
    TransferDom
  },
  name: "SiteIndex",

  components: {
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    Popup,
    FooterNav,
    BMap,
    Sticky,
    Group,
    City
  },
  data() {
    return {
      positionCity:{},
      show9: false,
      show1: false,
      IsShowMap: false,
      filterData: [],
      FeatureData: [],
      PositObj:{},
      TaPosted: [
        {
          id: "001",
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "昆泰国家大酒店昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起",
          lng: 116.417854,
          lat: 39.921988
        },
        {
          id: "002",
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "2昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起",
          lng: 116.406605,
          lat: 39.921585
        },
        {
          id: "003",
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "3昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起",
          lng: 116.412222,
          lat: 39.912345
        },
        {
          id: "004",
          type: "pub",
          img:
            "https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg",
          city: "北京",
          area: "朝阳地区",
          title: "昆泰国家大酒店",
          distance: "130米",
          proportion: "320㎡",
          hold: "30人",
          meetingRoom: "50间",
          guestRoom: "10间",
          tag: ["机场", "餐厅", "无柱"],
          price: "5000半天起",
          lng: 116.447854,
          lat: 39.921988
        }
      ],
      Features: [
        {
          title: "场地特色",
          show: false,
          type: "features",
          value: "0",
          name: "",
          showData: [
            "无柱",
            "场地方正",
            "豪华",
            "美食",
            "自然采光",
            "园林草坪",
            "温泉",
            "景区周边",
            "水景",
            "泳池",
            "中式院落",
            "西式装修",
            "少数民族",
            "会场进车",
            "高尔夫"
          ],
          lng: 116.447854,
          lat: 39.921988
        },
        {
          id: "005",
          title: "场地价格",
          show: false,
          type: "price",
          info: "单位：元",
          value: "0",
          name: "",
          lng: 116.447854,
          lat: 39.921988,
          showData: [
            "2千以内",
            "2千-5千",
            "5千-1万",
            "1万-5万",
            "5万-8万",
            "8万以上"
          ]
        }
      ],
      filterMenu: [
        {
          title: "区域",
          show: false,
          type: "region",
          value: "0",
          name: "",
          showData: [
            "东城区",
            "西城区",
            "崇文区",
            "宣武区",
            "朝阳区",
            "丰台区",
            "石景山区",
            "海淀区",
            "门头沟区",
            "房山区",
            "通州区",
            "顺义区",
            "昌平区",
            "大兴区",
            "平谷区",
            "怀柔区",
            "密云县",
            "延庆县"
          ]
        },
        {
          title: "类型",
          show: false,
          type: "type",
          value: "0",
          name: "",
          showData: [
            "会展中心",
            "会议中心",
            "培训中心",
            "度假村",
            "咖啡厅",
            "餐厅",
            "会所",
            "五星酒店",
            "四星酒店",
            "三星酒店",
            "三星以下酒店",
            "艺术中心",
            "酒吧",
            "剧院",
            "别墅",
            "其他"
          ]
        },
        {
          title: "面积",
          show: false,
          type: "area",
          value: "0",
          name: "",
          showData: [
            "100㎡以内",
            "100-200㎡",
            "200-300㎡",
            "300-500㎡",
            "500-600㎡",
            "600-800㎡",
            "800-1000㎡",
            "1000-1500㎡",
            "1500㎡以上"
          ]
        },
        {
          title: "容纳",
          show: false,
          type: "contain",
          value: "0",
          name: "",
          showData: [
            "1-30",
            "30-60",
            "60-100",
            "100-200",
            "200-300",
            "300-500",
            "500-1000",
            "1000-以上"
          ]
        }
      ],

      showCity: false,
      showType: false,
      demo1: "0",
      OrderHight: 0,
      positionCity: "",
      regionData: [
        "东城区",
        "西城区",
        "崇文区",
        "宣武区",
        "朝阳区",
        "丰台区",
        "石景山区",
        "海淀区",
        "门头沟区",
        "房山区",
        "通州区",
        "顺义区",
        "昌平区",
        "大兴区",
        "平谷区",
        "怀柔区",
        "密云县",
        "延庆县"
      ]
    };
  },
  computed: {
    ...mapState(["city"])
  },
  methods: {
    handChange() {
      this.show1 = false;
    },
    //获取用户当前定位信息
    geting(){
 this.PositObj = getPositioning()

    },
    //地图和列表显示互相切换
    gotoMapChange() {
      this.IsShowMap = !this.IsShowMap;
    },
    //筛选点击选择获取value值
    changeValue(val, item) {
      //这里请求接口获取当前选择条件
      this.filterMenu.forEach(e => {
        if (e.type == item.type) {
          e.name = e.showData[val - 1];
        }
      });

      let obj = {
        val: val,
        type: item.type,
        name: item.showData[val - 1]
      };

      //  this.filterData.push(obj)

      if (this.filterData.length != 0) {
        let index = 0,
          isType = false;
        this.filterData.forEach((e, i) => {
          if (e.type == item.type) {
            index = i;
            isType = true;
          }
        });
        if (isType) {
          if (val == "0") {
            this.filterData.splice(index, 1);
          } else {
            this.filterData.splice(index, 1, obj);
          }
        } else {
          if (val == "0") {
            return;
          } else {
            this.filterData.push(obj);
          }
        }
      } else {
        if (val != "0") {
          this.filterData.push(obj);
        }
      }

      let _that = this;
      setTimeout(function() {
        _that.ClearMenuChange();
      }, 200);
    },
    //场地特色筛选择处理
    FeaturesChangeValue(val, item) {
      this.Features.forEach(e => {
        if (e.type == item.type) {
          e.name = e.showData[val - 1];
        }
      });

      let obj = {
        val: val,
        type: item.type,
        name: item.showData[val - 1]
      };

      //  this.filterData.push(obj)

      if (this.FeatureData.length != 0) {
        let index = 0,
          isType = false;
        this.FeatureData.forEach((e, i) => {
          if (e.type == item.type) {
            index = i;
            isType = true;
          }
        });
        if (isType) {
          if (val == "0") {
            this.FeatureData.splice(index, 1);
          } else {
            this.FeatureData.splice(index, 1, obj);
          }
        } else {
          if (val == "0") {
            return;
          } else {
            this.FeatureData.push(obj);
          }
        }
      } else {
        if (val != "0") {
          this.FeatureData.push(obj);
        }
      }

      console.log(val, item);
    },
    //清除特色选择
    ClearSelection() {
      this.Features.forEach(e => {
        e.value = "0";
      });
      this.FeatureData = [];
    },
    //删除当前筛选
    delFilterTage(index, vals) {
      this.filterMenu.forEach(e => {
        if (e.type == vals.type) {
          e.value = "0";
        }
      });
      this.filterData.splice(index, 1);

      //这里删除以后需要重新请求一个获取筛选数据的接口
    },
    FeaturesMenuChange() {
      this.filterMenu.forEach((e, i) => {
        e.show = false;
      });
      this.show9 = !this.show9;
    },
    //点击筛选菜单显示或隐藏筛选
    filterMenuChange(index) {
      let _that = this;
      // console.log(this.filterMenu[index]);
      this.filterMenu.forEach((e, i) => {
        if (i != index) {
          e.show = false;
        }
      });
      setTimeout(function() {
        _that.filterMenu[index].show = !_that.filterMenu[index].show;
      }, 200);
    },
    //清楚所有显示的筛选
    ClearMenuChange() {
      this.filterMenu.forEach(e => {
        e.show = false;
      });
    },
    getOrderHight() {
      var orderHight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.OrderHight = orderHight;
    },
    setFilterName(type) {
      switch (type) {
        case "region":
          return "区域";
          break;
        case "type":
          return "类型";
          break;
        case "area":
          return "面积";
          break;
        case "contain":
          return "容纳";
          break;
      }
    },

    getPlaceData() {
        let placeObj = {
        params: {
          lng:this.PositObj.lng,
          lat:this.PositObj.lat,
        }
      };
      
        checkToken().then(Pdata => {
        getDataInfo("get", "place", placeObj).then(res => {
          // if(res.data.code==200){
          //   this.TaPosted = res.data.data.data
          //   console.log(this.TaPosted)
          //   //  console.log(res)
          // }
         
        })
        })
    }
  },
  mounted() {
     this.geting()
    this.getOrderHight();
    this.getPlaceData();
    
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.transition-mak {
  position: absolute;
  width: 100%;
  // z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  // border-radius: 4px;
  background-color: #fff;
  // text-align: center;
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  // margin-right: 20px;
  //  display: flex;
}

.Filters-item {
  color: #323232;
  background: #f6f6f6;
  text-align: center;
  width: 28%;
  padding: 0.8rem 0;
  margin: 2% 2%;
  // border:1px solid  #F6F6F6;
  border-radius: 0.3rem;
  font-weight: bold;
  font-size: 0.8rem;
  position: relative;
}

.Filters-item-selected {
  //   border: 1px solid green;
  background: #fef4f4;
  background-image: url(../../assets/images/Filters-item-selected.png);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 20px;
  color: #fe666b;
}
.demo2-item {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
}
.demo2-item-selected {
  border-color: green;
}
.demo3-item {
  padding: 5px 5px;
  font-size: 0;
}
.demo3-item-selected {
  outline: 1px solid #8b8aee;
}
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #ff3b3b;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  //   background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>
