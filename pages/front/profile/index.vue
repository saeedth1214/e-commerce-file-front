<template>
  <div>
    <v-container v-if="!loading">
      <v-card>
        <v-toolbar
          color="cyan"
          height="auto"
          dark
          flat
          src="https://picsum.photos/1920/1080?random"
        >
          <v-toolbar-title></v-toolbar-title>
          <div class="pa-2 d-flex align-center">
            <v-avatar class="profile" color="grey" size="100" tile>
              <v-img
                class="rounded"
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              ></v-img>
            </v-avatar>
            <p class="text-body-2 font-weight-bold mr-2">
              <span class="d-block">{{
                user.first_name ? user.first_name : "ثبت نشده"
              }}</span>
              <span class="d-block">{{ user.created_at }}</span>
            </p>
          </div>
          <template v-slot:extension>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
      <UserData :tab="tab" :user="user" />
    </v-container>

    <v-container v-else>
      <v-skeleton-loader
        v-bind="attrs"
        type="cart"
        height="350px"
      ></v-skeleton-loader>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    tab: null,
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
    loading: true,
    items: [
      "اطلاعات کلی",
      "طرح ها",
      "فایل ها",
      "سفارش ها",
      "تراکنش ها",
      "تغییر رمز عبور",
      "آواتار",
    ],
  }),

  computed: {
    user() {
      return this.$auth.user;
    },
  },
  middleware(context) {
    if (!context.$auth.loggedIn) {
      context.redirect("/authenticate");
    }
  },

  created() {
    this.loading = true;
  },

  mounted() {
    this.loading = false;
  },
};
</script>

<style></style>
