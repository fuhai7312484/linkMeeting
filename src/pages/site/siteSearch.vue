<template>
    <div class="siteSearchBox">
<flexbox :gutter="0">
      <flexbox-item :span="4/5">
<x-input placeholder="请输入场地名称/地标"
@on-change="SearchInputChange"
v-model="keyword"
 class="siteSearchInput"
 >
<img slot="label" style="padding-right:10px;display:block;" src="../../assets/images/search-gray.png" width="18" height="18">

 </x-input>


      </flexbox-item>
      <flexbox-item :span="1/5">
<div class="siteSearchCancel">取消</div>

      </flexbox-item>
     
      <div class="search-content" 
   ref="search"
   v-show="keyword"
   >
       <ul>
           <li class="search-item-list borBottm" v-for="(item,index) of list" :key="index" 
           @click="handSearchClick(item.name)"
           >
           {{item.name}}
           </li>
       </ul>

   </div>




    </flexbox>





<div class="padlr">


 



<div class="siteSearchHistory">

<flexbox>
      <flexbox-item :span="4/5" >
<h4 class="HistoryTitle">
搜索历史
</h4>


      </flexbox-item>
      <flexbox-item :span="1/5">
      <div class="HistoryDelete">
          <img src="../../assets/images/del-gray.png" />
      </div>
    
      </flexbox-item>
    </flexbox>
<ul class="siteSearchList">
<li>北京昆泰国际酒店</li>
<li>船舶重工酒店</li>
<li>国家会议中心</li>
</ul>



</div>



<div class="siteSearchHistory">

<flexbox>
      <flexbox-item :span="4/5" >
<h4 class="HistoryTitle">
热搜场地
</h4>


      </flexbox-item>

    </flexbox>
<ul class="siteHotSearchList">
<li>北京昆泰国际酒店</li>
<li>船舶重工酒店</li>
<li>国家会议中心</li>
</ul>



</div>



</div>
 


    </div>
</template>
<script>
import { XInput,Flexbox, FlexboxItem  } from "vux"
export default {
    name:'siteSearch',
     components: {
    XInput,
    Flexbox, FlexboxItem 
    },
    data(){
        return {
          keyword: "",
          list:[],

            cities: [
               {
                   id:'001',
                   name:'北京昆泰国际酒店',
                   spell:'beijing',

               },
                {
                   id:'001',
                   name:'北京昆泰国际酒店',
                   spell:'beijing',

               },
                {
                   id:'001',
                   name:'北京昆泰国际酒店',
                   spell:'beijing',

               }
               ,{
                   id:'002',
                   name:'船舶重工酒店',
                   spell:'chuan',
               },{
                   
                   id:'003',
                   name:'国家会议中心',
                   spell:'guojia',
               }
           ],


        //    cities: [
        //        {
        //            id:'001',
        //            name:'北京昆泰国际酒店',
        //            spell:'beijing',

        //        },{
        //            id:'002',
        //            name:'船舶重工酒店',
        //            spell:'chuan',
        //        },{
                   
        //            id:'003',
        //            name:'国家会议中心',
        //            spell:'guojia',
        //        }
        //    ],
      timer: null,
        }
    },
      methods: {
    SearchInputChange(val){
        console.log(val)

    },
     handSearchClick(val){
      // this.$store.commit('changeCity',city)
      this.keyword = val
    //   this.$router.push('/')
     
    },
         },
         watch:{
             keyword() {
    
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        let result = [];
        this.cities.forEach((e,index) => {
            if(e.spell.indexOf(this.keyword) > -1 ||
           e.name.indexOf(this.keyword) > -1){
                result.push(e);
           }
        });


        // for (let index in this.cities) {
        //   this.cities[index].forEach(e => {
        //     if (
        //       e.spell.indexOf(this.keyword) > -1 ||
        //       e.name.indexOf(this.keyword) > -1
        //     ) {
        //       result.push(e);
        //     }
        //   });
        // }
        let msg = [{id:'000',name:'没有您查询的酒店信息！',spell:'没有您查询的酒店信息！'}]
        result.length?this.list = result:this.list=msg;
     
      }, 100);
    }
         }
}



</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

</style>

