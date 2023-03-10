<template>
  <v-row dense>
    <v-container>
      <section style="margin-top: 4rem">
        <h4>بهترین و با کیفیت ترین فایل هارو اینجا دانلود کنید</h4>
        <TheFormSearchBox :landing="true" @searchBox="searchBox" />
      </section>
    </v-container>
  </v-row>
</template>
<script>
import TheFormSearchBox from "@/components/front/TheFormSearchBox.vue";
export default {
  methods: {
    searchBox(query) {
      this.$router.push({ path: "front/files", query: { ...query } });
    },
  },
  components: {
    TheFormSearchBox,
  },
};
</script>
<style lang="scss" scoped>
h4 {
  text-transform: capitalize;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

section {
  width: 80%;
  text-align: center;
  margin: 0px auto;
  margin-top: 2rem;
}

@media screen and(max-width:400px) {
  section {
    width: 95%;
  }
}
@media screen and(max-width:768px) {
  h4 {
    font-size: 0.8rem !important;
  }
}
</style>
