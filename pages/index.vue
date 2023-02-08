<template>
  <v-row dense>
    <TheSearchByTag />
    <TheSlider :files="files" />
  </v-row>
</template>
<script>
export default {
  layout: "landingPage",
  async fetch() {
    let params = {};
    params["per_page"] = 6;
    params["sort"] = "-created_at";
    await this.$axios.get("frontend/files", { params }).then((res) => {
      this.files = res.data.data;
    });
  },
  data() {
    return {
      files: [],
      loading: false,
    };
  },
};
</script>
<style lang="scss" scoped></style>
