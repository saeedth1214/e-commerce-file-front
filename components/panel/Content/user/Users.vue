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
      hide-default-footer
      :page.sync="page"
      :items-per-page="itemsPerPage"
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
          <v-toolbar-title>لیست کاربران</v-toolbar-title>
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
                <span class="text-h5">افزودن کاربر جدید</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <validation-observer v-slot="{ invalid }">
                    <form @submit.prevent="save">
                      <v-row>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="firstName"
                            rules="required|min:3|max:64"
                          >
                            <v-text-field
                              v-model="user.first_name"
                              :error-messages="errors"
                              label="نام"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="lastName"
                            rules="required|min:3|max:64"
                          >
                            <v-text-field
                              v-model="user.last_name"
                              :error-messages="errors"
                              label="نام خانوادگی"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="mobile"
                            rules="required|mobile"
                          >
                            <v-text-field
                              v-model="user.mobile"
                              :error-messages="errors"
                              label="تلفن همراه"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="email"
                            rules="required|email"
                          >
                            <v-text-field
                              v-model="user.email"
                              :error-messages="errors"
                              label="ایمیل"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="password"
                            rules="required|min:6|max:64"
                          >
                            <v-text-field
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show ? 'text' : 'password'"
                              label="رمز عبور"
                              v-model="user.password"
                              :error-messages="errors"
                              @click:append="show = !show"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="12">
                          <validation-provider
                            v-slot="{ errors }"
                            name="password_confirmation"
                            :rules="`required|min:6|max:64|confirm:${user.password}`"
                          >
                            <v-text-field
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show ? 'text' : 'password'"
                              label="تکرار رمزعبور"
                              v-model="user.password_confirmation"
                              :error-messages="errors"
                              @click:append="show = !show"
                            ></v-text-field>
                          </validation-provider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <p class="text-body-2 font-weight-bold">
                            نقش کاربری :
                          </p>
                          <v-switch
                            v-model="user.role_id"
                            :label="roleText"
                          ></v-switch>
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
        </v-toolbar>
      </template>
      <template v-slot:item.fullname="{ item }">
        <v-row dense>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="d-flex justify-center align-center"
          >
            <v-btn fab nuxt :to="`/panel/users/${item.id}`">
              <v-avatar v-if="item.media_url">
                <img :src="item.media_url" />
              </v-avatar>
              <v-avatar v-else>
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6" style="margin-top: 1rem">
            <p class="text-body-2 font-weight-medium">{{ item.first_name }}</p>
            <p class="text-body-2 font-weight-medium">{{ item.last_name }}</p>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.email_verified_at="{ item }">{{
        item.email_verified_at ? item.email_verified_at : "-"
      }}</template>
      <template v-slot:item.mobile_verified_at="{ item }">{{
        item.mobile_verified_at ? item.mobile_verified_at : "-"
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
    unique: false,
    roleText: "کاربر عادی",
    user: {
      first_name: null,
      last_name: null,
      mobile: null,
      email: null,
      role_id: false,
      password: null,
      password_confirmation: null,
    },
    show: false,
    rules: {
      required: (value) => !!value || "مقدار این فیلد الزامی است",
      min: (v) => {
        if (v && v.length >= 6) {
          return true;
        } else {
          return "حداقل 6 کاراکتر";
        }
      },
      max: (v) => {
        if (v && v.length >= 6) {
          return true;
        } else {
          return "حداکثر 64 کاراکتر";
        }
      },
      passwordMatch: (v) => {
        if (v && v == user.password) {
          return true;
        } else {
          return "رمز عبور و تکرار رمز عبور یکسان نیست";
        }
      },
    },
  }),
  mixins: [showMessage],
  computed: {
    headers() {
      return this.$store.state.option.user.headers;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    user: {
      handler(newVal) {
        this.roleText = newVal.role_id ? " ادمین" : "کاربر عادی";
      },
      deep: true,
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
    async emptyUser() {
      this.user = {
        first_name: null,
        last_name: null,
        mobile: null,
        email: null,
        role_id: false,
        password: null,
        password_confirmation: null,
      };
    },
    async initialize() {
      this.loading = true;
      let params = {};
      this.page && (params["page"] = this.page);
      await this.$axios
        .$get("panel/users", { params })
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
      await this.emptyUser();
    },
    async save() {
      let params = {};
      params["filters[unique][mobile]"] = this.user.mobile;
      params["filters[unique][email]"] = this.user.email;
      let newUser = {
        ...this.user,
        role_id: this.user.role_id ? 1 : 0,
      };
      await this.$axios
        .get("panel/users", { params })
        .then(async (res) => {
          if (!res.data.data.length) {
            await this.$axios.post("panel/users", newUser).then(async (res) => {
              await this.initialize();
              await this.showMessage("success", "کاربر جدید اضافه شد");
              this.dialog = await !this.dialog;
              this.close();
            });
          } else {
            this.showMessage(
              "error",
              "کاربری با این شماره تلفن یاایمیل قبلا ثبت شده است"
            );
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
