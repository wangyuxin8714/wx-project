import Vue from 'vue'
import App from './App'

import store from "@/store"


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$bus=new Vue();
Vue.prototype.$store=store

console.log(new Vue())
const app = new Vue(App)
console.log(app)
app.$mount()

