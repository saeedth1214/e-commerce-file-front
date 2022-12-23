<template>
  <div>
    <TheNav />
    <TheHomeBanner />
    <ThePhotoSlider />
    <ThePopularCategories />
    <ThePopularFiles />
    <TheBestSellerOfPlans />
    <TheFooter />
    <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">{{
      text
    }}</v-snackbar>
    <ScrollTop />
  </div>
</template>

<script>
export default {
  computed: {
    text() {
      return this.$store.state.option.snackbar.text;
    },
    snackbar() {
      return this.$store.state.option.snackbar.snackbar;
    },
    color() {
      return this.$store.state.option.snackbar.color;
    },
  },
  async mounted() {
    // await this.$store.commit("option/changeSnackbarMood", true);
  },
};
</script>

<style></style>
