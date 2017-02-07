<template>
  <div>
    <mu-appbar title="编辑Todo">
      <mu-icon-button icon="arrow_back" slot="left" />
      <mu-icon-button icon="save" slot="right" @click="saveTodo" />
    </mu-appbar>
    <mu-flexbox orient="vertical" align="stretch" style="border:1px red solid">
      <mu-flexbox-item style="border:1px blue solid">
        <mu-text-field hintText="编辑Todo" fullWidth style="padding:10px;" v-model="todoCopy.content" />
      </mu-flexbox-item>
      <mu-flexbox-item style="padding:10px;border:1px blue solid"></mu-flexbox-item>
      <mu-flexbox-item style="padding:10px;border:1px blue solid"></mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      todoCopy: {
        content: '',
        type: '',
        status: false
      }
    }
  },
  mounted: function() {
    this.todoCopy.content = this.$route.params.content;
    this.todoCopy.type = this.$route.params.type;
    this.todoCopy.status = this.$route.params.status;
  },
  methods: {
    inputTodo: function(val) {
      this.todoCopy.content = val;
      console.log(this.$route.params);
      console.log(this.todoCopy);
    },
    saveTodo: function() {
      this.$route.params.content = this.todoCopy.content;
      this.$route.params.type = this.todoCopy.type;
      this.$route.params.status = this.todoCopy.status;
      this.$router.back();
    }
  }
}
</script>
<style scoped>
</style>
