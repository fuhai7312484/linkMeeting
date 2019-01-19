<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <h2>跳转</h2>
    <ul>
      <router-link tag="li" to="/detailsList">TA的发布</router-link>
             <router-link tag="li" to="/siteindex">场地首页</router-link>
                <router-link tag="li" to="/siteSearch">场地搜索</router-link>
       <router-link tag="li" to="/sitedetail">场地详情</router-link>
       <router-link tag="li" to="/roomdetail">会议室详情</router-link>
       <router-link tag="li" to="/gallery">场地全部图片列表</router-link>
       <router-link tag="li" to="/city">切换城市</router-link>
        <router-link tag="li" to="/login">登录</router-link>
        <router-link tag="li" to="/reg">注册</router-link>
         <router-link tag="li" to="/retpass">找回密码</router-link>
              <router-link tag="li" to="/meeting">会议首页</router-link>
               <router-link tag="li" to="/meetDetail">会议详情</router-link>
               <router-link tag="li" to="/downannex">下载附件</router-link>

                <router-link tag="li" to="/navmap">会议导航</router-link>
                <router-link tag="li" to="/ticket">报名参会</router-link>
                <router-link tag="li" to="/signinfo">报名信息</router-link>
                

              <router-link tag="li" to="/msgindex">消息</router-link>
                   <router-link tag="li" to="/dialog">消息对话框</router-link>
                <router-link tag="li" to="/ordermsg">订单消息</router-link>
              <router-link tag="li" to="/myindex">我的</router-link>
         
      <!-- <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li> -->
    </ul>
    <!-- <h2>Ecosystem</h2> -->
    <!-- <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
