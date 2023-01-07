<template>
  <v-container class="mt-5" fluid>
    <v-row dense>
      <v-col cols="12" md="4" lg="4">
        <article
          class="plans elevation-2 mx-auto"
          :style="
            $vuetify.breakpoint.smAndDown ? ' width: 350px' : ' width: 290px'
          "
        >
          <v-row dense>
            <v-col cols="12">
              <v-img
                :src="plan.media_url"
                width="250px"
                height="150px"
                class="mx-auto"
                style="border-radius: 20px"
              >
                <template #placeholder>
                  <v-row class="fill-height" justify="center" align="center">
                    <v-progress-circular
                      width="2"
                      size="80"
                      color="primary"
                      indeterminate
                      style="top: 0px; left: 0px"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <p class="text-h6 font-weight-bold text-center mb-4">
                {{ plan.title }}
              </p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row dense>
            <v-col cols="12">
              <v-list>
                <v-list-item
                  class="text-h6 font-weight-bold blue--text accent-3 text-center"
                >
                  <v-list-item-title
                    >{{ plan.activation_days }} روزه</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  class="text-h6 font-weight-bold blue--text accent-3 text-center"
                >
                  <v-list-item-title
                    >{{ plan.daily_download_limit_count }} دانلود در
                    روز</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  v-if="plan.rebate"
                  class="text-h6 font-weight-bold blue--text accent-3 text-center"
                >
                  <v-list-item-title
                    >{{ plan.rebate }} درصد تخفیف</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  class="text-h5 font-weight-bold blue--text accent-3 mt-4"
                >
                  <span
                    class="d-block text-center"
                    :class="{
                      'text-decoration-line-through': plan.rebate > 0,
                    }"
                    style="width: 100%"
                    >{{
                      plan.amount > 0
                        ? $formatMoney(plan.amount) + "هزارتومان"
                        : "رایگان"
                    }}</span
                  >
                </v-list-item>
                <v-list-item
                  class="text-h5 font-weight-bold blue--text accent-3 mt-4"
                >
                  <span
                    v-if="plan.rebate > 0"
                    class="d-block text-center"
                    style="width: 100%"
                    >{{ plan.amount_after_rebate }} هزارتومان</span
                  >
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </article>
        <v-row dense justify="center" class="mt-6">
          <v-btn
            min-height="45"
            min-width="170"
            class="text-capitalize white--text text-body-2 font-weight-bold rounded-pill"
            color="primary"
            @click="toCart(plan, 'plan')"
          >
            افزودن به سبد خرید
            <v-icon color="#fff">mdi-cart</v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <v-card width="100%">
          <v-tabs color="indigo darken-3" left>
            <v-tab class="font-weight-bold text-body-1">توضیحات</v-tab>
            <v-tab class="font-weight-bold text-body-1">جزئیات</v-tab>
            <v-tab class="font-weight-bold text-body-1">نظرات</v-tab>
            <v-tab-item>
              <v-container fluid>
                <p class="text-body-1 font-weight-bold">
                  {{
                    plan.description ? plan.description : "توضیحی ثبت نشده است "
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
                            <v-col cols="12" md="4" sm="4" lg="4">
                              <p
                                style="width: 100%"
                                class="d-flex justify-space-around align-baseline"
                              >
                                <span
                                  class="text-body-2 font-weight-bold indigo--text darken-2"
                                  >عنوان :</span
                                >
                                <span
                                  class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                  style="background: #2196f3; width: 60%"
                                  >{{ plan.title }}</span
                                >
                              </p>
                            </v-col>
                            <v-col cols="12" md="4" sm="4" lg="4">
                              <p
                                style="width: 100%"
                                class="d-flex justify-space-around align-baseline"
                              >
                                <span
                                  class="text-body-2 font-weight-bold indigo--text darken-2"
                                  >قیمت :</span
                                >
                                <span
                                  class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                  style="background: #2196f3; width: 60%"
                                  >{{
                                    plan.amount > 0
                                      ? $formatMoney(plan.amount) + "تومان"
                                      : "رایگان"
                                  }}</span
                                >
                              </p>
                            </v-col>
                            <v-col cols="12" md="4" sm="4" lg="4">
                              <p
                                style="width: 100%"
                                class="d-flex justify-space-around align-baseline"
                              >
                                <span
                                  class="text-body-2 font-weight-bold indigo--text darken-2"
                                  >تعداد روزهای فعال :</span
                                >
                                <span
                                  class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                  style="background: #2196f3; width: 60%"
                                  >{{ plan.activation_days + "روز" }}</span
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
                            <v-col cols="12" md="4" sm="4" lg="4">
                              <p
                                style="width: 100%"
                                class="d-flex justify-space-around align-baseline"
                              >
                                <span
                                  class="text-body-2 font-weight-bold indigo--text darken-2"
                                  >تعداد دانلود در روز :</span
                                >
                                <span
                                  class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                  style="background: #2196f3; width: 60%"
                                  >{{
                                    plan.daily_download_limit_count + "فایل"
                                  }}</span
                                >
                              </p>
                            </v-col>
                            <v-col cols="12" md="4" sm="4" lg="4">
                              <p
                                style="width: 100%"
                                class="d-flex justify-space-around align-baseline"
                              >
                                <span
                                  class="text-body-2 font-weight-bold indigo--text darken-2"
                                  >مقدار تخفیف :</span
                                >
                                <span
                                  class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                  style="background: #2196f3; width: 60%"
                                  >{{
                                    plan.rebate > 0
                                      ? $calculateRebate(plan) + plan.percentage
                                        ? "درصد "
                                        : " هزار تومان "
                                      : "بدون تخفیف"
                                  }}</span
                                >
                              </p>
                            </v-col>
                            <v-col cols="12" md="4" sm="4" lg="4">
                              <p
                                style="width: 100%"
                                class="d-flex justify-space-around align-baseline"
                              >
                                <span
                                  class="text-body-2 font-weight-bold indigo--text darken-2"
                                  >قیمت بعد از تخفیف :</span
                                >
                                <span
                                  class="text-body-2 font-weight-bold white--text pa-1 mx-auto rounded-pill text-center"
                                  style="background: #2196f3; width: 60%"
                                  >{{
                                    $formatMoney(plan.amount_after_rebate) +
                                    "تومان"
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
              <ThePlanComments :planId="plan.id" />
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import toCart from "@/mixins/toCart.js";

export default {
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    shoppingCart: [],
  }),
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
};
</script>
<style lang=""></style>
