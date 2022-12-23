<template>
  <v-app-bar app color="white" elevate-on-scroll elevation="4">
    <v-app-bar-nav-icon
      @click.stop="$emit('drawerChangeState')"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <div class="auth">
      <span style="cursor: pointer" class="mx-2">
        <v-badge dot bottom offset-y="10" offset-x="10" color="green">
          <v-avatar size="40" color="indigo">
            <v-img
              @click="auth = !auth"
              :src="$auth.user && $auth.user.media_url"
              v-if="$auth.user && $auth.user.media_url"
            ></v-img>
            <v-icon dark v-else @click="auth = !auth"
              >mdi-account-circle</v-icon
            >
          </v-avatar>
        </v-badge>
        <v-btn class="ml-2" icon color="transparent" nuxt to="/front/basket">
          <v-icon color="#fff">mdi-cart</v-icon>
        </v-btn>
      </span>
      <div class="menu-item" :style="[auth ? { display: 'block' } : '']">
        <ul>
          <li>
            {{
              $auth.user && $auth.user.first_name ? $auth.user.first_name : "-"
            }}
          </li>
          <li>
            <v-divider color="#fff"></v-divider>
            <span>
              <a href="/front/profile">پروفایل</a>
            </span>
            <span>
              <v-icon color="#fff">mdi-account</v-icon>
            </span>
          </li>
          <li v-if="$auth.user && $auth.user.role_id">
            <span>
              <a href="/panel/dashboard">مدیریت</a>
            </span>
            <span>
              <v-icon color="#fff">mdi-view-dashboard</v-icon>
            </span>
          </li>
          <li style="cursor: pointer" @click="logout">
            <v-divider color="#fff"></v-divider>
            <span>خروج</span>
            <span>
              <v-icon color="#fff">mdi-logout</v-icon>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    auth: false,
  }),
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.auth {
  padding-left: 2rem;
  text-align: left;

  & > span a {
    margin-right: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    color: #a5b7c6;

    &:hover {
      color: #fff;
    }
  }
}
.menu-item {
  width: 200px;
  text-align: center;
  padding: 0.5rem;
  position: absolute;
  z-index: 10;
  left: 50px;
  color: #fff;
  background: #1d262d;
  border-radius: 10px;
  margin-top: 1rem;
  display: none;
  ul {
    list-style: none;
    li {
      margin-top: 0.8rem;
      span a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
}
</style>
