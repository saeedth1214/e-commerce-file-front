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
  }),
  async asyncData(context) {
    let params = {};
    params["includes"] = "users";
    let plans = await context.$axios
      .get("frontend/plans")
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err.response));
    return { plans };
  },
};
</script>

<style scoped lang="scss"></style>
