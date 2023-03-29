<template>
  <div>
    <p style="font-size: 1rem; font-weight: 600">فایل های خریداری شده</p>

    <v-data-table
      :headers="headers"
      :items="files"
      class="elevation-1"
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
      <template v-slot:item.title="{ item }">
        <div class="file-title-box">
          <v-img
            max-width="40"
            max-height="40"
            min-width="40"
            min-height="40"
            aspect-ratio="1"
            rounded
            :src="item.media_url"
          >
            <template #placeholder>
              <v-row class="fill-height" justify="center" align="center">
                <v-progress-circular
                  width="2"
                  size="100"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <p class="text-body-2 font-weight-medium">
            <NuxtLink
              :to="`/front/files/${item.title}`"
              class="text-decoration-none text-subtitle-2 font-weight-medium"
            >
              {{ item.title }}
            </NuxtLink>
          </p>
        </div>
      </template>

      <template v-slot:item.rebate="{ item }">
        <span v-if="item.rebate === 0"> - </span>
        <span v-else>
          {{ item.percentage ? item.rebate : $formatMoney(item.rebate) }}
        </span>
      </template>

      <template v-slot:item.percentage="{ item }">
        <span>
          {{ item.percentage ? "درصدی" : "عددی" }}
        </span>
      </template>
      <template v-slot:item.amount="{ item }">
        <span>
          {{ $formatMoney(item.amount) }}
        </span>
      </template>

      <template v-slot:no-data>
        <p color="primary" class="text-body-2 font-weight-bold text-center">
          موردی یافت نشد
        </p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      search: null,
      files: [],
      page: 1,
      pageCount: 0,
      loading: true,
    };
  },

  methods: {
    async handlePageChange(value) {
      this.page = value;
      this.initialize();
    },
    async initialize() {
      let params = {};
      this.loading = true;
      params["page"] = this.page;
      await this.$axios.get("user/profile/files").then((res) => {
        this.files = res.data.data;
        this.setPagination(res.data.meta.pagination);
      });
      this.loading = false;
    },
    async setPagination(pagination) {
      this.page = await pagination.current_page;
      this.pageCount = await pagination.total_pages;
    },
  },
  async created() {
    this.initialize();
  },
  computed: {
    headers() {
      return this.$store.state.option.file.headers;
    },
  },
};
</script>
<style lang="scss" scoped>
.file-title-box {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}
</style>
