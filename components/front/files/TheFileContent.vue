<template>
  <v-row style="border-bottom: 1px solid #d7d7d7">
    <!-- @filterItems="filterFiles" -->
    <TheFilesFilter
      :showFilter="showFilter"
      @showFilterBox="$emit('closeFilter')"
    />

    <TheFileLists
      :fileData="fileData"
      :showFilter="showFilter"
      @closeFilter="$emit('closeFilter')"
    />

    <!-- @fetchMoreFiles="fetchMoreFiles" -->
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      fileData: {},
    };
  },
  props: {
    showFilter: {
      type: Boolean,
      required: true,
    },
  },

  async fetch() {
    let parameters = {};
    // if (Object.keys(this.$route.query).length) {
    //   if (Object.keys(this.tag).length) {
    //     parameters["filters[tag_id]"] = this.tag.id;
    //   } else if (this.$route.query["searchByTag"] !== undefined) {
    //     let tagName = this.$route.query["searchByTag"];
    //     let index = this.tags.findIndex((tag) => tag.name === tagName);
    //     index !== undefined &&
    //       (parameters["filters[tag_id]"] = this.tags[index].id);
    //   }
    //   if (this.$route.query["searchByTitle"]) {
    //     parameters["filters[title]"] = this.search =
    //       this.$route.query["searchByTitle"];
    //   }
    // }

    await this.$axios
      .get("frontend/files", { params: parameters })
      .then((res) => {
        this.fileData = {
          files: res.data.data,
          pagination: res.data.meta.pagination,
        };
      })
      .catch((err) => {});
  },
  computed: {
    tags() {
      return this.$store.state.tag.tags;
    },
  },
};
</script>
<style lang="scss" scoped></style>
