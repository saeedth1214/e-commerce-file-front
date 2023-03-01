<template>
  <div style="min-height: 490px">
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
                      <div class="socialite">
                        <a href="https://t.me/mhsoltani1214" target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000"
                              d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.804l9.733-3.76c.565-.23.885.061.702.79l-1.657 7.82c-.116.557-.451.69-.916.433l-2.551-1.888l-1.189 1.148c-.122.118-.221.219-.409.244c-.187.026-.341-.03-.454-.34l-.87-2.871l-.012.008z"
                            />
                          </svg>
                        </a>
                        <a
                          href="https://www.instagram.com/saeedt.h1214"
                          target="_blank"
                        >
                          <!-- <v-icon color="#fff" size="2rem">mdi-instagram</v-icon> -->
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000"
                              d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z"
                            />
                          </svg>
                        </a>
                        <a href="https://wa.link/3ehfzm" target="_blank">
                          <!-- <v-icon color="#fff" size="2rem">mdi-whatsapp</v-icon> -->
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000"
                              d="m7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8a7.95 7.95 0 0 0 1.084 4.024l.422.724l-.653 2.401l2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004c.054.004.108.01.162.016c.159.018.334.115.393.249c.298.676.588 1.357.868 2.04c.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268c.12.116.237.235.363.346c.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11c.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04c.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265c.004.067.01.175-.013.373c-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302a2.378 2.378 0 0 1-.33.288a3.71 3.71 0 0 1-.125.09a5.024 5.024 0 0 1-.383.22a1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014c-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626c-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305c.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z"
                            />
                          </svg>
                        </a>
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
                      <v-btn
                        rounded
                        outlined
                        dark
                        @click="$router.push('/authenticate?register')"
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
                        اگه میخای وارد سایت بشی روی دکمه زیر کلیک کن
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        rounded
                        outlined
                        dark
                        @click="$router.push('/authenticate?login')"
                        class="mb-3"
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
                      <div class="socialite">
                        <a href="https://t.me/mhsoltani1214" target="_blank">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000"
                              d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.804l9.733-3.76c.565-.23.885.061.702.79l-1.657 7.82c-.116.557-.451.69-.916.433l-2.551-1.888l-1.189 1.148c-.122.118-.221.219-.409.244c-.187.026-.341-.03-.454-.34l-.87-2.871l-.012.008z"
                            />
                          </svg>
                        </a>
                        <a
                          href="https://www.instagram.com/saeedt.h1214"
                          target="_blank"
                        >
                          <!-- <v-icon color="#fff" size="2rem">mdi-instagram</v-icon> -->
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000"
                              d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z"
                            />
                          </svg>
                        </a>
                        <a href="https://wa.link/3ehfzm" target="_blank">
                          <!-- <v-icon color="#fff" size="2rem">mdi-whatsapp</v-icon> -->
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2rem"
                            height="2rem"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#000"
                              d="m7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8a7.95 7.95 0 0 0 1.084 4.024l.422.724l-.653 2.401l2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004c.054.004.108.01.162.016c.159.018.334.115.393.249c.298.676.588 1.357.868 2.04c.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268c.12.116.237.235.363.346c.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11c.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04c.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265c.004.067.01.175-.013.373c-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302a2.378 2.378 0 0 1-.33.288a3.71 3.71 0 0 1-.125.09a5.024 5.024 0 0 1-.383.22a1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014c-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626c-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305c.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z"
                            />
                          </svg>
                        </a>
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

  watch: {
    "$route.query": "changeStep",
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
                  localStorage.setItem("email", this.register.email);
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
                if (err.response.status === 503) {
                  this.showMessage("error", err.response.data.data.error);
                }
                if (err.response.status === 422) {
                  this.showMessage(
                    "error",
                    "لطفا بعد از 2 دقیقه دوباره اقدام کنید . "
                  );
                }
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
          this.$router.go(-1);
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

    changeStep() {
      if (this.$route.query && "login" in this.$route.query) {
        this.step = 1;
      } else if (this.$route.query && "register" in this.$route.query) {
        this.step = 2;
      }
    },
  },
  async created() {
    this.changeStep();
  },
};
</script>

<style scoped lang="scss">
.socialite {
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

  a {
    text-decoration: none;
    background: transparent;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    transition: all 0.2s linear;
    &:hover {
      background: #000;
      border-radius: 50%;
      svg path {
        fill: #fff;
      }
    }
  }
}
</style>
