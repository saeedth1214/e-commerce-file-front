<template>
  <v-app id="inspire">
    <v-container v-if="!loading">
      <NewPlan @initializeEmit="initialize" />
      <PlanList />
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
      filter: null,
      drawer: false,
      dialog: false,
      plans: [],
      pagination: {},
      page: 1,
      loading: true,
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let params = {};
      this.loading = true;
      params["includes"] = "users";
      params["page"] = this.page;
      await this.$axios
        .get("panel/plans", { params })
        .then((res) => {
          this.plans = res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-card::hover {
  border: 2px solid blue;
  cursor: pointer;
}
</style>
