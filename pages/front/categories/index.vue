<template>
  <div>
    <div class="banner">banner</div>
    <TheCategorySlider
      @filterByCategory="filterByCategory"
      :categories="categories"
    />
    <TheFileList
      :files="files"
      :pagination="pagination"
      :categoryName="filterCategory.name"
      v-if="!loading"
    />
    <v-sheet color="grey lighten-3" class="pa-3" v-else>
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        height="300px"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    files: [],
    pagination: {},
    filterCategory: {},
  }),

  watch: {
    "$route.query": "$fetch",
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
  },
  async fetch() {
    this.overlay = true;
    let params = {};
    //chech for filter
    if (Object.keys(this.filterCategory).length) {
      params["filters[category]"] = this.filterCategory.id;
    } else if (
      Object.keys(this.$route.query).length &&
      this.$route.query.category !== undefined
    ) {
      let categoryName = this.$route.query.category;
      let index = this.categories.findIndex(
        (category) => category.name === categoryName
      );
      index && (params["filters[category]"] = this.categories[index].id);
    }
    // fetch files
    await this.$axios.get("/frontend/files", { params }).then((res) => {
      this.files = res.data.data;
      this.pagination = res.data.meta.pagination;
    });
    this.overlay = false;
  },
  methods: {
    async filterByCategory(category) {
      this.filterCategory = category;
      this.$router.push({
        name: this.$nuxt.$route.name,
        query: { category: category.name.replace(/_/g, " ") },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  height: 250px;
  margin-top: 0.5rem;
}
</style>
