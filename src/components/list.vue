<template>
  <div>
    <mu-list v-if="todoData.length">
      <mu-sub-header><span :class="noTodoTipClass">{{ types[type]+'[' + (!showDeleteBtn?("未完成("+undoneCount+")"):("已完成("+doneCount+")")) + ']'}}</span></mu-sub-header>
      <!--  -->
      <v-touch v-on:press="editTodo(todo)" v-for="(todo,index) in todoData" >
        <mu-list-item :key="index">
        <span slot="title" v-html="toMarked(todo.attributes.content)"></span>
          <mu-icon :value="iconType" slot="left" @click="toggleStatus(todo)" />
          <mu-icon-button v-show="showDeleteBtn" icon=":iconfont icon-delete" slot="right" @click="deleteTodo(todo)" touch/>
          <mu-icon-button icon=":iconfont icon-icon26" @click="editTodo(todo)" touch slot="right" :style="{'margin-right':showDeleteBtn?'60px':'0px'}" />
          <span style="color:#ccc;" slot="describe">更新时间：{{     getUpdatedTime(todo) }}</span>
        </mu-list-item>
      </v-touch>
    </mu-list>
    <div v-else class="no-todo-tip">
      还没有<span :class="noTodoTipClass"><span style="font-weight:bold;">{{ !showDeleteBtn?"未完成":"已完成" }}</span>的[{{ types[type] }}]</span>事项，赶紧添加一个吧~
    </div>
    <!--************************** 不显示内容 ****************************-->
    <!-- edit Todo Item dialog -->
    <mu-dialog :open="editTodoDialog" title="修改Todo" @close="closeEditTodoDialog">
      <mu-flexbox orient="vertical" align="stretch">
        <!-- 编辑Todo -->
        <mu-flexbox-item>
          <mu-text-field label="编辑内容" hintText="输入Todo内容" fullWidth v-model="todoTempCopy.content" multiLine :rows="2" :rowsMax="4"/>
        </mu-flexbox-item>
        <!-- 选择类型 -->
        <mu-flexbox-item>
          <mu-select-field label="选择类型" v-model="todoTempCopy.type" fullWidth :dropDownlabelClass="labelClass">
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
      <mu-flat-button slot="actions" @click="saveTodoChange" icon=":iconfont icon-save" label="保存" />
      <mu-flat-button slot="actions" @click="closeEditTodoDialog" label="取消" secondary/>
    </mu-dialog>
    <!-- edit Todo Item dialog end -->
  </div>
</template>
<script>
import {
  SaveTodoItem
} from '../api/api';
import {dateFormat} from '../api/common';
import marked from 'marked'
export default {
  data: function() {
    return {
      editTodoDialog: false,
      todoTempCopy: {
        content: '',
        type: '',
        status: false
      },
      todoTemp: null,
      doneCount:0,
      undoneCount:0
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
      let todoData = this.todos.filter(function(item) {
        item = item.toJSON();
        return (item.status === _this.showDeleteBtn) && (item.enable);
      })
      this.$emit('todoDataChange', todoData.length);
      return todoData;
    },
    fadeDirection: function() {
      return this.showDeleteBtn ? 'fade-right' : 'fade-left';
    },
    iconType: function() {
      return this.showDeleteBtn ? ':iconfont icon-question' : ':iconfont icon-wancheng'
    },
    labelClass: function() {
      return this.todoTempCopy.type + 'Title';
    }
  },
  watch: {
    todoData: function() {
      this.doneCount = this.showDeleteBtn ? this.todoData.length : (this.todos.length - this.todoData.length);
      this.undoneCount = this.todos.length - this.doneCount;
      this.$emit('getDoneCount', this.doneCount, this.todos.length);
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
      item = item.toJSON()
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
      delete _this.todoTempCopy.objectId;
      delete _this.todoTempCopy.createdAt;
      delete _this.todoTempCopy.updatedAt;
      Object.keys(this.todoTempCopy).forEach(function(key) {
        _this.todoTemp.set(key, _this.todoTempCopy[key])
      })
      _this.todoTemp.save();
      this.closeEditTodoDialog();
    },
    getUpdatedTime:function(todo) {
      Date.prototype.format = dateFormat;
      var updatedTime = new Date(todo.updatedAt).format("yyyy-MM-dd hh:mm:ss");
      return updatedTime;
    },
    toMarked:function(markedText) {
      let renderer = new marked.Renderer();
      renderer.paragraph = text=>text;
      return marked(markedText,{renderer:renderer });
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
