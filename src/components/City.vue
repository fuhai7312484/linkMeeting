<template>
    <div>


        <ul class="scrollList"
 :ref="1"
 >
 <!-- <li class="scrollItem"
 v-for="(i,index) in 1" :key="index"
  @touchstart="touchStart"
@touchend="touchEnd"
@touchmove="touchMove"
@click="handClick"
 ref="Hot">推荐</li> -->

<li class="scrollItem" 
v-for="item of sletter" 
:key="item"
:ref="item"
@touchstart="touchStart"
@touchend="touchEnd"
@touchmove="touchMove"
@click="handClick"
>{{setHotchange(item)}}</li>
</ul>
       
 <div class="cityHeaderBox">
   
<div class="cityBack">
 <x-icon type="ios-close-empty" size="35"></x-icon>
</div>
<h3 class="cityTitle">
    城市选择
</h3>

 </div>

 <div class="cityListWrapper" ref="wrapper">
     <div>
 <div class="cityListBox padlr" v-for="(i,index) in 1" :key="index" ref="Rec">
     <div class="cityListTitle">
         根据您的定位推荐
     </div>
     <ul class="cityList">
         <li>
             <img src="../assets/images/b-map-position.png" v-if="positionCity!==''">{{positionCity}}
         </li>
         
     </ul>

 </div>


  <div class="cityListBox padlr" v-for="(i,index) in 1" :key="index+1" ref="His" >
     <div class="cityListTitle">
         历史记录
     </div>
     <ul class="cityList">

           <li v-for="(his,index) in historyCity" :key="index" :class="his==positionCity?'positionCity':''">
           {{his}}
         </li>
         
     </ul>

 </div>


  <div class="cityListBox padlr" v-for="(i,index) in 1" :key="index+2" ref="Hot">
     <div class="cityListTitle">
         热门城市
     </div>
     <ul class="cityList">
         <li v-for="(Hot,index) in HotCity" :key="index" :class="Hot==positionCity?'positionCity':''">
           {{Hot}}
         </li>
     
     </ul>

 </div>


<div class="cityArea padlr borBottm" 
         v-for="(item,key) of cities"
          :key="key"
          :ref="key"
          >
        
            <div class="cityAreaTage">{{key}}</div>
            <div class="cityAreaItem-list"
             v-for="e of item"
             :key="e.id"
             @click="handCityClick(e.name)">
                <div class="cityAreaItem">
                   {{e.name}}
                </div>
                

            </div>
        </div>
</div>
</div>
    </div>
</template>
<script>
import Bscroll from "better-scroll";
export default {
    name:'city',
    data(){
        return{
            positionCity:'城市定位中...',
            historyCity:['北京市','上海','广州'],
            HotCity:['北京市','上海','广州','深圳','杭州','成都'],
             touchStatus:false,
            startY:0,
            timer:0,
            letter:'',
            cities:{
            //    "Hot" :[{
            //        id:56,
			// 	spell: "aba",
			// 	name:"阿坝" 
            //     }],
			A:[{
				id:56,
				spell: "aba",
				name:"阿坝"
			}, {
				id: 57,
				spell: "akesu",
				name: "阿克苏"
			}, {
				id: 58,
				spell: "alashanmeng",
				name: "阿拉善盟"
            },],
            "B": [{
				"id": 1,
				"spell": "beijing",
				"name": "北京"
			}, {
				"id": 66,
				"spell": "baicheng",
				"name": "白城"
			}, {
				"id": 67,
				"spell": "baise",
				"name": "百色"
			}, {
				"id": 68,
				"spell": "baishan",
				"name": "白山"
			}, {
				"id": 69,
				"spell": "baiyin",
				"name": "白银"
            },],
            "C": [{
				"id": 2,
				"spell": "chongqing",
				"name": "重庆"
			}, {
				"id": 5,
				"spell": "changchun",
				"name": "长春"
			}, {
				"id": 6,
				"spell": "changsha",
				"name": "长沙"
			}, {
				"id": 7,
				"spell": "changzhou",
				"name": "常州"
			}, {
				"id": 8,
				"spell": "chengdu",
				"name": "成都"
            },],
            "D": [{
				"id": 9,
				"spell": "dalian",
				"name": "大连"
			}, {
				"id": 10,
				"spell": "dongguan",
				"name": "东莞"
			}, {
				"id": 99,
				"spell": "dali",
				"name": "大理"
			}, {
				"id": 100,
				"spell": "dandong",
				"name": "丹东"
			}, {
				"id": 101,
				"spell": "daqing",
				"name": "大庆"
            },],
            	"E": [{
				"id": 111,
				"spell": "eerduosi",
				"name": "鄂尔多斯"
			}, {
				"id": 112,
				"spell": "enshi",
				"name": "恩施"
			}, {
				"id": 113,
				"spell": "ezhou",
				"name": "鄂州"
			}, {
				"id": 417,
				"spell": "enping",
				"name": "恩平"
			}],
			"F": [{
				"id": 11,
				"spell": "foshan",
				"name": "佛山"
			}, {
				"id": 12,
				"spell": "fuzhou",
				"name": "福州"
			}, {
				"id": 114,
				"spell": "fangchenggang",
				"name": "防城港"
			}, {
				"id": 115,
				"spell": "fushun",
				"name": "抚顺"
			}, {
				"id": 116,
				"spell": "fuxin",
				"name": "阜新"
			}, {
				"id": 117,
				"spell": "fuyang",
				"name": "阜阳"
			},]
            
            }
        }
    },
     computed:{
        sletter(){
           const letters = ['Rec','His','Hot'];
        //    console.log(this.cities)
            for(let i in this.cities){
                letters.push(i)
            }
           
            return letters;
        }
    },
     methods: {
         //初始化定位
         setpositionCity(){
             let _that = this;
                var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          
           _that.positionCity = r.address.city
           
          } else {
            alert("failed" + this.getStatus());
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
         setHotchange(Hot){
             switch(Hot){
                 default: 
                 return Hot;
                  case 'Rec':
                  return '推荐';
                  break;
                  case 'His':
                  return '历史';
                  break;
                 case 'Hot':
                 return '热门';
                 break;
                
                
                 
             }
         },
           handClick(ev){
            // this.$emit('change',ev.target.innerText)
                  },
        touchStart(){
            this.touchStatus = true;
        },
        touchMove(ev){
            if(this.touchStatus){
                if(this.timer){
                    clearTimeout(this.timer)
                }
                let _that = this;
                this.timer = setTimeout(()=>{
                    const touchY = ev.touches[0].clientY
                    const index =Math.floor((touchY-this.startY)/23)
            
                   this.letter = this.sletter[index]
               
                },16.7)
            }
        },
        touchEnd(){
            this.touchStatus = false;
        }

     },
      watch: {
    letter() {
      if (this.letter) {
        //   console.log(this.$refs)
        let el = this.$refs[this.letter][1];
        // console.log(el)
        this.scroll.scrollToElement(el);
      }
    }
  },
     mounted () {
     
          this.scroll = new Bscroll(this.$refs.wrapper,{});
           this.startY = this.$refs['1'].offsetTop
         this.setpositionCity()
     }
}
</script>
<style lang="less">
@import "../assets/style/tools.less";
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.cityListWrapper{
   overflow: hidden;
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
}
.cityAreaTage{
    color: #A0A0A0;
    padding: .5rem 0;

}
.cityAreaItem{
font-size: .8rem;
color: #323232;
padding: .5rem 0;
font-weight: bold;
}

.scrollList{
    // background: #000;
    display:flex;
    flex-direction: column;
    justify-content: center;

     position: fixed ;
      right:0rem;
       top: 10.5rem;
       width: 2rem;
       z-index: 9999;
    //    background: #000;
      

}
.scrollItem{
    // line-height: .4rem;
    text-align: center;
    color: #969696;
    font-size: .9rem;
  
    
}


</style>
