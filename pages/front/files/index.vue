<template>
  <div>
    <v-container fluid class="mt-2" v-if="!loading">
      <v-row class="sticky sticky-search">
        <TheFilesSearch
          @searchByTitle="filterByTitle"
          @showFilterBox="showFilter = !showFilter"
        />
      </v-row>
      <v-row class="sticky sticky-tag">
        <v-col cols="12" md="9" lg="9">
          <FileSeachbyTags @searchByTag="filterByTag" :tags="tags" />
        </v-col>
        <v-col
          cols="12"
          md="3"
          lg="3"
          :style="[showFilter ? { 'border-right': '1px solid #e1e1e1' } : '']"
        >
          <div class="text-center filterButton" v-if="!showFilter">
            <v-btn color="#eff3f6" @click="showFilter = true">
              <span style="font-size: 1rem;color: #374957;font-weight: 600;}"
                >فیلتر</span
              >
              <v-icon color="#374957">mdi-tune</v-icon>
            </v-btn>
          </div>

          <div class="d-flex flex-column showfilterbox" v-else>
            <div class="d-flex justify-space-between pr-4 pl-4">
              <p>
                <v-icon
                  style="cursor: pointer"
                  @click="showFilter = !showFilter"
                >
                  mdi-arrow-expand-left
                </v-icon>
              </p>
              <p>
                <span style="font-size: 1rem;color: #374957;font-weight: 600;}"
                  >فیلتر
                  <v-icon color="#374957">mdi-tune</v-icon>
                </span>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row style="border-bottom: 1px solid #d7d7d7">
        <v-col
          cols="12"
          :md="showFilter ? '9' : '12'"
          :lg="showFilter ? '9' : '12'"
        >
          <TheFileLists
            :fileData="fileData"
            @fetchMoreFiles="fetchMoreFiles"
            :loading="loading"
          />
        </v-col>
        <v-col
          cols="12"
          sm="3"
          lg="3"
          md="3"
          v-if="showFilter"
          style="border-right: 1px solid #d7d7d7"
        >
          <TheFilesFilter @filterItems="filterFiles" :showFilter="showFilter" />
        </v-col>
      </v-row>
    </v-container>
    <v-row dense v-else>
      <v-col cols="12">
        <v-sheet color="grey lighten-3" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            height="300px"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    showFilter: false,
    search: null,
    tag: {},
    innerWidth: null,
    fileData: {
      files: [],
      pagination: {},
    },
    loading: false,
  }),
  watch: {
    "$route.query": "$fetch",
    innerWidth(width) {
      if (width <= 1096) {
        this.showFilter = false;
      } else {
        this.showFilter = true;
      }
    },
  },
  computed: {
    tags() {
      return this.$store.state.tag.tags;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResizeScreen);
    this.innerWidth = window.innerWidth;
  },

  async fetch() {
    let parameters = {};
    this.loading = true;
    if (Object.keys(this.$route.query).length) {
      if (Object.keys(this.tag).length) {
        parameters["filters[tag_id]"] = this.tag.id;
      } else if (this.$route.query["searchByTag"] !== undefined) {
        let tagName = this.$route.query["searchByTag"];
        let index = this.tags.findIndex((tag) => tag.name === tagName);
        index !== undefined &&
          (parameters["filters[tag_id]"] = this.tags[index].id);
      }
      if (this.$route.query["searchByTitle"]) {
        parameters["filters[title]"] = this.search =
          this.$route.query["searchByTitle"];
      }
    }

    await this.$axios
      .get("frontend/files", { params: parameters })
      .then((res) => {
        this.fileData = {
          files: res.data.data,
          pagination: res.data.meta.pagination,
        };
      })
      .catch((err) => {});
    this.loading = false;
  },
  methods: {
    handleResizeScreen() {
      this.innerWidth = window.innerWidth;
    },
    async filterFiles(filters) {
      this.loading = true;
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
      this.loading = false;
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
      this.loading = true;
      params = { page };
      await this.$axios
        .get("frontend/files", { params })
        .then((res) => {
          this.fileData = {
            files: [...this.fileData.files, ...res.data.data],
            pagination: res.data.meta.pagination,
          };
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  z-index: 10;
  background: #fff;

  &-search {
    top: 0px;
  }
  &-tag {
    top: 80px;
    z-index: 10;
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
