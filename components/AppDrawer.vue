<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
  >
    <NuxtLink to="/" style="text-decoration: none;">
      <v-toolbar color="primary darken-1" dark>
        <img src="../static/img/logoDHTL.png" height="36" alt="Logo">
        <v-toolbar-title class="ml-0 pl-3">
          <span class="hidden-sm-and-down">Thư viện</span>
        </v-toolbar-title>
      </v-toolbar>
    </NuxtLink>
    

    <div class="list">
      <div class="list_menu">
        <div class="list_menu_text">Danh mục</div>
        <NuxtLink to="/book" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">book</v-icon>
          <div class="list_menu_conponent_name">Sách</div>
        </NuxtLink>
        <NuxtLink to="/author" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">accessibility</v-icon>
          <div class="list_menu_conponent_name">Tác giả</div>
        </NuxtLink>
        <NuxtLink to="/publisher" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">account_balance</v-icon>
          <div class="list_menu_conponent_name">Nhà xuất bản</div>
        </NuxtLink>
        <NuxtLink to="/category" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">dns</v-icon>
          <div class="list_menu_conponent_name">Thể loại</div>
        </NuxtLink>
        <NuxtLink to="/order" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">compare_arrows</v-icon>
          <div class="list_menu_conponent_name">Mượn trả</div>
        </NuxtLink>
        <NuxtLink to="/statistical" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">leaderboard</v-icon>
          <div class="list_menu_conponent_name">Thống kê</div>
        </NuxtLink>
      </div>
    </div>

    <!-- Quản lí người dùng -->
    <div class="list" v-if="!this.check">
      <div class="list_menu">
        <div class="list_menu_text">Quản lí người dùng</div>
        <NuxtLink to="/user/employee" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">assignment_ind</v-icon>
          <div class="list_menu_conponent_name">Nhân viên</div>
        </NuxtLink>
        <NuxtLink to="/user/reader" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">face</v-icon>
          <div class="list_menu_conponent_name">Độc giả</div>
        </NuxtLink>
      </div>
    </div>
    

    <!-- tài khoản -->
    <div class="list">
      <div class="list_menu_last">
        <div class="list_menu_text">Tài Khoản</div>
        <NuxtLink to="/account" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">account_circle</v-icon>
          <div class="list_menu_conponent_name">Thông tin</div>
        </NuxtLink>
        <NuxtLink to="/account/changepass" class="list_menu_conponent">
          <v-icon class="list_menu_conponent_icon">cached</v-icon>
          <div class="list_menu_conponent_name">Đổi mật khẩu</div>
        </NuxtLink>
        <div class="list_menu_conponent" @click="handleLogout">
          <v-icon class="list_menu_conponent_icon">exit_to_app</v-icon>
          <div class="list_menu_conponent_name">Đăng xuất</div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
  import menu from '@/api/menu';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'app-drawer',
    components: {
      VuePerfectScrollbar,
    },
    props: {
      expanded: {
        type: Boolean,
        default: true
      },
    },
    data: () => ({
      check: localStorage.getItem('permission')=='ROLE_USER',
      mini: false,
      menus: menu,
      scrollSettings: {
        maxScrollbarLength: 160
      }
    }),
    computed: {
      drawer: {
        get() {
          return this.$store.state.drawer
        },
        set(val) {
          this.$store.commit('drawer', val)
        }
      },
      computeGroupActive() {
        return true;
      },
      sideToolbarColor() {
        return this.$vuetify.options.extra.sideNav;
      }
    },
    methods: {
      handleLogout () {
        localStorage.clear();
        this.$router.push('/login')
      },
      genChildTarget(item, subItem) {
        if (subItem.href) return;
        if (subItem.component) {
          return {
            name: subItem.component,
          };
        }
        return {name: `${item.group}/${(subItem.name)}`};
      },
    }
  };
</script>

<style scoped>
.list{
  width: 100%;
}
.list_menu{
  width: 100%;
  border-bottom: 2px solid #999;
}
.list_menu_last{
  width: 100%;
  border-bottom:none;
}
.list_menu_text{
  color: #666;
  margin:10px 0;
  font-size:18px;
  padding-left: 10px;
}
.list_menu_conponent{
  display:flex;
  align-items: center;
  padding:15px 20px;
  cursor: pointer;
  text-decoration: none;
}
.list_menu_conponent:hover{
  background-color:rgb(248, 246, 248);
}
.list_menu_conponent:hover .list_menu_conponent_icon {
  color:blue;
}
.list_menu_conponent:hover .list_menu_conponent_name {
  color:blue;
}
.list_menu_conponent:focus {
  background-color:rgb(225, 225, 225);
}
.list_menu_conponent_icon{
  font-size:18px;
  padding: 0 5px;
}
.list_menu_conponent_name{
  margin-left:10px;
  font-size:15px;
  color: #555;
}

</style>
