<template>
  <v-row v-if="loading">
    <v-skeleton-loader
      v-bind="attrs"
      type="card-avatar, article, actions"
      width="100%"
      height="50px"
    ></v-skeleton-loader>
  </v-row>
  <v-row dense style="direction: ltr; padding-top: 1.5rem" v-else>
    <v-col :md="$vuetify.breakpoint.mdAndUp ? '3' : '6'" sm="6" lg="3">
      <div class="auth" v-if="!$auth.loggedIn">
        <span>
          <a href="/authenticate">ورود</a>
        </span>
        <span>
          <a href="/authenticate"> ثبت نام </a>
        </span>
      </div>
      <div class="auth" v-else>
        <v-badge dot bottom offset-y="10" offset-x="10" color="green">
          <v-avatar size="40" color="indigo" style="cursor: pointer">
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
        <div class="menu-item" :style="[auth ? { display: 'block' } : '']">
          <ul>
            <li>
              {{
                $auth.user && $auth.user.first_name
                  ? $auth.user.first_name
                  : "-"
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
    </v-col>
    <v-col md="6" sm="6" lg="6" v-if="$vuetify.breakpoint.mdAndUp">
      <v-row>
        <v-col cols="12">
          <div class="navbar">
            <ul class="category">
              <li>
                <a href="/front/files">فایل ها</a>
              </li>
              <li>
                <a href="/front/plans">طرح ها</a>
              </li>
              <li @click="active = !active">
                <span>
                  <v-icon color="#a5b7c6">{{
                    active ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                  دسته بندی
                </span>
                <div
                  class="sub-category"
                  :style="[!active ? { display: 'none' } : '']"
                >
                  <ul>
                    <li v-for="category in categories" :key="category.id">
                      <nuxt-link
                        :to="{
                          path: '/front/categories',
                          query: {
                            category: category.name,
                          },
                        }"
                      >
                        {{ category.name }}
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col :md="$vuetify.breakpoint.mdAndUp ? '3' : '6'" sm="6" lg="3">
      <p class="brand" v-if="$vuetify.breakpoint.mdAndUp">
        <a href="/">Free picks</a>
      </p>
      <p style="width: 100%; text-align: right; padding-right: 1rem" v-else>
        <v-icon color="#fff" @click="toggle = !toggle">mdi-menu</v-icon>
      </p>
    </v-col>
    <v-row v-if="toggle">
      <div
        class="sidebar"
        :style="[toggle ? { display: 'block' } : { display: 'none' }]"
      >
        <v-icon color="#fff" @click="toggle = !toggle"> mdi-close </v-icon>
        <div>
          <ul class="sidebar-menu">
            <li>
              <a href="/front/files">فایل ها </a>
            </li>
            <li>
              <a href="/front/files">طرح ها </a>
            </li>
            <li @click="active = !active" style="width: 100%">
              <span
                style="
                  color: #a5b7c6;
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <v-icon color="#a5b7c6">{{
                  active ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
                دسته بندی
              </span>
              <div
                class="sub-category"
                :style="[!active ? { display: 'none' } : '']"
              >
                <ul>
                  <li v-for="category in categories" :key="category.id">
                    <nuxt-link
                      :to="{
                        path: '/front/categories',
                        query: {
                          category: category.name,
                        },
                      }"
                    >
                      {{ category.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </v-row>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      auth: false,
      active: false,
      toggle: false,
      loading: false,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
  },
  created() {
    this.loading = true;
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/");
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
.auth {
  padding-left: 2rem;
  text-align: left;

  & > span a {
    margin-right: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    color: #fff;

    &:hover {
      color: #a5b7c6;
    }
  }
}
.brand {
  text-align: right;
  padding-right: 2rem;
  a {
    color: #fff;
    font-size: 1.2rem;
    font-weight: bolder;
    width: 100%;
    text-transform: capitalize;
    text-decoration: none;
  }
}

.category {
  display: flex;
  flex-direction: row-reverse;
  list-style: none;
  justify-content: center;

  li:nth-last-child(1) {
    position: relative;
    .sub-category {
      background-color: #1d262d;
      padding: 0.8rem;
      position: absolute;
      right: -250px;
      border-radius: 10px;
      margin-top: 10px;
      text-align: center;
      &::after {
        content: "";
        position: absolute;
        bottom: 48px;
        width: 0;
        height: 0;
        right: 320px;
        border-style: solid;
        border-width: 0 7px 7px 7px;
        border-color: transparent transparent #1d262d transparent;
      }
      ul {
        display: grid;
        -columns: repeat(4, 150px);
        white-space: normal;
        list-style: none;

        li {
          display: block;
          font-size: 1rem;
          text-transform: capitalize;
          cursor: pointer;
          &:hover {
            color: #a5b7c6;
          }
        }
      }
    }
  }
  li {
    color: #fff;
    a {
      color: #fff;
      font-size: 1rem;
      margin-left: 0.8rem;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: #a5b7c6;
      }
    }

    span:hover,
    i:hover {
      cursor: pointer;
      color: #a5b7c6;
    }
  }
}

.menu-item {
  width: 200px;
  text-align: center;
  padding: 0.5rem;
  position: absolute;
  z-index: 100;
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

.navbar {
  display: flex;
  justify-content: flex-end;
}

.sidebar {
  width: 300px;
  padding: 0.5rem;
  background: #1d262d;
  position: fixed;
  top: 0px;
  height: 100vh;
  right: 0px;
  z-index: 100;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: flex-end;
  padding: 1rem;
  li {
    margin-bottom: 1rem;
    a {
      color: #a5b7c6;
      font-size: 1rem;
      text-decoration: none;
    }
  }
}
</style>
