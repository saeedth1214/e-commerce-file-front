<template>
  <div class="ma-4">
    <v-sheet color="grey lighten-4" class="pa-3" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-card v-else>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>اطلاعات کاربر</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab class="text-body-1 font-weight-bold">
          <v-icon right>mdi-account</v-icon>ویرایش اطلاعات
        </v-tab>
        <v-tab class="text-body-1 font-weight-bold">
          <v-icon right>mdi-lock</v-icon>تغییر رمز عبور
        </v-tab>
        <v-tab class="text-body-1 font-weight-bold">
          <v-icon right>mdi-upload</v-icon>آپلود آواتار
        </v-tab>
        <v-tab class="text-body-1 font-weight-bold">
          <v-icon right>mdi-lock</v-icon> کد تخفیف
        </v-tab>
        <v-tab-item style="padding: 1rem">
          <v-card flat>
            <v-row dense>
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="update">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
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
                    <v-col cols="12" sm="6" md="6">
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
                    <v-col cols="12" sm="6" md="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="mobile"
                        rules="required|mobile"
                      >
                        <v-text-field
                          readonly
                          v-model="user.mobile"
                          :error-messages="errors"
                          label="تلفن همراه"
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                      >
                        <v-text-field
                          readonly
                          v-model="user.email"
                          :error-messages="errors"
                          label="ایمیل"
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <InfiniteScroll
                        url="panel/plans"
                        label="title"
                        @selectedValue="setPlanIds"
                        :itemId="planId"
                        title="plan"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <InfiniteScroll
                        :url="fileUrl"
                        label="title"
                        @selectedValue="setFileIds"
                        :itemId="files"
                        title="file"
                        :multiple="true"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <p class="text-body-2 font-weight-bold">نقش کاربری :</p>
                      <v-switch
                        v-model="user.role_id"
                        :label="roleText"
                      ></v-switch>
                    </v-col>
                  </v-row>

                  <v-row dense>
                    <div class="mt-5">
                      <v-btn class="mr-4" type="submit" :disabled="invalid"
                        >ویرایش</v-btn
                      >
                    </div>
                  </v-row>
                </form>
              </validation-observer>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat max-width="400px" class="mx-auto pa-4">
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="changePassowrd">
                <v-row dense>
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
                </v-row>
                <v-row dense>
                  <div class="mt-5">
                    <v-btn class="mr-4" type="submit" :disabled="invalid"
                      >ویرایش</v-btn
                    >
                  </div>
                </v-row>
              </form>
            </validation-observer>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <Uploader :url="url" />
        </v-tab-item>
        <v-tab-item>
          <user-has-voucher
            :url="voucherUrl"
            :vouchers="vouchers"
            :userId="user.id"
          />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    planId: null,
    files: [],
    fileUrl: null,
    voucherUrl: null,
    vouchers: [],
    loading: true,
    roleText: "",
    show: false,
    password: null,
    password_confirmation: null,
    url: "",
  }),
  mixins: [showMessage],
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  watch: {
    user: {
      handler(newVal) {
        this.roleText = newVal.role_id ? " ادمین" : "کاربر عادی";
      },
      deep: true,
    },
  },

  methods: {
    setFileIds(fileIds) {
      this.files = fileIds;
    },
    setPlanIds(planId) {
      this.planId = planId;
    },
    async changePassowrd() {
      this.loading = true;
      await this.$axios
        .patch(`panel/users/${this.user.id}/change-password`, {
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        })
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", "رمز عبور ویرایش شد");
            this.$router.push("/panel/users");
          }
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },

    async update() {
      this.loading = true;
      let newUser = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        role_id: this.user.role_id ? 1 : 0,
        plan_id: this.planId,
        files: this.files,
      };
      await this.$axios
        .put(`panel/users/${this.user.id}`, { ...newUser })
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", "کاربر انتخابی ویرایش شد");
            this.$router.push("/panel/users");
          }
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
  async created() {
    this.loading = true;
    this.url =
      process.env.dropzoneUrl + `users/${this.$route.params.id}/change-avatar`;
    this.fileUrl = `panel/files?filter[sale_as_single]=1`;
    this.voucherUrl = `panel/vouchers?filter[expired_at][from]=${new Date().toISOString()}&filters[type]=3&filters[status]=1`;
    if (!Object.keys(this.user).length) {
      this.$router.push("/panel/users");
    } else {
      if (this.user.vouchers.data.length) {
        await this.user.vouchers.data.map((voucher) => {
          this.vouchers.push({
            id: voucher.id,
            code: voucher.code,
            authorize_use: voucher.number_authorize_use,
            times_use: voucher.number_times_use,
          });
        });
      }
      if (this.user.files.data.length) {
        await this.user.files.data.map((file) => {
          this.files.push(file.id);
        });
      }

      if (Object.keys(this.user.activePlan.data).length) {
        this.planId = this.user.activePlan.data.id;
      }
    }
    if (this.user.role_id) {
      this.roleText = "ادمین";
    } else {
      this.roleText = "کاربرعادی";
    }
    this.loading = false;
  },
};
</script>

<style scope>
tr {
  text-align: right;
}
</style>
