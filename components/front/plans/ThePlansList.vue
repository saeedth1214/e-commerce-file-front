<template>
  <v-container>
    <div class="plan-list" v-if="plans.length">
      <v-card
        width="100%"
        height="auto"
        v-for="(plan, Idx) in plans"
        :key="Idx"
      >
        <v-card-title>
          <p class="text-center" style="width: 100%">{{ plan.title }}</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p
            class="text-center"
            style="font-size: 0.9rem; color: #1d262d; font-weight: 600"
          >
            دانلود روزانه {{ plan.daily_download_limit_count }} فایل به انتخاب
            شما
          </p>
        </v-card-text>
        <v-card-text>
          <p
            class="text-center"
            style="font-size: 1rem; color: #1d262d; font-weight: 800"
          >
            دانلود روزانه {{ plan.daily_free_download_limit_count }} فایل رایگان
            (پوستر,موکاپ, ...)
          </p>
        </v-card-text>
        <v-card-text>
          <div class="plan-details">
            <div class="plan-rebate" v-if="plan.rebate > 0">
              {{ plan.rebate }} % تخفیف
            </div>
            <p
              class="text-center"
              style="
                border-bottom: 1px solid #d7d7d7;
                font-size: 1rem;
                color: #1d262d;
                font-weight: 800;
              "
            >
              {{ plan.type_desc }}
            </p>
            <p
              class="text-center"
              style="font-size: 1.2rem; font-weight: 600; color: #017e01"
              :style="[
                plan.rebate > 0 ? { 'text-decoration': 'line-through' } : '',
              ]"
            >
              {{ $formatMoney(plan.amount) }}
            </p>
            <p
              class="text-center"
              style="font-size: 1.2rem; font-weight: 600; color: #ef6161"
              v-if="plan.rebate > 0"
            >
              {{ $formatMoney(plan.amount_after_rebate) }}
            </p>
            <v-btn
              style="width: 80%"
              class="rounded blue--text accent-3 pa-2 d-block text-center text-body-2 font-weight-bold mx-auto"
              @click="buyPlan(Idx)"
              plain
              shaped
              outlined
              >خرید اشتراک</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-row dense v-else>
      <v-col cols="12">
        <v-alert
          width="70%"
          type="error"
          class="text-center mx-auto"
          dense
          colored-border
          color="deep-purple accent-4"
          elevation="2"
          >مورد خاصی پیدا نشد</v-alert
        >
        <div style="height: 300px; width: 100%"></div>
      </v-col>
    </v-row>
  </v-container>
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

  methods: {
    async buyPlan(Idx) {
      let plan = this.plans[Idx];
      let subscription = {
        id: plan.id,
        title: plan.title,
        price: plan.amount_after_rebate,
      };
      await this.$store.dispatch("plan/setSubscription", subscription);
      this.$router.push("/front/plans/subscription");
    },
  },
};
</script>

<style scoped>
.plan-list {
  width: 960px;
  margin: 1rem auto;
  display: grid;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(300px, 1fr));
}
.plan-rebate {
  width: 60px;
  height: 60px;
  position: absolute;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  text-align: center;
  top: -10px;
  right: 74%;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
}
.plan-details {
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
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

@media screen and (max-width: 640px) {
  .plan-list {
    width: 100%;
  }
}
</style>
