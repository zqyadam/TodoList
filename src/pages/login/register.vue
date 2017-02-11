<template>
  <div>
    <mu-appbar title="注册">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="$router.back()" />
    </mu-appbar>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <img src="../../assets/logo.png" alt="">
        <mu-text-field label="用户名" hintText="输入邮箱账号" type="text" icon="email" fullWidth v-model="username" />
        <mu-text-field label="密码" hintText="输入密码" type="password" icon="lock" fullWidth v-model="password" />
        <mu-text-field label="密码" hintText="重复输入密码" type="password" icon="lock_outline" fullWidth v-model="repeatPassword" />
        <mu-raised-button label="注册" labelPosition="after" primary fullWidth>
      </mu-col>
    </mu-row>
  </div>
  <!-- <mu-flexbox align="stretch" justify="center" orient="vertical" wrap style="border:1px solid red;" :gutter="0" class="fit">
    <mu-flexbox-item style="border:1px solid red;">
      <mu-text-field label="浮动标签" labelFloat/>
    </mu-flexbox-item>
    <mu-flexbox-item style="border:1px solid red;">
      <mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat/>
    </mu-flexbox-item>
    <mu-flexbox-item style="border:1px solid red;">
      <mu-raised-button label="Primary" primary />
    </mu-flexbox-item>
  </mu-flexbox> -->
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      repeatPassword: ''
    };
  }
}
</script>
<style scoped>
.center {
  margin: 0px auto;
  padding: 20px;
  text-align: center;
}

.center img {
  margin: 35px auto;
  padding-left: 10px;
  padding-top: 35px;
  width: 100%;
}

.btn {
  margin: 20px;
}
</style>
