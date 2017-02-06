<template>
  <div class="fit">
    <mu-flexbox orient="vertical" wrap :gutter="0" class="fit">
      <mu-flexbox :gutter="0">
        <mu-flexbox-item>
          <mu-appbar title="TodoList">
            <mu-icon-button icon='menu' slot="left" @click="showDrawer" />
            <mu-icon-menu icon="add" slot="right" tooltip="添加计划" tooltipPosition="bottom-left" autoWidth >
              <mu-menu-item title="重要-紧急" class="ImportantEmergencyTitle" />
              <mu-menu-item title="重要-不紧急" titleClass="NonImportantEmergencyTitle" />
              <mu-menu-item title="不重要-紧急" titleClass="ImportantNonEmergencyTitle" />
              <mu-menu-item title="不重要-不紧急" titleClass="NonImportantNonEmergencyTitle" />
            </mu-icon-menu>
            <!-- <mu-icon-button icon='expand_more' slot="right" /> -->
          </mu-appbar>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox :gutter="0" justify="space-between" class="fit" align="stretch">
        <!-- style="background-color:blue;height:100%;" -->
        <mu-flexbox orient="vertical" :gutter="0">
          <mu-flexbox-item class="fit scroll ImportantEmergency">
            <z-listblock title="重要-紧急"></z-listblock>
          </mu-flexbox-item>
          <mu-flexbox-item class="fit scroll NonImportantEmergency">
            <z-listblock title="重要-不紧急"></z-listblock>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox :gutter="0" orient="vertical">
          <mu-flexbox-item class="fit scroll ImportantNonEmergency">
            <z-listblock title="不重要-紧急"></z-listblock>
          </mu-flexbox-item>
          <mu-flexbox-item class="fit scroll NonImportantNonEmergency">
            <z-listblock title="不重要-不紧急"></z-listblock>
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-flexbox>
    </mu-flexbox>
    <!-- 默认不显示 -->
    <!-- drawer left -->
    <mu-drawer :open="drawer" :docked="false" @close="drawer=false">
      <mu-list>
        <mu-list-item :title="user" />
        <mu-list-item title="Menu Item 2" />
        <mu-list-item title="Menu Item 3" />
        <mu-list-item title="登出" @click.native="showLogoutConfirmDialog" />
        <mu-content-block class="content"><span style="font-weight:bold;">关于这个东西：</span>这个项目是为了学习Vue而制作，界面利用的是muse-ui框架，使用vue-router进行页面跳转，后端数据的存储使用LeanCloud的免费版。
        </mu-content-block>
      </mu-list>
    </mu-drawer>
    <!-- confirm logout dialog -->
    <mu-dialog :open="confirmLogoutDialog" title="确认登出" @close="closeLogoutConfirmDialog">
      退出登录后将无法继续使用，确定退出？
      <mu-flat-button slot="actions" @click="closeLogoutConfirmDialog" label="取消" />
      <mu-flat-button slot="actions" @click="logout" label="退出" secondary/>
    </mu-dialog>
  </div>
</template>
<script>
import {
  logOut,
  isLogedin,
  getCurrentUser
} from '../api/api';
import ListBlock from '../components/listblock'
export default {
  data() {
      return {
        drawer: false,
        confirmLogoutDialog: false

      }
    },
    computed: {
      user: function() {
        console.log(getCurrentUser());
        let currentUser = getCurrentUser();
        let username = currentUser.attributes.username;
        return "Hi~," + username;
      }
    },
    components: {
      'z-listblock': ListBlock
    },
    methods: {
      showDrawer: function() {
        this.drawer = true
      },
      logout: function() {
        logOut();
        if (!isLogedin()) {
          this.closeLogoutConfirmDialog();
          // this.drawer = false;
          this.$router.push('/login')
        }
      },
      showLogoutConfirmDialog: function() {
        this.confirmLogoutDialog = true;
        this.drawer = false;
      },
      closeLogoutConfirmDialog: function() {
        this.confirmLogoutDialog = false;
        this.drawer = false;
      }
    }
}
</script>
<style scoped>
.fit {
  width: 100%;
  height: 100%;
}

.content {
  margin-top: 10px;
}

.ImportantEmergency {
  background-color: #e57373;
}

.ImportantEmergencyTitle{
	color:#e57373;
}

.ImportantNonEmergency {
  background-color: #dce775;
}
.ImportantNonEmergencyTitle {
  color: #dce775;
}

.NonImportantEmergency {
  background-color: #4fc3f7;
}
.NonImportantEmergencyTitle {
  color: #4fc3f7;
}

.NonImportantNonEmergency {
  background-color: #aed581;
}
.NonImportantNonEmergencyTitle {
  color: #aed581;
}
.scroll {
  overflow: scroll;
}

.pad {
  padding: 0 !important;
}
</style>
