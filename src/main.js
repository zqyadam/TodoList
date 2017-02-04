// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
//  load UI components
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import App from './App'
// load pages
import Login from './pages/login'
import Register from './pages/register'
// install plugins
Vue.use(VueRouter);
Vue.use(MuseUI);

const routes = [{
  path: '/login',
  component: Login,
  name: 'login',
  meta: {
    hidden: true
  }
}, {
  path: '/register',
  component: Register,
  name: 'login',
  meta: {
    hidden: true
  }
}, {
  path: '*',
  redirect: { path: '/login' }
}]


const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
