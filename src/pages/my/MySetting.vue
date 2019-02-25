<template>
  <div class="box">
    <div style="height:44px;">
      <!-- <sticky :check-sticky-support="false" :offset="0"> -->
      <div class="map-headerBox borBottm">
        <div class="map-go-back" @click="$router.go(-1)"></div>
        <h3 class="map-headerTitle">设置</h3>
      </div>

      <!-- </sticky> -->
      <div v-transfer-dom>
        <loading :show="show2" text="数据加载中..."></loading>
      </div>
      <!-- {{userData}} -->
      <div class="bgF8" v-if="!show2">
        <group class="myfan-fanlistBox">
          <!-- {{pwdStatus}} -->
          <cell :title="userData.pwdStatus?'修改密码':'设置密码'" is-link @click.native="showInput=true"></cell>
          <cell title="绑定账号" is-link link="/setting/bindAccount"></cell>
          
        </group>

<group class="myfan-fanlistBox">
        <cell title="关于链会议" is-link></cell>

    </group>
        <div class="sign-out" @click="signOut">退出登录</div>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="showInput" height="100%">
        <div class="my-inputsBox">
          <!-- <div @click="show11=false">关闭1111111111111111</div> -->
          <div class="map-headerBox borBottm">
            <div class="map-go-back" @click="showInput=false"></div>
            <h3 class="map-headerTitle">{{userData.pwdStatus?'修改密码':'设置密码'}}</h3>
            <div class="my-saveBtn fr" @click="submitInputForm">保存</div>
          </div>

          <div v-if="userData.pwdStatus" class="change-Password">
            <x-input
              placeholder="输入旧密码(8-18位,数字+字母)"
              ref="Oldpass"
              v-model="oldPassW"
              type="password"
              :is-type="codePassValue"
            ></x-input>
            <x-input
              type="password"
              placeholder="设置新密码(8-18位,数字+字母)"
              :is-type="codePassValue"
              ref="newpass"
              v-model="passObj.newPassword"
              @on-change="change"
            ></x-input>
            <x-input
              v-model="passObj.newPasswordAgain"
              ref="newPassAgain"
              type="password"
              placeholder="再次输入新密码"
              :equal-with="passObj.newPassword"
            ></x-input>
          </div>
          <div v-else class="change-Password">
            <x-input
              type="password"
              :is-type="codePassValue"
              ref="newpass"
              placeholder="设置新密码(8-18位,数字+字母)"
              v-model="passObj.newPassword"
              @on-change="change"
            ></x-input>
            <x-input
              v-model="passObj.newPasswordAgain"
              ref="newPassAgain"
              type="password"
              placeholder="再次输入新密码"
              :equal-with="passObj.newPassword"
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
  stoRemove,
  removeCookie,
  getStorage,
  checkToken,
  getDataInfo
} from "../../assets/lib/myStorage.js";
import {
  Group,
  Cell,
  Sticky,
  Loading,
  Toast,
  TransferDomDirective as TransferDom,
  XInput,
  Popup
} from "vux";

export default {
  name: "MySetting",
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Sticky,
    Loading,
    Toast,
    XInput,
    Popup
  },
  data() {
    return {
      oldPassW: "",
      passObj: {
        newPassword: "",
        newPasswordAgain: ""
      },
      show2: true,
      userData: [],
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      },
      showInput: false,
      codePassValue: function(value) {
        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
        let r = value.match(regExp);

        return {
          // valid: value.match(regExp),
          valid: r != null,
          msg: "密码格式不正确!"
        };
      }
    };
  },

  methods: {
    change(val) {
      // console.log('on change', val)
    },
    //退出登录
    signOut() {
      let _that = this;
      removeCookie("accessToken");
      stoRemove("userToken");
      this.toastInfo = {
        showMsg: "已退出登录",
        showPositionValue: true,
        toastType: "text"
      };
      setTimeout(function() {
        _that.$router.push("/");
      }, 1000);
    },
    //获取当前用户信息 查看当前用户是否设置过密码
    getUserById() {
      let _that = this;
      let fansObj = {
        params: {
          id: getStorage("userToken").userId
        }
      };
      checkToken().then(Pdata => {
        getDataInfo("get", "/user/userById", fansObj).then(res => {
          if (res.data.code == 200) {
            this.userData = res.data.data;
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
    //提交设置密码
    submitInputForm() {
      let _that = this;
      this.passObj.mobile = this.userData.mobile;
      if (this.userData.pwdStatus) {
        if (
          this.oldPassW == "" ||
          this.passObj.newPassword == "" ||
          this.passObj.newPasswordAgain == ""
        ) {
          this.toastInfo = {
            showMsg: "请填写密码",
            showPositionValue: true,
            toastType: "cancel"
          };
        } else {
          if (
            this.$refs.Oldpass.valid == true &&
            this.$refs.newpass.valid == true &&
            this.$refs.newPassAgain.valid == true
          ) {
            this.passObj.oldPassword = this.oldPassW;
            checkToken().then(Pdata => {
              getDataInfo("patch", "/user/userPassword", this.passObj).then(
                res => {
                  if (res.data.code == 200) {
                    this.toastInfo = {
                      showMsg: "密码修改成功！",
                      showPositionValue: true,
                      toastType: "success"
                    };
                    (this.oldPassW = ""),
                      (this.passObj = {
                        newPassword: "",
                        newPasswordAgain: ""
                      });
                    this.showInput = false;
                  } else if (res.data.code == 1003) {
                    this.toastInfo = {
                      showMsg: "原密码输入不正确",
                      showPositionValue: true,
                      toastType: "cancel"
                    };
                    this.oldPassW = "";
                  }
                }
              );
            });
          } else {
            this.toastInfo = {
              showMsg: "请正确填写密码！",
              showPositionValue: true,
              toastType: "cancel"
            };
          }
        }
      } else {
        if (
          this.passObj.newPassword == "" ||
          this.passObj.newPasswordAgain == ""
        ) {
          this.toastInfo = {
            showMsg: "请填写新密码",
            showPositionValue: true,
            toastType: "cancel"
          };
        } else {
          if (
            this.$refs.newpass.valid == true &&
            this.$refs.newPassAgain.valid == true
          ) {
            let passwObj = {
              id: this.userData.id,
              password: this.passObj.newPasswordAgain
            };

            checkToken().then(Pdata => {
              getDataInfo("patch", "user/userByCondition", passwObj).then(
                res => {
                  if (res.data.code == 200) {
                    this.toastInfo = {
                      showMsg: "密码设置成功！",
                      showPositionValue: true,
                      toastType: "success"
                    };
                    (this.oldPassW = ""),
                      (this.passObj = {
                        newPassword: "",
                        newPasswordAgain: ""
                      });
                    this.showInput = false;
                  }
                }
              );
            });
          } else {
            this.toastInfo = {
              showMsg: "请正确填写密码！",
              showPositionValue: true,
              toastType: "cancel"
            };
          }
        }
      }
    }
  },
  mounted() {
    this.getUserById();
  }
};
</script>

<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
.myfan-fanlistBox {
  .weui-cells {
    // margin-top: 0;
  }
  .weui-cells::before {
    border: none;
  }
  .weui-cells::after {
    border: none;
  }
  .weui-cell::before {
    border: none;
  }
  .weui-cell {
    border-bottom: 1px solid #e6e6e6;
    padding-top: 1rem;
    padding-bottom: 1rem;
    .vux-label {
      font-size: 1rem;
      font-weight: bold;
      color: #323232;
    }
  }
}

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
.change-Password{
.weui-input{
  height: 2rem;
}
}
.my-inputsBox{
  .weui-cell{
    border-bottom:1px solid #e6e6e6; 
  }
  .weui-cell::before{
    border: none;
  }

}
</style>
