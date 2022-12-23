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
      :items="orders"
      class="elevation-1"
      hide-default-footer
      :search="search"
      loading-text="لطفا منتظر بمانید"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>لیست سفارشات</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.rebate="{ item }">
        <div>
          <span>{{
            item.percentage ? item.rebate : $formatMoney(item.rebate)
          }}</span>
          <span>
            {{ item.percentage ? "درصد" : "تومان" }}
          </span>
        </div>
      </template>
      <template v-slot:item.status="{ item }">
        <span
          class="pa-2 white--text rounded"
          :class="{
            'yellow darken-2': item.status === 1,
            'blue darken-1': item.status === 2,
            'red darken-1': item.status === 3,
          }"
        >
          {{ item.status_dec }}
        </span>
      </template>
      <template v-slot:no-data>
        <p color="primary" class="text-body-2 font-weight-bold text-center">
          موردی یافت نشد
        </p>
      </template>
      <template v-slot:footer>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      loading: false,
      orders: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
    };
  },

  computed: {
    headers() {
      return this.$store.state.option.order.headers;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.loading = true;
      let params = {};
      this.page && (params["page"] = this.page);
      await this.$axios
        .get("panel/orders")
        .then((res) => {
          this.orders = res.data.data;
          this.setPagination(res.meta.pagination);
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
    async handlePageChange(value) {
      this.page = value;
      this.initialize();
    },
    async setPagination(pagination) {
      this.page = await pagination.current_page;
      this.pageCount = await pagination.total_pages;
    },
  },
};
</script>
<style lang=""></style>
