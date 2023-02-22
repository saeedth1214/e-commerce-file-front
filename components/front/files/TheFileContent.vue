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
      :start="start"
      @closeFilter="$emit('closeFilter')"
      @fetchMoreFiles="fetchMoreFiles"
    />
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      fileData: {},
      start: false,
    };
  },
  props: {
    showFilter: {
      type: Boolean,
      required: true,
    },
    query: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  watch: {
    query() {
      this.filterFiles();
    },
  },
  async fetch() {
    let params = {};

    this.$route.query.category &&
      (params["filters[category_name]"] = this.$route.query.category);
    this.$route.query.tag &&
      (params["filters[tag_name]"] = this.$route.query.tag);
    this.$route.query.type &&
      (params["filters[type]"] = this.$route.query.type);
    this.$route.query.title &&
      (params["filters[title]"] = this.$route.query.title);
    this.$route.query.amount &&
      (params["filters[amount]"] = this.$route.query.amount);

    await this.$axios.get("frontend/files", { params }).then((res) => {
      this.fileData = {
        files: res.data.data,
        pagination: res.data.meta.pagination,
      };
    });
  },
  computed: {
    tags() {
      return this.$store.state.tag.tags;
    },
  },
  methods: {
    async fetchMoreFiles() {
      this.start = true;
      await this.$fetch();
      this.start = false;
    },
    async filterFiles() {
      this.start = true;
      let params = {};
      params = { ...this.query };
      await this.$axios.get("frontend/files", { params }).then((res) => {
        this.fileData = {
          files: res.data.data,
          pagination: res.data.meta.pagination,
        };
      });
      this.start = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
