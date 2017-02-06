// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';

//  load UI components
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import App from './App'
// load pages
import Login from './pages/login/login'
import Register from './pages/login/register'
// import Todo from './pages/todo'
import TodoTab from './pages/todo-tab'

// load api
import { getlocalStorageItemName, isLogedin } from './api/api'
// install plugins
Vue.use(VueRouter);
Vue.use(MuseUI);
Vue.use(VueTouch,{name: 'v-touch'});


const routes = [{
  path: '/login',
  component: Login,
  name: 'login',
  meta: {
    requiresAuth: false
  }
}, {
  path: '/register',
  component: Register,
  name: 'register',
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
  console.log(to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // let user = JSON.parse(localStorage.getItem(getlocalStorageItemName()));
    // if (!user) {
    //   next({ path: '/login', });
    // }
    if (!isLogedin) {
      next({ path: '/login' });
    }
  }
  console.log('routing to ' + to.fullPath);
  next();
});
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
