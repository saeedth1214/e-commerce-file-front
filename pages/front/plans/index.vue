<template>
  <div>
    <ThePlansBanner />
    <ThePlansList :plans="plans" />
    <TheOverlay :overlay="overlay" />
  </div>
</template>
<script>
export default {
  data: () => ({
    overlay: false,
    plans: [],
  }),
  async fetch(context) {
    let params = {};
    this.overlay = true;
    params["includes"] = "users";
    this.plans = await context.$axios.get("frontend/plans").then((res) => {
      return res.data.data;
    });
    this.overlay = false;
    // return { plans };
  },
};
</script>

<style scoped lang="scss"></style>
