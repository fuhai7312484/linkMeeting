<template>
  <div class="box">
    <!-- {{this.$route.query}} -->
    <!-- {{TicketData}} -->

    <div v-transfer-dom>
      <loading :show="show2" text="数据加载中..."></loading>
    </div>

    <div class="ticket-Box" v-if="!show2">
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">添加报名人</h3>
          </div>
        </sticky>
      </div>
      <div class="ticket-contentBox">
        <div class="padlr" style="overflow: hidden;">
          <div class="signUpInfoBox">
            <div class="signUpInfoImg fl">
              <span
                v-for="(img,index) in meetingData.meetingFileList"
                :key="index"
                v-if="img.belong==1"
              >
                <img
                  :src="img.fileUrl==null?require('../../assets/images/myFans-Mask.png'):img.fileUrl"
                >
              </span>

              <!-- <img src="https://goss2.vcg.com/creative/vcg/800/version23/VCG21db81d37a5.jpg"> -->
            </div>
            <div class="signUpInfoContent fl">
              <h4>{{meetingData.theme}}</h4>
              <p class="signUpTime">时间：{{meetingData.beginTime}}</p>
              <p class="signUpTime">地点：{{meetingData.address}}</p>
            </div>
          </div>

          <div class="signUpTicket">
            <div class="signUpTicketTop">
              <div class="signUpTicketTitle fl">
                <h4>{{TicketData.name}}</h4>
                <img v-if="TicketData.isRefund ==3 " src="../../assets/images/Non-refundable.png">
              </div>

              <div class="signUpTicketPrice fr">
                <span v-if="TicketData.price!=0">{{'¥'+ TicketData.price}}</span>
                {{TicketData.price==0?'免费':'/人'}}
              </div>
            </div>
            <!-- class="signUpTicketBottom" -->
            <div class="signUpTicketBottom" @click="showContent004 = !showContent004">
              <div
                class="signUpTicketInfoLeft fl"
                :style="{ height: showContent004?'100%':'25px',}"
              >{{TicketData.remarks}}</div>
              <div class="fr"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <!-- {{ContactData}} -->
      <ul class="signUpMobilleBox">
        <swipeout class="vux-1px-tb">
          <swipeout-item
            transition-mode="follow"
            v-for="(Contact,index) in ContactData"
            :key="index"
          >
            <div slot="right-menu">
              <swipeout-button
                :type="TicketData.price==0?'default':'warn'"
                @click.native="deleteContact(index,Contact)"
              >删除</swipeout-button>
            </div>
            <li slot="content" :class="Contact.company==''?'linH55':''">
              <h5 class="signUpMobilleTitleBox">
                <span>{{Contact.name}}</span>
                <span>{{Contact.mobile}}</span>
              </h5>
              <div class="signUpCompany" v-if="Contact.company!=''">{{Contact.company}}</div>
            </li>
          </swipeout-item>
        </swipeout>

        <!-- <li v-for="(Contact,index) in ContactData">
<h4>{{Contact.mobile}}</h4>

        </li>-->
      </ul>
      <div class="signUpaddContact" v-if="TicketData.price!=0" @click="AddContact">+ 添加/编辑报名人</div>

      <div v-transfer-dom>
        <popup v-model="showInput" height="100%">
          <div class="my-inputsBox">
            <div class="map-headerBox borBottm">
              <div class="map-go-back" @click="closeShowInput"></div>
              <h3 class="map-headerTitle">添加报名人</h3>
              <div class="my-saveBtn fr" v-if="!addNewshow" @click="addNewContact">+ 添加</div>
            </div>
            <div class="getContactListBox" v-if="!addNewshow">
              <checker
                v-model="ContactVal"
                type="checkbox"
                default-item-class="demo1-item"
                selected-item-class="demo1-item-selected"
              >
                <div class="ContactListcheckbox" v-for="(item, index) in ContactList" :key="index">
                  <checker-item :value="item">
                    <div class="ContactListItemBox">
                      <div class="ContactListItem-selected fl">√</div>
                      <div class="ContactListItem-name fl" :class="item.company==''?'linH35':''">
                        <h4 class="ContactListItemTitleBox">
                          <span>{{item.name}}</span>
                          <span>{{item.mobile}}</span>
                        </h4>
                        <div class="checkCompanyInfo" v-if="item.company!=''">{{item.company}}</div>
                      </div>
                    </div>
                  </checker-item>

                  <div class="ContactListItem-edit" @click="ContactListEdit(item)">编辑</div>
                </div>
              </checker>
              <br>
              <!-- <span>{{ContactVal}}</span> -->
            </div>

            <div v-if="addNewshow">
              <div class="signUpFormBox padlr">
                <div class="signUpInputs borBm padlr">
                  <div class="signUpLabel fl">
                    <span>*</span> 姓名
                  </div>

                  <div class="signUpInput fr">
                    <x-input
                      name="username"
                      ref="username"
                      placeholder="你的姓名"
                      v-model="newForm.name"
                      is-type="china-name"
                      @on-change="InputChange"
                    ></x-input>
                  </div>
                </div>

                <div class="signUpInputs borBm padlr">
                  <div class="signUpLabel fl">
                    <span>*</span> 手机号
                  </div>
                  <div class="signUpInput fr">
                    <x-input
                      name="mobile"
                      ref="mobile"
                      placeholder="你的手机号码"
                      keyboard="number"
                      is-type="china-mobile"
                      v-model="newForm.mobile"
                      @on-change="InputChange"
                    ></x-input>
                  </div>
                </div>

                <div class="signUpInputs borBm padlr">
                  <div class="signUpLabel fl">邮箱地址</div>
                  <div class="signUpInput fr">
                    <x-input
                      name="email"
                      placeholder="你的常用邮箱"
                      is-type="email"
                      v-model="newForm.email"
                    ></x-input>
                  </div>
                </div>

                <div class="signUpInputs padlr">
                  <div class="signUpLabel fl">公司名称</div>
                  <div class="signUpInput fr">
                    <x-input placeholder="所在单位全称" v-model="newForm.company"></x-input>
                  </div>
                </div>

                <div class="signUpInputs borBm padlr">
                  <div class="signUpLabel fl">职位</div>
                  <div class="signUpInput fr">
                    <x-input placeholder="你的职位" v-model="newForm.position"></x-input>
                  </div>
                </div>
              </div>
              <!-- v-if="signUpBtn" -->
              <div class="signUpInputBtn" v-if="!signUpBtn">确定</div>

              <div class="signUpInputBtn signUpSe" v-if="signUpBtn" @click="newFormSubmit">确定</div>
            </div>

            <div class="footer" v-if="!addNewshow">
              <flexbox :gutter="0" class="footer-nav-box">
                <flexbox-item :span="1/5" :order="1">
                  <div class="footer-nav-price" @click="AllSelected">全选</div>
                </flexbox-item>
                <flexbox-item :span="4/5" :order="2">
                  <!-- <router-link tag="div" class="footer-nav-destineBtn" to="/ticket">下一步</router-link> -->
                  <div class="footer-nav-destineBtn" @click="ContactAddChange">确认</div>
                  <!-- <div v-if="!signUpBtn" class="footer-nav-destineBtn bgDC">提交订单</div> -->
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </popup>
      </div>

      <div class="der"></div>
    </div>

    <div class="footer" v-if="!show2">
      <flexbox :gutter="0" class="footer-nav-box">
        <flexbox-item :span="3/5" :order="1">
          <div
            class="footer-nav-price"
          >{{TicketData.price!=0?'合计:¥'+TicketData.price*ContactData.length:'免费'}}</div>
        </flexbox-item>
        <flexbox-item :span="2/5" :order="2">
          <!-- <router-link tag="div" class="footer-nav-destineBtn" to="/ticket">下一步</router-link> -->
          <div class="footer-nav-destineBtn" @click="next">立即报名</div>
          <!-- <div v-if="!signUpBtn" class="footer-nav-destineBtn bgDC">提交订单</div> -->
        </flexbox-item>
      </flexbox>
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
import axios from "axios";
import {
  getStorage,
  checkToken,
  getDataInfo,
  isLogin,
  transDate,
  getCookie
} from "../../assets/lib/myStorage.js";
import {
  Flexbox,
  FlexboxItem,
  Sticky,
  XInput,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Toast,
  TransferDomDirective as TransferDom,
  Loading,
  Cell,
  Group,
  Popup,
  Checker,
  CheckerItem
} from "vux";
export default {
  name: "Ticket",
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    Sticky,
    XInput,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Toast,
    Loading,
    Cell,
    Group,
    Popup,
    Checker,
    CheckerItem
  },
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),

      ticketValue: "",
      signUpBtn: false,

      meetingData: {},
      TicketData: {},
      ContactData: [],

      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      show2: true,
      showContent004: false,
      showInput: false,
      addNewshow: false,
      ContactVal: null,
      ContactList: [],
      newForm: {
        name: "",
        mobile: "",
        email: "",
        company: "",
        position: ""
      }
    };
  },
  methods: {
    closeShowInput() {
      if (this.addNewshow) {
        this.addNewshow = false;
      } else {
        this.showInput = false;
        // this.ContactVal = this.ContactData
      }
    },
    //新添加表单提交
    newFormSubmit() {
      // let obj =this.newForm
      let obj = this.newForm;
      obj.mdId = this.$route.query.meeting_id;
      obj.ticketId = this.$route.query.tickId;
      obj.user = getStorage("userToken").userId;

      let orderObj = {
        Obj: [obj]
      };

      checkToken().then(Pdata => {
        getDataInfo(
          "post2",
          "ordermeeting/ordermeeting/history",
          orderObj
        ).then(res => {
          if (res.data.code == 200) {
            this.toastInfo = {
              showMsg: res.data.msg,
              showPositionValue: true,
              toastType: "text"
            };
            this.addNewshow = false;
          }
        });
      });
    },
    //添加按钮添加新的联系人
    addNewContact() {
      this.newForm = {
        name: "",
        mobile: "",
        email: "",
        company: "",
        position: ""
      };
      this.addNewshow = true;
    },
    //点击全选
    AllSelected() {
      this.ContactVal = [...this.ContactList];
    },
    //确认后把选择的报名人给选票列表
    ContactAddChange() {
      this.showInput = false;
      this.ContactData = this.ContactVal;
    },
    //点击编辑当前报名人的信息
    ContactListEdit(item) {
      this.addNewshow = true;
      this.newForm = item;
      // console.log(item);
    },
    change(val, label) {
      // console.log("change", val, label);
    },
    //价格不为0的时候添加或者编辑联系人
    AddContact() {
      // console.log("添加联系人");
      this.showInput = true;
      // this.ContactVal = []
      // this.ContactData.push( {
      //   name:'付海楠',
      //   mobile:'13051376806',
      // })
    },
    //删除某个联系人
    deleteContact(index, itme) {
      if (this.TicketData.type == 0) {
        this.toastInfo = {
          showMsg: "当前用户不可删除",
          showPositionValue: true,
          toastType: "text"
        };
      } else {
        this.ContactData.splice(index, 1);
      }
    },
    getTicketData() {
      let _that = this;
      //获取订单里的会议信息
      let detailObj = {
        params: {
          id: this.$route.query.meeting_id,
          userId: getStorage("userToken").userId
        }
      };
      getDataInfo("get", "meetingdetails/meetingDetailsById", detailObj).then(
        res => {
          if (res.data.code == 200) {
            this.meetingData = res.data.data.draftsVo.meetingDetails;
          }
        }
      );
      //获取当前票种信息
      let tickObj = {
        params: {
          tickId: this.$route.query.tickId
        }
      };

      checkToken().then(Pdata => {
        getDataInfo("get", "myMeeting/getMeTicketById", tickObj).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.TicketData = res.data.data;
            if (res.data.data.price == 0) {
              //如果当前是免费票请求接口获取当前用户的手机号
              let userObj = {
                params: {
                  id: getStorage("userToken").userId
                }
              };

              checkToken().then(Pdata => {
                getDataInfo("get", "user/userById", userObj).then(res => {
                  // console.log(res);
                  if (res.data.code == 200) {
                    this.ContactData.push(res.data.data);
                    this.show2 = false;
                  } else if (res.data.code == 400 || res.data.code == 100101) {
                    setTimeout(function() {
                      _that.$router.push("/login");
                    }, 500);
                  }
                });
              });
            } else {
              this.show2 = false;
            }
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/login");
            }, 500);
          }
        });
      });
      // this.TicketData = this.$route.query;
      // console.log(this.$route.query.meeting_id,this.$route.query)
    },
    next() {
      if (this.ContactData.length == 0) {
        this.toastInfo = {
          showMsg: "请添加报名人",
          showPositionValue: true,
          toastType: "text"
        };
      } else {
        let orderObj = {
          Obj: {
            createPerson: getStorage("userToken").userId,
            mdId: this.$route.query.meeting_id,
            orderMeetingPersonList: [],
            ticketId: this.$route.query.tickId
          }
        };

        this.ContactData.forEach(e => {
          orderObj.Obj.orderMeetingPersonList.push({
            mobile: e.mobile,
            name: e.name,
            company: e.company,
            email: e.email,
            position: e.position,
            isSao: 0,
            payMoney: this.TicketData.price
          });
        });

        // console.log(orderObj);

        // let orderObj = {
        //         Obj: [obj]
        //       };

        checkToken().then(Pdata => {
          getDataInfo("post2", "ordermeeting/ordermeeting", orderObj).then(
            res => {
              // console.log(res);
              if (res.data.code == 200) {
                if (this.TicketData.price == 0) {
                  let priceObj = {
                    orderId: res.data.data
                  };
                  checkToken().then(Pdata => {
                    getDataInfo(
                      "patch",
                      "ordermeeting/ordermeeting/pay/free",
                      priceObj
                    ).then(resq => {
                      if (resq.data.code == 200) {
                        //          this.toastInfo = {
                        //   showMsg: resq.data.msg,
                        //   showPositionValue: true,
                        //   toastType: "text"
                        // };
                        this.$router.push({
                          path: "/MeetingSuccess",
                          query: {
                            meeting_id: this.$route.query.meeting_id,
                            orderId: res.data.data
                          }
                        });
                        // console.log(resq);
                      }
                    });
                  });
                } else {
                  // console.log("收费票创建订单成功下面走支付");
                }
              } else if (res.data.code == 1002) {
                this.toastInfo = {
                  showMsg: "已购买过此票",
                  showPositionValue: true,
                  toastType: "text"
                };
              }
            }
          );
        });

        // checkToken().then(Pdata => {
        //   getDataInfo("post", "ordermeeting/ordermeeting", orderObj).then(
        //     res => {
        //       console.log(res);
        //       // if (res.data.code == 200) {
        //       //   this.ContactData.push(res.data.data);
        //       //    this.show2 = false
        //       // } else if (res.data.code == 400 || res.data.code == 100101) {
        //       //   setTimeout(function() {
        //       //     _that.$router.push("/login");
        //       //   }, 500);
        //       // }
        //     }
        //   );
        // });

        // console.log(
        //   "先调用创建订单（返回订单ID）接口，再调用针对免费票种的订单支付接口"
        // );
        // console.log(
        //   "会议ID：" +
        //     this.$route.query.meeting_id +
        //     ",当前的价格是:" +
        //     this.$route.query.price
        // );
      }
    },

    // 姓名和手机号输入框输入事件监听
    InputChange(ev) {
      if (this.newForm.name.length != 0 && this.newForm.mobile.length != 0) {
        if (
          this.$refs.username.valid == true &&
          this.$refs.mobile.valid == true
        ) {
          this.signUpBtn = true;
        }
      } else {
        this.signUpBtn = false;
      }
    },
    //获取当前用户的会议参会人
    getOrderHistory() {
      let _that = this;
      let historyObj = {
        params: {
          userId: getStorage("userToken").userId
        }
      };

      checkToken().then(Pdata => {
        getDataInfo(
          "get",
          "ordermeeting/ordermeeting/history",
          historyObj
        ).then(res => {
          if (res.data.code == 200) {
            this.ContactList = res.data.data;
          } else if (res.data.code == 400 || res.data.code == 100101) {
            this.$router.push("/login");
          }
        });
      });
    }
  },
  watch: {
    showInput(n, o) {
      if (n) {
        this.getOrderHistory();
      }
    },
    addNewshow(n, o) {
      if (!n) {
        this.getOrderHistory();
      }
      // console.log(n,o)
    }
  },
  mounted() {
    this.getTicketData();
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.router-link-active {
  color: #fff;
}
.ticket-Box {
  background: rgba(245, 245, 245, 1);
  height: 100vh;
}
.ticket-contentBox {
  background: #fff;
  margin-top: 8px;
  padding-top: 10px;
}

.sub-item {
  color: #888;
}
.slide {
  overflow: hidden;
  // height: 30px;
  padding: 0 20px;
  overflow: hidden;
  // max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.vux-popup-dialog {
  z-index: 1000 !important;
}

.weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
  color: #fe666b !important;
}

.ContactListcheckbox {
  position: relative;
  .ContactListItem-edit {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    height: 100%;
    width: 60px;
    text-align: center;
    font-size: 0.8rem;
    color: #fe666b;
    // background: #000;
  }
}
.getContactListBox {
  padding: 0.8rem;
  background: #fff;
  .vux-checker-item {
    display: block !important;
  }
  .ContactListItemBox {
    border-bottom: 1px solid #e6e6e6;
    overflow: hidden;
    padding: 0.8rem 0;
    .ContactListItem-selected {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 1px solid #dcdcdc;
      margin: 0.6rem 0.6rem 0.6rem 0;
      color: #fff;
      text-align: center;
      line-height: 20px;
    }

    .checkCompanyInfo {
      font-size: 0.8rem;
      color: #a0a0a0;
      width: 100%;
    }
    .ContactListItem-name {
      width: 80%;
    }
    .ContactListItemTitleBox {
      overflow: hidden;
      span {
        display: block;
        width: 40%;
        float: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
    }
  }

  .demo1-item {
    // border: 1px solid #ececec;
    // padding: 5px 15px;
  }
  .demo1-item-selected {
    // border: 1px solid green;
    .ContactListItem-selected {
      border: 1px solid #ff596b;
      background: #ff596b;
    }
  }
}
</style>


