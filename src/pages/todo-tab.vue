<template>
  <div class="fit">
    <mu-flexbox orient="vertical" wrap :gutter="0" class="fit">
      <!-- app bar  -->
      <mu-flexbox-item>
        <mu-appbar title="TodoList">
          <mu-icon-button icon='menu' slot="left" @click="showDrawer" />
          <mu-icon-button icon="add" mini slot="right" tooltip="添加计划" @click="AddTodoItem">
          </mu-icon-button>
        </mu-appbar>
      </mu-flexbox-item>
      <!-- app bar end -->
      <!-- tabs -->
      <mu-flexbox-item>
        <mu-tabs class="tabBar" :value="type" @change="handleTabChange" lineClass="tabHighlight">
          <mu-tab value="ImpEmg" :title="types['ImpEmg']" titleClass="ImpEmgTitle" />
          <mu-tab value="ImpNotEmg" :title="types['ImpNotEmg']" titleClass="ImpNotEmgTitle" />
          <mu-tab value="NotImpEmg" :title="types['NotImpEmg']" titleClass="NotImpEmgTitle" />
          <mu-tab value="NotImpNotEmg" :title="types['NotImpNotEmg']" titleClass="NotImpNotEmgTitle" />
        </mu-tabs>
      </mu-flexbox-item>
      <!-- tabs end -->
      <!-- list  -->
      <mu-flexbox :gutter="0" justify="center" class="fit" align="stretch">
        <v-touch v-on:swipeleft="nextTab" v-on:swiperight="previousTab" class="fit scroll" :swipe-options="{threshold:30}">
          <z-list v-if="type === 'ImpEmg'" :todos="ImpEmgTodos" type="ImpEmg" noTodoTipClass="ImpEmgTitle" :showDeleteBtn="bottomNav" :types="types" />
          <z-list v-if="type === 'ImpNotEmg'" :todos="ImpNotEmgTodos" type="ImpNotEmg" noTodoTipClass="ImpNotEmgTitle" :showDeleteBtn="bottomNav" :types="types" />
          <z-list v-if="type === 'NotImpEmg'" :todos="NotImpEmgTodos" type="NotImpEmg" noTodoTipClass="NotImpEmgTitle" :showDeleteBtn="bottomNav" :types="types" />
          <z-list v-if="type === 'NotImpNotEmg'" :todos="NotImpNotEmgTodos" type="NotImpNotEmg" noTodoTipClass="NotImpNotEmgTitle" :showDeleteBtn="bottomNav" :types="types" />
        </v-touch>
      </mu-flexbox>
      <!-- list end -->
      <!-- bottom nav -->
      <mu-paper class="fitWidth">
        <v-touch @swipeleft="toggleBottomNavStatusPanel" @swiperight="toggleBottomNavStatusPanel">
          <mu-bottom-nav :value="bottomNav" @change="toggleBottomNavStatus">
            <mu-bottom-nav-item :value="false" title="未完成" icon="restore" />
            <mu-bottom-nav-item :value="true" title="已完成" icon="favorite" />
          </mu-bottom-nav>
        </v-touch>
      </mu-paper>
      <!-- bottom nav end -->
    </mu-flexbox>
    <!--**************************** 默认不显示 ******************************-->
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
    <!-- confirm logout dialog end -->
    <!-- add Todo Item dialog -->
    <mu-dialog :open="showAddTodoItemDialog" title="添加事项" @close="TodoItemDialogClose">
      <mu-text-field hintText="待办事项" fullWidth v-model="content" />
      <mu-flexbox orient="vertical" align="flex-start">
        <mu-radio :label="types['ImpEmg']" name="type" nativeValue="ImpEmg" v-model="type" labelClass="ImpEmgTitle" />
        <mu-radio :label="types['ImpNotEmg']" name="type" nativeValue="ImpNotEmg" v-model="type" labelClass="ImpNotEmgTitle" />
        <mu-radio :label="types['NotImpEmg']" name="type" nativeValue="NotImpEmg" v-model="type" labelClass="NotImpEmgTitle" />
        <mu-radio :label="types['NotImpNotEmg']" name="type" nativeValue="NotImpNotEmg" v-model="type" labelClass="NotImpNotEmgTitle" />
      </mu-flexbox>
      <mu-flat-button slot="actions" @click="ConfirmedAddTodoItem" primary label="添加" />
      <mu-flat-button slot="actions" primary @click="TodoItemDialogClose" label="取消" />
    </mu-dialog>
    <!-- add Todo Item dialog end-->
  </div>
</template>
<script>
import {
  logOut,
  isLogedin,
  getCurrentUser
} from '../api/api';
import List from '../components/list'
export default {
  data() {
      return {
        drawer: false,
        confirmLogoutDialog: false,
        // activeTab: 'ImpEmg',
        showAddTodoItemDialog: false,
        types: {
          ImpEmg: "重要-紧急",
          ImpNotEmg: "重要-不紧急",
          NotImpEmg: "不重要-紧急",
          NotImpNotEmg: "不重要-不紧急"
        },
        type: 'ImpEmg',
        bottomNav: false,
        todos: [{
          content: "1",
          type: "ImpEmg",
          status: false,
        }, {
          content: "2",
          type: "ImpEmg",
          status: false,
        }, {
          content: "3",
          type: "ImpEmg",
          status: false,
        }, {
          content: "4",
          type: "ImpEmg",
          status: false,
        }, {
          content: "5",
          type: "ImpEmg",
          status: false,
        }, {
          content: "6",
          type: "ImpEmg",
          status: false,
        }, {
          content: "7",
          type: "ImpEmg",
          status: false,
        }, {
          content: "8",
          type: "ImpEmg",
          status: false,
        }, {
          content: "9",
          type: "ImpEmg",
          status: false,
        }, {
          content: "10",
          type: "ImpEmg",
          status: false,
        }, {
          content: "11",
          type: "ImpEmg",
          status: false,
        }, {
          content: "12",
          type: "ImpEmg",
          status: false,
        }, {
          content: "13",
          type: "ImpEmg",
          status: false,
        }, {
          content: "14",
          type: "ImpEmg",
          status: false,
        }, {
          content: "15",
          type: "ImpEmg",
          status: false,
        }, ],
        content: '',

      }
    },
    computed: {
      user: function() {
        console.log(getCurrentUser());
        let currentUser = getCurrentUser();
        let username = currentUser.attributes.username;
        return "Hi~," + username;
      },
      text: function() {
        return this.types[this.type]
      },
      ImpEmgTodos: function() {
        // console.log(this.ImpEmgTodos);
        return this.todos.filter(function(item) {
          return item.type == "ImpEmg";
        })
      },
      ImpNotEmgTodos: function() {
        // console.log(this.ImpNotEmgTodos);
        return this.todos.filter(function(item) {
          return item.type == "ImpNotEmg";
        })
      },
      NotImpEmgTodos: function() {
        // console.log(this.NotImpEmgTodos);
        return this.todos.filter(function(item) {
          return item.type == "NotImpEmg";
        })
      },
      NotImpNotEmgTodos: function() {
        // console.log(this.NotImpNotEmgTodos);
        return this.todos.filter(function(item) {
          return item.type == "NotImpNotEmg";
        })
      }
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
      },
      handleTabChange: function(val) {
        this.type = val;
      },
      AddTodoItem: function() {
        this.radioValue = this.type;
        this.showAddTodoItemDialog = true;
      },
      TodoItemDialogClose: function() {
        this.showAddTodoItemDialog = false;
      },
      ConfirmedAddTodoItem: function() {
        if (!this.content) {
          return
        }
        let todo = {};
        todo.content = this.content;
        todo.type = this.type;
        todo.status = false;
        this.todos.push(todo);
        this.TodoItemDialogClose();
        this.content = "";
        console.log(todo);
      },
      nextTab: function() {
        console.log('swiping left');
        let type = this.type;
        switch (type) {
          case "ImpEmg":
            this.type = "ImpNotEmg";
            break;
          case "ImpNotEmg":
            this.type = "NotImpEmg";
            break;
          case "NotImpEmg":
            this.type = "NotImpNotEmg";
            break;
          case "NotImpNotEmg":
            this.type = "ImpEmg";
            break;
          default:
            this.type = "ImpEmg";
            break;
        }
      },
      previousTab: function() {
        console.log('swiping right');
        let type = this.type;
        switch (type) {
          case "ImpEmg":
            this.type = "NotImpNotEmg";
            break;
          case "ImpNotEmg":
            this.type = "ImpEmg";
            break;
          case "NotImpEmg":
            this.type = "ImpNotEmg";
            break;
          case "NotImpNotEmg":
            this.type = "NotImpEmg";
            break;
          default:
            this.type = "ImpEmg";
            break;
        }
      },
      toggleBottomNavStatus: function(val) {
        this.bottomNav = val;
      },
      toggleBottomNavStatusPanel: function() {
        this.bottomNav = !this.bottomNav;
      }
    },
    components: {
      'z-list': List
    }
}
</script>
<style scoped>
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

.tabBar {
  background-color: #f5f5f5;
}

.no-todo-tip {
  margin-top: 80px;
  width: 100%;
  text-align: center;
  color: #616161;
}
</style>
<style>
.tabHighlight {
  background-color: #03a9f4;
}

.ImpEmg {
  background-color: #d32f2f;
}

.ImpEmgTitle {
  color: #d32f2f;
}

.ImpNotEmg {
  background-color: #f57f17;
}

.ImpNotEmgTitle {
  color: #f57f17;
}

.NotImpEmg {
  background-color: #0d47a1;
}

.NotImpEmgTitle {
  color: #0d47a1;
}

.NotImpNotEmg {
  background-color: #8bc34a;
}

.NotImpNotEmgTitle {
  color: #8bc34a;
}
</style>
<!-- 
	model:
	{
		id:
		content:
		type:
		status:
	}

 -->
<!-- tab 1 -->
<!-- <div v-if="type === 'ImpEmg'" style="border:1px green solid" class="scroll" :class="{fit:ImpEmgTodos.length}">
            <mu-list v-if="ImpEmgTodos.length">
              <mu-list-item v-for="todo in ImpEmgTodos">
                {{ todo.content }} - {{ todo.status?"完成":"未完成" }}
              </mu-list-item>
            </mu-list>
            <p v-else class="no-todo-tip">
              还没有[{{ types['ImpEmg']}}]事项，赶紧添加一个吧~
            </p>
          </div> -->
<!-- tab 2 -->
<!-- <div v-if="type === 'ImpNotEmg'" class="fit">
            <mu-list v-if="ImpNotEmgTodos.length">
              <mu-list-item v-for="todo in ImpNotEmgTodos">
                {{ todo.content }} - {{ todo.status?"完成":"未完成" }}
              </mu-list-item>
            </mu-list>
            <div v-else style="margin-top:80px;text-align:center;border:1px yellow solid;">
              还没有[{{ types['ImpNotEmg']}}]事项，赶紧添加一个吧~
            </div>
          </div> -->
<!-- tab 3 -->
<!-- <div v-if="type === 'NotImpEmg'" class="fit">
            <mu-list v-if="NotImpEmgTodos.length">
              <mu-list-item v-for="todo in NotImpEmgTodos">
                {{ todo.content }} - {{ todo.status?"完成":"未完成" }}
              </mu-list-item>
            </mu-list>
            <div v-else class="no-todo-tip">
              还没有[{{ types['NotImpEmg']}}]事项，赶紧添加一个吧~
            </div>
          </div> -->
<!-- tab 4 -->
<!-- <div v-if="type === 'NotImpNotEmg'" class="fit">
    <mu-list v-if="NotImpNotEmgTodos.length">
  <mu-list-item v-for="todo in NotImpNotEmgTodos">
    {{ todo.content }} - {{ todo.status?"完成":"未完成" }}
  </mu-list-item>
</mu-list>
<div v-else class="no-todo-tip">
  还没有[{{ types['NotImpNotEmg']}}]事项，赶紧添加一个吧~
</div>
</div> -->
