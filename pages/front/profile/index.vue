<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar color="cyan" height="auto" dark flat src="/bg.jpg">
          <v-toolbar-title></v-toolbar-title>
          <div class="pa-2 d-flex align-end" style="gap;1rem">
            <v-avatar
              class="profile rounded-circle"
              color="#fff"
              size="60"
              tile
            >
              <v-img
                v-if="user.media_url"
                size="60"
                :src="user.media_url"
              ></v-img>
              <v-icon dark color="#fff" size="60" v-else @click="auth = !auth"
                >mdi-account-circle</v-icon
              >
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
              <v-tab v-for="(item, Idx) in items" :key="Idx">{{
                item.text
              }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
      <UserData :tab="tab" :user="user" />
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    tab: 0,
    items: [
      {
        slug: "information",
        text: "اطلاعات کلی",
      },
      {
        slug: "plans",
        text: "طرح ها",
      },
      {
        slug: "files",
        text: "فایل ها",
      },

      {
        slug: "orders",
        text: "سفارش ها",
      },
      // {
      //   slug: "transactions",
      //   text: "تراکنش ها",
      // },
      {
        slug: "change-password",
        text: "تغییر رمزعبور",
      },
      {
        slug: "avatar",
        text: "آواتار",
      },
    ],
  }),
  watch: {
    tab(newVal) {
      let tabSlug = this.items[newVal].slug;
      this.$router.push(`/front/profile/?tab=${tabSlug}`);
    },
  },
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
    if (this.$route.query && this.$route.query.tab) {
      let index = this.items.findIndex(
        (item) => item.slug === this.$route.query.tab
      );
      if (index > -1) {
        this.tab = index;
      } else {
        this.$router.push("/front/profile/?tab=information");
      }
    } else {
      this.tab = 0;
    }
  },
};
</script>

<style></style>
