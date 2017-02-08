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
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
html,
body {
  width: 100%;
  height: 100%;
}
.fit {
  width: 100%;
  height: 100%;
}

.fitWidth {
  width: 100%;
}

.scroll {
  overflow: auto;
}
</style>
