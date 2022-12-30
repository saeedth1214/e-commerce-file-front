<template>
  <div>
    <UserView />
    <!-- <PurchaseFiles :files="user.files.data" />
    <PurchasePlans :plans="user.plans.data" /> -->
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style></style>
