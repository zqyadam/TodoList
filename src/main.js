// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
// load local css icon
import './assets/iconfont/material-icons.css'
//  load UI components
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
import 'muse-components/styles/base.less' // 加载基础的样式
import { row, col } from 'muse-components/grid'
import  textField  from 'muse-components/textField'
import  raisedButton  from 'muse-components/raisedButton'
import  flatButton  from 'muse-components/flatButton'
import  snackbar from 'muse-components/snackbar'
import  dialog from 'muse-components/dialog'
import  appBar from 'muse-components/appBar'
import  iconButton from 'muse-components/iconButton'
import  {flexbox, flexboxItem } from 'muse-components/flexbox'
import  {tabs, tab}  from 'muse-components/tabs'
import  selectField  from 'muse-components/selectField'
import  _switch  from 'muse-components/switch'
import  paper  from 'muse-components/paper'
import  { bottomNav, bottomNavItem }  from 'muse-components/bottomNav'
import  { list, listItem }  from 'muse-components/list'
import  drawer  from 'muse-components/drawer'
import  contentBlock  from 'muse-components/contentBlock'
import  radio  from 'muse-components/radio'
import  subHeader  from 'muse-components/subHeader'
import  icon  from 'muse-components/icon'

Vue.component(row.name, row);
Vue.component(col.name, col);
Vue.component(textField.name, textField);
Vue.component(raisedButton.name, raisedButton);
Vue.component(flatButton.name, flatButton);
Vue.component(snackbar.name, snackbar);
Vue.component(dialog.name, dialog);
Vue.component(appBar.name, appBar);
Vue.component(iconButton.name, iconButton);
Vue.component(flexbox.name, flexbox);
Vue.component(flexboxItem.name, flexboxItem);
Vue.component(tabs.name, tabs);
Vue.component(tab.name, tab);
Vue.component(selectField.name, selectField);
Vue.component(_switch.name, _switch);
Vue.component(paper.name, paper);
Vue.component(bottomNav.name, bottomNav);
Vue.component(bottomNavItem.name, bottomNavItem);
Vue.component(drawer.name, drawer);
Vue.component(list.name, list);
Vue.component(listItem.name, listItem);
Vue.component(contentBlock.name, contentBlock);
Vue.component(radio.name, radio);
Vue.component(subHeader.name, subHeader);
Vue.component(icon.name, icon);


import App from './App'
// load pages
import Login from './pages/login/login'
// 懒加载路由
const Register = resolve=>{
  require.ensure(['./pages/login/register'],()=>{
    resolve(require('./pages/login/register'))
  })
}
// const TodoTab = resolve=>{
//   require.ensure(['./pages/todo-tab'],()=>{
//     resolve(require('./pages/todo-tab'))
//   })
// }
import TodoTab from './pages/todo-tab'
// load api
import { getlocalStorageItemName, isLogedin } from './api/api'

// install plugins
Vue.use(VueRouter);
// Vue.use(MuseUI);
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
