<template>
  <div>
    <mu-list v-if="todoData.length">
      <!-- <v-touch @panleft="showOperate" v-for="todo in todos" v-bind:panleft-options="{ direction: 'horizontal', threshold: 10 }"> -->
      <transition-group :name="fadeDirection">
        <mu-list-item v-for="(todo,index) in todoData" :title="todo.content" :key="index">
          <mu-icon :value="iconType" slot="left" @click="toogleStatus(todo)"/>
          <mu-icon-button v-show="showDeleteBtn" icon="delete" slot="right"  @click="deleteTodo(todo)" touch/>
        </mu-list-item>
      </transition-group>
      <!-- </v-touch> -->
    </mu-list>
    <div v-else class="no-todo-tip">
      还没有<span :class="noTodoTipClass"><span style="font-weight:bold;">{{ !showDeleteBtn?"未完成":"已完成" }}</span>的[{{ type }}]</span>事项，赶紧添加一个吧~
    </div>
  </div>
</template>
<script>
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
    noTodoTipClass: {
      type: String
    },
    showDeleteBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    todoData: function() {
      let _this = this;
      return this.todos.filter(function(item) {
        return item.status === _this.showDeleteBtn;
      })

    },
    fadeDirection:function() {
    	return this.showDeleteBtn?'fade-right':'fade-left';
    },
    iconType:function() {
    	return this.showDeleteBtn?'redo':'restore'
    }
  },
  methods: {
    toogleStatus: function(item) {
    	// if (!this.showDeleteBtn) {
      		item.status = !item.status;
    	// }
    },
    deleteTodo: function(item) {
      console.log('delete todo');
      item.status = false;
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
