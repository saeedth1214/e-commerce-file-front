<template>
  <v-app id="inspire">
    <v-container v-if="!loading">
      <NewFile @initializeEmit="fetchAgain" />
      <FileList :fetch="fetchAgainFlag" />
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
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      drawer: false,
      dialog: false,
      files: [],
      fetchAgainFlag: false,
      pagination: {},
      page: 1,
      loading: true,
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    async fetchData() {
      this.page++;
      if (this.page <= this.pagination.total_pages) {
        this.moreFiles();
      } else {
        this.page = 1;
      }
    },
    fetchAgain() {
      this.fetchAgainFlag = true;
    },
    async initialize() {
      let params = {};
      this.loading = true;
      params["page"] = this.page;
      await this.$axios
        .get("panel/files", { params })
        .then((res) => {
          this.files = res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
};
</script>

<style scope lang="scss">
.file-details {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0px;
  right: -280px;
  transition: all 0.3s linear;
  opacity: 0.9;
}
.card:hover .file-details {
  right: 0px;
}
.on-hover {
  background-color: #fff !important;
  color: #00bdfe !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
}
.like {
  padding: 0.3rem;
  border: 1px solid grey;
  border-radius: 10px;
  position: relative;
  background: #fff;
  text-align: center;
  &-count {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    text-align: center;
    position: absolute;
    top: -15px;
    right: -10px;
    font-size: 0.7rem;
    font-weight: bold;
    background: #fff;
    width: 2rem;
    letter-spacing: 1px;
  }
}
</style>
