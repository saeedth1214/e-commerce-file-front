<template>
  <div>
    <v-container>
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
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Information :user="user" />
        </v-tab-item>
        <v-tab-item>
          <Plans :plans="data.plans.data" />
        </v-tab-item>
        <v-tab-item>
          <Files :files="data.files.data" />
        </v-tab-item>
        <v-tab-item>
          <Orders :orders="data.orders.data" />
        </v-tab-item>
        <v-tab-item>
          <Transactions :transactions="data.transactions.data" />
        </v-tab-item>
        <v-tab-item>
          <ChangePassword />
        </v-tab-item>
        <v-tab-item>
          <ChangeAvatar />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    tab: null,
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

  components: {
    Plans,
    Files,
    Orders,
    Transactions,
    Information,
    ChangeAvatar,
    ChangePassword,
  },
  middleware(context) {
    if (!context.$auth.loggedIn) {
      context.redirect("/authenticate");
    }
  },
  async asyncData(context) {
    let params = {};
    params["include"] = "plans,files,orders,transactions";
    const data = await context.$axios
      .get(`panel/users/${context.$auth.user.id}`, { params })
      .then((res) => {
        return {
          files: res.data.data.files,
          plans: res.data.data.plans,
          orders: res.data.data.orders,
          transactions: res.data.data.transactions,
        };
      })
      .catch((err) => console.log(err));
    return { data };
  },

  computed: {
    user() {
      return this.$auth.user;
    },
  },
};
</script>

<style></style>
