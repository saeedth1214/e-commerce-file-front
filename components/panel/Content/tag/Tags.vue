<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
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
          <v-toolbar-title>لیست تگ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                elevation="2"
                class="mx-2"
                fab
                dark
                color="primary"
                v-on="on"
                v-bind="attrs"
                small
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card color="#fff">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <validation-observer v-slot="{ invalid }">
                    <form @submit.prevent="save">
                      <v-row>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="category-slug"
                            rules="required|min:3|max:64"
                          >
                            <v-text-field
                              v-model="editedItem.slug"
                              :error-messages="errors"
                              label="نامک"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="category-name"
                            rules="required|min:3|max:64"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              :error-messages="errors"
                              label="عنوان فارسی"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <div class="mt-5">
                          <v-btn class="mr-4" type="submit" :disabled="invalid"
                            >ایجاد</v-btn
                          >
                          <v-btn class="mr-4" @click="close">انصراف</v-btn>
                        </div>
                      </v-row>
                    </form>
                  </validation-observer>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >آیا از حذف تگ مطمعن هستید؟</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >انصراف</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >حذف</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        <p class="font-weight-bold">موردی پیدا نشد</p>
      </template>
    </v-data-table>
    <SnackBar />
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    page: 1,
    search: null,
    pageCount: 0,
    itemsPerPage: 10,
    items: [],
    loading: false,
    editedItem: {
      id: null,
      name: "",
      slug: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedItem.id ? "افزودن تگ" : "ویرایش تگ";
    },
    headers() {
      return this.$store.state.option.tag.headers;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
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
        .get("panel/tags", { params })
        .then((res) => {
          this.items = res.data.data;
          console.log(this.items,'items');
          this.setPagination(res.data.meta.pagination);
        })
      this.loading = false;
    },
    async deleteItemConfirm() {
      await this.$axios
        .delete(`panel/tags/${this.editedItem.id}`)
        .then((res) => {
          if (res.status === 204) {
            this.dialogDelete = false;
            this.showMessage("success", "تگ انتخابی حذف شد");
            this.page = 1;
            this.initialize();
          }
        });
    },
    deleteItem(item) {
      this.editedItem = item;
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {};
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async showMessage(type, message) {
      await this.$swal({
        title: message,
        icon: type,
        allowEscapeKey: false,
        alloweOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        await this.$axios
          .put(`panel/tags/${this.editedItem.id}`, this.editedItem)
          .then((res) => {
            this.initialize();
            this.showMessage("success", "تگ انتخابی ویرایش شد");
          });
      } else {
        const data = await this.$axios
          .post("panel/tags", this.editedItem)
          .then((res) => {
            this.initialize();
            this.showMessage("success", " تگ جدیدی اضافه شد.");
          });
      }
      this.close();
    },
  },
};
</script>

<style></style>
