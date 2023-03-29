<template>
  <v-row style="border-bottom: 1px solid #d7d7d7">
    <TheFilesFilter
      v-if="showFilter"
      @showFilterBox="$emit('closeFilter')"
      @applyFilter="applyFilterRequest"
    />

    <TheFileLists
      :files="files"
      :pagination="pagination"
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
      files: [],
      pagination: {},
      start: true,
      page: null,
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
    this.page && (params["page"] = this.page);
    this.start = true;
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
      this.files = res.data.data;
      this.pagination = res.data.meta.pagination;
    });
    this.start = false;
  },
  computed: {
    tags() {
      return this.$store.state.tag.tags;
    },
  },
  methods: {
    async fetchMoreFiles(page) {
      this.page = page;
      await this.$fetch();
    },
    async filterFiles() {
      this.start = true;
      let params = {};
      params = { ...this.query };
      await this.$axios.get("frontend/files", { params }).then((res) => {
        this.files = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
      this.start = false;
    },

    async applyFilterRequest(filters) {
      let params = {};
      this.start = true;
      filters.amount && (params["filters[amount]"] = filters.amount);
      filters.discount &&
        (params["filters[rebate]"] = parseInt(filters["discount"]) === 1);
      filters.format && (params["filters[format]"] = filters.format);
      filters.published && (params["filters[published]"] = filters.published);
      await this.$axios.get("frontend/files", { params }).then((res) => {
        this.files = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
      this.start = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
