<template>
  <v-row dense style="direction: ltr; height: 60px" :style="headerStyle">
    <v-col md="3" sm="3" lg="3">
      <div class="d-flex align-center pl-4">
        <div class="auth" v-if="!$auth.loggedIn">
          <span>
            <v-btn
              small
              color="#fff"
              outlined
              shaped
              nuxt
              to="/authenticate?login"
              style="font-size: 14; font-weight: 600"
            >
              ورود
            </v-btn>
          </span>
          <span>
            <v-btn
              small
              color="#fff"
              outlined
              shaped
              nuxt
              to="/authenticate?register"
              style="font-size: 14; font-weight: 600"
            >
              ثبت نام
            </v-btn>
          </span>
        </div>
        <div class="auth" v-else v-click-outside="onClickOutside">
          <v-avatar size="40" style="cursor: pointer; margin-right: 10px">
            <v-img
              @click="auth = !auth"
              :src="$auth.user && $auth.user.media_url"
              v-if="$auth.user && $auth.user.media_url"
            ></v-img>
            <v-icon dark color="#fff" v-else @click="auth = !auth"
              >mdi-account-circle</v-icon
            >
          </v-avatar>
          <v-card
            width="256"
            color="#fff"
            class="user-box-profile"
            :class="[auth ? 'active' : 'diActive']"
          >
            <v-card-title style="border-bottom: 2px solid #253039">
              <div class="login-box-header">
                <div class="avatar">
                  <v-avatar
                    size="40"
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

        <v-btn
          class="ml-2 inline-block"
          color="#fff"
          nuxt
          small
          outlined
          to="/front/basket"
        >
          <v-icon color="#fff" small>mdi-cart</v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col md="6" sm="6" lg="6">
      <v-row v-if="$vuetify.breakpoint.mdAndUp">
        <v-col cols="12">
          <div class="navbar">
            <ul class="category">
              <li>
                <nuxt-link to="/front/files">فایل ها</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/front/files?format=search&category=وکتور"
                  >وکتور</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/front/files?format=search&category=طبیعت"
                  >طبیعت</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/front/files?format=search&category=ورزشی"
                  >ورزشی</nuxt-link
                >
              </li>
              <li
                id="expand"
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
                  class="sub_menu_screen_size"
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
                          path: '/front/files?format=search',
                          query: {
                            type: category.name,
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
                              path: '/front/files?format=search',
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
              <li>
                <nuxt-link to="#" @click.native="downloadResume">
                  رزومه</nuxt-link
                >
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col md="3" sm="3" lg="3">
      <p class="navbar_brand" v-if="$vuetify.breakpoint.mdAndUp">
        <nuxt-link to="/">فایلیمو</nuxt-link>
        <nuxt-link class="pricing" to="/front/plans">طرح ها </nuxt-link>
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
              <nuxt-link to="/">فایلیمو</nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/front/plans"
                style="font-size: 1rem; font-weight: 600; color: gold"
                >طرح ها</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/front/files">فایل ها </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/front/files?format=search&category=وکتور"
                >وکتور</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/front/files?format=search&category=طبیعت"
                >طبیعت</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/front/files?format=search&category=ورزشی"
                >ورزشی</nuxt-link
              >
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
                            path: '/front/files',
                            query: {
                              format: 'search',
                              category: subCategory.name,
                            },
                          }"
                        >
                          <div class="subCategory_item">
                            <span>{{ subCategory.name }}</span>
                          </div>
                        </nuxt-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <nuxt-link to="#" @click.native="downloadResume">
                رزومه</nuxt-link
              >
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
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  props: {
    headerStyle: {
      type: String,
      required: false,
    },
  },
  computed: {
    chevronIcon() {
      return this.auth ? "mdi-chevron-up" : "mdi-chevron-down";
    },
    categories() {
      return this.$store.state.category.menuBarCategories;
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
    "$route.query": "closeSideBar",
  },
  methods: {
    closeSideBar() {
      this.toggle = false;
    },
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/");
    },
    onClickOutside(e) {
      this.auth = false;
    },
    onClickOutsideCategory() {
      this.active = false;
    },
    toggleInnerUl(el) {
      let ulElement = el.target.getElementsByClassName("topmenu_items")[0];
      ulElement?.classList.toggle("active-items");
    },

    async downloadResume() {
      await this.$axios.get("frontend/files/download-csv").then((res) => {
        if (res.status === 200) window.open(res.data.data.url, "_blank");
        if (res.status === 204) alert("file not found.");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/navBar.scss";
</style>
