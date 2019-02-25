<template>
  <div class="box">
    <!-- {{myData}} -->
    <div>
      <div style="height:44px;">
        <sticky ref="sticky" :check-sticky-support="false" :disabled="disabled">
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="$router.go(-1)"></div>
            <h3 class="map-headerTitle">基本信息</h3>
          </div>
        </sticky>
      </div>

      <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>
      <div v-if="!show2" style="margin-top:1rem;">
        <group class="my-myInfoBox">
          <cell title="头像" is-link>
            <img slot width="30" style="border-radius:50%" :src="myData.mainPic">
          </cell>
        </group>
        <group class="my-myInfoBox">
          <!-- <cell :title="$t('Money')" @click.native="sexSelect" :is-loading="!money" :value="money"></cell> -->
          <cell
            title="名字"
            :value="myData.name==null?'未填写':myData.name"
            @click.native="myInputChange('name')"
            is-link
          ></cell>

          <cell
            title="性别"
            :value="myData.sex==0?'女':myData.sex==1?'男':'未选择'"
            @click.native="sexShowChange"
            is-link
          ></cell>
        </group>
        <group class="my-myInfoBox">
          <cell
            title="职位"
            :value="myData.technical==null?'未填写':myData.technical"
            is-link
            @click.native="myInputChange('technical')"
          ></cell>
          <cell
            title="公司"
            :value="myData.company==null?'未填写':myData.company"
            @click.native="myInputChange('company')"
            is-link
          ></cell>
        </group>
        <actionsheet v-model="sexSelect" :menus="sexMenus" @on-click-menu="sexClick" show-cancel></actionsheet>

        <!-- 头像 <img :src="myData.mainPic" /> <br/>
  名字：{{myData.name}}<br/>
  性别：{{myData.sex}}<br/>
  职位：{{myData.technical}}<br/>
        公司：{{myData.company}}<br/>-->
        <!-- {{myData}} -->
        <!-- {{myData}} -->
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="showInput" height="100%">
        <div class="my-inputsBox">
          <!-- <div @click="show11=false">关闭1111111111111111</div> -->
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="showInput=false"></div>
            <h3 class="map-headerTitle">{{inputTypeTitle(inputType)}}</h3>
            <div class="my-saveBtn fr" @click="submitInputForm">保存</div>
          </div>

          <div v-if="inputType=='name'">
            <x-input :placeholder="myData.name==null?'请填写名字':myData.name" v-model="inputValue"></x-input>
          </div>
          <div v-if="inputType=='technical'">
            <x-input
              :placeholder="myData.technical==null?'请填写职位':myData.technical"
              v-model="inputValue"
            ></x-input>
          </div>
          <div v-if="inputType=='company'">
            <x-input
              :placeholder="myData.company==null?'请填写公司名称':myData.company"
              v-model="inputValue"
            ></x-input>
          </div>
        </div>
      </popup>
    </div>

    <toast
      v-model="showPositionValue"
      width="10em"
      position="middle"
      :time="1500"
      is-show-mask
    >{{showMsg}}</toast>
  </div>
</template>
<script>
import {
  getDataInfo,
  setCookie,
  getStorage,
  getCookie,
  checkToken,
  JIMinitchange,
  JIMlogin
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
  XInput
} from "vux";

// import axios from "axios";
export default {
  name: "MyInfo",
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
      sexSelect: false,
      sexMenus: {
        man: "男",
        woman: "女"
      },
      showMsg: "",
      showPositionValue: false,
      showInput: false,
      inputType: "",
      inputValue: ""
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
    XInput
  },
  methods: {
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
    sexShowChange() {
      this.sexSelect = true;
    },
    //修改性别
    sexClick(sex) {
      if (sex != "cancel") {
        let sexObj = {
          id: getStorage("userToken").userId,
          sex: sex == "man" ? "1" : "0"
        };
        checkToken().then(Pdata => {
          getDataInfo("patch", "user/userByCondition", sexObj).then(res => {
            if (res.data.code == 200) {
              this.myData.sex = sex == "man" ? "1" : "0";
              this.showPositionValue = true;
              this.showMsg = res.data.msg;
            }
          });
        });
      }
    },
    //修改名称、职位、公司
    myInputChange(type) {
      this.showInput = true;
      this.inputType = type;
    },
    inputTypeTitle(title) {
      switch (title) {
        case "name":
          return "名字";
          break;
        case "technical":
          return "职位";
          break;
        case "company":
          return "公司";
          break;
      }
    },
    //登录IM

    //更新IM消息个人资料
    updateSelfInfo() {
      let _that = this;
      let Obj = {};
      if (this.inputType == "name") {
        Obj.nickname = this.inputValue;
      }
      let userId = getStorage("userToken").userId;
      JIM.login({
        username: userId,
        password: userId
      }).onSuccess(function(data) {
        JIM.updateSelfInfo(Obj)
          .onSuccess(function(data) {
            console.log(data);
            if (data.code == 0) {
              _that.showPositionValue = true;
              _that.showMsg = "名称更新成功！";
              _that.inputValue = _that.inputType = "";
                _that.showInput = false;
              //data.code 返回码
              //data.message 描述
            }
          })
          .onFail(function(data) {
            //同上
          });
      });
    },

    //提交要修改的Input内容
    submitInputForm() {
  
      if (this.inputValue != "") {
        let inputObj = {
          id: getStorage("userToken").userId
        };
        inputObj[this.inputType] = this.inputValue;
  
        checkToken().then(Pdata => {
          getDataInfo("patch", "user/userByCondition", inputObj).then(res => {
            if (res.data.code == 200) {
         
              this.myData[this.inputType] = this.inputValue;
              if (this.inputType == "name") {
                JIMinitchange(this.updateSelfInfo);
              } else {
                this.showPositionValue = true;
                this.showMsg = res.data.msg;
                this.inputValue = this.inputType = "";
                this.showInput = false;
                
              }
            }
          });
        });
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
    color: #c8c8c8;
  }
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
}
.vux-popup-dialog {
  background: #fff !important;
}
</style>


