<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center" class="mb-3">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center text-subtitle-1 indigo--text darken-4 text-md-h5"
                      >
                        اطلاعات حساب خود را واردکنید
                      </h1>
                      <div class="text-center mt-4">
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon>mdi-telegram</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab color="black" outlined>
                          <v-icon>mdi-instagram</v-icon>
                        </v-btn>
                      </div>
                      <validation-observer #default="{ invalid }">
                        <v-form @submit.prevent="loginForm">
                          <validation-provider
                            v-slot="{ errors }"
                            name="login-username"
                            rules="required|username"
                          >
                            <v-text-field
                              v-model="login.username"
                              :label="$t('auth.username')"
                              prepend-icon="mdi-account"
                              type="text"
                              :error-messages="errors"
                              color="teal accent-3"
                            />
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="login-password"
                            rules="required|min:6|max:64"
                          >
                            <v-text-field
                              v-model="login.password"
                              :label="$t('auth.password')"
                              prepend-icon="mdi-lock"
                              type="password"
                              :error-messages="errors"
                              color="teal accent-3"
                            />
                          </validation-provider>
                          <div class="text-center mt-3">
                            <v-btn
                              rounded
                              color="indigo darken-4"
                              :disabled="invalid"
                              type="submit"
                              class="mb-3 white--text"
                              >ورود</v-btn
                            >
                          </div>
                        </v-form>
                      </validation-observer>

                      <nuxt-link
                        class="text-h6 d-block text-decoration-none black--text text-center mt-3"
                        to="/authenticate/forget-password"
                        >فراموشی رمزعبور ؟</nuxt-link
                      >
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="4" class="indigo darken-4">
                    <v-card-text class="white--text mt-8">
                      <h1 class="text-center display-1">سلام دوست عزیز</h1>
                      <h5 class="text-center body-2">
                        اگه قبلا ثبت نام نکردی میتونی از اینجا ثبت نام کنی
                      </h5>
                    </v-card-text>
                    <div class="text-center mb-4">
                      <v-btn rounded outlined dark @click="step++"
                        >ثبت نام</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="indigo darken-4">
                    <v-card-text class="white--text mt-12">
                      <h5 class="text-center body-2">
                        اگه میخای وارد سیستم بشی روی دکمه زیر کلیک کن
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined dark @click="step--" class="mb-3"
                        >ورود</v-btn
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center text-h5 indigo--text darken-4 text-md-h5"
                      >
                        ایجاد حساب کاربری
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
                        <v-form @submit.prevent="registerForm">
                          <validation-provider
                            v-slot="{ errors }"
                            name="register_firstName"
                            rules="min:3|max:64"
                          >
                            <v-text-field
                              v-model="register.first_name"
                              :label="$t('auth.firstName')"
                              type="text"
                              :error-messages="errors"
                              prepend-icon="mdi-account"
                              color="teal accent-3"
                            />
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="register_lastName"
                            rules="min:3|max:64"
                          >
                            <v-text-field
                              v-model="register.last_name"
                              :label="$t('auth.lastName')"
                              type="text"
                              prepend-icon="mdi-account-edit"
                              color="teal accent-3"
                              :error-messages="errors"
                            />
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="register_email"
                            rules="required|email"
                          >
                            <v-text-field
                              :label="$t('auth.email')"
                              v-model="register.email"
                              prepend-icon="mdi-email"
                              color="teal accent-3"
                              :error-messages="errors"
                            />
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="register_mobile"
                            rules="mobile"
                          >
                            <v-text-field
                              v-model="register.mobile"
                              :label="$t('auth.mobile')"
                              prepend-icon="mdi-phone"
                              color="teal accent-3"
                              :error-messages="errors"
                            />
                            <small>این فیلد الزامی نیست</small>
                          </validation-provider>
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
                              v-model="register.password"
                              :error-messages="errors"
                              @click:append="showPassword = !showPassword"
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="password_confirmation"
                            :rules="`required|min:6|max:64|confirm:${register.password}`"
                          >
                            <v-text-field
                              :append-icon="
                                showConfirmd ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              :type="showConfirmd ? 'text' : 'password'"
                              label="تکرار رمزعبور"
                              v-model="register.password_confirmation"
                              :error-messages="errors"
                              @click:append="showConfirmd = !showConfirmd"
                            ></v-text-field>
                          </validation-provider>
                          <v-row dense>
                            <v-col cols="12">
                              <div class="text-center mt-5">
                                <v-btn
                                  rounded
                                  color="indigo darken-4"
                                  type="submit"
                                  :disabled="invalid"
                                  class="mb-3 white--text"
                                  >ثبت نام</v-btn
                                >
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
    </v-container>
    <v-row>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>
    <v-snackbar v-model="snackbar" top color="warning" :timeout="3000">{{
      text
    }}</v-snackbar>
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    step: 1,
    snackbar: false,
    overlay: false,
    showPassword: false,
    showConfirmd: false,
    register: {
      first_name: null,
      last_name: null,
      email: null,
      mobile: null,
      password: null,
      password_confirmation: null,
    },
    login: {
      username: "",
      password: "",
    },
  }),
  mixins: [showMessage],
  computed: {
    text() {
      return this.$store.state.option.snackbar.text;
    },
  },

  middleware(context) {
    if (context.$auth.loggedIn) {
      context.redirect("/");
    }
  },
  methods: {
    async registerForm() {
      this.overlay = true;

      // unique email or mobile

      let params = {};

      this.register.email &&
        (params["filters[unique][email]"] = this.register["email"]);
      this.register.mobile &&
        (params["filters[unique][mobile]"] = this.register["mobile"]);
      await this.$axios
        .get("frontend/users", { params })
        .then(async (res) => {
          if (!res.data.data.length) {
            let registerObj = {};
            this.register["first_name"] &&
              (this.register["first_name"] =
                this.register["first_name"].trim());
            this.register["last_name"] &&
              (this.register["last_name"] = this.register["last_name"].trim());
            Object.keys(this.register).forEach((key) => {
              if (this.register[key] !== null && this.register[key] !== "") {
                registerObj[key] = this.register[key];
              }
            });
            await this.$axios
              .post("auth/register", registerObj)
              .then(async (res) => {
                if (res.status === 201) {
                  await localStorage.setItem("email", this.register.email);
                  await this.showMessage(
                    "success",
                    "کد تاییدی به ایمیل شما ارسال شد"
                  );
                  this.$router.push({
                    path: "/authenticate/verify-email",
                    query: { email: this.register.email },
                  });
                }
              })
              .catch((err) => {
                this.snackbar = true;
              });
          } else {
            this.overlay = false;
            await this.$store.commit(
              "option/changeSnackbarText",
              "ایمیل یا شماره موبایل تکراری است"
            );
            this.snackbar = true;
          }
        })
        .catch((err) => console.log(err));
      this.overlay = false;
    },
    async loginForm() {
      this.overlay = true;
      this.login.device_name = this.$device.userAgent;
      await this.$auth
        .loginWith("local", {
          data: this.login,
        })
        .then(async (res) => {
          await this.$auth.setUserToken(res.data.data.token);
          await this.$auth.setUser(res.data.data.user.data);
          this.$router.push("front/profile");
        })
        .catch(async (err) => {
          if (err.response.status === 400) {
            await this.$store.commit(
              "option/changeSnackbarText",
              "نام کاربری یا رمز عبور نامعتبر است"
            );
            this.snackbar = true;

            // await this.$store.commit("option/changeSnackbarMood", true);
          }
        });
      this.overlay = false;
    },
  },
  async created() {
    if (this.$route.query && "login" in this.$route.query) {
      this.step = 1;
    } else if (this.$route.query && "register" in this.$route.query) {
      this.step = 2;
    }
  },
};
</script>

<style></style>
