<template>
  <v-app-bar app color="white" elevate-on-scroll elevation="4">
    <v-app-bar-nav-icon
      @click.stop="$emit('drawerChangeState')"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <div class="auth">
      <v-badge
        dot
        bottom
        offset-y="10"
        offset-x="10"
        color="green"
        style="width: 40px; text-align: center"
      >
        <v-avatar
          size="40"
          color="indigo darken-4"
          style="cursor: pointer; margin-left: 10px"
        >
          <v-img
            @click="auth = !auth"
            :src="$auth.user && $auth.user.media_url"
            v-if="$auth.user && $auth.user.media_url"
          ></v-img>
          <v-icon dark color="#fff" v-else @click="auth = !auth"
            >mdi-account-circle</v-icon
          >
        </v-avatar>
      </v-badge>
      <v-icon
        dark
        color="#000"
        size="15"
        style="margin-left: 5px; cursor: pointer"
        @click="auth = !auth"
        >{{ chevronIcon }}</v-icon
      >
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
              <p class="userName">saeed</p>
              <p class="email">09302474269</p>
              <v-btn
                class="ml-2"
                small
                color="#253039"
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
                <a href="/front/profile/?tab=change-password">تغییر رمزعیور</a>
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
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    auth: false,
  }),

  computed: {
    chevronIcon() {
      return this.auth ? "mdi-chevron-up" : "mdi-chevron-down";
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/");
    },
    onClickOutside(e) {
      if (!e.target.classList.contains("v-icon")) {
        this.auth = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.auth {
  padding-left: 2rem;
  text-align: left;
  direction: ltr;

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
.avatar {
  width: 40px;
  text-align: center;
  background-color: #253039;
  border-radius: 50%;
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
td:nth-child(2) {
  text-align: center;
}
</style>
