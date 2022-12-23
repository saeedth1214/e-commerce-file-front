<template>
  <v-container class="best-of-plans mt-4">
    <v-row dense>
      <v-col cols="12" md="6" sm="6">
        <p :class="{'text-center': $vuetify.breakpoint.xs}">
          <span class="cyan--text accent-3 display-1 font-weight-bold">پرفروش ترین</span>
          <span class="text-h6 font-weight-bold">طرح ها</span>
        </p>
      </v-col>
      <v-col cols="12" md="2" sm="2" offset-md="4">
        <nuxt-link
          :class="{'mx-auto': $vuetify.breakpoint.xs}"
          class="rounded blue--text accent-3 d-block text-decoration-none text-center text-body-2 font-weight-bold"
          to="/front/plans"
        >همه طرح ها</nuxt-link>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6" md="4" lg="4" v-for="(plan,Idx) in plans" :key="Idx">
        <article class="plans elevation-2">
          <v-row dense>
            <v-col cols="12">
              <v-img
                :src="plan.media_url"
                width="250px"
                height="150px"
                class="mx-auto"
                style="border-radius:20px"
              >
                <template #placeholder>
                  <v-row class="fill-height" justify="center" align="center">
                    <v-progress-circular width="2" size="100" color="primary" indeterminate></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <p class="text-h6 font-weight-bold text-center mb-4">{{plan.title}}</p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row dense>
            <v-col cols="12">
              <v-list>
                <v-list-item class="text-h6 font-weight-bold blue--text accent-3 text-center">
                  <v-list-item-title>{{plan.activation_days}} روزه</v-list-item-title>
                </v-list-item>
                <v-list-item class="text-h6 font-weight-bold blue--text accent-3 text-center">
                  <v-list-item-title>{{ plan.daily_download_limit_count}} دانلود در روز</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="plan.rebate"
                  class="text-h6 font-weight-bold blue--text accent-3 text-center"
                >
                  <v-list-item-title>{{plan.rebate}} درصد تخفیف</v-list-item-title>
                </v-list-item>
                <v-list-item class="text-h4 font-weight-bold blue--text accent-3 mt-4">
                  <span
                    class="d-block text-center text-h6"
                    :class="{'text-decoration-line-through':plan.rebate>0}"
                    style="width:100%"
                  >{{plan.amount > 0 ? $formatMoney(plan.amount) + 'هزارتومان': 'رایگان'}}</span>
                </v-list-item>
                <v-list-item class="text-h4 font-weight-bold blue--text accent-3 mt-4">
                  <span
                    v-if="plan.rebate > 0"
                    class="d-block text-center text-h6 red--text"
                    style="width:100%"
                  >{{$formatMoney(plan.amount_after_rebate)}} هزارتومان</span>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <nuxt-link
                class="rounded blue--text accent-3 pa-3 ma-3 d-block text-center text-decoration-none text-center text-body-2 font-weight-bold mx-auto"
                :to="{name:'front-plans-title___fa',params:{title:plan.title.replace(/\s+/g,'_'),id:plan.id}}"
              >انتخاب این طرح</nuxt-link>
            </v-col>
          </v-row>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    plans: []
  }),

  async created() {
    await this.$axios
      .get("frontend/plans")
      .then(res => {
        this.plans = res.data.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
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
