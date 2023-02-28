<template>
  <div class="mt-4">
    <v-sheet color="grey lighten-4" class="pa-3" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-data-table
      v-else
      calculate-widths
      :headers="headers"
      :items="items"
      class="elevation-1"
      hide-default-footer
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :search="search"
      :loading="loading"
      loading-text="لطفا منتظر بمانید"
      @click:row="handleClick"
    >
      <template v-slot:footer>
        <div class="text-center pt-2">
          <ThePagination :pagination="pagination" @initialize="initialize" />
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>طرح ها</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.percentage="{ item }">{{
        item.percentage ? "درصدی" : "عددی"
      }}</template>
      <template v-slot:item.amount="{ item }">{{
        $formatMoney(item.amount)
      }}</template>
      <template v-slot:item.rebate="{ item }">{{
        item.percentage ? item.rebate : $formatMoney(item.rebate)
      }}</template>
      <template v-slot:item.amount_after_rebate="{ item }">{{
        $formatMoney(item.amount_after_rebate)
      }}</template>
      <template v-slot:no-data>
        <p color="primary" class="text-body-2 font-weight-bold text-center">
          موردی یافت نشد
        </p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: null,
    page: 1,
    pagination: {},
    items: [],
    loading: false,
    show: false,
  }),
  mixins: [showMessage],
  computed: {
    headers() {
      return this.$store.state.option.panelPlan.headers;
    },
  },
  props: {
    // fetch: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
  },
  watch: {
    // fetch(value) {
    //   if (value) {
    //     this.initialize();
    //   }
    // },
  },
  created() {
    this.initialize();
    this.itemsPerPage = process.env.PER_PAGE;
  },

  methods: {
    async handleClick({ id }) {
      this.$router.push(`/panel/plans/${id}`);
    },
    async handlePageChange(value) {
      this.page = value;
      this.initialize();
    },
    async setPagination(pagination) {
      this.pagination = pagination;
    },
    async initialize() {
      this.loading = true;
      let params = {};
      this.page && (params["page"] = this.page);
      await this.$axios
        .$get("panel/plans", { params })
        .then((res) => {
          this.items = res.data;
          this.setPagination(res.meta.pagination);
        })
        .catch((err) => {
          this.showMessage("error", err);
        });
      this.loading = false;
    },
    async close() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>
