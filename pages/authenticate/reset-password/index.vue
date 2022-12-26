<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="indigo darken-4">
                    <v-card-text class="white--text mt-12">
                      <h1 class="text-center display-1">دوست عزیز</h1>
                      <h5 class="text-center">
                        اگرایمیل تاییدی برای شما فرستاده نشده است روی دکمه زیر
                        کلیک کن !
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        rounded
                        outlined
                        dark
                        nuxt
                        to="/authenticate/forget-password"
                        class="mb-3"
                        >ارسال مجدد</v-btn
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center text-h5 indigo--text darken-4 text-md-h5"
                      >
                        تغییر رمز عبور
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
                        <v-form @submit.prevent="resetPasswordForm">
                          <v-text-field
                            :label="$t('auth.email')"
                            type="email"
                            prepend-icon="mdi-email"
                            color="teal accent-3"
                            readonly
                            v-model="forget.email"
                          />

                          <validation-provider
                            v-slot="{ errors }"
                            name="password"
                            rules="required|min:6|max:64"
                          >
                            <v-text-field
                              :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              :type="showPassword ? 'text' : 'password'"
                              label="رمز عبور"
                              v-model="forget.password"
                              :error-messages="errors"
                              prepend-icon="mdi-lock"
                              @click:append="showPassword = !showPassword"
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="password_confirmation"
                            :rules="`required|min:6|max:64|confirm:${forget.password}`"
                          >
                            <v-text-field
                              :append-icon="
                                showConfirmd ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              :type="showConfirmd ? 'text' : 'password'"
                              label="تکرار رمزعبور"
                              prepend-icon="mdi-lock"
                              v-model="forget.password_confirmation"
                              :error-messages="errors"
                              @click:append="showConfirmd = !showConfirmd"
                            ></v-text-field>
                          </validation-provider>
                          <v-row dense>
                            <v-col cols="12">
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
                            </v-col>
                          </v-row>
                        </v-form>
                      </validation-observer>
                    </v-card-text>
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
  </div>
</template>

<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    showPassword: false,
    showConfirmd: false,
    snackbar: false,
    overlay: false,
    showTime: false,
    nextRequest: false,
    forget: {
      email: null,
      token: null,
      password: null,
      password_confirmation: null,
    },
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
    async resetPasswordForm() {
      this.overlay = true;
      this.showTime = true;
      this.nextRequest = true;
      await this.$axios
        .post("auth/change-password", this.forget)
        .then(async (res) => {
          if (res.data.data.status === "SUCCESS") {
            await this.showMessage("success", "رمز عبور شما تغییر پیدا کرد");
            this.$router.push("/");
          }
        })
        .catch(async (err) => {
          await this.$store.commit(
            "option/changeSnackbarText",
            "اطلاعات ارسالی نامعتبر هستند"
          );
          this.snackbar = true;
        });
      this.overlay = false;
    },
  },
  async created() {
    this.overlay = true;
    if (
      Object.keys(this.$route.query) &&
      "token" in this.$route.query &&
      "email" in this.$route.query
    ) {
      this.forget.email = await this.$route.query.email;
      this.forget.token = await this.$route.query.token;
    } else {
      await this.showMessage("warning", "ایمیل یا توکن ارسالی نامعتبر هستند");
      this.$router.push("authenticate/forget-password");
    }
    this.overlay = false;
  },
};
</script>

<style></style>
