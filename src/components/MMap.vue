<template>
  <div class="home">
    <!-- {{data_info}} -->

    


    <div class="filterResult">

       <div v-transfer-dom>
      <popup v-model="show10" position="top" :show-mask="false">
        <div class="position-vertical-demo1" v-if="!dataEnd">
      {{MapTotal}}场会议，优先展示前{{data_info.length}}场
        </div>
         <div class="position-vertical-demo1" v-if="dataEnd">
        {{data_info.length}}场会议，加载完毕
        </div>
      </popup>
    </div>



      <div class="filterInfoTags">
        <span v-for="(tab,index) in  tabTitle" :key="index">{{tab}}</span>
      </div>
      <div class="filterInfoNum"></div>
    </div>
    <div id="allmap" ref="allmap" :style="{height:showData?OrderHight-93 +'px':OrderHight+'px'}"></div>
    <div v-transfer-dom>
      <popup v-model="showData" position="bottom" :show-mask="false">
        <div class="position-vertical-demo">
          <ul class="tabMeetingListUl padlr">
            <li
              class="tabMeetingList"
              v-for="(DataItem,index) in evData"
              :key="index"
              @click="goToDetail(DataItem.id)"
            >
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
                    <span>{{DataItem.beginTime}}  &nbsp;&nbsp; {{addressSplit(DataItem.address)}}</span>
                    <!-- <span>{{DataItem.address}}</span> -->
                  </div>
                  <div class="tabMeetingTagBox">
                    <!-- <div class="tabMeetingPrice fl">¥{{DataItem.price}}起</div> -->


                    <div class="tabMeetingTag fl">
                      <span v-if="DataItem.status==2" class="IsOver">已结束</span>
                      <span
                        v-else-if="DataItem.status==3 || DataItem.status==1"
                        class="processing"
                      >进行中</span>
                      <span v-else-if="DataItem.status==0" class="notStarted">未开始</span>
                    </div>
                    <div class="tabMeetingNum fr">{{DataItem.msg}}</div>
              

                    <!-- <div class="tabMeetingTag fl">
                  <span v-if="DataItem.status==0" class="IsOver">已结束</span>
                  <span v-else-if="DataItem.status==1" class="LiveIn">直播中</span>
                  <span v-else-if="DataItem.status==2" class="processing">进行中</span>
                  <span v-else-if="DataItem.status==3" class="notStarted">未开始</span>
                    </div>-->
                   
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
import { TransferDom, Popup, Flexbox, FlexboxItem } from "vux";
export default {
  directives: {
    TransferDom
  },
  name: "BMap",
  props: ["OrderHight", "data_info", "tabTitle","MapTotal"],
  data() {
    return {
      showData: false,
      evData: [],
      show10:false,
      dataEnd:false,
    };
  },
  components: {
    Popup,
    Flexbox,
    FlexboxItem
  },
  methods: {
     addressSplit(add) {
      var reg = /.+?(省|市|自治区|自治州|县|区|镇)/g;
      let addArr = add.match(reg);
      let str = "";
      if (addArr) {
        let newArr = [];

        if (addArr.length >= 2) {
          newArr = [addArr[0], addArr[1]];
        } else if (addArr.length < 2) {
          newArr = [addArr[0]];
        }
        newArr.forEach(e => {
          if (e.indexOf("省") != -1) {
            str = e.replace("省", "");
          }
          if (e.indexOf("市") != -1) {
            str += " " + e.replace("市", "");
          }
          if (e.indexOf("区") != -1 && e.length < 5) {
            str += " " + e.replace("区", "");
          }
          if (e.indexOf("镇") != -1 && e.length < 5) {
            str += " " + e.replace("镇", "");
          }
          if (e.indexOf("县") != -1 && e.length < 5) {
            str += " " + e.replace("县", "");
          }
        });
      }

      return str;
    },
    //点击查看详情
    goToDetail(id) {
      // console.log(id)
      this.$router.push({
        path: "/meetDetail/" + id,
        query: { meetingId: id }
      });
    },
    change() {
      let H = this.showData ? "190px" : "30px";
      this.$emit("GotoMapHeight", H);
    },
//设置地图级别
//根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别。
	setZoom(points){
    // console.log(points)
			if(points.length>0){
				var maxLng = points[0].longitude;
				var minLng = points[0].longitude;
				var maxLat = points[0].latitude;
        var minLat = points[0].latitude;
      
				var res;
				for (var i = points.length - 1; i >= 0; i--) {
          res = points[i];
          res.index = i
					if(res.longitude > maxLng) maxLng =res.longitude;
					if(res.longitude < minLng) minLng =res.longitude;
					if(res.latitude > maxLat) maxLat =res.latitude;
					if(res.latitude < minLat) minLat =res.latitude;
        };
        // console.log(minLat)
      let obj = {
        
          maxLng:maxLng,
          minLng:minLng,
          maxLat:maxLat,
          minLat:minLat,
        }
				var cenLng =(parseFloat(maxLng)+parseFloat(minLng))/2;
        var cenLat = (parseFloat(maxLat)+parseFloat(minLat))/2;
        obj.cenLng = cenLng
        obj.cenLat = cenLat

        // console.log(obj)
        return obj
			}
    },
    



    map() {
  //  console.log(this.data_info.length)
  this.show10 = true
      // 百度地图API功能
      var map = new BMap.Map("allmap",{minZoom:4,maxZoom:17}); // 创建Map实例
      //  console.log(this.setZoom(this.data_info).cenLng,this.setZoom(this.data_info).cenLat) 
      // map.centerAndZoom(new BMap.Point(116.404, 39.915), 14); // 初始化地图,设置中心点坐标和地图级别

          //根据经纬极值计算绽放级别。
function getZoom (obj) {
			var zoom = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000","4000000"]//级别18到3。
			var pointA = new BMap.Point(obj.maxLng,obj.maxLat);  // 创建点坐标A
      var pointB = new BMap.Point(obj.minLng,obj.minLat);  // 创建点坐标B
      var distance = map.getDistance(pointA,pointB).toFixed(1);  //获取两点距离,保留小数点后两位
     
			for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {
        
				if(zoom[i] - distance > 0){
       
					return 18-i+3>=18?18:18-i+3;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
				}
			};
    }
  //  console.log( getZoom(this.setZoom(this.data_info)))
  let zoomNum = 5;
  if(this.data_info.length==0){
map.centerAndZoom(new BMap.Point(103.388611,35.563611), zoomNum);  
  }else{
    zoomNum = getZoom(this.setZoom(this.data_info))

 map.centerAndZoom(new BMap.Point(this.setZoom(this.data_info).cenLng, this.setZoom(this.data_info).cenLat), zoomNum); // 初始化地图,设置中心点坐标和地图级别
  }
      
      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      var myIcon = new BMap.Icon(
        require("../assets/images/mypoint.png"),
        new BMap.Size(25, 25)
      );
      //获取用户当前位置

      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(
      //   function(r) {
      //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //       // console.log(r)

      //       // alert('您当前定位为：'+r.address.city);

      //       function setCity(city) {
      //         if (city.charAt(city.length - 1) == "市") {
      //           return city.slice(0, city.length - 1);
      //         } else {
      //           return city;
      //         }
      //       }
      //       // alert(setCity(r.address.city))
      //       // console.log(setCity(r.address.city))

      //       var mk = new BMap.Marker(r.point, { icon: myIcon });
      //       map.addOverlay(mk);
      //       map.panTo(r.point);
      //       // alert('您的位置：'+r.point.lng+','+r.point.lat);
      //     } else {
      //       // alert("failed" + this.getStatus());
      //     }
      //   },
      //   { enableHighAccuracy: true }
      // );

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
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
        locationIcon: myIcon,
        showAddressBar: false
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
          "<div class='Bmap-infoBox' data-id='" +
          this.data_info[i].id +
          "'><h4 class='fl'><span class='Mmap-span'>" +
          this.data_info[i].theme +
          "</span></h4><i class='bg-arrow-off'></i></div>";

        var point = new BMap.Point(
          this.data_info[i].longitude,
          this.data_info[i].latitude
        );
        var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {
          anchor: new BMap.Size(-72, -84),
          enableDragging: true
        });

        markers.push(myRichMarkerObject);
        map.addOverlay(myRichMarkerObject);
      }

      for (var i = 0; i < this.data_info.length; i++) {
        let _that = this;
        (function() {
          var index = i;
          markers[i].addEventListener("click", function(e) {
             map.centerAndZoom(new BMap.Point(e.target._position.lng, e.target._position.lat),zoomNum); // 初始化地图,设置中心点坐标和地图级别
            // console.log(e.target._position.lng)
            for (let j = 0; j < _that.data_info.length; j++) {
              markers[j]._container.firstChild.className = "Bmap-infoBox";
              markers[j]._container.style["z-index"] = 9998;
              _that.$emit("GotoMapHeight", "90px");
              _that.showData = false;
            }
            let setId = e.target._container.firstChild.dataset.id;
            _that.evData = _that.data_info.filter(e => {
              return e.id == setId;
            });
            setTimeout(function() {
              _that.showData = true;
              _that.$emit("GotoMapHeight", "120px");
            }, 100);

            e.target._container.style["z-index"] = 9999;
            e.target._container.firstChild.className = "Bmap-infoBox-actver";
          });
        })();
      }
    },
    setMapHeight() {
      // if( this.showData){
      //   return this.OrderHight + 'px'
      // }else{
      //   return  (this.OrderHight-50) +'px'
      // }
    }
  },
  watch: {
    showData() {
      //  console.log(this.OrderHight)
    },
    data_info(){
      console.log(this.data_info.length)
       this.map();
      
    },
     show10 (val) {
      if (val) {
        setTimeout(() => {
          this.show10 = false
        }, 3000)
      }
    }
  },
  mounted() {
    this.map();
  }
};
</script>
<style lang='less'>
@import "~vux/src/styles/close.less";
.home {
  position: relative;
}
#allmap {
  overflow: hidden;
  z-index: 9995;
}
.position-vertical-demo {
  background-color: #fff;
  overflow: hidden;
  color: #000;
  // text-align: center;
  // padding: 15px;
  box-sizing: border-box;
}
.my-tab-listContent {
  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.position-vertical-demo1 {
  background-color: #FFEFCB;
  text-align: center;
  // padding: 15px;
  font-size: .8rem;
  padding: .6rem 0;
  color:#C17306,
}
</style>


