<template>
  <div>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <img src="../assets/logo.png" alt="">
        <mu-text-field label="用户名" hintText="请输入用户名" type="text" icon="group" fullWidth v-model="username" />
        <mu-text-field label="密码" hintText="请输入密码" type="password" icon="remove_red_eye" fullWidth v-model="password" />
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <mu-raised-button :label="btnText" primary class="btn" :disabled="isBtnLoading" @click.native="login" />
        <mu-raised-button label="注册" class="btn" />
      </mu-col>
    </mu-row>
    <!-- snackbar -->
    <mu-snackbar v-if="snackbar" :message="message" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />
    <!-- circular progress -->
  </div>
</template>
<script>
export default {
  data() {
      return {
        username: '',
        password: '',
        snackbar: false,
        message: '',
        isBtnLoading: false,
      }
    },
    computed: {
      btnText: function() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login: function() {
        if (!this.username) {
          this.message = "请填写用户名";
          this.snackbar = true;
          return
        }
        if (!this.password) {
          this.message = "请填写密码";
          this.snackbar = true;
          return
        }
        let loginParams = {
          username: this.username,
          password: this.password
        };
        this.isBtnLoading = true;
      },
      showSnackbar() {
        this.snackbar = true
        if (this.snackTimer) clearTimeout(this.snackTimer)
        this.snackTimer = setTimeout(() => {
          this.snackbar = false
        }, 2000)
      },
      hideSnackbar() {
        this.snackbar = false
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
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
  padding-top: 40px;
  width: 100%;
}

.btn {
  margin: 20px;
}
</style>
