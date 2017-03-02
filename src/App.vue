<template>
  <router-view></router-view>
</template>
<script>
import Login from './pages/login/login'

export default {
  name: 'app',
  components: {
    Login
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
}
</style>
