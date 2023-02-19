<template>
  <div>
    <v-container fluid class="mt-2">
      <TheFilesSearch
        @searchByTitle="filterByTitle"
        @showFilterBox="showFilter = !showFilter"
      />
      <FileSeachbyTags
        @searchByTag="filterByTag"
        :showFilter="showFilter"
        @closeFilter="showFilter = !showFilter"
      />
      <TheFileContent
        :showFilter="showFilter"
        @closeFilter="showFilter = !showFilter"
      />
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    showFilter: true,
    search: null,
    tag: {},
    innerWidth: null,
    fileData: {
      files: [],
      pagination: {},
    },
  }),
  watch: {
    "$route.query": "$fetch",
    innerWidth(width) {
      if (width <= 1296) {
        this.showFilter = false;
      } else {
        this.showFilter = true;
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResizeScreen);
    this.innerWidth = window.innerWidth;
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
    async filterByTitle(title) {
      this.search = title;
      this.$router.push({
        path: "/front/files",
        query: this.buildQueryParameter(),
      });
    },
    async filterByTag(tag) {
      this.tag = tag;
      this.$router.push({
        name: this.$nuxt.$route.name,
        query: this.buildQueryParameter(),
      });
    },

    buildQueryParameter() {
      let query = {};
      this.search && (query["searchByTitle"] = this.search);
      this.tag && (query["searchByTag"] = this.tag.name);
      return query;
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
