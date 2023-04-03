<template>
  <v-app>
    <v-container>
      <CommentList
        v-if="!loading"
        :comments="comments"
        :pagination="pagination"
        @initialize="initializeComment"
        @filterComment="filterCommentByStatus"
      />
      <v-sheet color="grey lighten-4" class="pa-3" v-else>
        <v-skeleton-loader
          class="mx-auto"
          width="100%"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      comments: [],
      pagination: {},
      loading: false,
    };
  },
  async fetch() {
    let params = {};
    this.loading = true;
    params["include"] = "user,file";
    await this.$axios.get("/panel/comments", { params }).then((res) => {
      this.comments = res.data.data;
      this.pagination = res.data.meta.pagination;
    });
    this.loading = false;
  },
  methods: {
    async initializeComment() {
      let params = {};
      this.loading = true;
      params["include"] = "user,file";
      await this.$axios.get("/panel/comments", { params }).then((res) => {
        this.comments = res.data.data;
        this.pagination = res.meta.data.pagination;
      });
      this.loading = false;
    },

    async filterCommentByStatus(status) {
      let params = {};
      this.loading = true;
      params["include"] = "user,file";
      status !== "4" && (params["filters[status]"] = status);
      await this.$axios.get("/panel/comments", { params }).then((res) => {
        this.comments = res.data.data;
        this.pagination = res.meta.data.pagination;
      });
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
