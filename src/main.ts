import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueNativeSock, 'ws://localhost:8088/telemetry?i=50&encoding=text', { store: store, format: 'json' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
