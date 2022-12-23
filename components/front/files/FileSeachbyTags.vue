<template lang="">
  <div style="width: 100%" class="wrapper d-flex justify-center border-none">
    <v-chip-group active-class="primary--text" v-model="tag">
      <v-chip v-for="tag in tags" :key="tag.id" :value="tag">
        <span>
          {{ tag.name }}
          <v-icon>mdi-magnify</v-icon>
        </span>
      </v-chip>
    </v-chip-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tag: null,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  watch: {
    tag(tag) {
      if (tag !== undefined) {
        this.$emit("searchByTag", { name: tag.name, id: tag.id });
      } else {
        this.$router.push({
          path: "/front/files",
        });
      }
    },
  },
};
</script>
<style lang="css" scoped>
.theme--light.v-chip:not(.v-chip--active) {
  border: 1px solid #e0e0e0 !important;
  background-color: transparent !important;
}
</style>
