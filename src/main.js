// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUi from 'mint-ui'
import fastclick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import 'common/styl/index.styl'

Vue.use(MintUi)
// 初始化fastclick
fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
