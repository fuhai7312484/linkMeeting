import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

export default new vuex.Store({
  state: {
    city:  localStorage.city?JSON.parse(localStorage.city):'' || "北京",
    isLogin: 0
  },
  getters: {
    // 请求数据时加载状态
    isLoding: state => state.isLoding
  },
  mutations: {
    changeCity(state, city) {
      state.city = city;
     
      try {
        localStorage.city = JSON.stringify(city);
      } catch (error) {}
    }
  },
  actions: {}
});
