<template>
  <div>
    <v-row dense>
      <p class="text-center text-h5 indigo--text darken-4" style="width:100%">جدیدترین طرح ها</p>
    </v-row>
    <v-slide-group>
      <v-slide-item v-for="(plan,i) in sliderPlans" :key="`hotProduct-${i}`">
        <v-card
          link
          color="indigo lighten-4"
          width="300"
          class="el ma-2 mb-5 mr-5"
          @click.stop="show(plan)"
          nuxt
        >
          <v-card-text>
            <v-row dense align="center">
              <v-col cols="12">
                <div class="pa-2 rounded-lg text-center" :class="{'margin':!plan.rebate}">
                  <div v-if="plan.rebate" class="rebate-card"></div>
                  <div v-if="plan.rebate" class="rebate-second-card">
                    <p
                      class="white--text pt-3 d-flex justify-center align-center"
                      style="width:100%;heigth:100%"
                    >
                      <span class="text-h4 font-weight-bold">{{$calculateRebate(plan)}}</span>
                      <span v-if="plan.percentage" style="width:50px;heigth:auto">درصد تخفیف</span>
                      <span v-else class style="width:50px;heigth:auto">هزارتومان تخفیف</span>
                    </p>
                  </div>
                  <p class="text-h5 font-weight-bold file-title">{{plan.title}}</p>
                  <p class="text-h5 font-weight-bold file-title">
                    <span>{{plan.activation_days}}</span> /
                    <span>روز فعال</span>
                  </p>
                  <p class="text-h5 font-weight-bold file-title">
                    <span>{{plan.daily_download_limit_count}}</span> /
                    <span>دانلود در روز</span>
                  </p>
                  <p v-if="plan.amount" class="text-h4 font-weight-bold file-amount">
                    <span
                      class="d-block"
                      :class="{'line':plan.rebate}"
                    >{{$formatMoney(plan.amount)}} تومان</span>
                    <span
                      v-if="plan.rebate"
                      class="d-block mt-3"
                    >{{$formatMoney(plan.amount_after_rebate)}} تومان</span>
                  </p>
                  <p v-else class="text-h5 font-weight-bold free">رایگان</p>
                </div>
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
  async created() {
    await this.$store.dispatch("plan/sliderPlans");
  },
  computed: {
    sliderPlans() {
      return this.$store.getters["plan/getSliderPlans"];
    }
  },

  methods: {
    async show(plan) {
      this.$router.push({
        name: "front-plans-title___fa",
        params: { id: plan.id, title: plan.title.replace(" ", "_") }
      });
    }
  }
};
</script>

<style scoped>
.free {
  color: rgb(244 65 114) !important;
}

.line {
  text-decoration-color: rgb(244 65 114) !important;
  text-decoration: line-through;
}
.margin {
  margin-top: 120px;
}
</style>
