<template>
    <div class="box" :style="{overflow:'hidden'}">
         <div class="map-headerBox potFStyle potF borBottm">
            <div class="map-go-back" @click="$router.go(-1)">
            </div>
            <h3 class="map-headerTitle">
            曹伟
            </h3>
            <div class="Homepage fr"><img src="../../assets/images/Homepage.png"/> 主页</div>
         </div>


         <div class="x-messageBox padlr">


<div class="x-message-left">
<div class="x-message-imgBox x-message-left-img fl">
                    <img src="../../assets/images/Homepage.png" width="40px" height="40px;" />
                  </div>
                  <div class="x-message-TextBox  fl">
                     到的
                     
                  </div>

</div>



         </div>

         <div class="x-messageFormBox potF">
<div class="x-messageTabBtn fl" @click="showVoice=!showVoice">
<img :src="showVoice?require('../../assets/images/x-msg-voice.png'):require('../../assets/images/x-msg-text.png')" />
</div>
<div class="x-msg-formBox fl">
<div v-if="showVoice" class="x-msg-form">
 <x-input v-model="value" placeholder="想对Ta说点什么" show-clear></x-input>

</div>
<div v-else>
    <div>

        
    </div>


  <x-button type="default" mini :style="{width:'100%'}">按住 说话</x-button>

</div>


</div>

<div class="x-msg-sendBtn fr">
发送
</div>

         </div>
        

    
        
        </div>
</template>
<script>
import { XInput,XButton } from 'vux'
export default {
    name:'Dialog',
     components: {
    XInput,XButton
  },
    data(){
        return{
            showVoice:true,
            value:'',
            msgData:[{
                Avatar:'../../assets/images/mainpic.jpg',
                id:'12122111',
                msg:'您好,在吗',
            },
            {
                Avatar:'../../assets/images/mainpic.jpg',
                id:'12122111',
                msg:'还行',
            }]
        }
    }
}
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";

</style>


