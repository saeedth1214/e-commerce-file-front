<template>
  <div>
    <v-container class="plan-list" fluid>
      <v-row dense>
        <p
          class="text-center text-h6 blue--text accent-1 font-weight-bold"
          style="width: 100%"
        >
          طرح های فعال
        </p>
      </v-row>
      <v-row dense v-if="plans.length">
        <v-col
          cols="12"
          md="4"
          sm="6"
          lg="3"
          v-for="(plan, Idx) in plans"
          :key="Idx"
        >
          <v-card width="100%" height="auto">
            <div class="plan-details elevation-2 pa-4">
              <v-row dense>
                <v-col cols="6" md="6" sm="6" lg="6">
                  <p class="blue--text accent-4 font-weight-bold">
                    <span
                      v-if="plan.amount > 0"
                      class="d-block text-h6"
                      :class="{
                        'text-decoration-line-through': plan.rebate > 0,
                      }"
                      >{{ $formatMoney(plan.amount) }} تومان</span
                    >
                    <span v-else class="d-block text-h6">رایگان</span>
                    <span
                      v-if="plan.rebate > 0"
                      class="d-block text-body-2 font-weight-bold red--text darken-2"
                      >{{ $formatMoney(plan.amount) }} تومان</span
                    >
                  </p>
                </v-col>
                <v-col cols="6" md="6" sm="6" lg="6">
                  <p
                    v-if="plan.rebate > 0"
                    class="text-body-2 blue accent-2 white--text font-weight-bold rebate"
                  >
                    {{
                      plan.percentage
                        ? plan.rebate + "%"
                        : $calculateRebate(plan.rebate) + "هزار تومان"
                    }}
                    تخفیف
                  </p>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-img
                    :src="plan.media_url"
                    width="250"
                    height="135"
                    class="mx-auto"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row dense>
                <p
                  class="text-h6 font-weight-bold black--text text-center"
                  style="width: 100%"
                >
                  {{ plan.title }}
                </p>
              </v-row>
              <v-row dense>
                <v-col cols="12" md="4" sm="4" class="text-center">
                  <span class="blue--text accent-1">
                    <v-icon class="blue--text accent-1 font-weight-bold"
                      >mdi-account</v-icon
                    >
                    {{ plan.usersCount }}
                  </span>
                  <p class="text-body-2 font-weight-bold black--text">
                    کاربر خریده اند
                  </p>
                </v-col>
                <v-col cols="12" md="4" sm="4" class="text-center">
                  <span class="blue--text accent-1">
                    <v-icon class="blue--text accent-1 font-weight-bold"
                      >mdi-eye</v-icon
                    >
                    {{ plan.activation_days }}
                  </span>
                  <p class="text-body-2 font-weight-bold black--text">
                    روز فعال
                  </p>
                </v-col>
                <v-col cols="12" md="4" sm="4" class="text-center">
                  <span class="blue--text accent-1">
                    <v-icon class="blue--text accent-1 font-weight-bold"
                      >mdi-download</v-icon
                    >
                    {{ plan.daily_download_limit_count }}
                  </span>
                  <p class="text-body-2 font-weight-bold black--text">
                    دانلود در روز
                  </p>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <nuxt-link
                    style="width: 80%"
                    class="rounded blue--text accent-3 pa-3 ma-3 d-block text-center text-decoration-none text-center text-body-2 font-weight-bold mx-auto"
                    :to="{
                      name: 'front-plans-title___fa',
                      params: {
                        title: plan.title.replace(/\s+/g, '_'),
                        id: plan.id,
                      },
                    }"
                    >نمایش</nuxt-link
                  >
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense v-else>
        <v-col cols="12">
          <v-alert width="70%" type="info" class="text-center mx-auto"
            >مورد خاصی پیدا نشد</v-alert
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    planItems: [],
  }),
  props: {
    plans: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.plan-list {
  background-color: aliceblue;
}
.plan-details {
  width: 100%;
  height: 100%;
}
a {
  width: 180px;
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid #00bdfe;
}

a:hover {
  background-color: #00bdfe;
  color: #fff !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
}
</style>
