<template>
<div>


  <pull-tod :on-refresh="onRefresh" :on-infinite="onInfinite">
 <ul>
         <!-- <li v-for="(item,index) in listdata" >{{item.name}}</li> -->
         <!-- <li v-for="(item,index) in downdata" >{{item.address}}</li> -->



<li class="tabMeetingList"
            v-for="(DataItem,index) in downdata"
            :key="index"
            @click="gotoDetil(DataItem.id)"
          >
            <!-- {{DataItem}} -->
            <div class="tabMeetingTopBox">
              <div class="orgLogo fl">
                <img
                  :src="DataItem.mainPic==null?require('../../assets/images/myFans-Mask.png'):DataItem.mainPic"
                >
              </div>
              <div class="orgname fl">{{DataItem.userName}}</div>
              <div class="orgUptime fr">{{ProTime(DataItem.createTime,'T')}}</div>
            </div>
            <div>
              <div class="tabMeetingImg fl">
                <!-- {{DataItem.meetingFileList}} -->
                <span
                  v-for="(img,index) in DataItem.meetingFileList"
                  :key="index"
                  v-if="img.belong==1"
                >
                  <img
                    :src="img.fileUrl==null?require('../../assets/images/myFans-Mask.png'):img.fileUrl"
                  >
                </span>

                <!-- <img :src="DataItem.meetingPic==null?require('../../assets/images/noimg.png'):DataItem.meetingPic"> -->
                <!-- {{DataItem.img}} -->
              </div>

              <div class="tabMeetingTextBox fl">
                <h4 class="tabMeetingTextTitle">{{DataItem.theme}}</h4>
                <div class="tabMeetingTime">
                  <span>{{DataItem.beginTime}}</span>
                  <span>{{DataItem.region}}</span>
                </div>
                <div class="tabMeetingTagBox">
                  <div class="tabMeetingTag fl">
                    <span v-if="DataItem.status==0" class="IsOver">已结束</span>
                    <span v-else-if="DataItem.status==1" class="LiveIn">直播中</span>
                    <span v-else-if="DataItem.status==2" class="processing">进行中</span>
                    <span v-else-if="DataItem.status==3" class="notStarted">未开始</span>
                  </div>
                  <div class="tabMeetingNum fr">
                    {{DataItem.msg}}
                    <!-- {{DataItem.status==0?'查看附件':DataItem.status==2?'报名将截止':DataItem.status==3?'马上抢票':DataItem.pepople+'人已报名'}} -->
                  </div>
                </div>
              </div>
            </div>
          </li>



          <!-- <li v-for="(DataItem,index) in downdata" :key="index">
            
            {{DataItem.address}}
              
            </li> -->
       </ul>

  </pull-tod>
  
  
       <!-- <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
       <ul>
         <li v-for="(item,index) in listdata" >{{item.name}}</li>
         <li v-for="(item,index) in downdata" >{{item.name}}</li>
       </ul>
    </v-scroll> -->
  </div>
</template>

<script>


import PullTod from "@/components/PullTo";
import {
  getStorage,
  checkToken,
  getDataInfo,
  isLogin,
  transDate
} from "../../assets/lib/myStorage.js";
// import FooterNav from "@/components/footerNav";
export default {
  name: "MeetingIndex",

  components: {
    PullTod,
  //  PullTo
  },
   
  data() {
    return {

      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 5,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数
      listdata: [{id:'11',name:'haha'}], // 下拉更新数据存放数组
      downdata: []  // 上拉更多的数据存放数组
    };
  },

  methods: {
getList(){
       let vm = this;
       vm.listdata = vm.listdata ;
          // vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
          //          vm.listdata = response.data.slice(0,15);
          //        }, (response) => {
          //           console.log('error');
          //       });
    },
    onRefresh(done) {
             this.getList();
             done() // call done
      
    },
    onInfinite(done) {
              let vm = this;
              vm.counter++;
                  vm.pageEnd = vm.num * vm.counter;
                  vm.pageStart = vm.pageEnd - vm.num;
                let dataObj = {
            params: {
              flag: "1",
              userId: getStorage("userToken").userId,
              currentPage: vm.counter,
              pageSize: "1"
            }
          };
          checkToken().then(Pdata => {
            getDataInfo(
              "get",
              "meetingdetails/meetingdetailsList",
              dataObj
            ).then(res => {
                console.log(res)
              if (res.data.code == 200) {
                if(res.data.data.length==0){
                  console.log('数据加载完毕！！')
                }else{
                    this.downdata = [...this.downdata,...res.data.data]
                     done() 
                }
              
              
               
              }
            });
          });



              // vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
              //     vm.counter++;
              //     vm.pageEnd = vm.num * vm.counter;
              //     vm.pageStart = vm.pageEnd - vm.num;
              //     let arr = response.data;
              //        let i = vm.pageStart;
              //        let end = vm.pageEnd;
              //        for(; i<end; i++){
              //           let obj ={};
              //           obj["name"] = arr[i].name;
              //           vm.downdata.push(obj);
              //            if((i + 1) >= response.data.length){
              //             this.$el.querySelector('.load-more').style.display = 'none';
              //             return;
              //           }
              //           }
              //     done() // call done
              //      }, (response) => {
              //       console.log('error');
              //   });
           }

  },
  
mounted() {
  // this.scroll(this.dataList)

    let dataObj = {
            params: {
              flag: "1",
              userId: getStorage("userToken").userId,
              currentPage: "1",
              pageSize: "1"
            }
          };
          checkToken().then(Pdata => {
            getDataInfo(
              "get",
              "meetingdetails/meetingdetailsList",
              dataObj
            ).then(res => {
                console.log(res)
              if (res.data.code == 200) {
               console.log()
                this.downdata = res.data.data;
              }
            });
          });


 }

};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";


</style>
