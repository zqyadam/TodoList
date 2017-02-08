<template>
  <div>
    <mu-list v-if="todoData.length">
<<<<<<< HEAD
      <!-- <v-touch @panleft="showOperate" v-for="todo in todos" v-bind:panleft-options="{ direction: 'horizontal', threshold: 10 }"> -->
      <!-- <transition-group :name="fadeDirection"> -->
      <mu-list-item v-for="(todo,index) in todoData" :title="todo.content" :key="index">
        <mu-icon :value="iconType" slot="left" @click="toogleStatus(todo)" />
        <mu-icon-button v-show="showDeleteBtn" icon="delete" slot="right" @click="deleteTodo(todo)" touch/>
        <mu-icon-button v-show="!showDeleteBtn" icon="mode_edit" slot="right" @click="editTodo(todo)" touch/>
      </mu-list-item>
      <!-- </transition-group> -->
      <!-- </v-touch> -->
=======
      <mu-list-item v-for="(todo,index) in todoData" :title="todo.attributes.content" :key="index">
        <mu-icon :value="iconType" slot="left" @click="toggleStatus(todo)" />
        <mu-icon-button icon="delete" @click="deleteTodo(todo)" v-show="showDeleteBtn" touch slot="right"></mu-icon-button>
        <mu-icon-button icon="mode_edit" @click="editTodo(todo)" touch slot="right" :style="{'margin-right':showDeleteBtn?'60px':'0px'}" />
      </mu-list-item>
>>>>>>> parent of 64409a9... to revert
    </mu-list>
    <div v-else class="no-todo-tip">
      还没有<span :class="noTodoTipClass"><span style="font-weight:bold;">{{ !showDeleteBtn?"未完成":"已完成" }}</span>的[{{ types[type] }}]</span>事项，赶紧添加一个吧~
    </div>
    <!--************************** 不显示内容 ****************************-->
    <!-- edit Todo Item dialog -->
    <mu-dialog :open="editTodoDialog" title="修改Todo" @close="closeEditTodoDialog">
      <mu-flexbox orient="vertical" align="stretch" >
        <!-- 编辑Todo -->
        <mu-flexbox-item>
          <mu-text-field label="编辑内容" hintText="输入Todo内容" fullWidth v-model="todoTempCopy.content" />
        </mu-flexbox-item>
        <!-- 选择类型 -->
        <mu-flexbox-item>
          <mu-select-field label="选择类型" v-model="todoTempCopy.type" fullWidth :labelClass="labelClass">
            <mu-menu-item value="ImpEmg" title="重要-紧急" titleClass="ImpEmgTitle" />
            <mu-menu-item value="ImpNotEmg" title="重要-不紧急" titleClass="ImpNotEmgTitle" />
            <mu-menu-item value="NotImpEmg" title="不重要-紧急" titleClass="NotImpEmgTitle" />
            <mu-menu-item value="NotImpNotEmg" title="不重要-不紧急" titleClass="NotImpNotEmgTitle" />
          </mu-select-field>
        </mu-flexbox-item>
        <!-- 设置状态 -->
        <mu-flexbox-item>
          <mu-switch label="已完成？" labelLeft v-model="todoTempCopy.status" />
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flat-button slot="actions" @click="saveTodoChange" icon="save" label="保存" />
      <mu-flat-button slot="actions" @click="closeEditTodoDialog" label="取消" secondary/>
    </mu-dialog>
    <!-- edit Todo Item dialog end -->
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      editTodoDialog: false,
      todoTempCopy: {
<<<<<<< HEAD
      	content:'',
      	type:'',
      	status:false
=======
        content: '',
        type: '',
        status: false
>>>>>>> parent of 64409a9... to revert
      },
      todoTemp: null
    }
  },
  props: {
    todos: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ""
    },
    noTodoTipClass: {
      type: String
    },
    showDeleteBtn: {
      type: Boolean,
      default: false
    },
    types: {
      type: Object
    }
  },
  computed: {
    todoData: function() {
      let _this = this;
      return this.todos.filter(function(item) {
<<<<<<< HEAD
        return item.status === _this.showDeleteBtn;
=======
      	item = item.toJSON();
        return (item.status === _this.showDeleteBtn) && (item.enable);
>>>>>>> parent of 64409a9... to revert
      })

    },
    fadeDirection: function() {
      return this.showDeleteBtn ? 'fade-right' : 'fade-left';
    },
    iconType: function() {
      return this.showDeleteBtn ? 'redo' : 'restore'
    },
    labelClass:function() {
    	return this.todoTempCopy.type+'Title';
    }
  },
  methods: {
    toogleStatus: function(item) {
      // if (!this.showDeleteBtn) {
      item.status = !item.status;
      // }
    },
    deleteTodo: function(item) {
<<<<<<< HEAD
      console.log('delete todo');
      item.status = false;
=======
    	item.set('enable',false);
    	item.save();
>>>>>>> parent of 64409a9... to revert
    },
    editTodo: function(item) {
      this.todoTemp = item;
<<<<<<< HEAD
      this.todoTempCopy.content = item.content;
      this.todoTempCopy.type = item.type;
      this.todoTempCopy.status = item.status;
=======
      item = item.toJSON()
      Object.keys(item).forEach(function(key) {
        _this.todoTempCopy[key] = item[key];
      })
>>>>>>> parent of 64409a9... to revert
      this.editTodoDialog = true;
    },
    closeEditTodoDialog: function() {
      this.editTodoDialog = false;
    },
    saveTodoChange: function() {
<<<<<<< HEAD
      this.todoTemp.content = this.todoTempCopy.content;
      this.todoTemp.type = this.todoTempCopy.type;
      this.todoTemp.status = this.todoTempCopy.status;
      this.todos = this.todos;
=======
      var _this = this;
      delete _this.todoTempCopy.objectId;
      delete _this.todoTempCopy.createdAt;
      delete _this.todoTempCopy.updatedAt;
      Object.keys(this.todoTempCopy).forEach(function(key) {
        _this.todoTemp.set(key, _this.todoTempCopy[key])
      })
      _this.todoTemp.save();
>>>>>>> parent of 64409a9... to revert
      this.closeEditTodoDialog();
    }
  }
}
</script>
<style scoped>
.no-todo-tip {
  margin-top: 80px;
  width: 100%;
  text-align: center;
  color: #616161;
}


/*.doneClass {
  text-decoration: line-through;
}*/


/*.deleteBtn {
  margin-right: 60px;
}*/


/* fade transition */

.fade-left-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
