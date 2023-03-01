<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center text-subtitle-1 indigo--text darken-4 text-md-h5"
                      >
                        ایمیل خود را واردکنید
                      </h1>
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
                      <validation-observer v-slot="{ invalid }">
                        <v-form @submit.prevent="forgetPasswordForm">
                          <validation-provider
                            v-slot="{ errors }"
                            name="forget-email"
                            rules="required|email"
                          >
                            <v-text-field
                              :label="$t('auth.email')"
                              prepend-icon="mdi-email"
                              type="email"
                              v-model="email"
                              :error-messages="errors"
                              color="teal accent-3"
                            />
                          </validation-provider>
                          <div
                            class="text-center mt-3 d-flex justify-center align-baseline"
                          >
                            <v-btn
                              rounded
                              color="indigo darken-4"
                              class="white--text mb-3"
                              type="submit"
                              :disabled="invalid || nextRequest"
                              >ارسال</v-btn
                            >
                            <TheTimer
                              v-if="showTime"
                              @showtimer="enableSendbtn"
                            />
                          </div>
                        </v-form>
                      </validation-observer>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="4" class="indigo darken-4">
                    <v-card-text class="white--text mt-8">
                      <h1 class="text-center display-1">سلام دوست عزیز</h1>
                      <h5 class="text-center">
                        اگه میخای وارد سایت بشی روی دکمه زیر کلیک کن
                      </h5>
                    </v-card-text>
                    <div class="text-center mb-4">
                      <v-btn rounded outlined dark nuxt to="/authenticate"
                        >ورود</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-row>
      <v-snackbar v-model="snackbar" top color="warning" :timeout="3000">{{
        text
      }}</v-snackbar>
    </v-container>
    <div style="width: 100%; height: 150px"></div>
  </div>
</template>

<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    email: null,
    try: 0,
    showTime: false,
    nextRequest: false,
    overlay: false,
    snackbar: false,
  }),
  computed: {
    text() {
      return this.$store.state.option.snackbar.text;
    },
  },
  mixins: [showMessage],
  methods: {
    enableSendbtn() {
      this.showTime = false;
      this.nextRequest = false;
    },
    async forgetPasswordForm() {
      this.overlay = true;
      if (this.try < 5) {
        let params = {};
        params["filters[unique][email]"] = this.email;
        await this.$axios
          .get("panel/users", { params })
          .then(async (res) => {
            if (!res.data.data.length) {
              this.overlay = false;
              await this.$store.commit(
                "option/changeSnackbarText",
                "چنین کاربری وجود ندارد"
              );
              this.snackbar = true;
            } else {
              await this.$axios
                .post("auth/forget-password", { email: this.email })
                .then(async (res) => {
                  if (res.data.data.status === "SUCCESS") {
                    this.showMessage(
                      "success",
                      "ایمیل تاییدی برای شما ارسال شد"
                    );
                  }
                })
                .catch(async (err) => {
                  if ("email" in err.response.data.errors) {
                    await this.$store.commit(
                      "option/changeSnackbarText",
                      err.response.data.errors.email[0]
                    );
                    this.snackbar = true;
                  }
                });
              this.try++;
              this.showTime = true;
              this.nextRequest = true;
            }
          })
          .catch((err) => console.log(err));
      } else {
        await this.$store.commit(
          "option/changeSnackbarText",
          "تعداد درخواست های شما بیشتر از حد مجاز است لطفا 20 دقیقه دیگر دوباره تلاش کنید"
        );
        this.snackbar = true;
      }

      this.overlay = false;
    },
  },
};
</script>

<style></style>
