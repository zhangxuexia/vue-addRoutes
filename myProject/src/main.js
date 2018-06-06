// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import common from 'assets/css/public.css'
import index from 'assets/css/index.css'
import elementUi from './common/element-ui'
import VeeValidate from './common/validator'
import http from 'common/http'
import store from './vuex/store'

Vue.use(http)
VeeValidate()
elementUi()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
