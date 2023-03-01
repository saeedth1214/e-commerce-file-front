<template>
  <div class="main">
    <ThePlansList :plans="plans" v-if="!start" />
    <TheLoader :start="true" leftStyle="left:50%;" v-else />
  </div>
</template>
<script>
export default {
  data: () => ({
    plans: [],
    start: false,
  }),
  async fetch() {
    this.start = true;
    await this.$axios.get("frontend/plans").then((res) => {
      this.plans = res.data.data;
    });
    this.start = false;
  },
};
</script>

<style scoped lang="scss">
.main {
  min-height: 100vh;
}
</style>
