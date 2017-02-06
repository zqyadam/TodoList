<template>
  <mu-list>
    <mu-sub-header>{{ title }}</mu-sub-header>
    <mu-list-item v-for="todo in todos" :title="todo.content" :value="todo.id+''" @click="handleToggle(todo.id)">
      <mu-checkbox v-model="todo.done" slot="left" />
    </mu-list-item>
  </mu-list>
</template>
<script>
export default {
  data() {
      return {
        todos: [{
          id: 1,
          content: 'item 1',
          done: false
        }, {
          id: 2,
          content: 'item 2',
          done: false
        }, {
          id: 3,
          content: 'item 3',
          done: false
        }, {
          id: 4,
          content: 'item 4',
          done: false
        }, {
          id: 5,
          content: 'item 5',
          done: false
        }, {
          id: 6,
          content: 'item 6',
          done: false
        }, {
          id: 7,
          content: 'item 7',
          done: false
        }, {
          id: 8,
          content: 'item 8',
          done: false
        }, {
          id: 9,
          content: 'item 9',
          done: false
        }]
      }
    },
    props: {
      bgColor: {
        type: String,
        default: 'red'
      },
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleToggle: function(id) {
        console.log(id);
        // this.todo.find(id).done = !this.todo.find(id).done;
      }
    }
}
</script>
<style scoped>
	
</style>