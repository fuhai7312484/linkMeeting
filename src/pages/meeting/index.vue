<template>
  <div class="box">
    <div class="siteHeaderBox">
      <h3 class="fl siteHeaderTitle">找会议</h3>
      <router-link tag="div" class="fl siteCity" to="/city">
        <!-- {{city}} -->
        {{city.name?city.name:PositObj.city}}
        <i class="el-icon-caret-bottom"></i>
      </router-link>

      <div class="siteListIcosBox fr">
        <router-link tag="div" to="/meetingSearch" class="fl HeaderSearch">
          <img src="../../assets/images/HeaderSearch.png">
        </router-link>
        <!-- @click="gotoMapChange" -->
        <div class="fr HeaderSearch" @click="show9Change">
          <img src="../../assets/images/button-screen-black.png">
        </div>
      </div>

      <div v-transfer-dom>
        <popup v-model="show2" height="100%">
          <div class="IntereClosed" @click="show2Cancel">
            <x-icon type="ios-close-empty" size="30"></x-icon>
          </div>
          <div class="InterestedInBox">
            <h4>选择你感兴趣的行业</h4>
            <h5>获取更多精彩推荐</h5>
            <!-- {{IndType}} -->
            <div class="IntCheckbox">
              <checker
                v-model="IndType"
                type="checkbox"
                @on-change="checkerChange"
                default-item-class="check-item"
                selected-item-class="check-item-selected"
              >
                <div @click="selectLeft" :class="allInd?'allIndBtn allSelected':'allIndBtn'">全部</div>
                <checker-item
                  :value="item"
                  v-for="(item, index) in IndTypeData"
                  :key="index"
                >{{item.value}}</checker-item>
              </checker>
              <div
                class="checkBoxSubmit checkSubmit-selected"
                v-if="IndType.length>0"
                @click="checkBoxSubmit"
              >选好了</div>
              <div class="checkBoxSubmit" v-else>选好了</div>
            </div>
          </div>
        </popup>
      </div>
    </div>
    <!-- 
<sticky scroll-box="vux_view_box_body" :check-sticky-support="false" :offset="46">
      <tab :line-width=1>
        <tab-item :selected="demo4 === item" v-for="(item, index) in list4" @click="demo4 = item" :key="index">{{item}}</tab-item>
      </tab>
    </sticky>-->
    <div v-if="IsShowMap">
      <!-- 地图 -->
      <m-map
        :OrderHight="OrderHight-55"
        :data_info="listData"
        :tabTitle="filterData"
        @GotoMapHeight="GotoMapHeight"
      ></m-map>
    </div>
    <div v-if="!IsShowMap">
      <sticky :check-sticky-support="false" :offset="0">
        <!-- <div class="meetingfilterIcon fr">
            <img src="../../assets/images/meetingfilterIcon.png">
        </div>-->
        <div class="meeting-tabBox">
          <div class="meeting-tab fl">
            <tab
              active-color="#fe666b"
              default-color="#a0a0a0"
              custom-bar-width="33%"
              v-model="tabsIndex"
              :line-width="0"
            >
              <tab-item
                v-for="(tabs,index) in tabMunes"
                :key="index"
                :selected="tabTitle === tabs"
                @on-item-click="tabClick(index)"
              >{{ tabs }}</tab-item>
            </tab>
          </div>

          <div class="meetingfilterIcon fr" @click="show2Change">
            <img src="../../assets/images/meetAdd.png">
          </div>
        </div>
      </sticky>

      <!-- <div v-transfer-dom>
        <x-dialog
          v-model="showToast"
          class="dialog-demo"
          :dialog-style="{'max-width': '95%', width: '95%'}"
        >
          <div class="InterestedInBox">
            <h4>选择你感兴趣的行业</h4>
   
            <div class="IntCheckbox">
              <checker
                v-model="IndType"
                type="checkbox"
                @on-change="checkerChange"
                default-item-class="check-item"
                selected-item-class="check-item-selected"
              >
                <div @click="selectLeft" :class="allInd?'allIndBtn allSelected':'allIndBtn'">全部</div>
                <checker-item
                  :value="item"
                  v-for="(item, index) in IndTypeData"
                  :key="index"
                >{{item.value}}</checker-item>
              </checker>
              <div
                class="checkBoxSubmit checkSubmit-selected"
                v-if="IndType.length>0"
                @click="checkBoxSubmit"
              >选好了</div>
              <div class="checkBoxSubmit" v-else>选好了</div>
            </div>
          </div>
        
        </x-dialog>
      </div>-->
      <div v-transfer-dom>
        <loading :show="show3" text="数据加载中..."></loading>
      </div>

      <div
        v-for="(item, index) in tabMunes"
        :key="index"
        style=" position: relative; height:61vh; padding-bottom:1rem;"
        v-if="tabsIndex==index"
      >
        <pull-tod :on-refresh="onRefresh" :on-infinite="onInfinite" :IsCompleted="IsCompleted">
          <ul class="tabMeetingListUl padlr" style="height:100%;" v-if="!show3">
            <li v-if="!isLogin && tabsIndex==0" class="ListNoContent">
              <p>您还没有登录</p>
              <p>这里有很多值得您关注的会议</p>
              <span class="ListNoContentBtn">去登录</span>
            </li>

            <li v-else-if="listData.length==0 && tabsIndex==0" class="ListNoContent">
              <p>您还没有关注任何内容</p>
              <p>推荐里面有很多精彩会议哦~</p>
              <span class="ListNoContentBtn" @click="tabsIndex = 1">去看看</span>
            </li>

            <li v-else-if="listData.length==0 && tabsIndex!=0" class="ListNoContent">
              <p>您还没有关注任何内容</p>
            </li>

            <li
              v-else
              class="tabMeetingList"
              v-for="(DataItem,index) in listData"
              :key="index"
              @click="gotoDetil(DataItem.id)"
            >
              <div class="tabMeetingTopBox" v-if="tabsIndex==0">
                <div class="orgLogo fl">
                  <img
                    :src="DataItem.mainPic==null?require('../../assets/images/myFans-Mask.png'):DataItem.mainPic"
                  >
                </div>
                <div class="orgname fl">{{DataItem.userName}}</div>
                <div class="orgUptime fr">{{ProTime(DataItem.createTime,'T')}}</div>
              </div>
              <div>
                <!-- {{DataItem.meetingFileList}} -->
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
                    <div class="tabMeetingNum fr">{{DataItem.msg}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </pull-tod>

        <!-- <ul class="tabMeetingListUl padlr">
          <li v-if="!isLogin && tabsIndex==0" class="ListNoContent">
            {{isLogin}}
            <p>您还没有登录</p>
            <p>这里有很多值得您关注的会议</p>
            <span class="ListNoContentBtn">去登录</span>
          </li>

          <li v-else-if="listData.length==0 && tabsIndex==0" class="ListNoContent">
            <p>您还没有关注任何内容</p>
            <p>推荐里面有很多精彩会议哦~</p>
            <span class="ListNoContentBtn" @click="tabsIndex = 1">去看看</span>
          </li>

          <li v-else-if="listData.length==0 && tabsIndex!=0" class="ListNoContent">
            <p>您还没有关注任何内容</p>
          </li>

          <li
            v-else
            class="tabMeetingList"
            v-for="(DataItem,index) in listData"
            :key="index"
            @click="gotoDetil(DataItem.id)"
          >
           
            <div class="tabMeetingTopBox" v-if="tabsIndex==0">
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
                  
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>-->
        <div class="der"></div>
      </div>

      <footer-nav></footer-nav>
    </div>

    <div class="siteGotoMap" :style="{bottom:MapH,}" @click="gotoMapChange">
      <img src="../../assets/images/button-gotomap.png" v-if="!IsShowMap && tabsIndex!=0">
      <img src="../../assets/images/button-backlist.png" v-if="IsShowMap">
      <!-- <img src="../../assets/images/button-gotomap.png"> -->
      <!-- IsShowMap -->
    </div>

    <div v-transfer-dom>
      <popup v-model="show9" position="right" width="90%">
        <div class="FeaturesFilterBox">
          <div class="FeaturesConten">
            <!-- {{FeatureData}} -->
            <div class="FeaturesCheckes padlr" v-for="(feat,index) in Features" :key="index">
              <div class="FeaturesCheckeTitle">
                <h4 class="fl">{{feat.title}}</h4>
                <span class="CheckeInfo">{{feat.info}}</span>
              </div>
              <div class="transition-box">
                <checker
                  v-model="feat.value"
                  radio-required
                  default-item-class="Filters-item"
                  selected-item-class="Filters-item-selected"
                >
                  <checker-item value="0" @on-item-click="FeaturesChangeValue(0,feat)">不限</checker-item>

                  <checker-item
                    v-for="(feater,index) in feat.showData"
                    :key="index+1"
                    :value="(index+1)+''"
                    @on-item-click="FeaturesChangeValue(index+1,feat)"
                  >{{ feater }}</checker-item>
                </checker>
              </div>
            </div>
          </div>

          <div class="FeaturesFilterBtns">
            <flexbox :gutter="0" class="footer-nav-box">
              <flexbox-item :span="1/4" :order="1">
                <div class="footer-nav-FieldPlace" @click="ClearSelection">清空</div>
              </flexbox-item>

              <flexbox-item :span="3/4" :order="2">
                <div class="footer-nav-destineBtn" @click="determineFilter">确定</div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="show1" height="100%">
        <div class="FilterListBox padlr">
          <div class="FilterTags">
            <div class="filterInfoTags">
              <span v-for="(FItem,index) in FeatureData" :key="index">{{FItem.name}}</span>
            </div>
            <div class="filterInfoNum" @click="show1=false">
              <x-icon type="ios-close-empty" size="30"></x-icon>
            </div>
          </div>

          <ul class="tabMeetingListUl FMeetingList">
            <li
              class="tabMeetingList"
              v-for="(DataItem,index) in filterList"
              :key="index"
              @click="gotoDetil(DataItem.id)"
            >
              <div class="tabMeetingTopBox" v-if="tabsIndex==0">
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
                    <div class="tabMeetingNum fr">{{DataItem.msg}}</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </popup>
    </div>

    <load-more v-if="showMore" :tip="'正在加载中'" background-color="#fbf9fe"></load-more>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PullTod from "@/components/PullTo";
import {
  getStorage,
  checkToken,
  getDataInfo,
  isLogin,
  transDate,
  getPositioning,
  setStorage
} from "../../assets/lib/myStorage.js";
import MMap from "@/components/MMap";
import {
  Tab,
  TabItem,
  Sticky,
  XDialog,
  TransferDomDirective as TransferDom,
  Checker,
  CheckerItem,
  Popup,
  Flexbox,
  FlexboxItem,
  LoadMore,
  Loading
} from "vux";
import FooterNav from "@/components/footerNav";
export default {
  name: "MeetingIndex",

  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Sticky,
    FooterNav,
    XDialog,
    Checker,
    CheckerItem,
    MMap,
    Popup,
    Flexbox,
    FlexboxItem,
    LoadMore,
    PullTod,
    Loading
  },
  data() {
    return {
      show3: false,
      PositObj: {},
      showMore: false,
      isLogin: isLogin(),
      MapH: "90px",
      OrderHight: 0,
      listData: [],
      filterList: [],
      tabMunes: ["关注", "推荐"],
      tabTitle: "推荐",
      filterData: [],
      tabsIndex: 1,
      // showToast: true,
      IsShowMap: false,
      show9: false,
      show1: false,
      show2: false,
      IndTypeData: [
        {
          key: "1",
          value: "IT互联网"
        },
        {
          key: "2",
          value: "数据中心"
        },
        {
          key: "3",
          value: "科技"
        },
        {
          key: "4",
          value: "电子计算机"
        },
        {
          key: "5",
          value: "工业"
        },
        {
          key: "6",
          value: "电商"
        },
        {
          key: "7",
          value: "营销"
        },
        {
          key: "8",
          value: "文娱"
        },
        {
          key: "9",
          value: "地产"
        },
        {
          key: "10",
          value: "医疗"
        },
        {
          key: "11",
          value: "设计"
        },
        {
          key: "12",
          value: "创业"
        },
        {
          key: "13",
          value: "教育"
        },
        {
          key: "14",
          value: "服务业"
        },
        {
          key: "15",
          value: "金融"
        },
        {
          key: "16",
          value: "游戏"
        }
      ],
      IndType: [],
      allInd: true,

      FeatureData: [],
      Features: [
        {
          title: "会议行业",
          show: false,
          type: "industry",
          value: "0",
          name: "",
          showData: [
            "IT互联网",
            "数据中心",
            "科技",
            "电子计算机",
            "工业",
            "电商",
            "营销",
            "文娱",
            "地产",
            "医疗",
            "设计",
            "创业",
            "教育",
            "服务业",
            "金融",
            "游戏"
          ]
        },
        {
          id: "005",
          title: "会议类型",
          show: false,
          type: "meetingType",
          value: "0",
          name: "",
          showData: [
            "会展",
            "行业大会",
            "培训讲座",
            "招商推介",
            "交流研讨",
            "商务会议",
            "发布会",
            "课程",
            "颁奖答谢",
            "晚会年会"
          ]
        },
        {
          id: "006",
          title: "会议状态",
          show: false,
          type: "status",
          value: "0",
          name: "",
          showData: ["进行中", "未开始", "已结束"]
        },
        {
          id: "007",
          title: "排序",
          show: false,
          type: "sort",
          value: "0",
          name: "",
          showData: ["最新发布", "热门点击", "最多参会", "离我最近"]
        },
        {
          id: "008",
          title: "费用",
          show: false,
          type: "money",
          value: "0",
          name: "",
          showData: ["免费", "收费"]
        },
        {
          id: "009",
          title: "时段",
          show: false,
          type: "time",
          value: "0",
          name: "",
          showData: ["今天", "明天", "周末", "近一周", "近一月"]
        }
      ],
      page: 1,

      counter: 1, //默认已经显示出5条数据 count等于一是让从6条开始加载
      num: 5, // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
      IsCompleted: false
    };
  },
  computed: {
    ...mapState(["city"])
  },
  methods: {
    //处理时间格式
    ProTime(time, type) {
      return transDate(time, type);
    },
    gotoDetil(id) {
      // console.log(id);
      this.$router.push({
        path: "/meetDetail/" + id,
        query: { meetingId: id }
      });
    },
    tabClick(index) {
      // this.infoTab = !this.infoTab
    },
    demo01_onIndexChange(index) {
      this.demo01_index = index;
    },
    selectLeft() {
      if (this.allInd) {
        this.IndType = [];
      } else {
        this.IndType = [...this.IndTypeData];
      }
      // console.log(this.allInd);
    },
    checkerChange(val) {
      // console.log(this.IndType)
      this.allInd = val.toString() === this.IndTypeData.toString();
      //  console.log(val.toString()===this.IndTypeData.toString())
    },
    show2Change() {
      this.show2 = true;
      let sotr = getStorage("industry");
      if (isLogin()) {
        let userId = getStorage("userToken").userId;
        let intObj = {
          params: {
            userId: userId
          }
        };
        checkToken().then(Pdata => {
          getDataInfo(
            "get",
            "meetingdetails/meetingdetails/interested",
            intObj
          ).then(res => {
            if (res.data.code == 200) {
              if (res.data.data != null) {
                let newArr = [];
                this.IndTypeData.forEach((e, index) => {
                  res.data.data.forEach(el => {
                    if (el == e.value) {
                      newArr.push(e);
                    }
                  });
                });
                this.IndType = [...newArr];
              } else {
                if (sotr) {
                  sotr = sotr.splice(0, 2);

                  let newArr = [];
                  this.IndTypeData.forEach((e, index) => {
                    sotr.forEach(el => {
                      if (el == e.value) {
                        newArr.push(e);
                      }
                    });
                  });

                  this.IndType = [...sotr];
                } else {
                  this.IndType = [...this.IndTypeData];
                }
              }
            }
          });
        });
      } else {
        if (sotr) {
          sotr.splice(0, 2);
          let newArr = [];
          this.IndTypeData.forEach((e, index) => {
            sotr.forEach(el => {
              if (el == e.value) {
                newArr.push(e);
              }
            });
          });
          this.IndType = [...newArr];
        } else {
          this.IndType = [...this.IndTypeData];
        }
      }
    },
    show2Cancel() {
      this.show2 = false;

      let sotr = getStorage("industry");
      if (isLogin()) {
        let userId = getStorage("userToken").userId;

        let intObj = {
          params: {
            userId: userId
          }
        };
        checkToken().then(Pdata => {
          getDataInfo(
            "get",
            "meetingdetails/meetingdetails/interested",
            intObj
          ).then(res => {
            if (res.data.code == 200) {
              if (res.data.data == null) {
                let arr = ["关注", "推荐"],
                  serverArr = [];
                this.IndTypeData.forEach(e => {
                  serverArr.push(e.value);
                });
                let intObj = {
                  content: serverArr.join()
                };

                checkToken().then(Pdata => {
                  getDataInfo(
                    "post",
                    "meetingdetails/meetingdetails/interested",
                    intObj
                  ).then(res => {
                    if (res.data.code == 200) {
                      this.tabMunes = [...arr, ...serverArr];
                    }
                  });
                });
              }
            }
          });
        });
      } else {
        if (sotr) {
          this.tabMunes = sotr;
        } else {
          let arr = ["关注", "推荐"],
            serverArr = [];
          this.IndTypeData.forEach(e => {
            serverArr.push(e.value);
          });
          this.tabMunes = [...arr, ...serverArr];
          setStorage("industry", [...arr, ...serverArr]);
          this.show2 = false;
        }
      }
    },
    //获取导航栏菜单
    getTabMunes() {
      let sotr = getStorage("industry");
      if (isLogin()) {
        let userId = getStorage("userToken").userId;
        let intObj = {
          params: {
            userId: userId
          }
        };
        checkToken().then(Pdata => {
          getDataInfo(
            "get",
            "meetingdetails/meetingdetails/interested",
            intObj
          ).then(res => {
            if (res.data.code == 200) {
              if (res.data.data != null) {
                this.tabMunes = [...["关注", "推荐"], ...res.data.data];
                setStorage("industry", [...["关注", "推荐"], ...res.data.data]);
              } else {
                this.show2 = true;

                // if (sotr) {
                //   sotr.splice(0, 2);
                //   let intObj = {
                //     content: sotr.join()
                //   };

                //   checkToken().then(Pdata => {
                //     getDataInfo(
                //       "post",
                //       "meetingdetails/meetingdetails/interested",
                //       intObj
                //     ).then(res => {
                //       if (res.data.code == 200) {
                //         this.tabMunes = [...["关注", "推荐"], ...sotr];
                //       }
                //     });
                //   });
                // } else {
                //   this.show2 = true;
                // }
              }
            }
          });
        });
      } else {
        if (sotr) {
          this.tabMunes = sotr;
        } else {
          // this.show2Change();
          console.log(111111);
          this.show2 = true;
        }
      }
    },
    checkBoxSubmit() {
      //这里请求选择行业的数据接口
      let arr = ["关注", "推荐"],
        serverArr = [];
      this.IndType.forEach(e => {
        serverArr.push(e.value);
      });
      if (isLogin()) {
        let intObj = {
          content: serverArr.join()
        };
        checkToken().then(Pdata => {
          getDataInfo(
            "post",
            "meetingdetails/meetingdetails/interested",
            intObj
          ).then(res => {
            if (res.data.code == 200) {
              this.show2 = false;
              this.tabMunes = [...arr, ...serverArr];
              setStorage("industry", [...arr, ...serverArr]);
              this.tabsIndex = 1;
            }
          });
        });
      } else {
        setStorage("industry", [...arr, ...serverArr]);
        this.tabMunes = [...arr, ...serverArr];
        this.show2 = false;
        this.tabsIndex = 1;
      }

      // this.showToast = false;
    },
    //切换地图
    gotoMapChange() {
      this.IsShowMap = !this.IsShowMap;
    },
    //设置地图高度
    getOrderHight() {
      var orderHight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.OrderHight = orderHight;
    },
    //设置地图显示按钮的高
    GotoMapHeight(value) {
      this.MapH = value;
      console.log(value);
    },
    //设置筛选后的结果页
    showFilter() {
      let arr = ["关注", "发布会", "直播中", "最新发布", "免费", "近一周"];
      if (this.filterData.length <= 1) {
        this.filterData = arr;
      } else {
        this.filterData = [];
      }
    },
    //打开筛选框
    show9Change() {
      this.show9 = true;
      this.ClearSelection();
    },
    //清除特色选择
    ClearSelection() {
      this.Features.forEach(e => {
        e.value = "0";
      });
      this.FeatureData = [];
    },
    //场地特色筛选择处理
    FeaturesChangeValue(val, item) {
      this.Features.forEach(e => {
        if (e.type == item.type) {
          e.name = e.showData[val - 1];
        }
      });

      let obj = {
        val: val,
        type: item.type,
        name: item.showData[val - 1]
      };

      if (this.FeatureData.length != 0) {
        let index = 0,
          isType = false;
        this.FeatureData.forEach((e, i) => {
          if (e.type == item.type) {
            index = i;
            isType = true;
          }
        });
        if (isType) {
          if (val == "0") {
            this.FeatureData.splice(index, 1);
          } else {
            this.FeatureData.splice(index, 1, obj);
          }
        } else {
          if (val == "0") {
            return;
          } else {
            this.FeatureData.push(obj);
          }
        }
      } else {
        if (val != "0") {
          this.FeatureData.push(obj);
        }
      }

      // console.log(val, item);
    },
    getMoreList(loaded) {
      console.log(loaded);
    },

    determineFilter() {
      this.show9 = false;
      if (this.FeatureData.length != 0) {
        if (this.IsShowMap) {
          let arr = [];
          this.FeatureData.forEach(e => {
            arr.push(e.name);
          });
          this.filterData = arr;
          console.log("这里请求接口", this.FeatureData);
        } else {
          console.log("这里请求接口", this.FeatureData);
          let filterObj = {
            params: {
              //  currentPage:this.counter,
              // pageSize:this.num,

              currentPage: 1,
              pageSize: 99999
            }
          };

          this.FeatureData.forEach(e => {
            switch (e.type) {
              case "sort":
                filterObj.params[e.type] =
                  e.name == "最新发布"
                    ? "createTime"
                    : e.name == "热门点击"
                    ? "click"
                    : e.name == "最多参会"
                    ? "partake"
                    : null;
                filterObj.params.longitudeNow = "111";
                filterObj.params.latitudeNow = "3333";
                break;
              case "time":
                filterObj.params[e.type] =
                  e.name == "今天"
                    ? "today"
                    : e.name == "明天"
                    ? "tomorrow"
                    : e.name == "周末"
                    ? "sunday"
                    : e.name == "近一周"
                    ? "week"
                    : "month";
                break;
              case "money":
                filterObj.params[e.type] = e.name == "免费" ? 0 : 1;
                break;
              case "status":
                filterObj.params[e.type] =
                  e.name == "未开始"
                    ? 0
                    : e.name == "进行中"
                    ? 1
                    : e.name == "已结束"
                    ? 2
                    : 3;
                break;
              default:
                filterObj.params[e.type] = e.name;
            }
            // filterObj.params[e.type] = e.name
          });

          console.log(filterObj);
          this.show1 = true;

          getDataInfo(
            "get",
            "meetingdetails/meetingByConditions",
            filterObj
          ).then(res => {
            if (res.data.code == 200) {
              this.filterList = res.data.data.meetingShowList;
            }
            console.log(res);
            //  this.filterList = [{}];

            // if (res.data.code == 200) {
            //   if (res.data.data.length == 0) {
            //     this.IsCompleted = true;
            //     // console.log("数据加载完毕！！");
            //   } else {
            //     this.listData = [...this.listData, ...res.data.data];
            //     if (obj.fun) {
            //       obj.fun();
            //     }
            //   }
            // }
          });

          //   let filterObj={
          //     industry:'',//行业
          //     meetingType:'',//会议类型
          //     sort:'',//排序方式
          //     money:'',//收费与否
          //     time:'',//发布时段
          //     longitudeNow:'',//离我最近的填写经度
          //     latitudeNow:'',//离我最近的填写纬度
          //     status:'',//会议进行的状态
          //     city:'',//当前的城市
          //     currentPage:this.counter,
          //     pageSize:this.num,
          //   }

          //  console.log(filterObj)
        }
      }
      // console.log(this.FeatureData,this.filterData)
    },
    //请求我的关注数据
    getDataList(obj) {
      let dataObj = {
        params: {
          flag: "1",
          userId: getStorage("userToken").userId,
          currentPage: obj.counter,
          pageSize: this.num
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "meetingdetails/meetingdetailsList", dataObj).then(
          res => {
            if (res.data.code == 200) {
              if (res.data.data.length == 0) {
                this.IsCompleted = true;
                // console.log("数据加载完毕！！");
              } else {
                this.listData = [...this.listData, ...res.data.data];
                if (obj.fun) {
                  obj.fun();
                }
              }
            }
          }
        );
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
            // console.log("数据加载完毕！！");
          } else {
        
            this.listData = [
              ...this.listData,
              ...res.data.data.meetingShowList
            ];
            if (obj.fun) {
              obj.fun();
            }
          }
        }
      });
    },

    //请求数据并且下拉刷新页面
    getAllData(type) {
      this.show3 = true;
      this.counter = 1;
      let dataObj = {
        params: {
          currentPage: this.counter,
          pageSize: this.num
        }
      };
      if (type == 0) {
     
        if (isLogin()) {
          dataObj.params.flag = "1";
          dataObj.params.userId = getStorage("userToken").userId;
          if (this.isLogin) {
            checkToken().then(Pdata => {
              getDataInfo(
                "get",
                "meetingdetails/meetingdetailsList",
                dataObj
              ).then(res => {
               
                if (res.data.code == 200) {
                  this.listData = res.data.data;
                  this.show3 = false;
                }
              });
            });
          }
        } else {
          
          this.show3 = false;
        }
      } else if (type == 1) {
        getDataInfo(
          "get",
          "meetingdetails/meetingdetailsListByGoodMeeting",
          dataObj
        ).then(res => {
          if (res.data.code == 200) {
            this.show3 = false;
            this.listData = res.data.data.meetingShowList;
          }
        });
      } else {
        dataObj.params.city = this.city.name
          ? this.city.name
          : this.PositObj.city;
        dataObj.params.industry = this.tabMunes[type];

        getDataInfo("get", "meetingdetails/meetingByConditions", dataObj).then(
          res => {
            if (res.data.code == 200) {
              this.show3 = false;
              this.listData = res.data.data.meetingShowList;
            }
          }
        );
      }
    },
    //上滑更新页面

    //下拉刷新
    getList() {
      let vm = this;
      vm.listData = [];
      this.counter = 0;
      this.IsCompleted = false;
      this.getAllData(this.tabsIndex);
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
      if (this.tabsIndex == 0) {
        this.getDataList({ counter: vm.counter, fun: done });
      } else if (this.tabsIndex == 1) {
        this.getGoodMeeting({ counter: vm.counter, fun: done });
      }
    },

    getPlaceData() {
      //获取当前城市Code
      getPositioning().then(red => {
        this.PositObj = red;

        let stor = getStorage("city");
        let codeObj = {
          params: {
            province: red.province,
            city: red.city
          }
          // params: {
          //   province: "北京市",
          //   city: "北京市"
          // }
        };

        getDataInfo("get", "region/code", codeObj).then(res => {
          if (res.data.code == 200) {
            let placeObj = {
              params: {
                // lng:this.PositObj.lng,
                // lat:this.PositObj.lat,
                cityCode: stor ? stor.regionCode : res.data.data[0].regionCode
              }
            };
            getDataInfo("get", "place", placeObj).then(resd => {
              if (resd.data.code == 200) {
                // console.log(resd.data.data.data);
                this.TaPosted = resd.data.data.data;
                // this.show2 = false;
              }
            });
          }
        });
      });
    }
  },

  mounted() {
    this.getOrderHight();
    // this.IndType = [...this.IndTypeData];
    this.filterData = [this.tabTitle];
    this.getAllData(this.tabsIndex);
    this.getPlaceData();
    this.getTabMunes();

    // console.log(this.tabsIndex);
    // this.getGoodMeeting({ counter: this.counter });
  },
  watch: {
    tabsIndex(n, o) {
      // console.log("请求一下接口", n);
      this.getAllData(n);

      // if (n == 0) {
      //   if (this.isLogin) {
      //     this.getDataList({counter:this.counter})
      //   }
      // } else if(n==1) {

      //  this.getGoodMeeting({counter:this.counter})

      // }

      // this.listData = this.data1[0][n];
      this.filterData = [this.tabMunes[n]];
      this.tabTitle = this.tabMunes[n];
    }
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

.IntCheckbox {
  // margin-left:-.3rem;
  width: 100%;
}
.weui-dialog {
  text-align: left !important;
}
.check-item {
  // border: 1px solid #ececec;
  display: inline-block;
  width: 28%;
  font-size: 0.8rem;
  text-align: center;
  margin: 0.5rem 0.3rem;

  border-radius: 5px;
  padding: 0.6rem 0.2rem;
  // padding: 5px 15px;
  color: #505050;
  font-weight: bold;
  background: #f5f5f6 url("../../assets/images/check-item.png") no-repeat;
  background-size: 20px 20px;
  background-position: top right;
}
.check-item-selected {
  background: #ffe8e8 url("../../assets/images/check-item-selected.png")
    no-repeat;
  color: #fe666b;
  background-size: 20px 20px;
  background-position: top right;
  // border: 1px solid green;
}
.allIndBtn {
  margin: 0.5rem 0.1rem 0.5rem 0.3rem;
  width: 28%;
  display: inline-block;
  font-size: 0.8rem;
  text-align: center;

  background: #f5f5f6 url("../../assets/images/check-item.png") no-repeat;
  background-size: 20px 20px;
  background-position: top right;
  border-radius: 5px;
  padding: 0.6rem 0.2rem;
  font-weight: bold;
}
.allSelected {
  background: #ffe8e8 url("../../assets/images/check-item-selected.png")
    no-repeat;
  color: #fe666b;
  background-size: 20px 20px;
  background-position: top right;
}
.checkBoxSubmit {
  width: 100%;
  text-align: center;
  padding: 0.5rem 0;
  margin: 1.5rem 0 0.5rem 0;
  color: #505050;
  // background: #F8696E;
  background: #f5f5f6;
  border-radius: 5px;
}
.checkSubmit-selected {
  background: #f8696e !important;
  color: #fff;
}

.transition-mak {
  position: absolute;
  width: 100%;
  // z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
}
.transition-box {
  margin-bottom: 10px;
  width: 100%;
  // border-radius: 4px;
  background-color: #fff;
  // text-align: center;
  color: #fff;
  padding: 10px 10px;
  box-sizing: border-box;
  position: relative;
  // margin-right: 20px;
  //  display: flex;
}

.Filters-item {
  color: #323232;
  background: #f6f6f6;
  text-align: center;
  width: 28%;
  padding: 0.8rem 0;
  margin: 2% 2%;
  // border:1px solid  #F6F6F6;
  border-radius: 0.3rem;
  font-weight: bold;
  font-size: 0.8rem;
  position: relative;
}

.Filters-item-selected {
  //   border: 1px solid green;
  background: #fef4f4;
  background-image: url(../../assets/images/Filters-item-selected.png);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 20px;
  color: #fe666b;
}
.demo2-item {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
}
.demo2-item-selected {
  border-color: green;
}
.demo3-item {
  padding: 5px 5px;
  font-size: 0;
}
.demo3-item-selected {
  outline: 1px solid #8b8aee;
}
.demo4-item {
  background-color: #ddd;
  color: #222;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 10px;
  line-height: 18px;
  border-radius: 15px;
}
.demo4-item-selected {
  background-color: #ff3b3b;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  //   background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}
.vux-popup-dialog {
  background: #fff !important;
}
</style>
