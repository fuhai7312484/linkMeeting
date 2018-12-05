<template>
  <div class="box">
    <div class="footer">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="1/4" :order="1">
          <div class="footer-nav-FieldPlace">
            <span>
              <img src="../../assets/images/like.png">
            </span> 联系场地方
          </div>
        </flexbox-item>

        <flexbox-item :span="3/4" :order="2">
          <div class="footer-nav-destineBtn" @click="goAnchor('#anchor')">立即预定</div>
        </flexbox-item>
      </flexbox>
    </div>

    <div class="site-img-showBox">
      <swiper
        :list="swiperType=='img'?SImgList:SVideoList"
        height="240px"
        :show-desc-mask="false"
        v-model="demo01_index"
        :show-dots="false"
        @click.native="currentChan"
        :loop="true"
      >
        <div v-if="swiperType=='video'" class="video-btn-box">
          <div class="jiao"></div>
        </div>
        <div class="site-img-markBox">
          <span
            @click="swiperType='img'"
            :class="swiperType=='img'?'site-img-type':'site-img-length'"
          >照片({{ SImgList.length }})</span>
          <span
            @click="swiperType='video'"
            :class="swiperType=='video'?'site-img-type':'site-img-length'"
          >视频({{ SVideoList.length }})</span>
          <span class="site-img-length">
            {{ demo01_index + 1 }}/{{
            swiperType == "img" ? SImgList.length : SVideoList.length
            }}
          </span>
        </div>
      </swiper>
    </div>

    <div class="site-content-box borBottm">
      <flexbox class="linH padlr">
        <flexbox-item :span="3/5">
          <h4 class="site-flex-title">【世外桃源】会议室-C</h4>
        </flexbox-item>
        <flexbox-item :span="2/5">
          <div class="site-flex-price">3000元/半天起</div>
        </flexbox-item>
      </flexbox>
      <flexbox class="linH padlr">
        <flexbox-item :span="3/5">
          <div class="site-siteFather">北京昆泰国家酒店</div>
        </flexbox-item>
        <flexbox-item :span="2/5">
          <div class="site-siteFather-info">参考价</div>
        </flexbox-item>
      </flexbox>

      <div class="padlr">
        <flexbox class="site-room-title">
          <flexbox-item :span="1/3">
            <h4>选择时段</h4>
          </flexbox-item>
        </flexbox>
        <flexbox class="linH">
          <flexbox-item :span="3/5">
            <div class="site-siteFather">2018年10月 未选择</div>
          </flexbox-item>
          <flexbox-item :span="2/5">
            <div class="site-siteFather-info">全部日期
              <x-icon type="ios-arrow-right" class="site-icon-down" size="20"></x-icon>
            </div>
          </flexbox-item>
        </flexbox>
        <div class="site-TimeSlot-box">
          <!-- 

<checker v-model="demo21" type="checkbox" default-item-class="TimeSlotListBox" 
disabled-item-class="site-TimeSlot-active"
selected-item-class="site-TimeSlot-selected">
        <checker-item :value="item" v-for="(item, index) in items1"
         :key="index"
         :disabled="item.status==0?true:false"
         @on-item-click="onItemClick(index,item)">
        
            <div class="TimeSlot-week"> {{item.timeWeek}}</div>
             <h3>{{item.day}}</h3>
              <div class="TimeSlot-price"> {{item.price}}</div>
         </checker-item>
      </checker>


          <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="当前日期不可选！" :position="position"></toast>-->
          <ul>
            <!-- <li class="site-TimeSlot-active">
              <div class="TimeSlot-week">周三</div>
              <h3>2</h3>
              <div class="TimeSlot-price">已预订</div>
            </li>-->
            <li
              :class="item.status==0?'TimeSlotListBox site-TimeSlot-active':item.Start||item.end?'TimeSlotListBox site-TimeSlot-selected':item.range?'TimeSlotListBox site-TimeSlot-range':'TimeSlotListBox'"
              v-for="(item, index) in items1"
              :key="index"
              @click="onItemClick(index,item)"
            >
              <!-- <div class="site-TimeSlot-btnsBox" v-if="item.checkShow">
  <span>上午</span>
   <span>下午</span>
   <span>全天</span>
   <span>取消</span>
              </div>-->
              <div class="TimeSlot-week">{{item.timeWeek}}</div>
              <h3>
                <!-- {{item.Start&&item.end?'入/离场':item.Start?'入场':item.end?'离场':item.day}}{{item.end}}  -->
                {{item.Start&&item.end?'入/离场':item.Start?'入场':item.end?'离场':item.day}}</h3>
              <div class="TimeSlot-price">{{item.status==0?'已预订':item.price}}</div>
            </li>
          </ul>

          <toast
            v-model="showPositionValue"
            type="text"
            :time="800"
            is-show-mask
            text="当前日期不可选！"
            :position="position"
          ></toast>
        </div>
        <div>当前选择了:
           <span v-for="(day,index) in demo21" :key="index">{{day.day}}日,</span>
           共{{demo21.length}}天
        </div>
       

        <!-- <div class="padlr">
          <grid class="TimeSlot-btnBox">
            <grid-item class="site-TimeSlot-btn"> 上午 </grid-item>
            <grid-item class="site-TimeSlot-btn"> 下午 </grid-item>
            <grid-item class="site-TimeSlot-btn "> 全天 </grid-item>
            <grid-item class="site-TimeSlot-btn"> 重选 </grid-item>
          </grid>
        </div>-->
      </div>
    </div>

    <div class="padlr borBottm">
      <flexbox class="site-room-title">
        <flexbox-item>
          <h4>基本信息</h4>
        </flexbox-item>
      </flexbox>
      <div class="site-room-BasicInfoBox">
        <div class="fl">所在楼层：2层</div>
        <div class="fl">柱子：无</div>

        <div class="fl">会场面积：60㎡</div>

        <div class="fl">窗户：有</div>
        <div class="fl">长宽高：50m;40m;3m</div>
      </div>
    </div>

    <div class="padlr borBottm">
      <flexbox class="site-room-title">
        <flexbox-item>
          <h4>布局</h4>
        </flexbox-item>
      </flexbox>
      <div class="site-room-layoutBox">
        <div class="room-layout fl">
          <div class="room-layout-title">剧院式</div>
          <div class="room-layout-title">
            <img width="30" :src="require('../../assets/images/icon-juyuan-big.png')">
          </div>
          <div class="room-layout-remark">500人</div>
        </div>

        <div class="room-layout fl">
          <div class="room-layout-title">可调节</div>
          <div class="room-layout-title">
            <img width="30" :src="require('../../assets/images/icon-ketiao-big.png')">
          </div>
          <div class="room-layout-remark"></div>
        </div>
      </div>
    </div>

    <div class="padlr borBottm">
      <flexbox class="site-room-title">
        <flexbox-item>
          <h4>会议室设施</h4>
        </flexbox-item>
      </flexbox>
      <div class="site-room-setting" v-for="(setting,index) in roomFacilityData" :key="index">
        <h4>{{ setting.titleName }}</h4>
        <span v-for="(SettingTags,index) in setting.tags" :key="index">
          {{
          SettingTags
          }}
        </span>
      </div>
    </div>

    <div class="padlr">
      <flexbox class="site-room-title">
        <flexbox-item>
          <h4>备注</h4>
        </flexbox-item>
      </flexbox>
      <p
        class="site-room-remark"
      >房间装修精致、简约，配套设施完善，住宿环境十分温馨另外酒店设有大型宴会厅及不同规格的18间会议室，专业的宴会会议策划与全程跟踪服务，精选的中西式菜单，致力于为宾客提供最高水准的服务，以求每一个细节都达到尽善尽美</p>
    </div>

    <div class="Placeholder"></div>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Swiper,
  Grid,
  GridItem,
  Checker,
  CheckerItem,
  Toast,
  Popover
} from "vux";
export default {
  name: "roomDetail",
  components: {
    Flexbox,
    FlexboxItem,
    Swiper,
    Grid,
    GridItem,
    Checker,
    CheckerItem,
    Toast,
    Popover
  },
  data() {
    return {
      position: "default",
      showPositionValue: false,
      items1: [],
      demo21: [],
      swiperType: "img",
      SImgList: [
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg", // 404
          title: "送你一次旅行",
          fallbackImg:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "送你一辆车"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg", // 404
          title: "送你一次旅行",
          fallbackImg:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg"
        }
      ],

      SVideoList: [
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
          title: "这里是视频"
        },
        {
          url: "javascript:",
          img:
            "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
          title: "这里是视频"
        }
      ],
      demo01_index: 0,
      roomFacilityData: [
        {
          titleName: "通用设施",
          tags: ["空调", "暖气", "有线宽带", "Wi-Fi"]
        },
        {
          titleName: "屏幕",
          tags: ["固定投影", "移动投影", "电视屏", "LED屏"]
        },
        {
          titleName: "音响",
          tags: ["立体声道", "环绕立体声", "5D立体声"]
        },
        {
          titleName: "扩音",
          tags: ["无线话筒", "有线话筒", "台式话筒"]
        },
        {
          titleName: "灯光",
          tags: ["自然采光", "白织灯", "彩色灯光"]
        },
        {
          titleName: "舞台",
          tags: ["移动舞台", "移动讲台", "演讲台"]
        },
        {
          titleName: "其他设施",
          tags: [
            "白板",
            "宽带接口",
            "茶/水",
            "纸笔",
            "桌卡",
            "指引牌",
            "签到台",
            "鲜花",
            "茶歇"
          ]
        }
      ]
    };
  },
  methods: {
    currentChan() {
      console.log(11111);
    },
    showPosition(position) {
      this.position = position;
      this.showPositionValue = true;
    },
    getNewTime() {
      function todu(num) {
        return num < 10 ? "0" + num : "" + num;
      }
      function weekChan(params) {
        switch (params) {
          case 0:
            return "周日";
            break;
          case 1:
            return "周一";
            break;
          case 2:
            return "周二";
            break;
          case 3:
            return "周三";
            break;
          case 4:
            return "周四";
            break;
          case 5:
            return "周五";
            break;
          case 6:
            return "周六";
            break;
          default:
            break;
        }
      }

      let myDate = new Date();
      let Y = myDate.getFullYear();
      let M = myDate.getMonth() + 1;
      let D = myDate.getDate();
      let Week = myDate.getDay();
      // console.log(Y+''+ todu(M) +''+ todu(D) + ''+ weekChan(Week))

      let timeArr = [];

      for (let i = 0; i < 15; i++) {
        let date2 = new Date(myDate);
        date2.setDate(myDate.getDate() + i);
        let obj = {
          id:
            date2.getFullYear() +
            "" +
            todu(date2.getMonth() + 1) +
            "" +
            todu(date2.getDate()),
          day: date2.getDate(),
          timeWeek: weekChan(date2.getDay()),
          price: "全天¥5000",
          status: 1,
          Start: false,
          end: false,
          range: false
        };
        //  console.log(date2.getFullYear()+""+todu((date2.getMonth()+1))+""+todu(date2.getDate()),Y+''+ todu(M)+''+todu(D))
        if (
          date2.getFullYear() +
            "" +
            todu(date2.getMonth() + 1) +
            "" +
            todu(date2.getDate()) ==
          Y + "" + todu(M) + "" + todu(D)
        ) {
          obj.status = 0;
        }

        if(date2.getDate() =='4'){
            obj.status = 0;
        }
        //  timeArr.push(date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate())
        timeArr.push(obj);
      }
      this.items1 = timeArr;
      console.log(timeArr);
    },
    onItemClick(index, item) {
       
      if (item.status == 0) {
        this.showPosition("middle");
      } else {
        let isStart = this.items1.some(e => {
          return e.Start;
        });
        let isEnd = this.items1.some(e => {
          return e.end;
        });

        if (isStart) {
        
          let StartIndex = this.items1.findIndex(e => {
            return e.Start;
          });

         
        
          if (isEnd) {
            let EndIndex = this.items1.findIndex(e => {
              return e.end;
            });
          
            if (index < StartIndex || index > EndIndex) {
               
              this.items1.forEach((e, i) => {
                e.end = e.range = e.Start = false;
              });
              this.items1[index].Start = true;
              this.demo21 =[];
              this.demo21.push(this.items1[index])
            }else if(item.Start || item.end || item.range){

  console.log('选择范围内容')


            }
            console.log(StartIndex, EndIndex, index);


          } else {
            if (index < StartIndex) {
              console.log('小于')
               this.demo21 = [this.items1[index]]
              // this.showPosition("middle");
               this.items1[StartIndex].Start = false;
                // this.items1[StartIndex].end = true;

                this.items1[index].Start = true;
              return;
            }else if(index === StartIndex){

              //入场等于离场
              // console.log('点击的等于入场')  
              this.items1[index].end = true;
              console.log(this.demo21)
              // this.demo21.push(this.items1[index])
              console.log(this.items1[index])

            } else {
              this.items1[index].end = true;
              // this.demo21.push(this.items1[StartIndex])
              this.items1.forEach((e, i) => {
                if (StartIndex < i && i < index) {
                  if(this.items1[i].status !=0){
                      this.items1[i].range = true;
                      this.demo21.push(e)
                  // console.log(e);
                  }
                
                }
              });
             this.demo21.push(this.items1[index])
            
            }
            // this.demo21 = timeValue;
          }
        } else {
          // this.items1.forEach((e,i)=>{
          //   if(i<index){
          //     e.status = 0;
          //   }
          // })
          this.items1[index].Start = true;
          
            this.demo21 = [this.items1[index]];
          // timeValue.push(this.items1[index])
        }

        
        console.log(this.demo21)
      }
    }
  },
  mounted() {
    this.getNewTime();
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

//   .box {
//   padding: 0 15px;
// }

// .demo1-item-selected {
//   border: 1px solid green;
// }
// .demo2-item {
//   width: 40px;
//   height: 40px;
//   border: 1px solid #ccc;
//   display: inline-block;
//   border-radius: 50%;
//   line-height: 40px;
//   text-align: center;
// }
// .demo2-item-selected {
//   border-color: green;
// }
// .demo3-item {
//   padding: 5px 5px;
//   font-size: 0;
// }
// .demo3-item-selected {
//   outline: 1px solid #8B8AEE;
// }
// .demo4-item {
//   background-color: #ddd;
//   color: #222;
//   font-size: 14px;
//   padding: 5px 10px;
//   margin-right: 10px;
//   line-height: 18px;
//   border-radius: 15px;
// }
// .demo4-item-selected {
//   background-color: #FF3B3B;
//   color: #fff;
// }
// .demo4-item-disabled {
//   color: #999;
// }
// .demo5-item {
//   width: 100px;
//   height: 26px;
//   line-height: 26px;
//   text-align: center;
//   border-radius: 3px;
//   border: 1px solid #ccc;
//   background-color: #fff;
//   margin-right: 6px;
// }
// .demo5-item-selected {
//   // background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;
//   border-color: #ff4a00;
// }
</style>
