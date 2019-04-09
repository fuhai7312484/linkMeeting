<template>
  <div class="box">
    <!-- {{myData}} -->
    <div>
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">绑定账号</h3>
          </div>
        </sticky>
      </div>
      <!-- {{myData}} -->
      <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>
      <div v-if="!show2" style="margin-top:1rem;">
        <group class="my-myInfoBox">
          <!-- <cell :title="$t('Money')" @click.native="sexSelect" :is-loading="!money" :value="money"></cell> -->
          <cell
            title="手机号"
            :value="myData.mobile==null?'未绑定':myData.mobile"
            @click.native="myInputChange('mobile')"
            is-link
          ></cell>

          <!-- <cell
            title="微信"
            :value="myData.userDetail==null?'未绑定':myData.userDetail.wxOpenid==null?'未绑定':'解绑'"
            @click.native="myInputChange('wxOpen')"
            is-link
          ></cell>
          <cell
            title="QQ"
            :value="myData.userDetail==null?'未绑定':myData.userDetail.qqOpenid==null?'未绑定':'解绑'"
            @click.native="myInputChange('qqOpen')"
            is-link
          ></cell> -->
        </group>

        <!-- <actionsheet v-model="sexSelect" 
        :menus="sexMenus" @on-click-menu="sexClick"
        show-cancel></actionsheet>-->
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showInput" height="100%">
        <div class="my-inputsBox">
          <!-- <div @click="show11=false">关闭1111111111111111</div> -->
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="goToback"></div>
            <h3 class="map-headerTitle">{{inputTypeTitle(inputType)}}</h3>
            <!-- <div class="my-saveBtn fr" @click="submitInputForm">
            保存
            </div>-->
          </div>

          <div v-if="inputType=='mobile'">
            <!-- <x-input :placeholder="myData.name==null?'请填写名字':myData.name" v-model="inputValue" ></x-input> -->
            <div v-if="step==1">
              <div class="bind-mobile-step1 padlr">
                <div class="bind-mobile-title fl">当前手机号</div>
                <div class="bind-mobile-oldMob fr">{{myData.mobile}}</div>
              </div>

              <div class="bind-mobile-step1 padlr">
                <div class="bind-mobile-title fl">
                  <x-input
                    placeholder="请输入短信验证码"
                    ref="refcode"
                    type="text"
                    :is-type="codeValuefun"
                    :min="6"
                    :max="6"
                    width="30%"
                    v-model="OldCodeVal"
                    @on-change="oldCodeChange"
                  ></x-input>
                </div>
                <div
                  v-if="Resend"
                  class="bind-mobile-oldMob bind-col borL1 fr"
                  @click="ReacquireCode('old')"
                >{{ResendTitle}}</div>
                <div class="bind-mobile-oldMob bind-col borL1 fr" v-if="!Resend">{{time+'s重新获取'}}</div>
              </div>
            </div>

            <div v-else-if="step==2">
              <div class="bind-mobile-step1 padlr">
                <x-input
                  placeholder="请输入新的手机号"
                  mask="99999999999"
                  ref="newMobile"
                  v-model="newMobile"
                  :max="11"
                  is-type="china-mobile"
                ></x-input>
              </div>

              <div class="bind-mobile-step1 padlr">
                <div class="bind-mobile-title fl">
                  <x-input
                    placeholder="请输入短信验证码"
                    ref="refcode"
                    type="text"
                    :is-type="codeValuefun"
                    :min="6"
                    :max="6"
                    width="30%"
                    v-model="newCodeVal"
                    @on-change="oldCodeChange"
                  ></x-input>
                </div>
                <div
                  v-if="Resend"
                  class="bind-mobile-oldMob bind-col borL1 fr"
                  @click="ReacquireCode"
                >{{ResendTitle}}</div>
                <div class="bind-mobile-oldMob bind-col borL1 fr" v-if="!Resend">{{time+'s重新获取'}}</div>
              </div>
            </div>
            <div v-else-if="step==3">
              <div class="bind-mobile-successBox">
                <div class="bind-mobile-success">
                  <p>
                    <img :src="require('../../assets/images/bind-mobile-success.png')">
                  </p>
                  <p>更换成功</p>
                </div>
                <p>您可通过
                  <span>{{disMobile}}</span> 登录当前链会议账号
                </p>
              </div>
            </div>

            <div v-else-if="step==4">
              <div class="bind-mobile-successBox">
                <div class="bind-mobile-success">
                  <p>
                    <img :src="require('../../assets/images/bind-mobile-failure.png')">
                  </p>
                  <p>更换失败</p>
                </div>
                <p>请检查您的网络是否正常,然后点击重新更换。</p>
              </div>
            </div>

            <div class="bind-mobile-btnBox">
              <div
                v-if="showBtn"
                class="bind-mobile-btn showBtnBg"
                @click="submitInputForm"
              >{{step==1?'更换手机号':step==2?'立即绑定':step==3?'确定':'重新绑定'}}</div>

              <div
                v-if="!showBtn"
                class="bind-mobile-btn"
              >{{step==1?'更换手机号':step==2?'立即绑定':step==3?'确定':'重新绑定'}}</div>
            </div>
          </div>
          <div v-if="inputType=='technical'">
            <!-- <x-input :placeholder="myData.technical==null?'请填写职位':myData.technical" v-model="inputValue" ></x-input> -->
          </div>
          <div v-if="inputType=='company'">
            <!-- <x-input :placeholder="myData.company==null?'请填写公司名称':myData.company" v-model="inputValue" ></x-input> -->
          </div>
        </div>
      </popup>
    </div>

     <div v-transfer-dom class="AlertShow-weui-dialog">
      <alert v-model="AlertShow" :title="'提示'" button-text="我知道了" @on-show="onShow" @on-hide="onHide">该手机号已成为其他链会议账号的登录手机号,请更换其他手机号进行绑定</alert>
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
import {
  getDataInfo,
  setCookie,
  getStorage,
  getCookie,
  checkToken
} from "../../assets/lib/myStorage.js";
import {
  Group,
  Cell,
  Loading,
  Sticky,
  Actionsheet,
  TransferDomDirective as TransferDom,
  Toast,
  Popup,
  Alert,
  XInput
} from "vux";

// import axios from "axios";
export default {
  name: "BingAccount",
  data() {
    return {
      disabled:
        typeof navigator !== "undefined" &&
        /iphone/i.test(navigator.userAgent) &&
        /ucbrowser/i.test(navigator.userAgent),
      myData: {},
      isRefreshing: true,
      show2: true,
      text1: "Processing",
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      AlertShow:false,
      showInput: false,
      inputType: "",
      inputValue: "",
      step: 1,
      OldCodeVal: "",
      OldCode: "",
      newMobile: "",
      disMobile: "",
      newCodeVal: "",
      newCode: "",
      dx_djs: null,
      time: 60,
      Resend: true,
      ResendTitle: "获取验证码",
      showBtn: false,

      codeValuefun: function(value) {
        let regExp = /^\d{6}\b/;
        let r = value.match(regExp);
        return {
          valid: r != null,
          msg: "验证码不正确!"
        };
      }
    };
  },
  directives: {
    TransferDom
  },
  components: {
    Loading,
    Group,
    Cell,
    Sticky,
    Actionsheet,
    Toast,
    Popup,
    XInput,Alert
  },
  methods: {
     onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    goToback() {
      this.showInput = false;
      this.step = 1;
      this.clearCodeTime();
    },

    //清除验证码数秒
    clearCodeTime() {
      clearInterval(this.dx_djs);
      this.Resend = true;
      this.time = 60;
    },
    getMyData() {
      let _that = this;
      let token = getCookie("accessToken");
      let userObj = {
        params: {
          id: getStorage("userToken").userId
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "user/userById", userObj).then(res => {
          if (res.data.code == 200) {
            this.myData = res.data.data;
            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/login");
            }, 500);
          }
        });
      });
    },
    oldCodeChange(val) {
      if (this.step === 1) {
        if (val == this.OldCode && val != "") {
          this.showBtn = true;
        } else {
          if (val.length == 6) {
            this.toastInfo = {
              showMsg: "验证码输入不正确",
              showPositionValue: true,
              toastType: "text"
            };
          }
          this.showBtn = false;
        }
      } else if (this.step === 2) {
        if (
          this.newMobile != "" &&
          this.$refs.newMobile.valid &&
          val == this.newCode &&
          val != ""
        ) {
          this.showBtn = true;
        } else {
          this.showBtn = false;
        }
      }
    },
    //发送验证码
    ReacquireCode() {
      let _that = this;
      //   this.Resend = false;
      //这里单独请求获取验证码接口
      //   this.Reacquire();

      let SmsObj = {};
      if (this.step === 1) {
        SmsObj.mobile = this.myData.mobile;
        SmsObj.type = "changePassword";
        getDataInfo("post", "user/sendSms", SmsObj).then(res => {
          let data = res.data;
          if (data.code === 200) {
            alert(data.data)
            // console.log(data.data);
            _that.OldCode = data.data;
            _that.Resend = false;
            _that.Reacquire();
          } else if (data.code === 400) {
            this.toastInfo = {
              showMsg: data.msg,
              showPositionValue: true,
              toastType: "text"
            };
          }
        });
      } else if (this.step === 2) {
        if (this.newMobile != "" && this.$refs.newMobile.valid) {
          if (this.newMobile == this.myData.mobile) {
            this.toastInfo = {
              showMsg: "此手机号已绑定",
              showPositionValue: true,
              toastType: "text"
            };
          } else {
            SmsObj.mobile = this.newMobile;
            SmsObj.type = "changeMobile";
            getDataInfo("post", "user/sendSms", SmsObj).then(res => {
              let data = res.data;
              if (data.code === 200) {
                alert(data.data)
                // console.log(data.data);
                _that.newCode = data.data;
                _that.Resend = false;
                _that.Reacquire();
              } else if (data.code === 400) {
                this.AlertShow = true;
                // this.toastInfo = {
                //   showMsg: "手机已绑定其他账号",
                //   showPositionValue: true,
                //   toastType: "text"
                // };



                
              }
            });
          }
        } else {
          this.toastInfo = {
            showMsg: "请正确填写手机号！",
            showPositionValue: true,
            toastType: "text"
          };
        }
      }
    },

    //验证码倒数
    Reacquire() {
      let _that = this;
      this.dx_djs = setInterval(() => {
        if (_that.time-- <= 0) {
          _that.time = 60;
          _that.Resend = true;
          _that.ResendTitle = "重新获取验证码";
          clearInterval(_that.dx_djs);
        }
      }, 1000);
    },
    //修改名称、职位、公司
    myInputChange(type) {
      this.showInput = true;
      this.inputType = type;
    },
    inputTypeTitle(title) {
      switch (title) {
        case "mobile":
          return "更换手机号";
          break;
        case "technical":
          return "职位";
          break;
        case "company":
          return "公司";
          break;
      }
    },
    //提交要修改的Input内容
    submitInputForm() {
      if (this.step === 1) {
        let oldmObj = {
          mobileOld: this.myData.mobile,
          mobileCodeOld: this.OldCode
        };
        checkToken().then(Pdata => {
          getDataInfo("patch", "user/userMobile/old", oldmObj).then(res => {
            if (res.data.code == 200) {
              this.step = 2;
              this.OldCodeVal = this.newMobile = this.newCodeVal = "";
              this.clearCodeTime();
            }
          });
        });
      } else if (this.step === 2) {
        let newmObj = {
          mobile: this.newMobile,
          mobileCode: this.newCode,
          userId: this.myData.id
        };

        checkToken().then(Pdata => {
          getDataInfo("patch", "user/userMobile", newmObj).then(res => {
            if (res.data.code == 200) {
              this.disMobile = this.newMobile
              this.step = 3;
              this.OldCodeVal = this.newMobile = this.newCodeVal = "";
              this.clearCodeTime();
            }
          });
        });
      } else if (this.step === 3) {
        this.goToback();
        this.getMyData();
      } else if (this.step === 4) {
        this.step = 1;
        this.clearCodeTime();
      }
    }
  },

  mounted() {
    this.getMyData();
  }
};
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.my-myInfoBox {
  .weui-cells {
    margin-top: 0;
  }
  .weui-cells::before {
    border: none;
  }
  .weui-cells::after {
    border: none;
  }
  .weui-cell {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgb(241, 241, 241);
  }
  .weui-cell::before {
    border: none;
  }
  .weui-cell::after {
    // border: 1px solid #000;
  }
  .vux-cell-primary {
    font-size: 1rem;
    font-weight: bold;
    color: #505050;
  }
  .weui-cell__ft {
    font-size: 0.9rem;
    color: #000;
  }
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
}
.vux-popup-dialog {
  background: #fff !important;
}
.my-inputsBox{
  .weui-cell{
    border: none;
  }
}
</style>


