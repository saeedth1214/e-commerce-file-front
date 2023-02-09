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
          <v-pagination
            v-model="page"
            :length="pageCount"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>لیست فایل ها </v-toolbar-title>
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
      <template v-slot:item.reaction_summary="{ item }">
        {{ item.reaction_summary.like ? item.reaction_summary.like : 0 }}
      </template>
      <template v-slot:item.views="{ item }">
        {{ item.views ? item.views : 0 }}
      </template>
      <template v-slot:item.percentage="{ item }">{{
        item.percentage ? "درصدی" : "عددی"
      }}</template>
      <template v-slot:item.amount="{ item }">{{
        $formatMoney(item.amount)
      }}</template>
      <template v-slot:item.sale_as_single="{ item }">{{
        item.sale_as_single ? "خرید تکی" : "خرید اشتراک"
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
    pageCount: 0,
    itemsPerPage: 0,
    items: [],
    loading: false,
    show: false,
  }),
  mixins: [showMessage],
  computed: {
    headers() {
      return this.$store.state.option.panelFile.headers;
    },
  },
  props: {
    fetch: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    fetch(value) {
      if (value) {
        this.initialize();
      }
    },
  },
  created() {
    this.initialize();
    this.itemsPerPage = process.env.PER_PAGE;
  },

  methods: {
    async handleClick({ id }) {
      this.$router.push(`/panel/files/${id}`);
    },
    async handlePageChange(value) {
      this.page = value;
      this.initialize();
    },
    async setPagination(pagination) {
      this.page = await pagination.current_page;
      this.pageCount = await pagination.total_pages;
    },
    async initialize() {
      this.loading = true;
      let params = {};
      this.page && (params["page"] = this.page);
      await this.$axios
        .$get("panel/files", { params })
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
