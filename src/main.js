import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

const moment = require('moment')
require('moment/locale/zh-cn')
Vue.config.productionTip = false
Vue.use(require('vue-moment'),{
  moment
});

new Vue({
  router,
  vuetify,

  render: h => h(App)
}).$mount('#app')
