
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueNativeSock, 'wss://iracing-api.breakerofthings.tech/telemetry', { store: store, format: 'json' })
Vue.use(VueResource)

Vue.config.productionTip = false

Vue.filter('round', (value: number) => {
  return Math.round(value)
})

Vue.filter('time', (value: number, decimals = 3) => {
  if (value < 0) return '--'

  if (value < 60) return value.toFixed(3)

  const hours = Math.floor(value / 3600.0)
  const minutes = Math.floor((value % 3600) / 60.0)
  const seconds = value % 60
  let pad = ''

  if (Math.floor(seconds) < 10) {
    pad = '0'
  }

  let time = ''

  if (hours > 0) {
    time += `${hours}:`
    if (minutes < 10) {
      time += '0'
    }
  }
  time += `${minutes}:${pad}${seconds.toFixed(decimals)}`

  return time
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
