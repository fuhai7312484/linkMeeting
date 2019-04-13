<template>
  <div class="home">
    <!-- {{data_info}} -->
    <div class="filterResult">
      <div class="filterInfoTags">
  <span v-for="(tab,index) in  tabTitle" :key="index">{{tab}}</span>
      </div>
      <div class="filterInfoNum">
        共{{data_info.length}}场
      </div>
    </div>
    <div id="allmap" ref="allmap" :style="{height:showData?OrderHight-93 +'px':OrderHight+'px'}">
    </div>
    <div v-transfer-dom>
      <popup v-model="showData" position="bottom" :show-mask="false">
        <div class="position-vertical-demo">
  <ul class="tabMeetingListUl padlr">
        <li class="tabMeetingList" v-for="(DataItem,index) in evData" :key="index" @click="goToDetail(DataItem.id)">
          <div>
            <div class="tabMeetingImg fl">

              <span
                    v-for="(img,index) in DataItem.meetingFileList"
                    :key="index"
                    v-if="img.belong==1"
                  >
                    <img
                      :src="img.fileUrl==null?require('../assets/images/myFans-Mask.png'):img.fileUrl"
                    >
                  </span>


              <!-- <img :src="DataItem.img"> -->
              <!-- {{DataItem.img}} -->
            </div>

            <div class="tabMeetingTextBox fl">
              <h4 class="tabMeetingTextTitle">{{DataItem.theme}}</h4>
              <div class="tabMeetingTime">
                <span>{{DataItem.beginTime}}</span>
                <!-- <span>{{DataItem.address}}</span> -->
              </div>
              <div class="tabMeetingTagBox">
                <div class="tabMeetingPrice fl">
                 ¥{{DataItem.price}}起
                </div>
                <!-- <div class="tabMeetingTag fl">
                  <span v-if="DataItem.status==0" class="IsOver">已结束</span>
                  <span v-else-if="DataItem.status==1" class="LiveIn">直播中</span>
                  <span v-else-if="DataItem.status==2" class="processing">进行中</span>
                  <span v-else-if="DataItem.status==3" class="notStarted">未开始</span>
                </div> -->
                <div
                  class="tabMeetingNum fr"
                >
                {{DataItem.msg}}
                <!-- {{DataItem.status==0?'查看附件':DataItem.status==2?'报名将截止':DataItem.status==3?'马上抢票':DataItem.pepople+'人已报名'}} -->
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
  props:['OrderHight','data_info','tabTitle'],
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
    //点击查看详情
    goToDetail(id){
      // console.log(id)
       this.$router.push({
        path: "/meetDetail/" + id,
        query: { meetingId: id }
      });
    },
    change(){
     let H = this.showData?'190px':'90px'
      this.$emit("GotoMapHeight",H)
    },
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

              function setCity(city){
                  if(city.charAt(city.length-1)=='市'){
                        return city.slice(0,city.length-1)
                  }else{
                      return city
                  }  
              }
              // alert(setCity(r.address.city))
              // console.log(setCity(r.address.city))
           
            var mk = new BMap.Marker(r.point, { icon: myIcon });
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
          } else {
            // alert("failed" + this.getStatus());
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
        // console.log(e)
        var address = "";
        var lng = e.point.lng;
        var lat = e.point.lat;

        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        // alert("当前定位地址为：" + address + lng + "--" + lat);
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
          "<div class='Bmap-infoBox' data-id='"+ this.data_info[i].id +"'><h4 class='fl'><span class='Mmap-span'>"+ this.data_info[i].theme +"</span></h4><i class='bg-arrow-off'></i></div>";


        var point = new BMap.Point(
          this.data_info[i].longitude,
          this.data_info[i].latitude
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
                       _that.$emit("GotoMapHeight",'90px')
                      _that.showData = false;
                  }
                  let setId = e.target._container.firstChild.dataset.id
                 _that.evData = _that.data_info.filter(e=>{
                   return e.id == setId;
                 })
                 setTimeout(function(){

            _that.showData = true;
             _that.$emit("GotoMapHeight",'120px')
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
.home{position: relative;}
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


