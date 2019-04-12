<template>
  <div class="siteSearchBox">
    <flexbox :gutter="0" style="position: fixed; background: #fff; z-index:9999">
      <flexbox-item :span="4/5">
        <x-input
          placeholder="搜索会议"
          @on-change="SearchInputChange"
          @on-blur="onblurChange"
          v-model="keyword"
          @on-enter="onEnter"
          @on-click-clear-icon="clickclearchenge"
          class="siteSearchInput"
        >
          <img
            slot="label"
            style="padding-right:10px;display:block;"
            src="../../assets/images/search-gray.png"
            width="18"
            height="18"
          >
        </x-input>
      </flexbox-item>
      <flexbox-item :span="1/5">
        <div class="siteSearchCancel" @click="$router.go(-1)">取消</div>
      </flexbox-item>
    </flexbox>

    <flexbox :gutter="0" v-if="showResult">
      <div
        class="search-content"
        ref="search"
        v-show="keyword"
        style=" position: relative; height:100vh; padding:1rem .8rem;"
      >
        <pull-tod :on-refresh="onRefresh" :on-infinite="onInfinite" :IsCompleted="IsCompleted">
          <ul class="tabMeetingListUl" v-if="!show2" style=" padding:1rem .8rem;margin-top: 1rem;">
            <li class="tabMeetingNoData" v-if="noData">抱歉,暂无搜索结果,您可能对以下内容感兴趣哦</li>
            <li
              class="tabMeetingList"
              v-for="(DataItem,index) in list"
              :key="index"
              @click="handSearchClick(DataItem.id)"
            >
              <div>
                <div class="tabMeetingImg fl">
                  <span
                    v-for="(img,index) in DataItem.meetingFileList"
                    :key="index"
                    v-if="img.belong==1"
                  >
                    <img
                      :src="img.fileUrl==null?require('../../assets/images/myFans-Mask.png'):img.fileUrl"
                    >
                  </span>
                </div>




 <div class="tabMeetingTextBox fl">

     <h4 class="tabMeetingTextTitle" v-html="DataItem.theme"></h4>
                 
                  <div class="tabMeetingTime">
                    <span v-if="DataItem.status==0" class="TimeC0" >

                     <img :src="require('../../assets/images/timeC0.png')">  {{CountdownTime(DataItem.beginTime)}}
                
                    </span>
                    <span v-if="DataItem.status==3 || DataItem.status==1" class="TimeC1">
                      <img :src="require('../../assets/images/timeC1.png')" /> 进行中
                    </span>
                    <span v-if="DataItem.status==2" class="TimeC2">
                     <img :src="require('../../assets/images/timeC2.png')" /> 已结束
                    </span> &nbsp;&nbsp;
                    <span>
<img :src="require('../../assets/images/timeAdd.png')"/>
                    </span>
                     
                  {{addressSplit(DataItem.address)}}

                  </div>
                  <div class="tabMeetingTagBox">
                    <div class="tabMeetingTag">
                      <!-- {{DataItem.status}} -->
                       <span v-for="(Tag,index) in DataItem.tags" :key="index" v-if="index<4">{{Tag}}</span>
                       
                      <!-- <span
                        v-else-if="DataItem.status==3 || DataItem.status==1"
                        class="processing"
                      >进行中</span>
                      <span v-else-if="DataItem.status==0" class="notStarted">未开始</span> -->
                    </div>
                    <div class="tabMeetingNum" :class="DataItem.status==0?'TimeC0':'TimeC2'">


                      {{DataItem.status==0?'火热报名中':DataItem.status==1 || DataItem.status==3?'报名即将截止':'报名已结束'}}
                      
                      </div>
                  </div>
                </div>
                
              </div>
            </li>

            <!-- <li
            class="search-item-list borBottm"
            v-for="(item,index) of list"
            :key="index"
            @click="handSearchClick(item.id)"
            >{{item.theme}}</li>-->
          </ul>
        </pull-tod>
        <div class="der"></div>
      </div>
    </flexbox>

    <div class="padlr" v-if="!showResult" style=" margin-top: 2.8rem;">
      <div v-transfer-dom class="siteSearchConfirm">
        <confirm v-model="show" title="清除搜索历史" @on-cancel="onCancel" @on-confirm="onConfirm">
          <!-- @on-show="onShow"
          @on-hide="onHide"-->
          <p style="text-align:center; color:#000;">清除后不可恢复</p>
        </confirm>
      </div>
      <!-- {{stoMeetVal.length}} -->
      <div class="siteSearchHistory">
        <flexbox>
          <flexbox-item :span="4/5">
            <h4 class="HistoryTitle">搜索历史</h4>
          </flexbox-item>
          <flexbox-item :span="1/5">
            <div class="HistoryDelete" @click="HistoryDeleteChange">
              <img src="../../assets/images/del-gray.png">
            </div>
          </flexbox-item>
        </flexbox>
        <ul class="siteSearchList">
          <li v-for="(sto,index) in stoMeetVal" :key="index" @click="TopclickChange(sto)">{{sto}}</li>
        </ul>
      </div>

      <div class="siteSearchHistory">
        <flexbox>
          <flexbox-item :span="4/5">
            <h4 class="HistoryTitle">热搜关键词</h4>
          </flexbox-item>
        </flexbox>
        <ul class="siteHotSearchList">
          <li v-for="(top,index) in TopKeywords" :key="index" @click="TopclickChange(top)">{{top}}</li>
        </ul>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

     <toast
      v-model="toastInfo.showPositionValue"
      width="10em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>
    
  </div>
</template>
<script>
import { mapState } from "vuex";
import PullTod from "@/components/PullTo";
import {
  XInput,
  Flexbox,
  FlexboxItem,
  Confirm,
  TransferDomDirective as TransferDom,
  Loading,Toast,
} from "vux";
import {
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo,
  setStorage,
  getPositioning,meetingBeTime
} from "../../assets/lib/myStorage.js";
export default {
  name: "siteSearch",
  directives: {
    TransferDom
  },
  components: {
    XInput,
    Flexbox,
    FlexboxItem,
    Confirm,
    Loading,
    PullTod,Toast,
  },
  data() {
    return {
       toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      noData: false,
      SearchCity: "",
      show2: false,
      showResult: false,
      show: false,
      TopKeywords: [],
      keyword: "",
      stoMeetVal: [],
      list: [],

      cities: [
        {
          id: "001",
          name: "北京昆泰国际酒店",
          spell: "beijing"
        },
        {
          id: "001",
          name: "北京昆泰国际酒店",
          spell: "beijing"
        },
        {
          id: "001",
          name: "北京昆泰国际酒店",
          spell: "beijing"
        },
        {
          id: "002",
          name: "船舶重工酒店",
          spell: "chuan"
        },
        {
          id: "003",
          name: "国家会议中心",
          spell: "guojia"
        }
      ],
      counter: 1, //默认已经显示出5条数据 count等于一是让从6条开始加载
      num: 6, // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
      IsCompleted: false,

      timer: null
    };
  },
  computed: {
    ...mapState(["city"])
  },
  methods: {
     CountdownTime(time){
      return meetingBeTime(time)
    },
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
    onblurChange() {
      // console.log(this.keyword)
      this.show2 = true;
      if (this.keyword != "") {
        this.showResult = true;
        let searchObj = {
          params: {
            currentPage: this.counter,
            pageSize: this.num,
            name: this.keyword,
            city: this.SearchCity
          }
        };

        getDataInfo(
          "get",
          "meetingdetails/meetingdetailsListByName",
          searchObj
        ).then(res => {
      
          if (res.data.code == 200) {
            this.setSearchHistory();
            if (res.data.data.meetingShowList.length == 0) {
              this.noData = true;
              this.IsCompleted = true;
              this.show2 = false;
              this.getGoodMeeting({ counter: this.counter });
            } else {

               let replaceReg = new RegExp(this.keyword, 'g');
               let replaceString = '<span class="search-text">' + this.keyword + '</span>';

             
              res.data.data.meetingShowList.forEach(e => {
                e.theme = e.theme.replace(replaceReg, replaceString);
              });
              //  console.log(res.data.data.meetingShowList)
              this.list = res.data.data.meetingShowList;

              if (res.data.data.meetingShowList.length < this.num) {
                this.IsCompleted = true;
              }
              this.show2 = false;


            }
          }else if(res.data.code == 400){
              this.show2 = false;
               this.noData = true;
              this.IsCompleted = true;
              this.toastInfo= {
                    showMsg: res.data.msg,
                    showPositionValue: true,
                    toastType: "text"
                  }
          }
          // if (res.data.code == 200) {
          //   this.TopKeywords = res.data.data;
          // } else if (res.data.code == 400 || res.data.code == 100101) {
          // }
        });
      }
    },

    dropDownPage(obj) {
      let searchObj = {
        params: {
          currentPage: this.counter,
          pageSize: this.num,
          name: this.keyword,
          city: this.SearchCity
        }
      };

      getDataInfo(
        "get",
        "meetingdetails/meetingdetailsListByName",
        searchObj
      ).then(res => {
        if (res.data.code == 200) {
          if (
            res.data.data.meetingShowList.length == 0 ||
            res.data.data.meetingShowList.length < this.num
          ) {
            this.IsCompleted = true;
            // console.log("数据加载完毕！！");
          } else {
            this.list = [...this.list, ...res.data.data.meetingShowList];
            if (obj.fun) {
              obj.fun();
            }
          }
        }
      });
    },
    clickclearchenge() {
      this.showResult = false;
      this.stoMeetVal = getStorage("meetVal");
    },
    //设置搜索历史
    setSearchHistory() {
      if (this.keyword != "") {
        let meetArr = getStorage("meetVal");
        if (meetArr) {
          meetArr = meetArr.filter(e => {
            return e != this.keyword;
          });

          if (meetArr.length >= 10) {
            meetArr.splice(meetArr.length - 1, 1);
            meetArr.unshift(this.keyword);
            setStorage("meetVal", meetArr);
          } else {
            meetArr.unshift(this.keyword);
            setStorage("meetVal", meetArr);
          }
        } else {
          setStorage("meetVal", [this.keyword]);
        }
      }
    },
    onEnter(val) {
      // console.log("click enter!", val);
      
      // alert(val)
    },

    SearchInputChange(val) {
      // this.showResult = false
      this.list = [];
      // console.log(val);
    },
    handSearchClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/meetDetail/" + id,
        query: { meetingId: id }
      });
      // this.$store.commit('changeCity',city)
      // this.keyword = val;
      //   this.$router.push('/')
    },
    //清空搜索历史
    HistoryDeleteChange() {
      this.show = true;
    },
    onCancel() {
      // console.log("on cancel");
    },
    onConfirm(msg) {
      stoRemove("meetVal");
      this.stoMeetVal = [];
      // alert("清除掉所有搜索记录");

      //   console.log(msg+'on confirm')
      //   if (msg) {
      //     alert(msg)
      //   }
    },
    //获取热门关键词数据
    getMeetingKeyword() {
      let searchObj = {
        params: {}
      };

      getDataInfo(
        "get",
        "meetingdetails/meetingdetails/keyword",
        searchObj
      ).then(res => {
        // console.log(res);

        if (res.data.code == 200) {
          this.TopKeywords = res.data.data;
        } else if (res.data.code == 400 || res.data.code == 100101) {
        }
      });
    },
    //请求推荐内容
    getGoodMeeting(obj) {
      let goodObj = {
        params: {
          currentPage: obj.counter,
          pageSize: this.num
        }
      };
      // console.log(obj.counter)
      getDataInfo(
        "get",
        "meetingdetails/meetingdetailsListByGoodMeeting",
        goodObj
      ).then(res => {
   
        if (res.data.code == 200) {
          if (res.data.data.meetingShowList.length == 0) {
            this.IsCompleted = true;
       
          } else {
            this.list = [...this.list, ...res.data.data.meetingShowList];
            if (obj.fun) {
              obj.fun();
            }
          }
        }
      });
    },
    //点击的热搜词
    TopclickChange(key) {
      this.keyword = key;
      this.onblurChange();
      this.setSearchHistory();
      // console.log(key);
    },

    //下拉刷新
    getList() {
      let vm = this;
      vm.list = [];
      this.counter = 0;
      this.IsCompleted = false;
  
      this.onblurChange();
    },
    onRefresh(done) {
      this.getList();
      done(); // call done
    },
    //上滑无限加载
    onInfinite(done) {
      let vm = this;
      vm.counter++;
      vm.pageEnd = vm.num * vm.counter;
      vm.pageStart = vm.pageEnd - vm.num;
      if (this.noData) {
        this.getGoodMeeting({ counter: vm.counter, fun: done });
      } else {
        this.dropDownPage({ counter: vm.counter, fun: done });
      }

    
    },
    getPlaceData() {
      //获取当前城市Code
      getPositioning().then(red => {
        let stor = getStorage("city");
        this.SearchCity = stor ? stor.name : red.city;
      });
    }
  },
  mounted() {
    this.getMeetingKeyword();
    this.stoMeetVal = getStorage("meetVal");
    this.getPlaceData();
  },
  watch: {
   
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.weui-dialog{
  text-align: center !important;
}
.search-text{
  color: #FF6469;
}
.siteSearchConfirm{
  .weui-dialog__hd{
    text-align: center;
  }
  .weui-dialog__ft{
    text-align: center;
    .weui-dialog__btn{
 color: #007AFF !important;
    }
   
  }
}

</style>

