<template>
    <div class="box">

        我的
<footer-nav></footer-nav>

    </div>
</template>
<script>
import FooterNav from "@/components/footerNav";
export default {
    name:'MyIndex',
    data(){
        return{

        }
    },
     components:{
        FooterNav,
    },
}
</script>
<style lang="less">
@import "../../assets/style/tools.less";
@import "../../assets/style/global.less";
@import "~vux/src/styles/reset.less";
</style>


