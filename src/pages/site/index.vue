<template>
    <div class="box">
<div class="siteHeaderBox">
    <h3 class="fl siteHeaderTitle">搜场地</h3><div class="fl siteCity">北京 <i class="el-icon-caret-bottom"></i> </div>
    <div class="fr HeaderSearch">  <img src="../../assets/images/HeaderSearch.png"></div>
</div>

<div class="padlr borBottm">
  <flexbox class="siteFiltersBox" :gutter="0">
      <flexbox-item>
          <div @click="showCity = !showCity" :class="showCity?'siteFilters siteFilters-active':'siteFilters'">
        区域<i :class="showCity?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
          </div>
          </flexbox-item>
      <flexbox-item>
       <div class="siteFilters">
        类型<i class="el-icon-caret-bottom"></i>
          </div>
      </flexbox-item>
      <flexbox-item>  <div class="siteFilters">
        面积<i class="el-icon-caret-bottom"></i>
          </div></flexbox-item>
      <flexbox-item>   <div class="siteFilters">
        容纳<i class="el-icon-caret-bottom"></i>
          </div></flexbox-item>
      <flexbox-item> 
           <div class="siteFilters">
        筛选<i class="el-icon-caret-bottom"></i>
          </div>
      </flexbox-item>
    </flexbox>

    

</div>


<!-- {{demo1}} -->
   <div class="siteFiltersContent">
      <el-collapse-transition>
        <div v-show="showCity">
          <div class="transition-box">

 <checker v-model="demo1" radio-required default-item-class="Filters-item"

  selected-item-class="Filters-item-selected">
     <checker-item value="0">
不限
      </checker-item>

      <checker-item v-for="(region,index) in regionData" :key="index+1" :value="(index+1)+''" @on-item-click="changeValue(index+1)">
{{region}}
      </checker-item>
     
      </checker>

          </div>
      
        </div>
      </el-collapse-transition>
    </div>
  
 
<div class="siteMapBox">
地图

</div>
  



    </div>
</template>
<script>

import {
  Flexbox,
  FlexboxItem,Checker, CheckerItem
 
} from "vux";
export default {
    nama:'SiteIndex',
     components: {
    Flexbox,
    FlexboxItem,Checker, CheckerItem
    
  },
    data(){
        return{
            showCity:false,
             demo1: '0',
            regionData:["东城区",
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
          "延庆县",]

        }
    },
    methods:{
        changeValue(val){
            console.log(val)
        }
    }
}
</script>
<style  lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";


.transition-box {
    margin-bottom: 10px;
    width: 100%;
    // border-radius: 4px;
    background-color: #fff;
    // text-align: center;
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    // margin-right: 20px;
    //  display: flex;

  }


.Filters-item{
    color: #323232;
    background: #F6F6F6;
    text-align: center;
    width: 28%;
    padding: .8rem 0;
    margin: 2% 2%;
    // border:1px solid  #F6F6F6;
    border-radius:.3rem; 
    font-weight: bold;
    font-size: .8rem;
    position: relative;

   
}


.Filters-item-selected {
//   border: 1px solid green;
background: #FEF4F4;
background-image:url(../../assets/images/Filters-item-selected.png); 
background-position: right bottom;
background-repeat: no-repeat;
background-size:20px; 
color: #FE666B;
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
  outline: 1px solid #8B8AEE;
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
  background-color: #FF3B3B;
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

