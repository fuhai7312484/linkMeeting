<template>
    <div class="box">
          <actionsheet
      v-model="showMapSelect"
      :menus="mapMenus"
      @on-click-menu="MapSelectClick"
      show-cancel
    ></actionsheet>


<div class="navMapBox">


<div id="allmap" ref="allmap"></div>

<!-- 导航{{$route.query.library_id}} -->
</div>

        
    </div>
</template>
<script>
import { Actionsheet } from 'vux'
export default {
    name:'Navmap',
    components: {
    Actionsheet
  },
    data(){
        return {
                System: "",
                showMapSelect:false,
                mapMenus: {
        gaoDeMap: "高德地图",
        baiduMap: "百度地图"
      },
        }
    },
    methods:{
          //弹出显示地图选择菜单
    MapSelectClick(key) {

          this.wakeApp(key)



    //   if (key == "gaoDeMap") {
         

    //    console.log('高德地图')
    //   } else if (key == "baiduMap") {
    //       console.log('百度地图')
    //     // alert('在线咨询')
      
    //   }
    },
  map() {
      let _that = this;
    //   百度地图API功能
      var map = new BMap.Map("allmap"); // 创建Map实例
    //   console.log(this.$route.query.lat,this.$route.query.lng)
    console.log(this.$route.query.address)
      var pt = new BMap.Point(this.$route.query.lng,this.$route.query.lat);
      map.centerAndZoom(pt, 14); // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      var myIcon = new BMap.Icon(
              require("../assets/images/mapPin.png"),
              new BMap.Size(23, 29)
            );
   var mk = new BMap.Marker(pt, { icon: myIcon });
            map.addOverlay(mk);



	// 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, mouseoverText){
      this._point = point;
      this._text = text;
      this._overText = mouseoverText;
    }

     ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(mapData){
      this._map = mapData;
      var div = this._div = document.createElement("div");
      div.className = 'mapNavigationBox';
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      var span = this._span = document.createElement("span");
      div.appendChild(span);
       span.appendChild(document.createTextNode(this._text));  
      var divBtn = this._divBtn = document.createElement("div")
      divBtn.className = 'mapNavigationBtn'
      div.appendChild(divBtn);
      divBtn.appendChild(document.createTextNode('到这里去'));  
      divBtn.onclick=function(){
                alert('click');
                };


      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.className = "mapNavigationArrow"
    //   arrow.style.background = "url(../images/bg-arrow-on.png)";
    
      arrow.style.position = "absolute";
      arrow.style.width = "18px";
      arrow.style.height = "10px";
      arrow.style.top = "73px";
      arrow.style.left = "115px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
    //   div.onclick = function(){
    //       alert('click')
    //   }
    //   div.addEventListener('click',function(){
    //       alert('click')
    //   })
     
    //   div.onmouseover = function(){
    //     this.style.backgroundColor = "#6BADCA";
    //     this.style.borderColor = "#0000ff";
    //     this.getElementsByTagName("span")[0].innerHTML = that._overText;
    //     arrow.style.backgroundPosition = "0px -20px";
    //   }

    //   div.onmouseout = function(){
    //     this.style.backgroundColor = "#EE5D5B";
    //     this.style.borderColor = "#BC3B3A";
    //     this.getElementsByTagName("span")[0].innerHTML = that._text;
    //     arrow.style.backgroundPosition = "0px 0px";
    //   }


	divBtn.addEventListener("touchstart",function(){
       _that.showMapSelect = true;
// _that.wakeApp()
    }  );
      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map1 = this._map;
      var pixel = map1.pointToOverlayPixel(this._point);
      this._div.style.left = ((pixel.x - parseInt(this._arrow.style.left)) - 12) + "px";
      this._div.style.top  = pixel.y - 98 + "px";
    }
    var txt = this.$route.query.address, mouseoverTxt = txt + " " + parseInt(Math.random() * 1000,10) + "套" ;
        
    var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(this.$route.query.lng,this.$route.query.lat), this.$route.query.address,mouseoverTxt);

    map.addOverlay(myCompOverlay);

    },
  //调用唤醒App
    wakeApp(key) {
      if (this.System == "ios") {
       
        if(key=='gaoDeMap'){
         // ios调用高德地图
        window.location.href = "iosamap://";
          setTimeout(function(){
         alert('您当前没有安装高德地图APP')  
      },1000)
        }else if(key=='baiduMap'){
             //ios调用百度地图
        //  window.location.href = "baidumap://";
          window.location.href = "baidumap://map/marker?location="+this.$route.query.lat+","+this.$route.query.lng+"&title="+this.$route.query.address+"&content="+this.$route.query.address+"&src=yourCompanyName|yourAppName";
        }
      } else if (this.System == "android") {
            if(key=='gaoDeMap'){
          //android调用高德地图
      
 window.location.href = "androidamap://viewMap?sourceApplication=&poiname="+this.$route.query.address+"&lat="+this.$route.query.lat+"&lon="+this.$route.query.lng+"&dev=0&style=2"
      

      }else if(key=='baiduMap'){
             //android调用百度地图并且传值
        window.location.href =
          "baidumap://map/marker?location="+this.$route.query.lat+","+this.$route.query.lng+"&title="+this.$route.query.address+"&content="+this.$route.query.address+"&src=yourCompanyName|yourAppName";
  
       }
       
        //       setTimeout(function(){
        //         alert('没有')
        //           // window.location.href = "你的app的下载地址";

        // },2000)
      }
    },
    //判断当前用户的手机浏览器环境
    getSystemSetting() {
      var browser = {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            trident: u.indexOf("Trident") > -1 /*IE内核*/,
            presto: u.indexOf("Presto") > -1 /*opera内核*/,
            webKit: u.indexOf("AppleWebKit") > -1 /*苹果、谷歌内核*/,
            gecko:
              u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1 /*火狐内核*/,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) /*是否为移动终端*/,
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) /*ios终端*/,
            android:
              u.indexOf("Android") > -1 ||
              u.indexOf("Linux") > -1 /*android终端或者uc浏览器*/,
            iPhone: u.indexOf("iPhone") > -1 /*是否为iPhone或者QQHD浏览器*/,
            iPad: u.indexOf("iPad") > -1 /*是否iPad*/,
            webApp:
              u.indexOf("Safari") == -1 /*是否web应该程序，没有头部与底部*/,
            souyue: u.indexOf("souyue") > -1,
            superapp: u.indexOf("superapp") > -1,
            weixin: u.toLowerCase().indexOf("micromessenger") > -1,
            Safari: u.indexOf("Safari") > -1
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      };
      if (browser.versions.ios) {
        this.System = "ios";
      } else if (browser.versions.android) {
        this.System = "android";
      }
    },

    //判断当前手机是否有这个APP
//     getAPP(){

//         var userAgent = navigator.userAgent ;
// var url="",downUrl="";
// if(userAgent.indexOf("Android")>-1){
//     url="baidumap://map/marker?location="+this.$route.query.lat+","+this.$route.query.lng+"&title="+this.$route.query.address+"&content="+this.$route.query.address+"&src=yourCompanyName|yourAppName";//安卓版App地址，由安卓同事提供
//     downUrl="XXXXXXXXX"; //安卓版App下载地址，由安卓同事提供
// }else{
//     url="baidumap://map/marker?location="+this.$route.query.lat+","+this.$route.query.lng+"&title="+this.$route.query.address+"&content="+this.$route.query.address+"&src=yourCompanyName|yourAppName";//IOS版App地址，由IOS同事提供
//     downUrl="XXXXXXXXXXXX"; //IOS版App下载地址，由IOS同事提供
// }


// function test(){

//     // window.location.href = url;
//     // console.log(url)
//     setTimeout(function(){
//         // window.location.href = downUrl;
//         // console.log('没有安装这个软件')
//         alert('没有安装这个软件')
//     },2000)
// }

// test()
//     },


    },
    mounted () {
        // this.getAPP()
         this.getSystemSetting();
        // console.log(this.$route.query.lat)
        if(this.$route.query.lat == undefined){
            this.$router.push('/')
        }else{
            this.map()
        }
        // 
    // console.log( this.$route.query.library_id)
    }
}
</script>
<style lang="less">
@import "../assets/style/tools.less";
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.navMapBox{
    // background: #000;
    width: 100%;
    // height: 100%;
    height: 89vh;
}
#allmap{width: 100%;
height: 100%; }
</style>
