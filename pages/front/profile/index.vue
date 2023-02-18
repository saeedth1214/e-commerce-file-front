<template>
  <div style="padding: 1rem; direction: rtl">
    <Information
      :user="$auth.user"
      v-show="$route.query.tab === 'information'"
    />
    <UserFiles :userId="$auth.user.id" v-show="$route.query.tab === 'files'" />
    <UserPlan :userId="$auth.user.id" v-show="$route.query.tab === 'plan'" />
    <UserOrders
      :userId="$auth.user.id"
      v-show="$route.query.tab === 'orders'"
    />
    <ChangePassword v-show="$route.query.tab === 'changePassword'" />
  </div>
</template>
<script>
export default {
  layout: "profile",

  data: () => ({
    items: ["information", "plan", "files", "orders", "changePassword"],
  }),
  watchQuery(newQuery) {
    this.checkQuery(newQuery);
  },

  created() {
    this.checkQuery(this.$route.query);
  },

  methods: {
    checkQuery(query) {
      if (
        !Object.keys(query).length ||
        query.tab === undefined ||
        !this.items.includes(query.tab)
      ) {
        this.$router.push("?tab=information");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
