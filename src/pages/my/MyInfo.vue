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
            <img slot width="30" height="30" style="border-radius:50%" :src="myData.mainPic">
          </cell>
        </group>
        <group class="my-myInfoBox">
          <!-- <cell :title="$t('Money')" @click.native="sexSelect" :is-loading="!money" :value="money"></cell> -->
          <cell
            title=""
            :value="myData.name==null || myData.name==''?'未填写':myData.name"
            @click.native="myInputChange('name')"
            is-link
          >
          <div slot="title" class="myInfo-slot">
昵称<span>(或名字)</span>
          </div>
          </cell>

          <cell
            title="性别"
            :value="myData.sex==0?'女':myData.sex==1?'男':'未选择'"
            @click.native="sexShowChange"
            is-link
          ></cell>
        </group>
        <group class="my-myInfoBox">
          <cell
            :value="myData.technical==null||myData.technical==''?'未填写':myData.technical"
            is-link
            @click.native="myInputChange('technical')"
          >
          
          <div slot="title" class="myInfo-slot">
头衔<span>(或职位职称)</span>
          </div>

          </cell>
          <cell
            title="公司"
            :value="myData.company==null || myData.company=='' ?'未填写':myData.company"
            @click.native="myInputChange('company')"
            is-link
          ></cell>

          <cell
            title="手机号">
            <div slot class="myInfo-slot-val">{{myData.mobile}} </div>
            </cell>

             <cell
            title="邮箱"
            :value="myData.email==null || myData.email=='' ?'未填写':myData.email"
            @click.native="myInputChange('email')"
            is-link
          ></cell>


        </group>

        
<load-more :show-loading="false" :tip="'我的名片'" background-color="#505050"></load-more>
<div class="my-carte">
<img :src="require('../../assets/images/my-carte.png')">
</div>



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
    <div v-transfer-dom class="My-info-PopupBox">
      <popup v-model="showInput" height="100%">
        <div class="my-inputsBox">
          <!-- <div @click="show11=false">关闭1111111111111111</div> -->
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="showInput=false"></div>
            <h3 class="map-headerTitle">{{inputTypeTitle(inputType)}}</h3>
            <div class="my-saveBtn fr" @click="submitInputForm">保存</div>
          </div>

          <div v-if="inputType=='name'" class="my-infoNamefocus" @click="Namefocus" >
          
            <x-input
              :placeholder="myData.name==null || myData.name=='' ?'请填写名字':myData.name"
              v-model="myData.name" ref="nameF"
            ></x-input>
          </div>
          <div v-if="inputType=='technical'" class="my-infoNamefocus" @click="Namefocus" >
            <x-input
            ref="techF"
              :placeholder="myData.technical==null || myData.technical=='' ?'请填写职位':myData.technical"
              v-model="myData.technical"
            ></x-input>
          </div>
          <div v-if="inputType=='company'"  class="my-infoNamefocus" @click="Namefocus" >
            <x-input
            ref="compF"
              :placeholder="myData.company==null || myData.company==''?'请填写公司名称':myData.company"
              v-model="myData.company"
            ></x-input>
          </div>



          <div v-if="inputType=='email'"  class="my-infoNamefocus" @click="Namefocus" >
            <x-input
            ref="emailF"
              :placeholder="myData.email==null || myData.email==''?'请填写邮箱':myData.email"
              v-model="myData.email"
            ></x-input>
          </div>



        </div>
      </popup>
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
  TransferDomDirective as TransferDom,LoadMore ,
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
       imageUrl: '',
      isRefreshing: true,
      show2: true,
      text1: "Processing",
      sexSelect: false,
      sexMenus: {
        man: "男",
        woman: "女"
      },
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },

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
    XInput,LoadMore 
  },
  methods: {
  

    //null
Namefocus(){
  // console.log(this.inputType)
  if(this.inputType=='name'){
    this.$refs.nameF.focus()
  }else if(this.inputType=='technical'){
     this.$refs.techF.focus()
  }else if(this.inputType=='company'){
     this.$refs.compF.focus()
  }else if(this.inputType=='email'){
     this.$refs.emailF.focus()
  }
  // this.$refs.nameF.focus()
// console.log(this.$refs.nameF.focus)
},
    fileChange(ev){
      // console.log(ev)
    },
    getNull(val) {
      if (val == null) {
        return "";
      } else {
        return val;
      }
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
          // console.log(res)
          if (res.data.code == 200) {
            res.data.data.company == null? (res.data.data.company = ""): res.data.data.company;
            res.data.data.name == null? (res.data.data.name = ""): res.data.data.name;
            res.data.data.technical == null? (res.data.data.technical = ""): res.data.data.technical;
            res.data.data.email == null?(res.data.data.email =""): res.data.data.email;
            this.myData = res.data.data;
            setTimeout(function() {
              _that.show2 = false;
            }, 500);
          } else if (res.data.code == 400 || res.data.code == 100101) {
            setTimeout(function() {
              _that.$router.push("/codelogin");
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
              this.toastInfo = {
                showMsg: res.data.msg,
                showPositionValue: true,
                toastType: "success"
              };
            }
          });
        });
      }
    },
    //修改名称、职位、公司、邮箱
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
         case "email":
           return "邮箱";
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
            // console.log(data);
            if (data.code == 0) {
              _that.toastInfo = {
                showMsg: "名称更新成功！",
                showPositionValue: true,
                toastType: "success"
              };
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
      // console.log(this.inputType,this.myData.name)

      let val =
        this.inputType == "name"
          ? this.myData.name
          : this.inputType == "technical"
          ? this.myData.technical
          : this.inputType == "company"? this.myData.company: this.inputType == "email"?this.myData.email:"";
          var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");

          // console.log(reg.test(val))
      // console.log(val)
      if (val != "") {
        if(this.inputType=="email"){
          if(!reg.test(val)){
             this.toastInfo = {
          showMsg: "请填写正确的邮箱",
          showPositionValue: true,
          toastType: "text"
        };
       
            // return
          }else{
     let inputObj = {
          id: getStorage("userToken").userId
        };
        inputObj[this.inputType] = val;

        checkToken().then(Pdata => {
          getDataInfo("patch", "user/userByCondition", inputObj).then(res => {
            if (res.data.code == 200) {
              this.myData[this.inputType] = val;
              if (this.inputType == "name") {
                JIMinitchange(this.updateSelfInfo);
              } else {
                this.toastInfo = {
                  showMsg: res.data.msg,
                  showPositionValue: true,
                  toastType: "success"
                };

                this.inputValue = this.inputType = "";
                this.showInput = false;
              }
            }
          });
        });


          }
        }else{

               let inputObj = {
          id: getStorage("userToken").userId
        };
        inputObj[this.inputType] = val;

        checkToken().then(Pdata => {
          getDataInfo("patch", "user/userByCondition", inputObj).then(res => {
            if (res.data.code == 200) {
              this.myData[this.inputType] = val;
              if (this.inputType == "name") {
                JIMinitchange(this.updateSelfInfo);
              } else {
                this.toastInfo = {
                  showMsg: res.data.msg,
                  showPositionValue: true,
                  toastType: "success"
                };

                this.inputValue = this.inputType = "";
                this.showInput = false;
              }
            }
          });
        });



        }
   

      } else {
        this.toastInfo = {
          showMsg: "请填写内容",
          showPositionValue: true,
          toastType: "text"
        };
      }
    }
  },

  mounted() {
    this.getMyData();
  },
  watch: {
    showInput(n,o){
      if(!n){
         this.getMyData()
      }
    }
  },
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
.My-info-PopupBox{
  .vux-popup-dialog{
    z-index: 511;
  }
}
.my-infoNamefocus{
  height: 50vh;
  // background: #000;
}




.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .myInfo-slot{
    span{
      font-size: .9rem;
      color: #787878;
    }
  }
  .myInfo-slot-val{
    color: #000000;
  }
  .my-carte{
    width: 80%;
    margin: 0 auto 1rem auto;
    border:1px solid #DCDCDC;
    border-radius:15px; 
    box-sizing: border-box;
    img{
      width: 100%;
    }
  }
</style>


