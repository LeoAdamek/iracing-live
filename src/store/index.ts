import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    telemetry: Object
  },
  mutations: {
    SOCKET_ONMESSAGE (state, message) {
      state.telemetry = message
    }
  },
  actions: {
  },
  modules: {
  }
})
