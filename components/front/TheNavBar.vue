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
          <a href="/authenticate?login">ورود</a>
        </span>
        <span>
          <a href="/authenticate?register"> ثبت نام </a>
        </span>
      </div>
      <div class="auth" v-else>
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
          color="#fff"
          size="15"
          style="position: relative; right: 5px; cursor: pointer"
          @click="auth = !auth"
          >{{ chevronIcon }}</v-icon
        >
        <v-btn class="ml-2" icon color="transparent" nuxt to="/front/basket">
          <v-icon color="#fff">mdi-cart</v-icon>
        </v-btn>
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
                  color="primary"
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
                <span class="btn-exit">خروج</span>
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
                <a href="/front/plans">وکتور</a>
              </li>
              <li>
                <a href="/front/plans">فتوشاپ</a>
              </li>
              <li>
                <a href="/front/plans">تصاویر</a>
              </li>

              <li
                @click="active = !active"
                v-click-outside="onClickOutsideCategory"
              >
                <a href="#">
                  <v-icon color="#fff">{{
                    active ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                  دسته بندی
                </a>
                <div
                  class="sub_menu"
                  :style="[!active ? { display: 'none' } : '']"
                >
                  <ul class="topmenu_container">
                    <li
                      v-for="(category, index) in categories"
                      :key="category.id"
                      class="topmenu_content"
                    >
                      <nuxt-link
                        class="topmenu_title"
                        :class="[!index ? 'active_topMenuTitle' : '']"
                        :to="{
                          path: '/front/categories',
                          query: {
                            category: category.name,
                          },
                        }"
                      >
                        {{ category.name }}
                      </nuxt-link>
                      <ul
                        class="topmenu_items"
                        :class="[!index ? 'active_topmenu' : '']"
                      >
                        <li
                          v-for="subCategory in category.subCategories.data"
                          :key="subCategory.id"
                        >
                          <nuxt-link
                            :to="{
                              path: '/front/categories',
                              query: {
                                category: subCategory.name,
                              },
                            }"
                          >
                            <div class="content">
                              <span>{{ subCategory.name }}</span>
                            </div>
                          </nuxt-link>
                        </li>
                      </ul>
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
            <li>
              <a href="/front/plans">وکتور</a>
            </li>
            <li>
              <a href="/front/plans">فتوشاپ</a>
            </li>
            <li>
              <a href="/front/plans">تصاویر</a>
            </li>
            <li style="width: 100%">
              <span class="category_item_mobile"> دسته بندی </span>
              <div class="sub_menu has_mobile">
                <ul class="topmenu_container">
                  <li
                    v-for="category in categories"
                    :key="category.id"
                    class="topmenu_content"
                    @click="toggleInnerUl"
                  >
                    <v-icon
                      color="#fff"
                      style="position: relative; right: 170px"
                      >{{
                        active ? "mdi-chevron-up" : "mdi-chevron-down"
                      }}</v-icon
                    >
                    <span
                      style="display: inline-block; padding-right: 2.5rem"
                      >{{ category.name }}</span
                    >
                    <ul class="topmenu_items">
                      <li
                        v-for="subCategory in category.subCategories.data"
                        :key="subCategory.id"
                      >
                        <nuxt-link
                          :to="{
                            path: '/front/categories',
                            query: {
                              category: subCategory.name,
                            },
                          }"
                        >
                          <div class="content">
                            <span>{{ subCategory.name }}</span>
                          </div>
                        </nuxt-link>
                      </li>
                    </ul>
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
      return this.$store.state.category.menuBarCategories;
    },
    chevronIcon() {
      return this.auth ? "mdi-chevron-up" : "mdi-chevron-down";
    },
  },
  watch: {
    active(value) {
      if (value) {
        let titles = document.querySelectorAll(".topmenu_title");
        let ulItems = document.querySelectorAll(".topmenu_items");
        titles.forEach(function (el, titleIndex) {
          el.addEventListener("mouseenter", function () {
            this.classList.add("active_topMenuTitle");
            titles.forEach((el, index) => {
              if (index !== titleIndex) {
                el.classList.remove("active_topMenuTitle");
              }
            });
            ulItems.forEach(function (ul, ulIndex) {
              if (titleIndex === ulIndex) {
                ul.classList.add("active_topmenu");
              } else {
                ul.classList.remove("active_topmenu");
              }
            });
          });
        });
      }
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
    onClickOutside(e) {
      if (!e.target.classList.contains("v-icon")) {
        this.auth = false;
      }
    },
    onClickOutsideCategory() {
      this.active = false;
    },
    toggleInnerUl(el) {
      let ulElement = el.target.getElementsByClassName("topmenu_items")[0];
      ulElement?.classList.toggle("active-items");
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/navBar.scss";

.active_topmenu {
  display: grid !important;
}
.active_topMenuTitle {
  background: rgba(255, 255, 255, 0.1);
  color: #fff !important;
}
.btn-exit {
  color: #253039;
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
}
.category_item_mobile {
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
  pointer-events: none;
  font-size: 14px;
  color: #869fb2;
  opacity: 0.7;
}
.active-items {
  display: flex !important;
}

@media screen and (max-width: 960px) {
  .sub_menu.has_mobile {
    a {
      display: block;
      padding-right: 1.5rem;
    }
    .topmenu_container {
      margin-top: 0.8rem;
      > li {
        color: #869fb2;
        position: relative;
        display: block;
        width: 100%;
        position: relative;
        text-align: right;
        > .topmenu_items {
          display: none;
          position: relative;
          width: 100%;
          flex-direction: column;
          top: 20px;
          right: 8px;
          background-color: #253039;
          height: 200px;
          overflow-y: scroll;
        }
      }
    }
  }
}
</style>
