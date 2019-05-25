<template>
  <div class="box">
 <div v-transfer-dom>
      <loading :show="showLoding" text="数据加载中..."></loading>
    </div>
<!-- {{meetingImg}} -->
   
    
  

    <!-- <div @click="showAcc = !showAcc">11111</div> -->
    <!-- <ul>
              <li v-for="(images,index) in meetingImg" class="fl previewer-demo-img1" :key="index">
               
                <img :src="images.src" preview="20" :onerror="errorImg01">
              </li>
    </ul>-->
    <!-- 
<img src="http://yd-lhy.oss-cn-beijing.aliyuncs.com/user/14ac2eea2b28b952/image/14ac2eea2b28b952&1555732129145.png" preview="1" preview-text="描述1">
<img src="http://yd-lhy.oss-cn-beijing.aliyuncs.com/user/14ac2eea2b28b952/image/14ac2eea2b28b952&1555732129196.png" preview="1" preview-text="描述2">
    -->
<div v-if="!showLoding">
    <div v-transfer-dom>
      <x-dialog
        v-model="showAcc"
        class="dialog-demo-gallery"
        hide-on-blur
        :dialog-style="{width:'100%'}"
      >
        <div class="img-box">
          <!-- {{accObj}} -->

            <video width="320" height="240" controls id="upvideo">
              </video>
          <!-- <oplay :accObj="accObj" v-if="showAcc"></oplay> -->
        </div>
      </x-dialog>
    </div>

    <div>
      <sticky v-if="imgType==1||imgType==2">
        <tab
          active-color="#fe666b"
          default-color="#a0a0a0"
          custom-bar-width="43%"
          v-model="tabsIndex"
        >
          <tab-item
            v-for="(tabs,index) in tabMunes"
            :key="index"
            :selected="tabTitle === tabs"
            @on-item-click="tabClick(index)"
          >{{ tabs }}</tab-item>
        </tab>
      </sticky>

      <!-- 
      <div v-if="imgType==0" class="padlr">
         <div class="gallery-imagesListBox">
            <div class="m2">
           <ul>
              <li v-for="(images,index) in meetingImg" class="fl previewer-demo-img1" :key="index">
             
                <img :src="images.src" preview="20" :onerror="errorImg01">
              </li>
            </ul>
            </div>
         </div>
      </div>-->

      <div v-if="tabsIndex==0">



         <!-- <div class="gallery-imagesListBox" v-if="imgType==0&&meetingImg">
        
      </div> -->

        <div class="gallery-imagesListBox">
<!-- {{meetingImg}} -->


          <div class="m2" v-if="imgType==0&&meetingImg&&meetingImg.length!=0" >
           <flexbox class="site-room-title">
             <flexbox-item>
                <h4 class="gallery-h4">会议展示</h4>
                <span class="gallery-len">{{meetingImg.length}}张</span>
              </flexbox-item>
            </flexbox>
          <ul>
            <li class="fl previewer-demo-img1" v-for="(images,index) in meetingImg" :key="index">
                <div v-if="images.fileType==1" class="video-btn-box" @click="show1(images,index)">
                  <div class="jiao"></div>
                </div>
              <img
                :src="images.src"
                preview="1"
              >
            </li>
         
          </ul>
        </div>


          <div class="m2" v-if="imgType==1|| imgType==2 &&ExtData&&ExtData.length!=0">
            <flexbox class="site-room-title">
              <flexbox-item>
                <h4 class="gallery-h4">{{imgType==1?'建筑外观':'平面图'}}</h4>
                <span class="gallery-len">{{ExtData.length}}张</span>
              </flexbox-item>
            </flexbox>
<!-- {{meetingImg}} -->
            <ul>
              <li v-for="(images,index) in ExtData" class="fl previewer-demo-img1" :key="index">
                <div v-if="images.fileType==1" class="video-btn-box" @click="show1(images,index)">
                  <div class="jiao"></div>
                </div>
                <img :src="images.src" preview="1" :preview-text="imgType==1?'建筑外观':'平面图'" :onerror="errorImg01">
              </li>
            </ul>

            <!-- <ul>
              <li v-for="(images,index) in ExtData" class="fl previewer-demo-img1" :key="index">
                <div v-if="images.fileType==1" class="video-btn-box" @click="show1(images,index)">
                  <div class="jiao"></div>
                </div>
                <img :src="images.src" @click="show1(images,index)" :onerror="errorImg01">
               
              </li>
            </ul>-->
          </div>
          <div class="m2" v-if="SurData&&SurData.length!=0">
            <flexbox class="site-room-title">
              <flexbox-item>
                <h4 class="gallery-h4">{{imgType==1?'外观环境':'整体图'}}</h4>
                <span class="gallery-len">{{SurData.length}}张</span>
              </flexbox-item>
            </flexbox>
            <ul>
              <li v-for="(images,index) in SurData" class="fl previewer-demo-img2" :key="index">
                <div v-if="images.fileType==1" class="video-btn-box" @click="show2(images,index)">
                  <div class="jiao"></div>
                </div>
                <img :src="images.src" preview="2" preview-text="外观环境" :onerror="errorImg01">
                <!-- <img :src="images.src" @click="show2(images,index)" :onerror="errorImg01"> -->
              </li>
            </ul>
          </div>
          <div class="m2" v-if="Matching&&Matching.length!=0">
            <flexbox class="site-room-title">
              <flexbox-item>
                <h4 class="gallery-h4">配套设施</h4>
                <span class="gallery-len">{{Matching.length}}张</span>
              </flexbox-item>
            </flexbox>
            <ul>
              <li v-for="(images,index) in Matching" class="fl previewer-demo-img3" :key="index">
                <div v-if="images.fileType==1" class="video-btn-box" @click="show3(images,index)">
                  <div class="jiao"></div>
                </div>

                <img :src="images.src" preview="3" preview-text="配套设施" :onerror="errorImg01">
                <!-- <img :src="images.src" @click="show3(images,index)" :onerror="errorImg01"> -->
              </li>
            </ul>
          </div>
          <div class="m2" v-if="other&&other.length!=0">
            <flexbox class="site-room-title">
              <flexbox-item>
                <h4 class="gallery-h4">其他</h4>
                <span class="gallery-len">{{other.length}}张</span>
              </flexbox-item>
            </flexbox>
            <ul>
              <li v-for="(images,index) in other" class="fl previewer-demo-img4" :key="index">
                <div v-if="images.fileType==1" class="video-btn-box" @click="show4(images,index)">
                  <div class="jiao"></div>
                </div>
                <img :src="images.src" preview="4" preview-text="其他" :onerror="errorImg01">
                <!-- <img :src="images.src" @click="show4(images,index)" :onerror="errorImg01"> -->
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else-if="tabsIndex==1" class="padlr">
        <div class="gallery-imagesListBox" v-if="ExtData">
          <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">{{imgType==1?'建筑外观':'平面图'}}</h4>
              <span class="gallery-len">{{ExtData.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
            <!-- <li v-for="(videos,i) in ExtData" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li>-->
            <li v-for="(images,index) in ExtData" class="fl previewer-demo-img1" :key="index">
              <div v-if="images.fileType==1" class="video-btn-box" @click="show1(images,index)">
                <div class="jiao"></div>
              </div>
              <img :src="images.src" preview="1" :preview-text="imgType==1?'建筑外观':'平面图'" :onerror="errorImg01">
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="tabsIndex==2" class="padlr">
        <div class="gallery-imagesListBox" v-if="SurData">
          <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">{{imgType==1?'外观环境':'整体图'}}</h4>
              <span class="gallery-len">{{SurData.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
            <!--            
            <li v-for="(videos,i) in imgs.video" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li>-->
            <li v-for="(images,index) in SurData" class="fl previewer-demo-img2" :key="index">
              <div v-if="images.fileType==1" class="video-btn-box" @click="show2(images,index)">
                <div class="jiao"></div>
              </div>
              <img :src="images.src" preview="1" :preview-text="imgType==1?'外观环境':'整体图'"  :onerror="errorImg01">
              <!-- <img :src="images.src" @click="show2(images,index)" :onerror="errorImg01"> -->
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="tabsIndex==3" class="padlr">
        <div class="gallery-imagesListBox" v-if="Matching">
          <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">{{imgType==1?'配套设施':'细节图'}}</h4>
              <span class="gallery-len">{{Matching.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
            <!--            
            <li v-for="(videos,i) in imgs.video" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li>-->
            <li v-for="(images,index) in Matching" class="fl previewer-demo-img3" :key="index">
              <div v-if="images.fileType==1" class="video-btn-box" @click="show3(images,index)">
                <div class="jiao"></div>
              </div>
              <img :src="images.src" preview="1" :preview-text="imgType==1?'配套设施':'细节图'" :onerror="errorImg01">

              <!-- <img :src="images.src" @click="show3(images,index)" :onerror="errorImg01"> -->
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="tabsIndex==4" class="padlr">
        <div class="gallery-imagesListBox" v-if="other">
          <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">{{imgType==1?'其他':'配套设施'}}</h4>
              <span class="gallery-len">{{other.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
            <!--            
            <li v-for="(videos,i) in imgs.video" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li>-->
            <li v-for="(images,index) in other" class="fl previewer-demo-img4" :key="index">
              <div v-if="images.fileType==1" class="video-btn-box" @click="show4(images,index)">
                <div class="jiao"></div>
              </div>
              <img :src="images.src" preview="1" :preview-text="imgType==1?'其他':'配套设施'" :onerror="errorImg01">
              <!-- <img :src="images.src" @click="show4(images,index)" :onerror="errorImg01"> -->
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <!-- <img
        class="previewer-demo-img"
        v-for="(item, index) in allImgData"
        :key="index"
        :src="item.src"
        width="100"
        @click="show(index)"
      />-->

      <!-- <div v-transfer-dom v-if="ExtData">
        <previewer
          :list="ExtData"
          ref="previewer1"
          :options="options1"
          @on-index-change="logIndexChange1"
        ></previewer>
      </div>
      <div v-transfer-dom v-if="SurData">
        <previewer
          :list="SurData"
          ref="previewer2"
          :options="options2"
          @on-index-change="logIndexChange2"
        ></previewer>
      </div>

      <div v-transfer-dom v-if="Matching">
        <previewer
          :list="Matching"
          ref="previewer3"
          :options="options3"
          @on-index-change="logIndexChange3"
        ></previewer>
      </div>
      <div v-transfer-dom v-if="other">
        <previewer
          :list="other"
          ref="previewer4"
          :options="options4"
          @on-index-change="logIndexChange4"
        ></previewer>
      </div>-->
    </div>
</div>
  </div>
</template>
<script>
import { getDataInfo } from "../assets/lib/myStorage.js";
import oplay from "@/components/oplay";
import {
  Tab,
  TabItem,
  Sticky,
  Flexbox,
  FlexboxItem,
  Previewer,
  TransferDom,
  XDialog,Loading
} from "vux";
export default {
  directives: {
    TransferDom
  },
  name: "gallery",
  components: {
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    Previewer,
    oplay,
    XDialog,Loading
  },
  data() {
    return {
      //建筑外观data
      showLoding:true,
      meetingLength: 0,
      showAcc: false,
      imgType: null,
      accObj: {
        coursewareList: [
          {
            type: "mp4",
            coursewarePath:
              "http://yd-lhy.oss-cn-beijing.aliyuncs.com/user/14ac2eea2b28b952/video/14ac2eea2b28b952&1555732204634.mp4",
            coursewareName: "111"
          }
        ]
      },
      meetingImg: null,
      ExtData: null,
      SurData: null,
      Matching: null,
      other: null,
      errorImg01: 'this.src="' + require("../assets/images/noimg.png") + '"',
      allImgData: [
        // {
        //   pid: 1,
        //   type: "video",
        //   src:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2018/0919/c55502a01fdb2d7caac0757fc066fc95.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "video",
        //   msrc:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/bd3481d3ec6ddce6aa085d3cabef2204.jpg",
        //   src:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/bd3481d3ec6ddce6aa085d3cabef2204.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "video",
        //   msrc:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/e453ef64a5b657ae40484bca3230c7d1.jpg",
        //   src:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/e453ef64a5b657ae40484bca3230c7d1.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "img",
        //   msrc:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2018/1022/db173229a2f2e46dda477f85858098dc.jpg",
        //   src:
        //     "http://img.zx123.cn/Resources/zx123cn/uploadfile/2018/1022/db173229a2f2e46dda477f85858098dc.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "img",
        //   msrc:
        //     "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-03/5aea7d9e01462.jpg",
        //   src:
        //     "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-03/5aea7d9e01462.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "img",
        //   msrc:
        //     "https://back.tobosu.com/impress_pic/2017-05-27/p_5928f04e6c2eb.jpg",
        //   src:
        //     "https://back.tobosu.com/impress_pic/2017-05-27/p_5928f04e6c2eb.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "img",
        //   msrc:
        //     "https://back.tobosu.com/impress_pic/2017-10-30/p_59f6d22c33ac8.jpg",
        //   src:
        //     "https://back.tobosu.com/impress_pic/2017-10-30/p_59f6d22c33ac8.jpg"
        // },
        // {
        //   pid: 2,
        //   type: "video",
        //   msrc:
        //     "http://images4.c-ctrip.com/target/hotel/781000/780180/07796299cf7c40959d7a8af30d80a356_550_412.jpg",
        //   src:
        //     "http://images4.c-ctrip.com/target/hotel/781000/780180/07796299cf7c40959d7a8af30d80a356_550_412.jpg"
        // },
        // {
        //   pid: 3,
        //   type: "img",
        //   msrc:
        //     "//images4.c-ctrip.com/target/hotel/781000/780180/d5090e84fa3244988526cf6e31e6ce9f_550_412.jpg",
        //   src:
        //     "//images4.c-ctrip.com/target/hotel/781000/780180/d5090e84fa3244988526cf6e31e6ce9f_550_412.jpg"
        // },
        // {
        //   pid: 1,
        //   type: "img",
        //   msrc:
        //     "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-31/5b0fa5f41b726.jpg",
        //   src:
        //     "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-31/5b0fa5f41b726.jpg"
        // },
        // {
        //   pid: 1,
        //   msrc:
        //     "https://back.tobosu.com/new_impress_pic/water_mark/2018-08-21/5b7bbaadc63d0.jpg",
        //   src:
        //     "https://back.tobosu.com/new_impress_pic/water_mark/2018-08-21/5b7bbaadc63d0.jpg"
        // },
        // {
        //   pid: 2,
        //   type: "video",
        //   msrc:
        //     "//images4.c-ctrip.com/target/fd/hotel/g3/M01/AC/7C/CggYGVYNzZOANAq9ABd_IeQtNcU662_550_412.jpg",
        //   src:
        //     "//images4.c-ctrip.com/target/fd/hotel/g3/M01/AC/7C/CggYGVYNzZOANAq9ABd_IeQtNcU662_550_412.jpg"
        // },
        // {
        //   pid: 3,
        //   type: "img",
        //   msrc:
        //     "//images4.c-ctrip.com/target/hotel/781000/780180/d6cdf965238d42b6b04d161f2531269b_550_412.jpg",
        //   src:
        //     "//images4.c-ctrip.com/target/hotel/781000/780180/d6cdf965238d42b6b04d161f2531269b_550_412.jpg"
        // },
        // {
        //   pid: 4,
        //   type: "img",
        //   msrc:
        //     "//images4.c-ctrip.com/target/t1/hotel/844000/843031/88cb08b97e3e4ddd896531a7398829da_550_412.jpg",
        //   src:
        //     "//images4.c-ctrip.com/target/t1/hotel/844000/843031/88cb08b97e3e4ddd896531a7398829da_550_412.jpg"
        // }
      ],
      // options1: {
      //   getThumbBoundsFn(index) {
      //     let thumbnail = document.querySelectorAll(".previewer-demo-img1")[
      //       index
      //     ];
      //     // thumbnail.appendChild('div')
      //     let pageYScroll =
      //       window.pageYOffset || document.documentElement.scrollTop;
      //     let rect = thumbnail.getBoundingClientRect();
      //     return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      //   }
      // },
      // options2: {
      //   getThumbBoundsFn(index) {
      //     let thumbnail = document.querySelectorAll(".previewer-demo-img2")[
      //       index
      //     ];
      //     let pageYScroll =
      //       window.pageYOffset || document.documentElement.scrollTop;
      //     let rect = thumbnail.getBoundingClientRect();
      //     return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      //   }
      // },
      // options3: {
      //   getThumbBoundsFn(index) {
      //     let thumbnail = document.querySelectorAll(".previewer-demo-img3")[
      //       index
      //     ];
      //     let pageYScroll =
      //       window.pageYOffset || document.documentElement.scrollTop;
      //     let rect = thumbnail.getBoundingClientRect();
      //     return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      //   }
      // },
      // options4: {
      //   getThumbBoundsFn(index) {
      //     let thumbnail = document.querySelectorAll(".previewer-demo-img4")[
      //       index
      //     ];
      //     let pageYScroll =
      //       window.pageYOffset || document.documentElement.scrollTop;
      //     let rect = thumbnail.getBoundingClientRect();
      //     return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      //   }
      // },
      tabMunes: ["全部", "建筑外观", "外部环境", "配套设施", "其他"],
      tabTitle: "全部",
      tabsIndex: 0
    };
  },
  methods: {
    //获取全部图片列表
    getAllImgData() {
      //  console.log(this.$router.query)
      this.imgType = this.$route.query.type;

      let AssObj = {
        params: {
          prid: this.$route.params.id
          // prid:'1ab03a5fca57413ead237a4cf129c979'
        }
      };
      getDataInfo("get", "file/oplace", AssObj).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.showLoding = false
          if (this.$route.query.type == 1) {
            let arr = res.data.data.filter(e => {
              return e.type == 1 && e.belong != 1;
            });
            let tabMNub = [0];
            arr.forEach(el => {
              el.src = el.objectKey;
              tabMNub.push(el.belong);
            });
            let muneArr = [];
            new Set(tabMNub).forEach(ele => {
              muneArr.push(this.setMunes(ele));
            });
            this.tabMunes = muneArr;
            this.allImgData = arr;
            // console.log(tabMNub)
            this.filterData();
          } else if (this.$route.query.type == 0) {
            let arr = res.data.data;
            // console.log(arr)
            arr = arr.filter(e=>{
              return e.fileType==0 || e.fileType==1
            })
            arr.forEach(el => {
              el.src = el.objectKey;
            });
            this.allImgData = arr;
            // console.log(this.allImgData)
             this.filterData()
            // this.meetingLength = this.meetingImg.length;
          }else{
               let arr = res.data.data.filter(e => {
              return e.type == 2 && e.belong != 1;
            });
            let tabMNub = [0];
            arr.forEach(el => {
              el.src = el.objectKey;
              tabMNub.push(el.belong);
            });
            let muneArr = [];
            new Set(tabMNub).forEach(ele => {
              muneArr.push(this.setMunes1(ele));
            });
              
            this.tabMunes = muneArr;
            this.allImgData = arr;
         
            this.filterData();
          }

          // console.log(this.allImgData)
          // this.filterData();
          // this.assessData = res.data.data;
        }
      });
    },
     //会议室菜单标题
    setMunes1(num) {
      switch (num) {
        case 0:
          return "全部";
          break;
        case 2:
          return "平面图";
          break;
        case 3:
          return "整体图";
          break;
        case 4:
          return "细节图";
          break;
        case 5:
          return "配套设置";
          break;
      }
    },

    //出来菜单标题
    setMunes(num) {
      switch (num) {
        case 0:
          return "全部";
          break;
        case 2:
          return "建筑外观";
          break;
        case 3:
          return "外部坏境";
          break;
        case 4:
          return "配套设施";
          break;
        case 5:
          return "其他";
          break;
      }
    },

    tabClick(index) {
      // this.infoTab = !this.infoTab
    },
    filterOvAndImg(beNum) {
      if(beNum){
 let ovArr = this.allImgData.filter(e => {
        return e.belong == beNum && e.fileType == 1;
      });
      let imgArr = this.allImgData.filter(e => {
        return e.belong == beNum && e.fileType == 0;
      });
      return [...ovArr, ...imgArr];
      }else{
         return this.allImgData
      }
     
    },
    filterData() {
      this.ExtData = this.filterOvAndImg(2);
      this.SurData = this.filterOvAndImg(3);
      this.Matching = this.filterOvAndImg(4);
      this.other = this.filterOvAndImg(5);
      this.meetingImg = this.filterOvAndImg()
      // this.SurData = this.allImgData.filter(e => {
      //   return e.pid == 2;
      // });
      // this.Matching = this.allImgData.filter(e => {
      //   return e.pid == 3;
      // });
      // this.other = this.allImgData.filter(e => {
      //   return e.pid == 4;
      // });
    },
    logIndexChange1(arg) {
      // console.log(arg);
    },
    logIndexChange2(arg) {
      // console.log(arg);
    },
    logIndexChange3(arg) {
      // console.log(arg);
    },
    logIndexChange4(arg) {
      // console.log(arg);
    },

     findvideocover(obj) {
      let _this = this;
      this.$nextTick(() => {
        let video = document.getElementById("upvideo");
        let source = document.createElement("source");
        // source.src = require("../../assets/5b086751dbb7af1ea8fa8d05e66fe5c3.mp4");this.formLabelAlign.video
        source.src = obj.coursewareList[0].coursewarePath;
        source.type = "video/mp4";
        video.appendChild(source);
        video.addEventListener("loadeddata", function() {
          var canvas = document.createElement("canvas");
          canvas.width = "320";
          canvas.height = "320";
          canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.width);
          var img = document.createElement("img");
          let imgsrc = canvas.toDataURL("image/png");
          // console.log(imgsrc)
          _this.Videoframehandle(imgsrc.split(",")[1]);
        });
      });
    },


    showMeeting(item, index) {
      console.log(item, index);
      this.showAcc = true;
      this.$refs.previewer1.show(index);
    },
    show1(item, index) {
      // console.log(this.$refs.previewer1)
      // console.log(index,item)
      if (item.fileType == 1) {
        this.showAcc = true;
        this.accObj = {
          coursewareList: [
            {
              type: "mp4",
              coursewarePath: item.objectKey,
              coursewareName: item.objectKey
            }
          ]
        };
      } else if (item.fileType == 0) {
        this.$refs.previewer1.show(index);
        console.log(this.$refs.previewer1)
      }
    },
    show2(item, index) {
      if (item.fileType == 1) {
        this.showAcc = true;
        this.accObj = {
          coursewareList: [
            {
              type: "mp4",
              coursewarePath: item.objectKey,
              coursewareName: item.objectKey
            }
          ]
        };
      } else if (item.fileType == 0) {
        this.$refs.previewer2.show(index);
      }
    },
    show3(item, index) {
      if (item.fileType == 1) {
        this.showAcc = true;
        this.accObj = {
          coursewareList: [
            {
              type: "mp4",
              coursewarePath: item.objectKey,
              coursewareName: item.objectKey
            }
          ]
        };
      } else if (item.fileType == 0) {
        this.$refs.previewer3.show(index);
      }
    },
    show4(item, index) {
      if (item.fileType == 1) {
        this.showAcc = true;
        this.accObj = {
          coursewareList: [
            {
              type: "mp4",
              coursewarePath: item.objectKey,
              coursewareName: item.objectKey
            }
          ]
        };
      } else if (item.fileType == 0) {
        this.$refs.previewer4.show(index);
      }
    }
  },
  mounted() {
    this.getAllImgData();
   
  },
  watch: {
    showAcc(n,o){
      if(n){
         this.findvideocover(this.accObj)
      }
      // console.log(n)
    },
    meetingImg(n, o) {
      if (n) {
        this.meetingLength = n.length;
        // console.log(n.length)
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/tools.less";
@import "../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.dialog-demo-gallery {
  .weui-mask {
    z-index: 9998;
  }
  .weui-dialog {
    z-index: 9999;
    background: transparent;
    // margin-top: 12rem;
    width: 100%;

    text-align: center !important;
    max-width: 100% !important;
  }

  .weui-mask {
    background: rgba(0, 0, 0, 1);
  }
}

.img-box {
  width: 100%;
}
.pswp__caption__center {
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.pswp__top-bar {
  .pswp__button--zoom {
    display: none;
  }
  .pswp__button--fs {
    display: none;
  }
}
.pswp__counter {
  left: 40% !important ;
  font-size: 14px;
  color: #fff !important;
}

</style>
