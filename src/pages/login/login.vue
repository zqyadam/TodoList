<template>
  <div>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <img src="../../assets/logo.png" alt="">
        <mu-text-field label="邮箱" hintText="请输入邮箱" type="email" icon="email" fullWidth v-model="email" :errorText="errorEmailMsg" />
        <mu-text-field label="密码" hintText="请输入密码" type="password" icon="remove_red_eye" fullWidth v-model="password" :errorText="errorPasswordMsg" />
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <mu-raised-button :label="btnText" primary class="btn" :disabled="isBtnLoading" @click.native="login" />
        <p>还没有账号？注册一个吧~
          <mu-flat-button label="立即注册" secondary @click.native="registe" />
        </p>
      </mu-col>
    </mu-row>
    <!-- snackbar -->
    <mu-snackbar v-if="snackbar" :message="emptyMessage" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />
    <!-- login fail dialog  -->
    <mu-dialog :open="showLoginFailDialog" title="登录失败">
      <span>{{ errorLoginMsg }}</span>
      <mu-flat-button label="确定" primary @click="closeLoginFailDialog" secondary slot="actions" />
    </mu-dialog>
  </div>
</template>
<script>
import {
  requestLogin,
  isLogedin,
} from '../../api/api'
import {
  emailCheck
} from '../../api/common';
export default {
  data() {
      return {
        email: '',
        password: '',
        // 是否显示snackbar
        snackbar: false,
        // 用户名或密码为空的提示消息
        emptyMessage: '',
        // 登录按钮状态
        isBtnLoading: false,
        // 是否显示登录失败对话框
        showLoginFailDialog: false,
        // 登录错误信息
        errorLoginMsg: ""
      }
    },
    computed: {
      btnText: function() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      },
      errorEmailMsg: function() {
        if (this.email) {
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
      }
    },
    methods: {
      login: function() {
        let _this = this;
        if (!this.email) {
          this.emptyMessage = "请填写邮箱";
          this.showSnackbar();
          return
        }
        if (!this.password) {
          this.emptyMessage = "请填写密码";
          this.showSnackbar();
          return
        }
        let loginParams = {
          email: this.email,
          password: this.password
        };
        this.isBtnLoading = true;
        requestLogin(loginParams).then(function(loginedUser) {
          _this.isBtnLoading = false;
          _this.$router.push({
            name: 'todo'
          });
          // localStorage.setItem('user', JSON.stringify(user));
        }, function(err) {
          switch (err.code) {
            case 211:
              _this.errorLoginMsg = "用户不存在，立即注册一个吧~";
              _this.email = "";
              _this.password = "";
              break;
            case 210:
              _this.errorLoginMsg = "用户名与密码不匹配，请重新输入密码。";
              _this.password = "";
              break;
            default:
              _this.errorLoginMsg = "赶紧注册一个账号并开始使用吧~~";
              break;
          }
          _this.isBtnLoading = false;
          _this.showLoginFailDialog = true;
        })
      },
      registe: function() {
        this.$router.push({
          name: 'registe'
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
