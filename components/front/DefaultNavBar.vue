<template>
  <v-row v-if="loading">
    <v-skeleton-loader
      v-bind="attrs"
      type="card-avatar, article, actions"
      width="100%"
      height="50px"
    ></v-skeleton-loader>
  </v-row>
  <v-row
    dense
    class="pt-2"
    style="direction: ltr; background-color: #1d262d"
    v-else
  >
    <v-col :md="$vuetify.breakpoint.mdAndUp ? '3' : '6'" sm="6" lg="3">
      <div class="auth" v-if="!$auth.user">
        <span>
          <a href="/authenticate?login">ورود</a>
        </span>
        <span>
          <a href="/authenticate?register"> ثبت نام </a>
        </span>
      </div>
      <div class="auth" v-else>
        <span style="cursor: pointer" class="mx-2">
          <v-badge dot bottom offset-y="10" offset-x="10" color="green">
            <v-avatar size="40" color="transparent">
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
          <v-icon
            dark
            color="#fff"
            size="15"
            style="position: relative; right: 5px; cursor: pointer"
            @click="auth = !auth"
            >{{ chevronIcon }}</v-icon
          >
          <v-btn class="ml-2" icon color="transparent" nuxt to="/front/basket">
            <v-icon color="#fff">mdi-cart</v-icon>
          </v-btn>
        </span>
        <v-card
          width="256"
          color="#fff"
          class="user-box-profile"
          :class="[auth ? 'active' : 'diActive']"
          v-click-outside="onClickOutside"
        >
          <v-card-title style="border-bottom: 2px solid #253039">
            <div class="login-box-header">
              <div class="avatar">
                <v-avatar size="40" style="cursor: pointer; margin-left: 10px">
                  <v-img
                    @click="auth = !auth"
                    :src="$auth.user && $auth.user.media_url"
                    v-if="$auth.user && $auth.user.media_url"
                  ></v-img>
                  <v-icon dark color="#fff" v-else @click="auth = !auth"
                    >mdi-account-circle</v-icon
                  >
                </v-avatar>
              </div>
              <div class="user-info">
                <p class="userName">
                  {{ $auth.user.first_name + " " + $auth.user.last_name }}
                </p>
                <p class="email">
                  {{ $auth.user.mobile ? $auth.user.mobile : "-" }}
                </p>
                <v-btn
                  class="ml-2"
                  small
                  dark
                  nuxt
                  to="/front/profile/?tab=information"
                >
                  ویرایش پروفایل
                </v-btn>
              </div>
            </div>
          </v-card-title>
          <v-card-actions style="border-bottom: 2px solid #253039">
            <ul class="profile-item">
              <li>
                <span>
                  <a href="/front/profile/?tab=information">پروفایل</a>
                </span>
                <span>
                  <v-icon color="#253039">mdi-account</v-icon>
                </span>
              </li>
              <li>
                <span>
                  <a href="/front/profile/?tab=files">فایل ها</a>
                </span>
                <span>
                  <v-icon color="#253039">mdi-file-image</v-icon>
                </span>
              </li>
              <li>
                <span>
                  <a href="/front/profile/?tab=plans">طرح ها </a>
                </span>
                <span>
                  <v-icon color="#253039">mdi-book-multiple</v-icon>
                </span>
              </li>
              <li>
                <span>
                  <a href="/front/profile/?tab=change-password"
                    >تغییر رمزعیور</a
                  >
                </span>
                <span>
                  <v-icon color="#253039">mdi-lock-open</v-icon>
                </span>
              </li>
            </ul>
          </v-card-actions>
          <v-card-actions
            style="border-bottom: 2px solid #253039"
            v-if="$auth.user && $auth.user.role_id"
          >
            <ul class="profile-item">
              <li>
                <span>
                  <a href="/panel/dashboard">مدیریت</a>
                </span>
                <span>
                  <v-icon color="#253039">mdi-view-dashboard</v-icon>
                </span>
              </li>
            </ul>
          </v-card-actions>
          <v-card-actions>
            <ul class="profile-item">
              <li style="cursor: pointer" @click="logout">
                <span
                  style="
                    color: #253039;
                    font-size: 16px;
                    font-weight: 600;
                    margin-right: 10px;
                  "
                  >خروج</span
                >
                <span>
                  <v-icon color="#253039">mdi-logout</v-icon>
                </span>
              </li>
            </ul>
          </v-card-actions>
          <v-card-subtitle></v-card-subtitle>
        </v-card>
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
              <li>
                <span>
                  <v-icon color="#a5b7c6" @click="active = !active">{{
                    active ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                  دسته بندی
                </span>
                <v-card
                  class="sub-category"
                  :style="[!active ? { display: 'none' } : '']"
                  max-width="650px"
                >
                  <v-card-actions>
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
                  </v-card-actions>
                </v-card>
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

  created() {
    this.loading = true;
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
    chevronIcon() {
      return this.auth ? "mdi-chevron-up" : "mdi-chevron-down";
    },
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/");
    },
    onClickOutside(e) {
      if (!e.target.classList.contains("v-icon")) {
        this.auth = false;
        this.active = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.auth {
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
.brand {
  text-align: right;
  padding-right: 2rem;
  a {
    color: #a5b7c6;
    font-size: 1.2rem;
    font-weight: bolder;
    width: 100%;
    text-transform: capitalize;
    text-decoration: none;
  }
}
.avatar {
  width: 40px;
  text-align: center;
  background-color: #253039;
  border-radius: 50%;
}
.category {
  display: flex;
  flex-direction: row-reverse;
  list-style: none;
  justify-content: center;

  li:nth-last-child(1) {
    position: relative;
    .sub-category {
      background-color: #253039;
      padding: 0.8rem;
      position: absolute;
      right: -250px;
      border-radius: 10px;
      margin-top: 10px;
      text-align: center;
      z-index: 1000;
      top: 40px;
      ul {
        display: grid;
        grid-template-columns: repeat(4, 150px);
        white-space: normal;
        list-style: none;
        direction: rtl;

        li {
          display: block;
          font-size: 1rem;
          text-transform: capitalize;
          cursor: pointer;
          margin-bottom: 1rem;
          
          &:hover {
            color: #a5b7c6;
          }
        }
      }
    }
  }
  li {
    color: #a5b7c6;
    a {
      color: #a5b7c6;
      font-size: 1rem;
      margin-left: 0.8rem;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: #fff;
      }
    }

    span:hover,
    i:hover {
      cursor: pointer;
      color: #fff;
    }
  }
}

.user-box-profile {
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
  direction: rtl;

  .login-box-header {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .user-info {
      color: #253039;
      font-size: 14px;
      font-weight: 700;
    }
  }
  .profile-item {
    list-style: none;
    width: 100%;
    li {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      transition: all 0.3s linear;
      &:hover {
        a,
        .v-icon {
          color: rgb(42, 167, 250);
        }
      }
      a {
        text-decoration: none;
        color: #253039;
        font-size: 16px;
        font-weight: 600;
        margin-right: 10px;
      }
    }
  }
}
.active {
  display: block;
}
.diActive {
  display: none;
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
  li:nth-last-child(1) {
    .sub-category {
      height: 250px;
      overflow: hidden;
      ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        text-align: right;
        padding-right: 1.5rem;
        padding-top: 1rem;
        overflow-y: scroll;
        height: 250px;
      }
    }
  }
}
</style>
