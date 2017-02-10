let AV = require('leancloud-storage');
// hello appliction
const APP_ID = 'qNpVPquXEti01HpThDRcqiHl-gzGzoHsz';
const APP_KEY = 'KB8jNrxQz0i7WFCH9fYbXYtt';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
// localStorage.setItem('debug', 'leancloud*');
export let Todo = AV.Object.extend('Todo');

/* User Operate  */
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

/* Todo Operate */
// sync
// commitTodos
// pullTodos
// saveToLocal

// start up->pullTodos->update local data
// data change -> saveToLocal -> commitTodos()
export let AddTodoItem = function(item) {
  var todo = new Todo(item);
  var acl = new AV.ACL();
  acl.setPublicReadAccess(false);
  acl.setPublicWriteAccess(false);
  acl.setWriteAccess(AV.User.current(), true);
  acl.setReadAccess(AV.User.current(), true);
  todo.setACL(acl);
  todo.set('owner', getCurrentUser().id);
  return todo.save();
}

export let SaveTodoItem = function(item) {
  var todo = new Todo(item);
  var acl = new AV.ACL();
  acl.setPublicReadAccess(false);
  acl.setPublicWriteAccess(false);
  acl.setWriteAccess(AV.User.current(), true);
  acl.setReadAccess(AV.User.current(), true);
  todo.setACL(acl);
  return todo.save();
}

export let LoadServerTodos = function() {
  var uid = getCurrentUser().id;
  var ownerQuery = new AV.Query('Todo');
  ownerQuery.equalTo('owner', uid);
  var enableQuery = new AV.Query('Todo');
  enableQuery.equalTo('enable', true);
  return new AV.Query.and(ownerQuery, enableQuery).find();
}
