<template>
  <div>
    <TheNav/>
    <br>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="indigo darken-4">
                    <v-card-text class="white--text mt-12">
                      <h5
                        class="text-center text-body-2 font-weight-regular"
                      >برای ارسال مجدد کد تایید روی دکمه زیر کلیک کنید</h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark class="mb-3" @click="resendVerifyCode">ارسال مجدد</v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center text-h5 indigo--text darken-4 text-md-h5"
                      >تایید نهایی ایمیل</h1>
                      <div class="text-center mt-4">
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon>mdi-instagram</v-icon>
                        </v-btn>
                      </div>
                      <h4
                        class="text-center mt-4 text-body-2 font-weight-medium"
                      >لطفا کد تایید ارسال شده به ایمیل خود را وارد کنید</h4>
                      <v-form @submit.prevent="verifyEmail">
                        <v-text-field
                          :label="$t('auth.email')"
                          v-model="verify.email"
                          prepend-icon="mdi-email"
                          color="teal accent-3"
                          readonly
                        />
                        <div class="ma-auto position-relative" style="max-width: 300px">
                          <v-otp-input length="5" v-model="otp" @finish='onFinish'></v-otp-input>
                          <v-overlay absolute :value="loading">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                          </v-overlay>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" top :color="color" :timeout="2000">{{ text }}</v-snackbar>
    </v-container>
    <TheFooter/>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    otp: "",
    verify: {
      email: null,
      code: null,
      device_name: null
    }
  }),
  computed: {
    text() {
      return this.$store.state.option.snackbar.text;
    },

    snackbar: {
      get() {
        return this.$store.state.option.snackbar.snackbar;
      },
      set(newVal) {
        this.$store.commit("option/changeSnackbarMood", newVal);
      }
    },

    color() {
      return this.$store.state.option.snackbar.color;
    }
  },
  created() {
    if ("email" in this.$route.query && this.$route.query.email) {
      this.verify.email = this.$route.query.email;
      this.verify.device_name = this.$device.userAgent;
    } else {
      this.$router.push("/authenticate");
    }
  },

  methods: {
    async resendVerifyCode() {
      this.loading = true;
      await this.$axios
        .post("/auth/resend", {
          email: this.verify.email
        })
        .then(async res => {
          if (res.data.status === "SUCCESS") {
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarText",
              "کد تایید جدید برای شما ارسال شد"
            );
            await this.$store.commit("option/changeSnackbarColor", "success");
          }
        })
        .catch(async err => {
          if (err.response.status === 422) {
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarText",
              "ایمیل یا کد تایید وارد شده نامعتبر است"
            );
            await this.$store.commit("option/changeSnackbarColor", "error");
          }
        });
      this.loading = false;
    },
    async onFinish(rsp) {
      this.loading = true;
      this.verify.code = this.otp;
      await this.$axios
        .post("/auth/verify", this.verify)
        .then(async res => {
          if (res.status === 200) {
            await this.$store.commit(
              "option/changeSnackbarText",
              "ثبت نام شما با موفقیت انجام شد"
            );
            await this.$store.commit("option/changeSnackbarColor", "success");
            await this.$auth.setUserToken(res.data.data.token);
            await this.$auth.setUser(res.data.data.user.data);
            this.$router.push("/");
          }
        })
        .catch(async err => {
          await this.$store.commit(
            "option/changeSnackbarText",
            "ایمیل یا کد تایید وارد شده نامعتبر است"
          );
          await this.$store.commit("option/changeSnackbarColor", "warning");
          await this.$store.commit("option/changeSnackbarMood", true);
        });
      this.loading = false;
    }
  }
};
</script>

<style scoped>
>>> .v-otp-input {
  direction: ltr;
}
</style>
