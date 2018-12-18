<template>
  <div class="home">
   
    <div id="allmap" ref="allmap" :style="{height:showData?OrderHight-173 +'px':OrderHight+'px'}"></div>
    <!-- <div id="r-result" ref="r-result"></div> -->
   
    <!-- <div class="evDataBox" v-if="showData">{{evData}}</div> -->
 <!-- <x-switch title="bottom" v-model="showData"></x-switch> -->

    <div v-transfer-dom>
      <popup v-model="showData" position="bottom" :show-mask="false">
        <div class="position-vertical-demo">


   <ul class="my-tab-swiper vux-center" ref="pubUiHF">
          <li v-for="(taPos,index) in evData" :key="index">
            {{taPos.lng}} {{taPos.lat}}
            <flexbox v-if="taPos.type=='pub'">
              <flexbox-item :span="1/4">
                <div class="my-tab-swiperListImg"><img :src="taPos.img" /></div>
              </flexbox-item>
              <flexbox-item :span="3/4">
                <div class="my-tab-listContent">
                  <h3>{{ taPos.city }}{{ taPos.title }}</h3>
                </div>

                <div class="my-tab-listContent mylistInfo">
                  距离:{{ taPos.distance }}&nbsp; &nbsp;  {{ taPos.area }}
                </div>

                <div class="my-tab-listContent mylistInfo">
                  面积:{{ taPos.proportion }}&nbsp; &nbsp;  容纳:{{ taPos.hold }}
                </div>

                <div class="my-tab-listContent mylistInfo">
                  会议室:{{ taPos.meetingRoom }}&nbsp; &nbsp;  客房:{{ taPos.guestRoom }}
                </div>
                <flexbox :gutter="0">
                  <flexbox-item :span="1/2" class="listContent-tagbox">
                    <span
                      v-for="(tag,index) in taPos.tag"
                      :key="index"
                      class="listContent-tags"
                    >
                      {{ tag }}
                    </span>
                  </flexbox-item>
                  <flexbox-item :span="1/2"> <h4>¥{{ taPos.price }}</h4> </flexbox-item>
                </flexbox>
              </flexbox-item>
            </flexbox>

            <flexbox v-if="taPos.type=='par'">
              <flexbox-item :span="2/3">
                <div class="listContentPar">
                <h3> {{ taPos.title }}</h3>
                </div>
                <div class="mylistInfo">{{taPos.time}}</div>
                <h4>¥{{ taPos.price }}</h4>
              </flexbox-item>
              <flexbox-item :span="1/3"> 
              
              <div class="my-tab-parListImg">
              
                <img :src="taPos.img" />
                </div>
              
              </flexbox-item>
            </flexbox>
          </li>
        </ul>



      <!-- {{evData}} -->
        </div>
      </popup>
    </div>

    
  </div>
</template>
<script>
import { TransferDom, Popup, Flexbox,
    FlexboxItem} from 'vux'
export default {
    directives: {
    TransferDom
  },
  name: "BMap",
  props:['OrderHight','data_info'],
  data() {
    return {
      showData:false,
    evData:[],
    };
  },
  components: {
     Popup, Flexbox,
    FlexboxItem
      },
  methods: {
    map() {
      // 百度地图API功能
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 14); // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      var myIcon = new BMap.Icon(
              require("../assets/images/mypoint.png"),
              new BMap.Size(25, 25)
            );
      //获取用户当前位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // console.log(r)

            // alert('您当前定位为：'+r.address.city);
           
            var mk = new BMap.Marker(r.point, { icon: myIcon });
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
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

      // 添加定位控件
     
      var geolocationControl = new BMap.GeolocationControl({
        anchor:BMAP_ANCHOR_BOTTOM_LEFT,
        locationIcon:myIcon,
        showAddressBar:false,
      });
      // geolocationControl.locationIcon = require("../assets/images/mypoint.png");
      geolocationControl.addEventListener("locationSuccess", function(e) {
        // 定位成功事件
        console.log(e)
        var address = "";
        var lng = e.point.lng;
        var lat = e.point.lat;

        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address + lng + "--" + lat);
      });
      geolocationControl.addEventListener("locationError", function(e) {
        // 定位失败事件
        alert(e.message);
      });
	  map.addControl(geolocationControl);
   var markers = [];
      //设置添加多点信息框富Marker实例
      for (var i = 0; i < this.data_info.length; i++) {

           var htm =
          "<div class='Bmap-infoBox' data-id='"+ this.data_info[i].id +"'><h4 class='fl'><span>"+ this.data_info[i].title +"</span>有空(1间)</h4><i class='bg-arrow-off'></i></div>";


        var point = new BMap.Point(
          this.data_info[i].lng,
          this.data_info[i].lat
        );
        var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
          anchor: new BMap.Size(-72, -84),
		  enableDragging: true,
		
        });

        markers.push(myRichMarkerObject)
        map.addOverlay(myRichMarkerObject);
      }

for (var i = 0; i < this.data_info.length; i ++) 
        {
          let _that= this;
            (function(){
                var index = i;
                markers[i].addEventListener('click', function(e){
                  for(let j=0;j<_that.data_info.length;j++){
                     markers[j]._container.firstChild.className ='Bmap-infoBox'
                      markers[j]._container.style['z-index'] = 9998;
                      _that.showData = false;
                  }
                  let setId = e.target._container.firstChild.dataset.id
                 _that.evData = _that.data_info.filter(e=>{
                   return e.id == setId;
                 })
                 setTimeout(function(){
            _that.showData = true;
                 },100)
                  
                  e.target._container.style['z-index'] = 9999
                  e.target._container.firstChild.className = 'Bmap-infoBox-actver'
                 
                });   
            })();
        }


    },
    setMapHeight(){
    
      // if( this.showData){
      //   return this.OrderHight + 'px'
      // }else{
      //   return  (this.OrderHight-50) +'px'
      // }
     
    }
  },
  watch:{
    showData(){
      //  console.log(this.OrderHight)
    }
  },
  mounted() {
    this.map();
  }
};
</script>
<style lang='less'>
@import '~vux/src/styles/close.less';
#allmap {

  overflow: hidden;
  z-index:9995 ;
}
.position-vertical-demo {
  background-color: #fff;
  overflow: hidden;
  color: #000;
  // text-align: center;
  // padding: 15px;
  box-sizing: border-box;
}
.my-tab-listContent{
 h3{
overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
 }
    
}
</style>


