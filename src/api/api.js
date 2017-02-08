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

<<<<<<< HEAD
<<<<<<< HEAD
=======
// start up->pullTodos->update local data
// data change -> saveToLocal -> commitTodos()
export let AddTodoItem = function(item) {
  var todo = new Todo(item);
  // todo.fetchWhenSave = true;
  todo.set('owner', getCurrentUser().id);
  return todo.save();
}

export let SaveTodoItem = function(item) {
	var todo = new Todo(item);
	return todo.save();
}

export let LoadServerTodos = function() {
	var uid = getCurrentUser().id;
	 var query = new AV.Query('Todo');
	 return query.equalTo('owner',uid).find();
>>>>>>> parent of 64409a9... to revert
=======
>>>>>>> parent of 7475857... link to leancloud
}