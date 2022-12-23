<template>
  <div>
    <v-app-bar
      color="transparent"
      class="el"
      app
      :style="{
        padding: $vuetify.breakpoint.mdAndUp ? '0px 15px' : '',
      }"
    >
      <v-toolbar-title
        v-if="$vuetify.breakpoint.mdAndUp"
        class="text-md-h5 text-sm-body-2 font-weight-bold pointer"
        @click="$router.push('/')"
      >
        <div>
          <span
            class="text-body-1 font-weight-bold white--text"
            :class="{ 'text-sm-body-2': $vuetify.breakpoint.sm }"
            >Free</span
          >
          <span
            class="blue--text accent-3"
            :class="{ 'text-sm-body-2': $vuetify.breakpoint.sm }"
            >Picks</span
          >
        </div>
      </v-toolbar-title>
      <v-menu transition="slide-x-transition" bottom right v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            v-bind="attrs"
            v-on="on"
            style="color: #fff"
          ></v-app-bar-nav-icon>
        </template>
        <ul class="menu-side">
          <li>
            <nuxt-link to="/">صفحه ی اصلی</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/front/plans">طرح ها</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/front/files">فایل ها</nuxt-link>
          </li>
          <li class="menu-item-side">
            <nuxt-link to="/front/panel" style="width: 100px">
              دسته بندی
              <v-icon color="black">mdi-chevron-up</v-icon>
            </nuxt-link>
            <div class="submenu-side">
              <v-list>
                <v-list-item
                  link
                  nuxt
                  class="mt-2"
                  style="width: 120px"
                  :to="{
                    path: '/front/categories',
                    query: { category: category.name.replace(/\s+/g, '_') },
                  }"
                  v-for="(category, Idx) in categories"
                  :key="Idx"
                >
                  <v-list-item-title>{{ category.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </li>
        </ul>
      </v-menu>

      <v-spacer />
      <div
        v-if="$vuetify.breakpoint.mdAndUp"
        class="d-flex justify-space-around align-center"
        :style="$vuetify.breakpoint.md ? 'width:64%' : 'width:67%'"
      >
        <ul class="menu">
          <li>
            <nuxt-link to="/">صفحه ی اصلی</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/front/plans">طرح ها</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/front/files">فایل ها</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link style="width: 100px" to="/front/categories">
              دسته بندی
              <v-icon color="black">mdi-chevron-up</v-icon>
            </nuxt-link>
            <div class="submenu">
              <v-list>
                <v-list-item
                  link
                  nuxt
                  class="mt-2"
                  style="width: 120px"
                  :to="{
                    path: '/front/categories',
                    query: { category: category.name.replace(/\s+/g, '_') },
                  }"
                  v-for="(category, Idx) in categories"
                  :key="Idx"
                >
                  <v-list-item-title>{{ category.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </li>
        </ul>
        <div
          class="cart"
          style="cursor: pointer"
          @click="$router.push('/front/basket')"
        >
          <v-badge :content="content ? content : '0'">
            <v-icon color="#fff">mdi-cart</v-icon>
          </v-badge>
        </div>
      </div>

      <v-divider vertical class="mx-md-5 mx-2" />
      <div class="my-2" v-if="!$auth.user">
        <v-btn
          outlined
          color="white"
          to="/authenticate?login"
          :width="$vuetify.breakpoint.md ? '100px' : '120px'"
          class="pa-1 text-subtitle-2"
        >
          <v-icon :class="{ 'text-sm-body-2': $vuetify.breakpoint.md }"
            >mdi-account</v-icon
          >
          <span
            class="font-weight-bold"
            :class="{ 'text-sm-body-2': $vuetify.breakpoint.md }"
            >ورود/ ثبت نام</span
          >
        </v-btn>
      </div>
      <v-menu offset-y v-else>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" style="cursor: pointer" class="mx-2">
            <v-badge dot bottom offset-y="10" offset-x="10" color="green">
              <v-avatar size="40" color="indigo">
                <v-img
                  :src="$auth.user && $auth.user.media_url"
                  v-if="$auth.user && $auth.user.media_url"
                ></v-img>
                <v-icon dark v-else>mdi-account-circle</v-icon>
              </v-avatar>
            </v-badge>
          </span>
        </template>
        <v-list width="200" class="py-0 text-center">
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-avatar color="indigo" v-if="$auth.user.media_url">
                <img :src="$auth.user.media_url" alt />
              </v-avatar>
              <v-avatar color="indigo" v-else>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-bodi-2 font-weight-bold">{{
                $auth.user.first_name
              }}</v-list-item-title>
              <v-list-item-title class="text-body-2 font-weight-bold"
                >آنلاین</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item router to="/front/profile">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-account</v-icon>پروفایل
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item router to="/panel/dashboard" v-if="$auth.user.role_id">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-account</v-icon>مدیریت
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click.prevent="logout">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-logout</v-icon>خروج
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-row>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
  }),

  computed: {
    content() {
      return (this.$store.state.option.basket || []).length;
    },
    categories() {
      return this.$store.state.category.navBarCategory || [];
    },
  },
  methods: {
    async logout() {
      this.overlay = true;
      await this.$auth.logout();
      await this.$router.push("/");
      this.overlay = false;
    },
  },
};
</script>

<style scoped lang="scss">
.menu-side {
  width: 100%;
  height: 100%;
  background: #fff;
}
.menu-side li {
  padding: 0.5rem;
  margin: 0.5rem;
  text-align: center;
}
.menu {
  width: 60%;
}

.menu li {
  margin-left: 0.8rem;
}
.menu {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  height: 25px;
  margin: 1.25rem;
}
a {
  text-decoration: none;
  display: block;
  width: 100%;
  margin-right: 6px;
  color: #fff;
  font-weight: bold;
}
.submenu,
.submenu-side {
  display: none;
}

.menu-item:hover .submenu,
.menu-item-side:hover .submenu-side {
  display: block;
}
>>> .v-menu__content {
  width: 250px;
  height: 250px;
}

>>> .v-application a {
  color: black;
}
</style>
