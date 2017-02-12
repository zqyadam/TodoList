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
  return AV.User.logIn(loginParams.email, loginParams.password);
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
export let registeUser = function(userInfo) {
  var user = new AV.User();
  user.setUsername(userInfo.username);
  user.setPassword(userInfo.password);
  user.setEmail(userInfo.email);
  return user.signUp();
}
/* Todo Operate */
// sync
// commitTodos
// pullTodos
// saveToLocal

// start up->pullTodos->update local data
// data change -> saveToLocal -> commitTodos()
export let AddTodoItem = function(item) {
  var acl = new AV.ACL();
  acl.setPublicReadAccess(false);
  acl.setPublicWriteAccess(false);
  acl.setWriteAccess(AV.User.current(), true);
  acl.setReadAccess(AV.User.current(), true);
  var todo = new Todo(item);
  todo.setACL(acl);
  todo.set('owner', getCurrentUser().id);
  return todo.save();
}

export let SaveTodoItem = function(item) {
  acl.setPublicReadAccess(false);
  acl.setPublicWriteAccess(false);
  acl.setWriteAccess(AV.User.current(), true);
  acl.setReadAccess(AV.User.current(), true);
  var todo = new Todo(item);
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

export let addRole = function() {
  var roleACL = new AV.ACL();
  roleACL.setPublicReadAccess(false);
  roleACL.setPublicWriteAccess(false);

  roleACL.setWriteAccess(AV.User.current(),true);

  var UserRole = new AV.Role('User',roleACL);
  UserRole.save().then(function(role) {
    console.log(role);
  },function(err) {
    console.log(err);
  })
}

