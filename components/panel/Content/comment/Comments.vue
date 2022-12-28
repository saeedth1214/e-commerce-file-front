<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data.data"
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
          <v-toolbar-title>لیست نظرات</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon color="info" v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group v-model="selectedItem">
                  <v-list-item value="4">
                    <v-list-item-title>همه</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="0">
                    <v-list-item-title>دیده نشده</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="1">
                    <v-list-item-title>تایید شده</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="2">
                    <v-list-item-title>تایید نشده</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item.user.data.fullname="{ item }">
        <v-row dense>
          <v-col
            cols="12"
            sm="3"
            md="3"
            lg="3"
            class="d-flex justify-center align-center"
          >
            <v-btn
              fab
              nuxt
              :to="`/panel/users/${item.user.data.id}`"
              width="40"
              height="40"
            >
              <v-avatar v-if="item.user.data.media" width="40" height="40">
                <img :src="item.user.data.media" />
              </v-avatar>
              <v-avatar v-else height="40" width="40">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="9" md="9" lg="9" style="margin-top: 1rem">
            <p class="text-body-2 font-weight-medium">
              {{ item.user.data.fullname }}
            </p>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.parent_id="{ item }">
        {{ item.parent_id ? item.parent_id : "-" }}
      </template>

      <template v-slot:item.content="{ item }">
        <div v-html="item.content"></div>
      </template>

      <template v-slot:item.status="{ item }">
        <span
          style="font-size: 0.7rem; width: 60px"
          class="d-flex pa-1 font-weight-light white--text justify-center align-center rounded-sm"
          :class="{
            'yellow darken-2': item.status === 0,
            'primary darken-2': item.status === 1,
            'red darken-2': item.status === 2,
          }"
          >{{ item.status_dec }}</span
        >
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-center align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                elevation="2"
                class="mx-2"
                fab
                dark
                color="primary"
                small
                nuxt
                v-bind="attrs"
                v-on="on"
                :to="`/panel/comments/${item.id}`"
                style="width: 2rem; height: 2rem"
              >
                <v-icon dark>mdi-account-edit-outline </v-icon>
              </v-btn>
            </template>
            <span>ویرایش</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                elevation="2"
                class="mx-2"
                fab
                color="primary"
                small
                v-bind="attrs"
                v-on="on"
                style="width: 2rem; height: 2rem"
                @click="deleteItemConfirm(item.id)"
              >
                <v-icon dark>mdi-pencil-remove</v-icon>
              </v-btn>
            </template>
            <span>حذف</span>
          </v-tooltip>
        </div>
      </template>
      <template v-slot:no-data>
        <p color="primary" class="text-body-2 font-weight-bold text-center">
          موردی یافت نشد
        </p>
      </template>
    </v-data-table>
    <SnackBar />
  </div>
</template>

<script>
import showMessage from "@/mixins/showMessage.js";
export default {
  data: () => ({
    window: 1,
    filterItems: [],
    page: 1,
    search: null,
    pageCount: 0,
    itemsPerPage: 10,
    loading: false,
    comments: [],
    selectedComment: {},
    selectedItem: 4,
  }),
  computed: {
    headers() {
      return this.$store.state.option.comment.headers;
    },
  },

  mixins: [showMessage],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDialogDelete();
    },
    selectedItem(val) {
      this.filterCommentByStatus(val);
    },
  },
  async created() {
    this.setPagination(this.data.meta.pagination);
  },
  methods: {
    async filterCommentByStatus(val) {
      this.loading = true;
      this.$emit("filterComment", val);
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
    async deleteItemConfirm(commentId) {
      await this.$axios.delete(`panel/comments/${commentId}`).then((res) => {
        if (res.status === 204) {
          this.dialogDelete = false;
          this.showMessage("success", "پیغام انتخابی حذف شد");
          this.page = 1;
          this.initialize();
        }
      });
    },
    closeDialogDelete() {
      this.dialogDelete = false;
    },
    initialize() {
      this.loading = true;
      this.$emit("initialize");
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
>>> .v-btn--fab.v-size--small .v-icon {
  font-size: 18px !important;
}
</style>
