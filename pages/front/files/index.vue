<template>
  <div>
    <v-container fluid class="mt-2">
      <TheFilesSearch
        @searchBoxAction="(query) => filterbySearchBox(query)"
        @showFilterBox="showFilter = !showFilter"
      />
      <FileSeachbyTags
        @searchByTag="filterByTag"
        :showFilter="showFilter"
        @closeFilter="showFilter = !showFilter"
        :tags="tags"
      />
      <TheFileContent
        :showFilter="showFilter"
        @closeFilter="showFilter = !showFilter"
        :query="queryParameter"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    showFilter: true,
    search: null,
    type: null,
    amount: null,
    tag: null,
    tempUrlQueryString: {},
    innerWidth: null,
    queryParameter: {},
    fileData: {
      files: [],
      pagination: {},
    },
  }),
  watch: {
    innerWidth(width) {
      if (width <= 1296) {
        this.showFilter = false;
      } else {
        this.showFilter = true;
      }
    },
    "$route.query": "matchedUrlWithApiRequestParams",
  },

  mounted() {
    window.addEventListener("resize", this.handleResizeScreen);
    this.innerWidth = window.innerWidth;
  },
  computed: {
    tags() {
      return this.$store.state.tag.searchByTags;
    },
  },
  methods: {
    handleResizeScreen() {
      this.innerWidth = window.innerWidth;
    },
    async filterFiles(filters) {
      let params = { ...filters };
      await this.$axios
        .get("frontend/files", { params })
        .then((res) => {
          this.fileData = {
            files: res.data.data,
            pagination: res.data.meta.pagination,
          };
        })
        .catch((err) => console.log(err));

      if (this.innerWidth <= 959) {
        this.showFilter = false;
      }
    },
    async filterbySearchBox(query) {
      if (!query.title) {
        this.tempUrlQueryString.title && delete this.tempUrlQueryString.title;
      }
      if (!query.amount) {
        this.tempUrlQueryString.amount && delete this.tempUrlQueryString.amount;
      }
      if (!query.type) {
        this.tempUrlQueryString.type && delete this.tempUrlQueryString.type;
      }
      this.search = query.title;
      this.amount = query.amount;
      this.type = query.type;
      this.buildUrlParams();
    },
    async filterByTag(tag) {
      if (!tag) {
        this.tempUrlQueryString.tag && delete this.tempUrlQueryString.tag;
      }
      this.tag = tag;
      this.buildUrlParams();
    },
    async buildUrlParams() {
      this.tempUrlQueryString["format"] = "search";
      this.search && (this.tempUrlQueryString["title"] = this.search);
      this.amount && (this.tempUrlQueryString["amount"] = this.amount);
      this.tag && (this.tempUrlQueryString["tag"] = this.tag);
      this.type && (this.tempUrlQueryString["type"] = this.type);
      this.$route.query.category &&
        (this.tempUrlQueryString["category"] = this.$route.query.category);

      this.$router.push({
        path: "/front/files",
        query: { ...this.tempUrlQueryString },
      });
    },
    async fetchMoreFiles(page) {
      let params = {};
      params = { page };
      await this.$axios
        .get("frontend/files", { params })
        .then((res) => {
          this.fileData = {
            pagination: res.data.meta.pagination,
          };
          this.filterFiles.files.push(res.data.data);
        })
        .catch((err) => console.log(err));
    },
    async matchedUrlWithApiRequestParams() {
      let temp = {};
      this.$route.query.title &&
        (temp["filters[title]"] = this.$route.query.title);
      this.$route.query.type &&
        (temp["filters[type]"] = this.$route.query.type);
      this.$route.query.tag &&
        (temp["filters[tag_name]"] = this.$route.query.tag);
      this.$route.query.category &&
        (temp["filters[category_name]"] = this.$route.query.category);
      this.$route.query.amount &&
        (temp["filters[amount]"] = this.$route.query.amount);
     this.queryParameter = { ...temp };
    },
  },
};
</script>

<style lang="scss">
.sticky {
  position: sticky;
  z-index: 10;
  background: #fff;

  &-search {
    top: 0px;
  }
  &-tag {
    top: 80px;
    z-index: 1;
    border-bottom: 1px solid #e7e7e7;
  }
}
@media screen and(max-width:1096px) {
  .showfilterbox,
  .filterButton {
    display: none;
  }
}

@media screen and(max-width:959px) {
  .showfilterbox {
    top: 66px;
    margin-right: 0px;
    border-left: 1px solid #d7d7d7;
    & > div {
      background: #fff;
    }
  }
}
</style>
