import Vuex  from 'vuex';
import Vue from 'vue'
import {state, getters,actions,mutations} from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
  });