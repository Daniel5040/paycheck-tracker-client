import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import paycheck from './modules/paycheck'
import workday from './modules/workday'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    paycheck,
    workday
  }
})
