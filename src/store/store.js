import Vuex from "vuex";
import Vue from "vue";
import { state, getters, actions, mutations } from "./modules/users";
// import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state,
  getters,
  actions,
  mutations,
});
