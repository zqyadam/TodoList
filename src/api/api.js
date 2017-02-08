let AV = require('leancloud-storage');
// hello appliction
const APP_ID = 'qNpVPquXEti01HpThDRcqiHl-gzGzoHsz';
const APP_KEY = 'KB8jNrxQz0i7WFCH9fYbXYtt';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
let Todo = AV.Object.extend('Todo');

export let requestLogin = function(loginParams) {
  return AV.User.logIn(loginParams.username, loginParams.password);
}
export let isLogedin = function() {
  return AV.User.current() ? true : false;
}
export let getCurrentUser = function() {
  return AV.User.current();
}
export let logOut = function() {
  AV.User.logOut();
}

export let saveTodoItem = function(item) {

}