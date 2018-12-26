import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

export default new vuex.Store({
  state: {
    city: localStorage.city || '北京',
    

  },
 getters: {
    // 请求数据时加载状态
    isLoding: state => state.isLoding
   },
  mutations: {
    changeCity(state,city){
      state.city = city;
      try {
          localStorage.city = city
      } catch (error) {
          
      }
     
  }
  
  },
  actions: {
   
  
  },

});
