<template>
  <div class="fit scroll">
    <!-- {{ todos }} -->
    
      <mu-flexbox :gutter="0" justify="center" class="fit" align="stretch" style="border:1px solid blue">
        <!--  -->
        <v-touch class="fit" style="border:1px solid red" v-on:swipeleft="nextTab" v-on:swiperight="previousTab" v-on:dbltap="addTodoItem">
        <mu-list v-if="todoData.length">
          <mu-list-item v-for="(todo,index) in todoData" :title="todo.attributes.content" :key="index" >
            <mu-icon :value="iconType" slot="left" @click="toggleStatus(todo)" />
            <mu-icon-button icon="delete" @click="deleteTodo(todo)" v-show="done" touch slot="right"></mu-icon-button>
            <mu-icon-button icon="mode_edit" @click="editTodo(todo)" touch slot="right" :style="{'margin-right':done?'60px':'0px'}" />
            <span style="color: #ccc" slot="describe">更新时间：{{ new Date(todo.updatedAt).toLocaleString() }}</span>
          </mu-list-item>
        </mu-list>
        <div v-else class="no-todo-tip">
          还没有<span :class="type+'Title'"><span style="font-weight:bold;">{{ !done?"未完成":"已完成" }}</span>的[{{ types[type] }}]</span>事项，赶紧添加一个吧~
        </div>
        <!-- <z-list v-if="type === 'ImpEmg'" :todos="ImpEmgTodos" type="ImpEmg" noTodoTipClass="ImpEmgTitle" :done="bottomNav" :types="types" />
          <z-list v-if="type === 'ImpNotEmg'" :todos="ImpNotEmgTodos" type="ImpNotEmg" noTodoTipClass="ImpNotEmgTitle" :done="bottomNav" :types="types" />
          <z-list v-if="type === 'NotImpEmg'" :todos="NotImpEmgTodos" type="NotImpEmg" noTodoTipClass="NotImpEmgTitle" :done="bottomNav" :types="types" />
          <z-list v-if="type === 'NotImpNotEmg'" :todos="NotImpNotEmgTodos" type="NotImpNotEmg" noTodoTipClass="NotImpNotEmgTitle" :done="bottomNav" :types="types" /> -->
    </v-touch>
      </mu-flexbox>
    <!-- list end -->
    </mu-flexbox>
    <!--************************** 不显示内容 ****************************-->
    <!-- edit Todo Item dialog -->
    <mu-dialog :open="editTodoDialog" title="修改Todo" @close="closeEditTodoDialog">
      <mu-flexbox orient="vertical" align="stretch">
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
import {
  SaveTodoItem
} from '../api/api';

export default {
  props: {
    todos: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: ""
    },
    done: {
      type: Boolean,
      default: false
    },
    types: {
      type: Object
    }
  },
  data: function() {
    return {
      editTodoDialog: false,
      todoTempCopy: {
        content: '',
        type: '',
        status: false
      },
      todoTemp: null,
      doneCount: 0
    }
  },
  computed: {
    todoData: function() {
      let _this = this;
      return this.todos.filter(function(item) {
        return (item.attributes.type === _this.type) && (item.attributes.status === _this.done) && (item.attributes.enable);
      })
    },
    iconType: function() {
      return this.done ? 'redo' : 'restore'
    },
    labelClass: function() {
      return this.todoTempCopy.type + 'Title';
    }
  },
  methods: {
    toggleStatus: function(item) {
      item.set('status', !item.get('status'))
      item.save();
    },
    deleteTodo: function(item) {
      item.set('enable', false);
      item.save();
    },
    editTodo: function(item) {
      var _this = this;
      this.todoTemp = item;
      item = item.toJSON();
      Object.keys(item).forEach(function(key) {
        _this.todoTempCopy[key] = item[key];
      })
      this.editTodoDialog = true;
    },
    closeEditTodoDialog: function() {
      this.editTodoDialog = false;
    },
    saveTodoChange: function() {
      var _this = this;
      delete this.todoTempCopy.objectId;
      delete this.todoTempCopy.createdAt;
      delete this.todoTempCopy.updatedAt;
      Object.keys(this.todoTempCopy).forEach(function(key) {
        _this.todoTemp.set(key, _this.todoTempCopy[key])
      })
      _this.todoTemp.save();
      this.closeEditTodoDialog();
    },
    nextTab: function() {
      console.log('nextTab');
      switch (this.type) {
        case "ImpEmg":
          this.$emit('typeChange', "ImpNotEmg");
          break;
        case "ImpNotEmg":
          this.$emit('typeChange', "NotImpEmg");
          break;
        case "NotImpEmg":
          this.$emit('typeChange', "NotImpNotEmg");
          break;
        case "NotImpNotEmg":
          this.$emit('typeChange', "ImpEmg");
          break;
        default:
          this.$emit('typeChange', "ImpEmg");
          break;
      }
    },
    previousTab: function() {
      switch (this.type) {
        case "ImpEmg":
          this.$emit('typeChange', "NotImpNotEmg");
          break;
        case "ImpNotEmg":
          this.$emit('typeChange', "ImpEmg");
          break;
        case "NotImpEmg":
          this.$emit('typeChange', "ImpNotEmg");
          break;
        case "NotImpNotEmg":
          this.$emit('typeChange', "NotImpEmg");
          break;
        default:
          this.$emit('typeChange', "ImpEmg");
          break;
      }
    },
    addTodoItem: function() {
    	console.log('dbl tap');
      this.$emit('addTodoItem');
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


/*.fade-left-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}*/
</style>
