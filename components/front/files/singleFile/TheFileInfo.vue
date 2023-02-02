<template>
  <v-row justify="center" class="pa-8">
    <v-container fluid>
      <v-card color="#fff" v-if="!loading">
        <v-row dense>
          <v-col cols="6" md="9" sm="9" lg="9">
            <div class="ma-4 d-flex">
              <p>
                <v-btn color="green" dark @click="download">دانلود</v-btn>
              </p>
              <p class="mr-3">
                <v-tooltip bottom v-if="!$auth.loggedIn">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="$router.push('/authenticate')"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ reactionSummary.like }}
                      <v-icon
                        :color="is_reacted ? '#e5ca3b' : ' white'"
                        style="margin-right: 5px"
                        >mdi-heart</v-icon
                      >
                    </v-btn>
                  </template>
                  <span>لطفا لاگین کنید</span>
                </v-tooltip>
                <v-btn @click="toggleReaction" v-else>
                  {{ reactionSummary.like }}
                  <v-icon
                    :color="is_reacted ? '#e5ca3b' : ' white'"
                    style="margin-right: 5px"
                    >mdi-heart</v-icon
                  >
                </v-btn>
              </p>
              <p class="mr-3">
                <v-btn>
                  {{ file.download_count }}
                  <v-icon color="white--text">mdi-download</v-icon>
                </v-btn>
              </p>
            </div>
          </v-col>
          <v-col cols="6" md="3" sm="3" lg="3">
            <div class="ma-4 text-left">
              <v-btn @click="toggleDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="4">
              <v-card link color="surface" width="300" class="el mx-auto">
                <v-img height="300" :src="file.media_url">
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
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <div class="d-flex justify-space-around">
                        <p
                          class="text-body-2 font-weight-bold text-rigth indigo--text darken-1"
                          style="width: 70%"
                        >
                          عنوان فایل :
                        </p>
                        <p
                          class="text-body-2 blue--text accent-1 font-weight-bold text-left"
                          style="width: 70%"
                        >
                          {{ file.title }}
                        </p>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex justify-space-around">
                        <p
                          class="text-body-2 font-weight-bold text-rigth indigo--text darken-1"
                          style="width: 70%"
                        >
                          قیمت :
                        </p>
                        <p
                          class="text-body-2 font-weight-bold text-left blue--text accent-1"
                          style="width: 70%"
                        >
                          {{ $formatMoney(file.amount) }} تومان
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-row dense justify="center" class="mt-6">
                <p v-if="!$auth.loggedIn">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        min-height="45"
                        min-width="170"
                        class="text-capitalize white--text text-body-2 font-weight-bold custom-btn-loader"
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        افزودن به سبد خرید
                        <v-icon color="#fff">mdi-cart</v-icon>
                      </v-btn>
                    </template>
                    <span>لطفا لاگین کنید</span>
                  </v-tooltip>
                </p>
                <p v-else>
                  <v-btn
                    min-height="45"
                    min-width="170"
                    class="text-capitalize white--text text-body-2 font-weight-bold custom-btn-loader"
                    color="primary"
                    @click="AddtoCart(file)"
                    v-if="file.sale_as_single"
                  >
                    افزودن به سبد خرید
                    <v-icon color="#fff">mdi-cart</v-icon>
                  </v-btn>
                  <v-btn
                    min-height="45"
                    min-width="170"
                    class="text-capitalize white--text text-body-2 font-weight-bold"
                    color="primary"
                    @click="$router.push('/front/plans')"
                    v-else-if="!userHasActivePlan"
                  >
                    خرید اشتراک
                  </v-btn>
                </p>
              </v-row>
            </v-col>
            <v-col cols="12" md="8">
              <v-card width="100%">
                <v-tabs color="indigo darken-3" left>
                  <v-tab class="font-weight-bold text-body-1">توضیحات</v-tab>
                  <v-tab class="font-weight-bold text-body-1">جزئیات</v-tab>
                  <v-tab class="font-weight-bold text-body-1">نظرات</v-tab>
                  <v-tab-item>
                    <v-container fluid>
                      <p class="text-body-1 font-weight-bold">
                        {{
                          file.description
                            ? file.description
                            : " توضیحی ثبت نشده است"
                        }}
                      </p>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <v-container fluid>
                      <v-list rounded>
                        <v-list-item-group color="primary">
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                <v-row dense>
                                  <v-col cols="12" md="4" sm="4">
                                    <p
                                      style="width: 100%"
                                      class="d-flex justify-space-around align-baseline"
                                    >
                                      <span
                                        class="text-body-2 font-weight-bold indigo--text darken-1"
                                        >عنوان :</span
                                      >
                                      <span
                                        class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                        style="background: #2196f3; width: 70%"
                                        >{{ file.title }}</span
                                      >
                                    </p>
                                  </v-col>
                                  <v-col cols="12" md="4" sm="4">
                                    <p
                                      style="width: 100%"
                                      class="d-flex justify-space-around align-baseline"
                                    >
                                      <span
                                        class="text-body-2 font-weight-bold indigo--text darken-1"
                                        >قیمت :</span
                                      >
                                      <span
                                        class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                        style="background: #2196f3; width: 70%"
                                        >{{
                                          file.amount > 0
                                            ? $formatMoney(file.amount) +
                                              "تومان"
                                            : "رایگان"
                                        }}</span
                                      >
                                    </p>
                                  </v-col>
                                  <v-col cols="12" md="4" sm="4">
                                    <p
                                      style="width: 100%"
                                      class="d-flex justify-space-around align-baseline"
                                    >
                                      <span
                                        class="text-body-2 font-weight-bold indigo--text darken-1"
                                        >دانلود شده :</span
                                      >
                                      <span
                                        class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                        style="background: #2196f3; width: 70%"
                                        >{{ file.download_count }}</span
                                      >
                                    </p>
                                  </v-col>
                                </v-row>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>
                                <v-row dense>
                                  <v-col cols="12" md="4" sm="4">
                                    <p
                                      style="width: 100%"
                                      class="d-flex justify-space-around align-baseline"
                                    >
                                      <span
                                        class="text-body-2 font-weight-bold indigo--text darken-1"
                                        >مقدار تخفیف :</span
                                      >
                                      <span
                                        class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                        style="background: #2196f3; width: 70%"
                                        >{{ $calculateRebate(file) }}
                                        {{
                                          file.percentage
                                            ? "درصد "
                                            : " هزار تومان "
                                        }}</span
                                      >
                                    </p>
                                  </v-col>
                                  <v-col cols="12" md="4" sm="4">
                                    <p
                                      style="width: 100%"
                                      class="d-flex justify-space-around align-baseline"
                                    >
                                      <span
                                        class="text-body-2 font-weight-bold indigo--text darken-1"
                                        >قیمت بعد از تخفیف :</span
                                      >
                                      <span
                                        class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                        style="background: #2196f3; width: 70%"
                                        >{{
                                          $formatMoney(
                                            file.amount_after_rebate
                                          ) + "تومان"
                                        }}</span
                                      >
                                    </p>
                                  </v-col>
                                </v-row>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-container>
                  </v-tab-item>
                  <v-tab-item>
                    <TheFileComments :fileId="file.id" />
                  </v-tab-item>
                </v-tabs>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- <same-files
              :files="file.sameFiles"
              v-if="file.sameFiles && file.sameFiles.length"
            /> -->
        <!-- <tags v-if="file.tags.data.length" :tags="file.tags.data" /> -->
      </v-card>
      <v-sheet color="grey lighten-3" class="pa-3" v-else>
        <v-skeleton-loader
          class="mx-auto"
          width="100%"
          height="300px"
          type="card"
        ></v-skeleton-loader>
      </v-sheet>
      <SnackBar color="orange darken-2" />
    </v-container>
  </v-row>
</template>
<script>
import toCart from "@/mixins/toCart.js";

export default {
  mixins: [toCart],

  mounted() {
    this.shoppingCart = this.$cookies.get("cart", { parseJSON: true }) || [];
  },
  watch: {
    shoppingCart: {
      async handler(newVal) {
        await this.$cookies.set("cart", JSON.stringify(newVal), {
          path: "/",
          maxAge: process.env.CART_MAX_AGE,
        });
        await this.$store.commit("option/setBasketItems");
      },
      deep: true,
    },
  },
  data() {
    return {
      dialog: true,
      menu: false,
      showPurchaseDialog: false,
      radioGroup: 1,
      is_reacted: false,
      loading: false,
      userHasActivePlan: false,
      shoppingCart: [],
      reactionSummary: {
        like: 0,
      },
    };
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  async created() {
    let user = this.$auth.user;
    this.file.is_reacted && (this.is_reacted = this.file.is_reacted);
    Object.keys(this.file.reaction_summary).length &&
      (this.reactionSummary = this.file.reaction_summary);

    if (this.$auth.loggedIn) {
      await this.$axios
        .get(`frontend/users/${user.id}/active-plan`)
        .then((res) => {
          if (!res.data) {
            this.userHasActivePlan = true;
          }
        });
    }
    await this.$store.commit("option/changeSnackbarMood", false);
  },
  methods: {
    async download() {
      this.loading = true;
      await this.$axios
        .post(`frontend/files/${this.file.id}/download`)
        .then((res) => {
          window.open(res.data.data.url, "_blank");
        })
        .catch(async (err) => {
          if (err.response) {
            let message = "";
            if (err.response.status === 400) {
              message = "لینک دانلود فایل وجود ندارد.";
            }
            if (err.response && err.response.status === 403) {
              message = "برای دانلود فایل ابتدا آن را خریداری کنید .";
            }
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarColor",
              "orange darken-2"
            );
            await this.$store.commit("option/changeSnackbarText", message);
          }
        });
      this.loading = false;
    },
    toggleDialog() {
      this.dialog = false;
      this.$router.push("/front/files");
    },
    async toggleReaction() {
      this.loading = true;
      await this.$axios
        .post(`frontend/files/${this.file.id}/reactions`)
        .then((res) => {
          this.is_reacted = res.data.data.is_reacted;
          this.reactionSummary = { ...res.data.data.reaction_summary };
        });
      this.loading = false;
    },

    async AddtoCart(file) {
      let user = this.$auth.user;
      await this.$axios
        .get(`frontend/users/${user.id}/files/${this.file.id}`)
        .then(async (res) => {
          if (res.data.data.count) {
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarColor",
              "orange darken-2"
            );
            await this.$store.commit(
              "option/changeSnackbarText",
              "این فایل قبلا خریداری شده است ."
            );
          } else {
            await this.toCart(file, "file");
          }
        });
    },
  },
};
</script>
<style scoped lang="scss"></style>
