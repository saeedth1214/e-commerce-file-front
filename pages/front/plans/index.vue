<template>
  <div>
    <ThePlansBanner />
    <ThePlansList :plans="plans" />
  </div>
</template>
<script>
export default {
  data: () => ({
    plans: [],
  }),
  async fetch() {
    let params = {};
    params["includes"] = "users";
    await this.$axios.get("frontend/plans").then((res) => {
       this.plans = res.data.data;
    });
  },
};
</script>

<style scoped lang="scss"></style>
