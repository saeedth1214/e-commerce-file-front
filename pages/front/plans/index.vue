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
  async fetch() {
    let params = {};
    this.overlay = true;
    params["includes"] = "users";
    this.plans = await this.$axios.get("frontend/plans").then((res) => {
      return res.data.data;
    });
    this.overlay = false;

    console.log(this.plans);
    // return { plans };
  },
};
</script>

<style scoped lang="scss"></style>
