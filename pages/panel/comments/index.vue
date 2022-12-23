<template>
  <v-app>
    <v-sheet color="grey lighten-4" class="pa-3" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-container v-else>
      <v-card>
        <v-toolbar color="inigo">
          <div>
            <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
          </div>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-sheet color="grey lighten-4" class="pa-3" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
        <Comments
          v-else
          :data="data"
          @initialize="initializeComment"
          @filterComment="filterCommentByStatus"
        />
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  layout: "panel",
  data: () => ({
    loading: false,
    items: [
      {
        text: "داشبورد",
        disabled: false,
        href: "/panel/dashboard",
      },
      {
        text: "نظرات",
        disabled: false,
        href: "/panel/comments",
      },
    ],
    data: {},
  }),

  async fetch() {
    let params = {};
    this.loading = true;
    params["include"] = "user,model";
    this.loading = true;
    await this.$axios
      .get("/panel/comments", { params })
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => console.log(err));
    this.loading = false;
  },

  methods: {
    async initializeComment() {
      let params = {};
      this.loading = true;
      params["include"] = "user,model";
      await this.$axios
        .get("/panel/comments", { params })
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },

    async filterCommentByStatus(status) {
      let params = {};
      this.loading = true;
      params["include"] = "user,model";
      status !== "4" && (params["filters[status]"] = status);
      await this.$axios
        .get("/panel/comments", { params })
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
};
</script>

<style></style>
