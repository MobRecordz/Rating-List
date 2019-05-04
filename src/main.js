import Vue from 'vue'
import App from './App.vue'
import store from './store'


//main styles
import "./assets/styles/style.scss";
import "./assets/styles/icofont.min.css"

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
