// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
// load local css icon
import './assets/iconfont/material-icons.css'
//  load UI components
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import App from './App'
// load pages
import Login from './pages/login/login'
// 懒加载路由
const Register = resolve=>{
  require.ensure(['./pages/login/register'],()=>{
    resolve(require('./pages/login/register'))
  })
}
// 第二种写法
const TodoTab = resolve => require(['./pages/todo-tab'], resolve);

// load api
import { getlocalStorageItemName, isLogedin } from './api/api'

// install plugins
Vue.use(VueRouter);
Vue.use(MuseUI);
VueTouch.registerCustomEvent('dbltap', {
  type: 'tap',
  taps: 2
})
Vue.use(VueTouch,{name: 'v-touch'});

const routes = [{
  path: '/login',
  component: Login,
  name: 'login',
  meta: {
    requiresAuth: false
  }
}, {
  path: '/registe',
  component: Register,
  name: 'registe',
  meta: {
    requiresAuth: false
  }
}, {
  path: '/todo',
  component: TodoTab,
  name: 'todo',
  meta: {
    requiresAuth: true
  }
}, {
  path: '*',
  redirect: { path: '/login' }
}]


let router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // let user = JSON.parse(localStorage.getItem(getlocalStorageItemName()));
    // if (!user) {
    //   next({ path: '/login', });
    // }
    if (!isLogedin) {
      next({ path: '/login' });
    }
  }
  next();
});
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
