<template>
  <div>
    <v-sheet color="grey lighten-4" class="pa-3" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-data-table
      v-else
      :headers="headers"
      :items="items"
      class="elevation-1"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :page.sync="page"
      :search="search"
      :loading="loading"
      loading-text="لطفا منتظر بمانید"
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
          <v-toolbar-title>لیست تخفیف ها</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <NewVoucher
            :editedItem="editedItem"
            :voucherTypes="vouchers"
            @initializeEmit="initialize"
          />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.percentage="{ item }">{{
        item.percentage ? "درصدی" : "عددی (تومان)"
      }}</template>
      <template v-slot:item.status="{ item }">{{
        item.status ? "فعال" : "غیرفعال"
      }}</template>
      <template v-slot:no-data>
        <p class="font-weight-bold">موردی پیدا نشد</p>
      </template>
      <template v-slot:no-results>
        <p class="font-weight-bold">موردی پیدا نشد</p>
      </template>
    </v-data-table>
    <SnackBar />
  </div>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    search: null,
    pageCount: 0,
    itemsPerPage: 0,
    items: [],
    vouchers: [],
    loading: false,
    editedItem: {
      id: null,
      code: "",
      rebate: "",
      percentage: "",
      expired_at: "",
      status: "",
      type: null,
    },
  }),
  computed: {
    headers() {
      return this.$store.state.option.voucher.headers;
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.itemsPerPage = process.env.PER_PAGE;
  },

  methods: {
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
        .get("panel/vouchers", { params })
        .then((res) => {
          this.items = res.data.data;
          this.vouchers = res.data.meta.types;
          this.setPagination(res.data.meta.pagination);
        })
        .catch((err) => {
          this.loading = false;
        });
      this.loading = false;
      this.page = 1;
    },
    deleteItem(item) {
      this.editedItem = { ...item, deleted: true };
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item);
    },
  },
};
</script>

<style></style>
