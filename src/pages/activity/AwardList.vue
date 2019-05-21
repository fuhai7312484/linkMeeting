<template>
  <div>
    <div class="pr8">

  
      <swipeout>
        <swipeout-item
          v-for="(awar,index) in awardData"
          :key="index"
          @on-close="handleEvents('on-close')"
          @on-open="handleEvents('on-open')"
          transition-mode="follow"
        >
          <div slot="right-menu" class="awardDel">
            <swipeout-button background-color="#fff" type="primary" :width="10">0</swipeout-button>
            <swipeout-button
              @click.native="onButtonClick(index)"
              background-color="#FF576B"
              type="warn"
            >删除</swipeout-button>
          </div>
          <div slot="content" class="awardListBox pr8">
            <flexbox class="wx-awardList">
              <flexbox-item>
                <div class="awardFlexDemo">
                  <h4>{{awar.name}}</h4>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="awardFlexInfo">中奖人数:{{awar.winNum}}/{{awar.total}}</div>
              </flexbox-item>
              <flexbox-item>
                <div class="awardFlexBtn">
                  <div
                    class="OperatingBtn Op-edit"
                    v-if="awar.status==0"
                    @click="addAwardChange('edit',index)"
                  >编辑</div>
                </div>
              </flexbox-item>
            </flexbox>

            <flexbox class="wx-awardList">
              <flexbox-item>
                <div class="awardFlexDemo">
                  <h5>{{awar.prize}}</h5>
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="awardFlexInfo">参与编码:{{awar.roomCode}}</div>
              </flexbox-item>
              <flexbox-item>
                <div class="awardFlexBtn">
                  <div class="OperatingBtn Op-initiate" @click="initAward(awar.id)" v-if="awar.status==0">发起抽奖</div>

                  <div
                    class="OperatingBtn Op-list"
                    v-if="awar.status==1"
                    @click="showHide(awar)"
                  >中奖列表</div>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </swipeout-item>
      </swipeout>

      <div class="addAwardBtn" @click="addAwardChange('add')">
        <img :src="require('../../assets/images/addAward.png')">添加抽奖信息
      </div>
    </div>

    <div v-transfer-dom class="addAwardPopupBox">
      <popup v-model="showInput" height="100%">
        <div class="addAwardPopup">
          <div class="addAwardInputBox">
            <x-input title="奖项名称" placeholder="例如一等奖、二等奖等" v-model="nameValue"></x-input>
          </div>

          <div class="addAwardInputBox">
            <x-input title="奖品名称" placeholder="请根据实际情况填写" v-model="infoValue"></x-input>
          </div>

          <div class="addAwardInputBox">
            <x-input title="中奖人数" placeholder="您预设定的此项奖项中奖人数" mask="99" v-model="WinningNum"></x-input>
          </div>

          <div class="addAwardInputBox">
            <x-input title="参与编码" v-model="codeValue" disabled></x-input>
          </div>
        </div>

        <div class="addAwardSubmit SubN" v-if="!SubmitShow">确定</div>

        <div class="addAwardSubmit SubT" @click="Submit" v-if="SubmitShow">确定</div>
      </popup>
    </div>

    <div v-transfer-dom>
      <x-dialog
        v-model="showHideOnBlur"
        class="addAwardDialogBox"
        hide-on-blur
        :dialog-style="{'max-width': '90%', width: '90%'}"
      >
        <div class="DialogImg-box">
          <div class="DialogImgClose" @click="showHideOnBlur=false">
            <img :src="require('../../assets/images/DialogImgClose.png')">
            <!-- <span class="vux-close">11111</span> -->
          </div>

          <div class="DialogTitle">
            <h3>{{WinnerList.name}}{{WinnerList.total}}名</h3>
          </div>
          <ul class="DialogWinUl">
            <li v-for="(i,index) in WinnerList.WinnerData" :key="index">
              <div class="DialogListIcon fl">
                <img :src="i.mainPic">
              </div>
              <div class="DialogListName fl">
                <h4>{{i.name}}</h4>
              </div>
              <div class="DialogListPrize fl">
                获得
                <span>{{WinnerList.prize}}</span>
              </div>
            </li>
          </ul>
          <!-- {{WinnerList}} -->
        </div>
      </x-dialog>
    </div>

    <toast
      v-model="toastInfo.showPositionValue"
      width="15em"
      :type="toastInfo.toastType"
      position="middle"
      :time="1500"
      is-show-mask
    >{{toastInfo.showMsg}}</toast>
  </div>
</template>
<script>
import {
  isweixin,
  WeChatLogin,
  setStorage,
  getStorage
} from "../../assets/lib/myStorage.js";
import {
  Toast,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Flexbox,
  FlexboxItem,
  Popup,
  TransferDomDirective as TransferDom,
  XInput,
  XDialog
} from "vux";
export default {
  name: "Lottery",
  directives: {
    TransferDom
  },
  components: {
    Toast,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Flexbox,
    FlexboxItem,
    Popup,
    XInput,
    XDialog
  },
  data() {
    return {
      WinnerList: {},
      showHideOnBlur: false,
      SubmitShow: false,
      SubmitType: "add",
      nameValue: "",
      infoValue: "",
      WinningNum: "",
      codeValue: 1024,
      showInput: false,
      awardData: [
        {
          id: 123456,
          name: "一等奖",
          prize: "空气净化器2台",
          total: 3,
          winNum: 0,
          roomCode: 1022,
          status: 0,
          WinnerData: null
        },
        {
          id: 123452,
          name: "二等奖",
          prize: "空气净化器2台",
          total: 6,
          winNum: 3,
          roomCode: 1023,
          status: 1,
          WinnerData: [
            {
              openid: "12345678765",
              name: "小猪佩奇",
              mainPic: require("../../assets/images/20146216561084761.gif")
            }
          ]
        }
      ],
      toastInfo: {
        showMsg: "",
        showPositionValue: false,
        toastType: "success"
      }
    };
  },
  methods: {
    onButtonClick(index) {
      this.awardData.splice(index, 1);
    },
    handleEvents(type) {
      // console.log("event: ", type);
    },
    NotBegun() {
      this.toastInfo = {
        showMsg: "即将开放 敬请期待！！",
        showPositionValue: true,
        toastType: "text"
      };
    },
    //添加或编辑奖项
    addAwardChange(type, index) {
      this.SubmitType = type;
      console.log(this.SubmitType);
      this.showInput = true;
      if (type == "edit") {
        this.nameValue = this.awardData[index].name;
        this.infoValue = this.awardData[index].prize;
        this.WinningNum = this.awardData[index].total;
        this.codeValue = this.awardData[index].roomCode;
      }
    },
    //打开中奖列表
    showHide(item) {
      this.showHideOnBlur = true;
      this.WinnerList = item;
    },
      //发起抽奖
    initAward(id){
      this.$router.push('/initlist/'+id)
      console.log(id)
    },
    //提交表单
    Submit() {
      if (this.WinningNum * 1 == 0) {
        this.toastInfo = {
          showMsg: "中奖人不能为0",
          showPositionValue: true,
          toastType: "text"
        };
      } else {
        if (this.SubmitType == "edit") {
          console.log("这里是编辑");
          this.toastInfo = {
            showMsg: "编辑奖项成功！",
            showPositionValue: true,
            toastType: "success"
          };
        } else {
          this.awardData.push({
            id: "112211",
            name: this.nameValue,
            prize: this.infoValue,
            total: this.WinningNum,
            winNum: 0,
            roomCode: this.codeValue,
            status: 0
          });

          //这里请求创建奖项的接口
          this.toastInfo = {
            showMsg: "添加奖项成功！",
            showPositionValue: true,
            toastType: "success"
          };
        }

        this.nameValue = this.infoValue = this.WinningNum = "";
        this.showInput = false;
      }
    }
  },
  mounted() {},
  watch: {
    nameValue(n, o) {
      if (n && n != "") {
        if (this.WinningNum && this.WinningNum != "") {
          this.SubmitShow = true;
        }
      } else {
        this.SubmitShow = false;
      }
    },
    WinningNum(n, o) {
      if (n && n != "") {
        if (this.nameValue && this.nameValue != "") {
          this.SubmitShow = true;
        }
      } else {
        this.SubmitShow = false;
      }
    }
  }
};
</script>
<style lang="less">
@import "../../assets/style/lotStyle.less";
@import "~vux/src/styles/reset.less";

.demo-content {
  padding: 10px 10px;
}

.wxLotbtnsBox {
  width: 80%;
  height: 200px;
  // background: #000;
  margin: 10rem auto 2rem auto;

  div {
    margin: 1rem auto;
    text-align: center;
    width: 100%;
    img {
      width: 220px;
    }
  }
}

.awardDel {
  .vux-swipeout-button {
    border-radius: 12px;
  }
}
</style>


