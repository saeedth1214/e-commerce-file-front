<template>
  <div v-if="plans.length">
    <v-row class="fill-height ma-4" align="center" justify="center">
      <h3
        class="text-h5 pa-4 blue--text lighten-3"
        style="border-bottom: 2px solid grey"
      >
        طرح های خریداری شده
      </h3>
    </v-row>
    <v-slide-group>
      <v-slide-item v-for="(plan, i) in plans" :key="`hotplan-${i}`">
        <v-card
          link
          color="surface"
          width="300"
          class="el ma-6 mb-5 mr-5"
          :to="`/panel/plans/${plan.id}`"
          nuxt
        >
          <v-card-text>
            <v-row col="mt-n6">
              <v-col cols="12">
                <v-img width="90%" height="150px" :src="plan.media_url">
                  <template #placeholder>
                    <v-row class="fill-height" justify="center" align="center">
                      <v-progress-circular
                        width="2"
                        size="80"
                        color="primary"
                        indeterminate
                        style="top: -10px; left: -10px"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12">
                <p class="text-h5 font-weight-bold text-center">
                  {{ plan.title }}
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                  v-if="plan.amount > 0"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    $formatMoney(plan.amount)
                  }}</span>

                  <span class="font-weight-bold black--text"
                    >/هزار تومان در ماه</span
                  >
                </p>
                <p
                  class="text-center mt-3 text-body-2 font-weight-bold grey--text darken-3"
                  style="width: 100%"
                  v-else
                >
                  <span class="blue--text accent-2 text-h6 font-weight-bold"
                    >رایگان</span
                  >
                  <v-divider></v-divider>
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    plan.daily_download_limit_count
                  }}</span>
                  <span class="font-weight-bold black--text"
                    >/ دانلود در روز</span
                  >
                </p>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                  v-if="plan.rebate > 0"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    $formatMoney(plan.amount_after_rebate)
                  }}</span>
                  <span class="font-weight-bold black--text"
                    >/هزار تومان بعد از تخفیف</span
                  >
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="d-flex mt-3 text-body-2 font-weight-light grey--text darken-3 justify-lg-space-between"
                  style="width: 100%"
                >
                  <span class="font-weight-bold black--text"
                    >تاریخ فعالسازی :</span
                  >
                  <span class="blue--text accent-2 text-h6 font-weight-bold"
                    >{{ changeCorrectFormat(plan.activation_at)[0] }}/{{
                      changeCorrectFormat(plan.activation_at)[1]
                    }}</span
                  >
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="d-flex mt-3 text-body-2 font-weight-light grey--text darken-3 justify-lg-space-between"
                  style="width: 100%"
                >
                  <span class="font-weight-bold black--text"
                    >تاریخ انقضا :</span
                  >
                  <span class="blue--text accent-2 text-h6 font-weight-bold"
                    >{{ changeCorrectFormat(plan.expired_at)[0] }}/{{
                      changeCorrectFormat(plan.expired_at)[1]
                    }}</span
                  >
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="d-flex mt-3 text-body-2 font-weight-light grey--text darken-3 justify-lg-space-between"
                  style="width: 100%"
                >
                  <span class="font-weight-bold black--text">تاریخ خرید :</span>
                  <span class="blue--text accent-2 text-h6 font-weight-bold"
                    >{{ changeCorrectFormat(plan.bought_at)[0] }}/{{
                      changeCorrectFormat(plan.bought_at)[1]
                    }}</span
                  >
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  props: {
    plans: {
      type: Array,
      required: true,
    },
  },

  methods: {
    changeCorrectFormat(dateTime) {
      return dateTime.split(" ");
    },
  },
};
</script>

<style scoped></style>
