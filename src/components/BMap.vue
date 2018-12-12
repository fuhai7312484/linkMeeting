<template>
  <div class="home">
       <div id="allmap" ref="allmap"></div>
       <!-- <div id="r-result" ref="r-result"></div> -->

  </div>
</template>
<script>
export default {
    name:'BMap',
    data(){
        return{
    
        }
    },
        methods: {
               map(){  
         
// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);  // 初始化地图,设置中心点坐标和地图级别	  
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    
    //获取用户当前位置
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var myIcon = new BMap.Icon(require("../assets/images/mypoint.png"), new BMap.Size(35,40));
			var mk = new BMap.Marker(r.point,{icon:myIcon});
			map.addOverlay(mk);
			map.panTo(r.point);
			// alert('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
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
  var geolocationControl = new BMap.GeolocationControl(
     
  );
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    var lng = e.point.lng;
        var lat = e.point.lat;

    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address + lng+ '--' + lat);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);

//设置添加多点信息框富Marker实例
// var htm = "<div style='background:#E7F0F5;color:#0082CB;border:1px solid #333'>"
//              +     "欢迎使用百度地图！"
//              +     "<img src='http://map.baidu.com/img/logo-map.gif' border='0' />"
//              + "</div>";
// var point = new BMap.Point(116.417854, 39.921988);
// var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-72, -84), "enableDragging": true});
// map.addOverlay(myRichMarkerObject);



var data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
					 [116.406605,39.921585,"地址：北京市东城区东华门大街"],
					 [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
					];
	var opts = {
				width : 250,     // 信息窗口宽度
				height: 80,     // 信息窗口高度
				title : "信息窗口" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
			   };
	for(var i=0;i<data_info.length;i++){

        var htm = "<div style='background:#E7F0F5;color:#0082CB;border:1px solid #333;width:150px'>"
             +  data_info[i][2]
             + "</div>";
var point = new BMap.Point(data_info[i][0],data_info[i][1]);
var myRichMarkerObject = new BMapLib.RichMarker(htm, point, {"anchor": new BMap.Size(-72, -84), "enableDragging": true});

map.addOverlay(myRichMarkerObject);



        //  var myIcon = new BMap.Icon(require("../assets/images/mypoint.png"), new BMap.Size(35,40));
		// var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon:myIcon});  // 创建标注
        // var c3 = "<h4 style='color:#CC5522;font-size:14px;margin:0 0 5px 0;padding:0.2em 0'>" + data_info[i][2] + "</h4>"+ 
		// 		"<p style='font:12px arial,sans-serif;margin:0;line-height:1.5;'>"+data_info[i][2]+"</p>"+"</div>";

        
        // var content = data_info[i][2];
        // map.addOverlay(marker);               // 将标注添加到地图中

       //标签题目显示内容
       // var label3 = new BMap.Label(data_info[i][2],{offset:new BMap.Size(-50,0)});
		// 		marker.setLabel(label3);
        // openInfo(content,data_info[i])


      
    
		// addClickHandler(content,marker);
    }
    

    //   var point = new BMap.Point(116.417854,39.921988);
	// 	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
    //     map.openInfoWindow(infoWindow,point); //开启信息窗口


      
      

	// function addClickHandler(content,marker){
	// 	marker.addEventListener("click",function(e){
    //         console.log(e.target.getPosition())
	// 		openInfo(content,e)}
	// 	);
	// }
	// function openInfo(content,e){
	// 	var p = e.target;
	// 	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	// 	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	// 	map.openInfoWindow(infoWindow,point); //开启信息窗口
	// }

    // // 随机向地图添加25个标注
	// var bounds = map.getBounds();
	// var sw = bounds.getSouthWest();
	// var ne = bounds.getNorthEast();
	// var lngSpan = Math.abs(sw.lng - ne.lng);
	// var latSpan = Math.abs(ne.lat - sw.lat);
	// for (var i = 0; i < 25; i ++) {
	// 	var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
	// 	addMarker(point);
	// }


    },
 
    },
    mounted () {
     this.map()
    },

}
</script>
<style lang='less'>

 #allmap{  
      height: 300px;  
      overflow: hidden;  
    } 

</style>


