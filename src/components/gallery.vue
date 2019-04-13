<template>
  <div class="box">
    <div>
      <sticky :check-sticky-support="false" :offset="0">
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
            >{{ tabs }}</tab-item
          >
        </tab>
      </sticky>



      <div v-if="tabsIndex==0" class="padlr">
        <div class="gallery-imagesListBox">
          <div class="m2">


         
          <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">建筑外观</h4>
              <span class="gallery-len">{{ExtData.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
            <li v-for="(images,index) in ExtData" class="fl previewer-demo-img1"  :key="index" >
                <div v-if="images.type=='video'" class="video-btn-box"><div class="jiao"></div></div>
             <img :src="images.src" @click="show1(index)" />
            </li>
          </ul>
 </div>
  <div class="m2">
           <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">外观环境</h4>
              <span class="gallery-len">{{SurData.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
           
            <li v-for="(images,index) in SurData" class="fl previewer-demo-img2"  :key="index" >
             <img :src="images.src" @click="show2(index)" />
            </li>


          </ul>
</div>
 <div class="m2">
              <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">配套设施</h4>
              <span class="gallery-len">{{Matching.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
           
            <li v-for="(images,index) in Matching" class="fl previewer-demo-img3"  :key="index" >
             <img :src="images.src" @click="show3(index)" />
            </li>


          </ul>
 </div>
 <div class="m2">
   <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">其他</h4>
              <span class="gallery-len">{{other.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
           
            <li v-for="(images,index) in other" class="fl previewer-demo-img4"  :key="index" >
             <img :src="images.src" @click="show4(index)" />
            </li>


          </ul>
 </div>
        </div>
      </div>



      <div v-else-if="tabsIndex==1" class="padlr">
        <div class="gallery-imagesListBox">
  <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">建筑外观</h4>
              <span class="gallery-len">{{ExtData.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
                         
            <!-- <li v-for="(videos,i) in ExtData" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li> -->
            <li v-for="(images,index) in ExtData" class="fl previewer-demo-img1"  :key="index" >
               <div v-if="images.type=='video'" class="video-btn-box"><div class="jiao"></div></div>
             <img :src="images.src" @click="show1(index)" />
            </li>


          </ul>
          
        </div>
      </div>

      <div v-else-if="tabsIndex==2" class="padlr">
          <div class="gallery-imagesListBox">
  <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">外观环境</h4>
              <span class="gallery-len">{{SurData.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
              <!--            
            <li v-for="(videos,i) in imgs.video" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li> -->
            <li v-for="(images,index) in SurData" class="fl previewer-demo-img2"  :key="index" >
             <img :src="images.src" @click="show2(index)" />
            </li>


          </ul>
          
        </div>
      </div>

      <div v-else-if="tabsIndex==3" class="padlr">
        <div class="gallery-imagesListBox">
  <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">配套设施</h4>
              <span class="gallery-len">{{Matching.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
              <!--            
            <li v-for="(videos,i) in imgs.video" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li> -->
            <li v-for="(images,index) in Matching" class="fl previewer-demo-img3"  :key="index" >
             <img :src="images.src" @click="show3(index)" />
            </li>


          </ul>
          
        </div>
      </div>
      <div v-else-if="tabsIndex==4" class="padlr">

 <div class="gallery-imagesListBox">
  <flexbox class="site-room-title">
            <flexbox-item>
              <h4 class="gallery-h4">其他</h4>
              <span class="gallery-len">{{other.length}}张</span>
            </flexbox-item>
          </flexbox>
          <ul>
              <!--            
            <li v-for="(videos,i) in imgs.video" :key="'A-'+i">
              <div class="video-btn-box"><div class="jiao"></div></div>
              <img :src="videos" />
            </li> -->
            <li v-for="(images,index) in other" class="fl previewer-demo-img4"  :key="index" >
             <img :src="images.src" @click="show4(index)" />
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
      /> -->
    
      <div v-transfer-dom>
        <previewer
          :list="ExtData"
          ref="previewer1"
          :options="options1"
          @on-index-change="logIndexChange1"
        ></previewer>
      </div>
 <div v-transfer-dom>
        <previewer
          :list="SurData"
          ref="previewer2"
          :options="options2"
          @on-index-change="logIndexChange2"
        ></previewer>
      </div>

       <div v-transfer-dom>
        <previewer
          :list="Matching"
          ref="previewer3"
          :options="options3"
          @on-index-change="logIndexChange3"
        ></previewer>
      </div>
        <div v-transfer-dom>
        <previewer
          :list="other"
          ref="previewer4"
          :options="options4"
          @on-index-change="logIndexChange4"
        ></previewer>
      </div>
      
    </div>



  </div>
</template>
<script>
  import {
    Tab,
    TabItem,
    Sticky,
    Flexbox,
    FlexboxItem,
    Previewer,
    TransferDom
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
      Previewer
    },
    data() {
      return {
        //建筑外观data
        ExtData:[],
         SurData:[],
         Matching:[],
         other:[],
        allImgData: [
         {
            pid: 1,
            type: "video",
            src:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2018/0919/c55502a01fdb2d7caac0757fc066fc95.jpg"
          },
          {
            pid: 1,
            type: "video",
            msrc:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/bd3481d3ec6ddce6aa085d3cabef2204.jpg",
            src:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/bd3481d3ec6ddce6aa085d3cabef2204.jpg"
          },
            {
            pid: 1,
            type: "video",
            msrc:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/e453ef64a5b657ae40484bca3230c7d1.jpg",
            src:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2015/1201/e453ef64a5b657ae40484bca3230c7d1.jpg"
          },
            {
            pid: 1,
            type: "img",
            msrc:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2018/1022/db173229a2f2e46dda477f85858098dc.jpg",
            src:
              "http://img.zx123.cn/Resources/zx123cn/uploadfile/2018/1022/db173229a2f2e46dda477f85858098dc.jpg"
          },
           {
            pid: 1,
            type: "img",
            msrc:
              "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-03/5aea7d9e01462.jpg",
            src:
              "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-03/5aea7d9e01462.jpg"
          },
           {
            pid: 1,
            type: "img",
            msrc:
              "https://back.tobosu.com/impress_pic/2017-05-27/p_5928f04e6c2eb.jpg",
            src:
              "https://back.tobosu.com/impress_pic/2017-05-27/p_5928f04e6c2eb.jpg"
          },
           {
            pid: 1,
            type: "img",
            msrc:
              "https://back.tobosu.com/impress_pic/2017-10-30/p_59f6d22c33ac8.jpg",
            src:
              "https://back.tobosu.com/impress_pic/2017-10-30/p_59f6d22c33ac8.jpg"
          },
          {
            pid: 2,
            type: "video",
            msrc:
              "http://images4.c-ctrip.com/target/hotel/781000/780180/07796299cf7c40959d7a8af30d80a356_550_412.jpg",
            src:
              "http://images4.c-ctrip.com/target/hotel/781000/780180/07796299cf7c40959d7a8af30d80a356_550_412.jpg"
          },
          {
            pid: 3,
            type: "img",
            msrc:
              "//images4.c-ctrip.com/target/hotel/781000/780180/d5090e84fa3244988526cf6e31e6ce9f_550_412.jpg",
            src:
              "//images4.c-ctrip.com/target/hotel/781000/780180/d5090e84fa3244988526cf6e31e6ce9f_550_412.jpg"
          },
          {
            pid: 1,
            type: "img",
            msrc:
              "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-31/5b0fa5f41b726.jpg",
            src:
              "https://back.tobosu.com/new_impress_pic/water_mark/2018-05-31/5b0fa5f41b726.jpg"
          },
           {
            pid: 1,
            msrc:
              "https://back.tobosu.com/new_impress_pic/water_mark/2018-08-21/5b7bbaadc63d0.jpg",
            src:
              "https://back.tobosu.com/new_impress_pic/water_mark/2018-08-21/5b7bbaadc63d0.jpg"
          },
          {
            pid: 2,
            type: "video",
            msrc:
              "//images4.c-ctrip.com/target/fd/hotel/g3/M01/AC/7C/CggYGVYNzZOANAq9ABd_IeQtNcU662_550_412.jpg",
            src:
              "//images4.c-ctrip.com/target/fd/hotel/g3/M01/AC/7C/CggYGVYNzZOANAq9ABd_IeQtNcU662_550_412.jpg"
          },
          {
            pid: 3,
            type: "img",
            msrc:
              "//images4.c-ctrip.com/target/hotel/781000/780180/d6cdf965238d42b6b04d161f2531269b_550_412.jpg",
            src:
              "//images4.c-ctrip.com/target/hotel/781000/780180/d6cdf965238d42b6b04d161f2531269b_550_412.jpg"
          },
          {
            pid: 4,
            type: "img",
            msrc:
              "//images4.c-ctrip.com/target/t1/hotel/844000/843031/88cb08b97e3e4ddd896531a7398829da_550_412.jpg",
            src:
              "//images4.c-ctrip.com/target/t1/hotel/844000/843031/88cb08b97e3e4ddd896531a7398829da_550_412.jpg"
          }
        ],
        options1: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll(".previewer-demo-img1")[
              index
            ];
            let pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };

          }
        },
         options2: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll(".previewer-demo-img2")[
              index
            ];
            let pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          }
        },
        options3: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll(".previewer-demo-img3")[
              index
            ];
            let pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
 
          }
        },
        options4: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll(".previewer-demo-img4")[
              index
            ];
            let pageYScroll =
              window.pageYOffset || document.documentElement.scrollTop;
            let rect = thumbnail.getBoundingClientRect();
            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
          }
        },
        tabMunes: ["全部", "建筑外观", "外部环境", "配套设施", "其他"],
        tabTitle: "全部",
        tabsIndex: 0
        //           allImgData:[
        //             {
        //              title:'建筑外观',
        //              type:'1',
        //              video:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        //              'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        //              'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'],
        //              img:[{
        //   msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        //   src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
        //   w: 800,
        //   h: 400
        // },
        //              ],

        //             },
        //              {
        //              title:'外观环境',
        //              type:'2',
        //              video:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'],
        //              img:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg','https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'],

        //             },
        //             {
        //              title:'配套设施',
        //              type:'3',
        //              video:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'],
        //              img:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg','https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'],

        //             },
        //              {
        //              title:'其他',
        //              type:'4',
        //              video:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg'],
        //              img:['https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg','https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'],

        //             }
        //           ],
      };
    },
    methods: {
      tabClick(index) {
        // this.infoTab = !this.infoTab
       
      },
      filterData(){
      this.ExtData = this.allImgData.filter(e=>{
        return e.pid==1;
      })
      this.SurData = this.allImgData.filter(e=>{
        return e.pid==2;
      })
      this.Matching = this.allImgData.filter(e=>{
        return e.pid==3;
      })
      this.other = this.allImgData.filter(e=>{
        return e.pid==4;
      })
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
      show1(index) {
  
        this.$refs.previewer1.show(index);
      },
       show2(index) {
      
        this.$refs.previewer2.show(index);
      },
       show3(index) {
     
        this.$refs.previewer3.show(index);
      },
       show4(index) {
     
        this.$refs.previewer4.show(index);
      },
    },
    mounted() {
       this.filterData()
   
    },
  };
</script>

<style lang="less">
  @import "../assets/style/tools.less";
  @import "../assets/style/global.less";
  @import "~vux/src/styles/reset.less";
</style>
