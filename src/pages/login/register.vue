<template>
  <div>
    <mu-appbar title="注册">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="$router.back()" />
    </mu-appbar>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <img src="../../assets/logo.png" alt="">
        <mu-text-field label="用户名" hintText="输入邮箱账号" type="email" icon=":iconfont icon-email" fullWidth v-model="email" :errorText="errorEmailMsg" />
        <mu-text-field label="用户昵称" hintText="输入昵称" type="text" icon=":iconfont icon-permidentity" fullWidth v-model="username" />
        <mu-text-field label="密码" hintText="输入密码" type="password" icon=":iconfont icon-lock2" fullWidth v-model="password" :errorText="errorPasswordMsg" />
        <mu-text-field label="重复密码" hintText="重复输入密码" type="password" icon=":iconfont icon-lock_outline" fullWidth v-model="repeatPassword" :errorText="errorRepeatPasswordMsg" />
        <mu-raised-button :label="btnText" labelPosition="after" primary fullWidth @click.native="registe" />
      </mu-col>
    </mu-row>
    <!-- 不显示 -->
    <mu-snackbar v-if="snackbar" :message="snackBarMsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />
  </div>
</template>
<script>
import {
  registeUser,
} from '../../api/api';
import {
  emailCheck
} from '../../api/common';
export default {
  data() {
      return {
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
        snackbar: false,
        btnText: '注册',
        snackBarMsg: ''
      };
    },
    computed: {
      errorEmailMsg: function() {
        if (this.email) {
          // var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
          return !emailCheck(this.email) ? "邮箱格式不正确" : "";
        } else {
          return ""
        }
      },
      errorPasswordMsg: function() {
        if (this.password) {
          return (this.password.length < 6) ? "密码长度必须不能小于6位" : "";
        } else {
          return "";
        }
      },
      errorRepeatPasswordMsg: function() {
        if (this.password && this.repeatPassword && (this.password != this.repeatPassword)) {
          return "两次密码输入的不一致"
        } else {
          return "";
        }
      },
    },
    methods: {
      registe: function() {
        if (this.email && this.username && this.password && this.repeatPassword && !this.errorEmailMsg && !this.errorPasswordMsg && !this.errorRepeatPasswordMsg) {
          let userInfo = {};
          userInfo.email = this.email;
          userInfo.username = this.username;
          userInfo.password = this.password;
          this.btnText = "注册中..."
          registeUser(userInfo).then(loginedUser => {
            this.btnText = "注册成功";
            this.$router.push({
              name: 'todo'
            })
          }, err => {
            console.error(err);
            this.snackBarMsg = err.message;
            this.showSnackbar();
          })
          console.log('checked');
        } else {
          this.snackBarMsg = "信息不正确，请检查"
          this.showSnackbar();
          this.btnText= '注册';
        }
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
  padding: 15px;
  text-align: center;
}

.center img {
  margin: 15px auto;
  padding-left: 10px;
  padding-top: 10px;
  width: 100%;
}

.btn {
  margin: 20px;
}
</style>
