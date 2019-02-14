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
{{myData}}
      <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>
      <div v-if="!show2" style="margin-top:1rem;">
       
        <group class="my-myInfoBox">
          <!-- <cell :title="$t('Money')" @click.native="sexSelect" :is-loading="!money" :value="money"></cell> -->
          <cell title="手机号" :value="myData.mobile==null?'未绑定':myData.mobile" 
          @click.native="myInputChange('mobile')"
           is-link></cell>

          <cell
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
          ></cell>
        </group>
    
        <actionsheet v-model="sexSelect" :menus="sexMenus" @on-click-menu="sexClick" show-cancel></actionsheet>

      </div>
    </div>
<div v-transfer-dom>
      <popup v-model="showInput" height="100%">
        <div class="my-inputsBox">
          <!-- <div @click="show11=false">关闭1111111111111111</div> -->

      
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="showInput=false"></div>
            <h3 class="map-headerTitle">{{inputTypeTitle(inputType)}}</h3>
            <div class="my-saveBtn fr" @click="submitInputForm">
            保存
          </div>
          </div>
     
          <div v-if="inputType=='mobile'">
              <x-input :placeholder="myData.name==null?'请填写名字':myData.name" v-model="inputValue" ></x-input>

          </div>
           <div v-if="inputType=='technical'">
              <x-input :placeholder="myData.technical==null?'请填写职位':myData.technical" v-model="inputValue" ></x-input>

          </div>
           <div v-if="inputType=='company'">
              <x-input :placeholder="myData.company==null?'请填写公司名称':myData.company" v-model="inputValue" ></x-input>

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
      sexSelect: false,
      sexMenus: {
        man: "男",
        woman: "女"
      },
      showMsg: "",
      showPositionValue: false,
      showInput: false,
      inputType:'',
      inputValue:'',
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
    myInputChange(type){
      this.showInput = true;
      this.inputType = type;
    },
    inputTypeTitle(title){
      switch(title){
        case 'mobile':
        return '更换手机号';
        break;
        case 'technical':
        return '职位';
        break;
        case 'company':
        return '公司'
        break;
      }
    },
    //提交要修改的Input内容
    submitInputForm(){
      // console.log(this.inputType,this.inputValue)
      if(this.inputValue!=''){

        // console.log('不是空的')
        //  this.inputType 
        let inputObj = {
          id: getStorage("userToken").userId,
        }
        inputObj[this.inputType] = this.inputValue
        console.log(inputObj)
          

          checkToken().then(Pdata => {
          getDataInfo("patch", "user/userByCondition", inputObj).then(res => {
            if (res.data.code == 200) {
           this.myData[this.inputType] = this.inputValue;
              this.showPositionValue = true;
              this.showMsg = res.data.msg;
              this.inputValue = this.inputType = ''
            }
          });
        });



      }
      this.showInput = false;
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
.position-horizontal-demo{
  position: relative;
   height: 100%;
}
.vux-popup-dialog{
  background: #fff !important;
}

</style>


