<template>
  <v-row justify="center" class="pa-8">
    <v-container fluid>
      <v-card color="#fff">
        <v-row dense>
          <v-col cols="6" md="9" sm="9" lg="9">
            <div class="ma-4 d-flex">
              <p>
                <v-menu offset-y :close-on-content-click="false" v-model="menu">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="green"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="download"
                      >دانلود</v-btn
                    >
                  </template>
                </v-menu>
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
                <v-btn
                  min-height="45"
                  min-width="170"
                  class="text-capitalize white--text text-body-2 font-weight-bold custom-btn-loader"
                  color="primary"
                  @click="addToCart(file)"
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
                  v-else
                >
                  خرید اشتراک
                </v-btn>
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
      <TheOverlay :overlay="overlay" />
      <SnackBar color="orange darken-2" />
    </v-container>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
      menu: false,
      showPurchaseDialog: false,
      radioGroup: 1,
      is_reacted: false,
      overlay: false,
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
    this.file.is_reacted && (this.is_reacted = this.file.is_reacted);
    Object.keys(this.file.reaction_summary).length &&
      (this.reactionSummary = this.file.reaction_summary);
    await this.$store.commit("option/changeSnackbarMood", false);
  },
  methods: {
    async download() {
      this.overlay = true;
      await this.$axios
        .post(`frontend/files/${this.file.id}/download`)
        .then((res) => {
          window.open(res.data.data.url, "_blank");
        })
        .catch(async (err) => {
          let message = "";
          if (err.response.status === 400) {
            message = "لینک دانلود فایل وجود ندارد.";
          } else if (err.response.status === 403) {
            message = "برای دانلود فایل ابتدا آن را خریداری کنید .";
          }
          await this.$store.commit("option/changeSnackbarMood", true);
          await this.$store.commit(
            "option/changeSnackbarColor",
            "orange darken-2"
          );
          await this.$store.commit("option/changeSnackbarText", message);
        });
      this.overlay = false;
    },
    toggleDialog() {
      this.dialog = false;
      this.$router.push("/front/files");
    },
    async toggleReaction() {
      this.overlay = true;
      await this.$axios
        .post(`frontend/files/${this.file.id}/reactions`)
        .then((res) => {
          this.is_reacted = res.data.data.is_reacted;
          this.reactionSummary = { ...res.data.data.reaction_summary };
        });
      this.overlay = false;
    },
    async addToCart(file) {
      this.$emit("addToCart", file);
    },
  },
};
</script>
<style scoped lang="scss"></style>
