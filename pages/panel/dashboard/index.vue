<template>
  <v-container fluid class="mt-4">
    <v-sheet color="grey lighten-4" class="pa-3" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-row v-else>
      <v-col cols="12" md="3" sm="6" class="mb-sm-4 mb-4">
        <v-card color="#fff" elevation="5" class="mr-1">
          <v-row>
            <v-col
              cols="12"
              class="pa-4 d-flex justify-center align-center green darken-2"
            >
              <div class="white--text text-subtitle-1 font-weight-bold ml-2">
                <p>{{ $t("users") }}</p>
                <p>{{ detailsData.usersCount }} نفر</p>
              </div>
              <div class="mr-4 pa-4 rounded-circle white">
                <v-icon style="font-size: 1.7rem" class="green--text darken-2">
                  mdi-account-multiple
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="mb-sm-4 mb-4">
        <v-card color="#fff" elevation="5" class="mr-1">
          <v-row>
            <v-col
              cols="12"
              class="pa-4 d-flex justify-center align-center yellow darken-2"
            >
              <div class="white--text text-subtitle-1 font-weight-bold ml-2">
                <p>{{ $t("orders.title") }}</p>
                <p>{{ detailsData.ordersCount }}</p>
              </div>
              <div class="mr-4 pa-4 rounded-circle white">
                <v-icon style="font-size: 1.7rem" class="yellow--text darken-2">
                  mdi-receipt-text
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="mb-sm-4 mb-4">
        <v-card color="#fff" elevation="5" class="mr-1">
          <v-row>
            <v-col
              cols="12"
              class="pa-4 d-flex justify-center align-center primary darken-1"
            >
              <div class="white--text text-subtitle-1 font-weight-bold ml-2">
                <p>{{ $t("transactions.successed") }}</p>
                <p>
                  {{
                    $formatMoney(detailsData.payOkTransactionsAmount) + "تومان"
                  }}
                </p>
              </div>
              <div class="mr-4 pa-4 rounded-circle white">
                <v-icon
                  style="font-size: 1.7rem"
                  class="primary--text darken-1"
                >
                  mdi-currency-usd
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="6" class="mb-sm-4 mb-4">
        <v-card color="#fff" elevation="5" class="mr-1">
          <v-row>
            <v-col
              cols="12"
              class="pa-4 d-flex justify-center align-center pink darken-1"
            >
              <div class="white--text text-subtitle-1 font-weight-bold ml-2">
                <p>{{ $t("transactions.failed") }}</p>
                <p>
                  {{
                    $formatMoney(detailsData.payFailedTransactionAmount) +
                    "تومان"
                  }}
                </p>
              </div>
              <div class="mr-2 pa-2 rounded-circle white">
                <v-icon style="font-size: 1.7rem" class="pink--text darken-1">
                  mdi-receipt-text-check
                </v-icon>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
        <v-card color="#fff">
          <v-app-bar color="" flat>
            <p class="text-body-1 font-weight-bold">سفارش های 2 ماه اخیر</p>
          </v-app-bar>
          <v-data-table
            :headers="headers"
            :items="latestOrders"
            class="elevation-1"
            hide-default-footer
          >
            <template v-slot:footer>
              <div class="text-center pa-2" style="background-color: #f5f5f5">
                <nuxt-link
                  to="/panel/orders"
                  class="text-decoration-none"
                  style="font-size: 0.8rem; font-weight: 600; color: #333"
                >
                  <span>مشاهده همه</span>
                </nuxt-link>
                <v-icon> mdi-eye</v-icon>
              </div>
            </template>
            <template v-slot:item.rebate="{ item }">
              {{ item.rebate ? item.rebate : "-" }}
            </template>
            <template v-slot:item.total_amount="{ item }">
              {{ $formatMoney(item.total_amount) }}
            </template>
            <template v-slot:item.total_amount_after_rebate="{ item }">
              {{ $formatMoney(item.total_amount_after_rebate) + "تومان" }}
            </template>
            <template v-slot:item.status="{ item }" class="text-center pa-2">
              <span
                style="font-size: 0.7rem"
                class="pa-1 white--text rounded"
                :class="{
                  'yellow darken-2': item.status === 1,
                  'blue darken-1': item.status === 2,
                  'red darken-1': item.status === 3,
                }"
              >
                {{ item.status_dec }}
              </span>
            </template>
            <template v-slot:no-data>
              <p
                color="primary"
                class="text-body-2 font-weight-bold text-center"
              >
                موردی یافت نشد
              </p>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card color="#fff">
          <v-app-bar color="" flat>
            <p
              class="text-body-1 font-weight-bold d-flex justify-space-between"
              style="width: 100%"
            >
              <span> آخرین نظرات</span>
              <v-btn nuxt to="/panel/comments" small color="primary" rounded>
                همه
              </v-btn>
            </p>
          </v-app-bar>
          <v-list three-line class="mt-n5" color="#fff">
            <v-list-item-group>
              <template>
                <v-list-item
                  v-for="comment in latestComments"
                  :key="comment.id"
                  nuxt
                  :to="`/panel/comments/${comment.id}`"
                >
                  <v-list-item-avatar v-if="comment.user.data.media">
                    <img :src="comment.user.data.media" alt />
                  </v-list-item-avatar>
                  <v-list-item-avatar v-else>
                    <v-avatar color="indigo">
                      <v-icon dark> mdi-account-circle </v-icon>
                    </v-avatar>
                  </v-list-item-avatar>
                  <template>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="text-subtitle-2 grey--text lighten-1">{{
                          comment.user.data.fullname
                        }}</span>
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="comment.content">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <span
                        style="font-size: 0.7rem; width: 60px"
                        class="d-flex pa-1 font-weight-light white--text justify-center align-center rounded-sm"
                        :class="{
                          'yellow darken-2': comment.status === 0,
                          'primary darken-2': comment.status === 1,
                          'red darken-2': comment.status === 2,
                        }"
                        >{{ comment.status_dec }}</span
                      >
                      <span
                        class="grey--text lighten-2 mt-1"
                        style="font-size: 0.7rem"
                      >
                        {{ comment.created_at }}
                      </span>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "panel",

  data: () => ({
    orders: [],
    loading: false,
    detailsData: {},
    latestOrders: [],
    latestComments: [],
  }),

  computed: {
    headers() {
      return this.$store.state.option.order.headers;
    },
  },

  async created() {
    this.loading = true;
    await this.$axios.get("/panel/dashboard/details").then((res) => {
      this.detailsData = { ...res.data.data.details };
    });

    await this.$axios.get("/panel/dashboard/latest-orders").then((res) => {
      this.latestOrders = res.data.data;
    });
    await this.$axios
      .get("/panel/dashboard/latest-comments?include=user")
      .then((res) => {
        this.latestComments = res.data.data;
      });
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.datatab {
  background: #23262d !important;
}
>>> .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:nth-child(5) {
  padding: 0.5rem !important;
}
</style>
