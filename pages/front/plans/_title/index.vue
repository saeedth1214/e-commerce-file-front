<template>
  <div>
    <ThePlanInfo :plan="plan" />
    <SnackBar />
    <ScrollTop />
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    let newTitle = context.params.title.replace(/_/g, " ");
    let uri = encodeURI(`frontend/plans/${newTitle}`);
    let plan = await context.$axios
      .get(uri)
      .then((res) => {
        return res.data.data;
      })
      .catch(err=>{});
    return { plan };
  },
};
</script>

<style scoped>
.plans {
  height: 500px !important;
}
.text-h6 {
  font-size: 1rem !important;
}
</style>
