<template>
  <div>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <img src="../../assets/logo.png" alt="">
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
    <mu-snackbar v-if="snackbar" :message="emptyMessage" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />
    <!-- login fail dialog  -->
    <mu-dialog :open="showLoginFailDialog" title="登录失败">
      用户名或密码不正确，请重新输入。
      <mu-flat-button label="确定" slot="actions" primary @click="closeLoginFailDialog" />
    </mu-dialog>
  </div>
</template>
<script>
import {
  requestLogin,
  isLogedin
} from '../../api/api'

export default {
  data() {
      return {
        username: '',
        password: '',
        // 是否显示snackbar
        snackbar: false,
        // 用户名或密码为空的提示消息
        emptyMessage: '',
        // 登录按钮状态
        isBtnLoading: false,
        // 是否显示登录失败对话框
        showLoginFailDialog: false
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
        let _this = this;
        if (!this.username) {
          this.emptyMessage = "请填写用户名";
          this.showSnackbar();
          return
        }
        if (!this.password) {
          this.emptyMessage = "请填写密码";
          this.showSnackbar();
          return
        }
        let loginParams = {
          username: this.username,
          password: this.password
        };
        this.isBtnLoading = true;
        requestLogin(loginParams).then(function(loginedUser) {
          _this.isBtnLoading = false;
          _this.$router.push({
            name: 'todo'
          });
          // localStorage.setItem('user', JSON.stringify(user));
        }, function(error) {
          _this.isBtnLoading = false;
          _this.username = "";
          _this.password = "";
          _this.showLoginFailDialog = true;
        })
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
      closeLoginFailDialog() {
        this.showLoginFailDialog = false;
      }
    },
    mounted: function() {
      if (isLogedin()) {
        this.$router.push({
          name: 'todo'
        })
      }
    }
};
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
