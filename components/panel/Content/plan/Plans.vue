<template>
  <v-app id="inspire">
    <v-container v-if="!loading">
      <v-toolbar flat>
        <v-row style="text-align: end">
          <v-col cols="12" sm="4" offset-md="8" class="text-left">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  fab
                  dark
                  color="indigo"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="dialog = true"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>افزودن</span>
            </v-tooltip>
            <NewPlan
              :isActive="dialog"
              @close="dialog = false"
              @initializeEmit="initialize"
            />
          </v-col>
        </v-row>
      </v-toolbar>
      <v-row col="mt-n6" v-if="plans.length">
        <v-col
          cols="12"
          md="4"
          sm="6"
          lg="4"
          v-for="(plan, Idx) in plans"
          :key="`plan-${Idx}`"
        >
          <v-card class="mx-auto" max-width="300" height="auto">
            <v-card-text>
              <v-img width="90%" height="150px" :src="plan.media_url">
                <template #placeholder>
                  <v-row class="fill-height" justify="center" align="center">
                    <v-progress-circular
                      width="2"
                      size="80"
                      color="primary"
                      indeterminate
                      style="top: 10px; left: -12px"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-divider></v-divider>
              <div
                class="text-center text-body-2 font-weight-light plan-title rounded hover"
              >
                {{ plan.title }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-row dense>
                <v-col cols="12">
                  <p
                    v-if="plan.amount > 0"
                    class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                    style="width: 100%"
                  >
                    <span
                      class="blue--text accent-2 text-h4 font-weight-bold"
                      >{{ $formatMoney(plan.amount) }}</span
                    >

                    <span class="font-weight-bold black--text"
                      >/هزار تومان در ماه</span
                    >
                  </p>
                  <p
                    v-else
                    class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                    style="width: 100%"
                  >
                    <span class="blue--text accent-2 text-h6 font-weight-bold"
                      >رایگان</span
                    >
                  </p>
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <p
                    class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                    style="width: 100%"
                  >
                    <span
                      class="blue--text accent-2 text-h4 font-weight-bold"
                      >{{ plan.activation_days }}</span
                    >
                    <span class="font-weight-bold black--text">/ روز فعال</span>
                  </p>
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <p
                    v-if="plan.rebate > 0"
                    class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                    style="width: 100%"
                  >
                    <span
                      class="blue--text accent-2 text-h4 font-weight-bold"
                      >{{
                        plan.percentage ? plan.rebate : $calculateRebate(plan)
                      }}</span
                    >

                    <span
                      v-if="plan.percentage"
                      class="font-weight-bold black--text"
                      >/ درصد تخفیف</span
                    >
                    <span v-else class="font-weight-bold black--text"
                      >/ هزار تومان تخفیف</span
                    >
                    <v-divider></v-divider>
                  </p>
                </v-col>
                <v-col cols="12">
                  <p
                    class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                    style="width: 100%"
                  >
                    <span
                      class="blue--text accent-2 text-h4 font-weight-bold"
                      >{{ plan.daily_download_limit_count }}</span
                    >
                    <span class="font-weight-bold black--text"
                      >/دانلود در روز</span
                    >
                  </p>
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12">
                  <p
                    class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                    style="width: 100%"
                  >
                    <span
                      class="blue--text accent-2 text-h4 font-weight-bold"
                      >{{ plan.usersCount }}</span
                    >
                    <span class="font-weight-bold black--text"
                      >/کاربر خریده اند</span
                    >
                  </p>
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn
                    color="primary"
                    small
                    class="text-body-2 font-weight-light"
                    nuxt
                    :to="`plans/${plan.id}`"
                    >نمایش</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense v-else>
        <v-alert width="100%" dense type="info" class="text-center"
          >مورد خاصی یافت نشد</v-alert
        >
      </v-row>
      <v-row class="justify-center">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="blue-grey"
          class="ma-2 white--text"
          fab
          @click="fetchData"
        >
          <v-icon dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-row dense v-else>
      <v-col cols="12">
        <v-sheet color="grey lighten-3" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            height="300px"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>

    <TheOverlay :overlay="overlay" />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      filter: null,
      overlay: false,
      drawer: false,
      dialog: false,
      plans: [],
      pagination: {},
      page: 1,
      loading: true,
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async fetchData() {
      this.page++;
      if (this.page <= this.pagination.total_pages) {
        this.initialize();
      } else {
        this.page = 1;
      }
    },
    async initialize() {
      let params = {};
      this.loading = true;
      params["includes"] = "users";
      params["page"] = this.page;
      await this.$axios
        .get("panel/plans", { params })
        .then((res) => {
          this.plans.push(...res.data.data);
          this.pagination = res.data.meta.pagination;
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-card::hover {
  border: 2px solid blue;
  cursor: pointer;
}
</style>
