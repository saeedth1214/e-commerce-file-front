<template>
  <section>
    <div class="plan-details" v-if="plan !== null">
      <v-progress-linear
        indeterminate
        color="primary"
        v-if="loading"
      ></v-progress-linear>

      <ul>
        <li>{{ plan.title }}</li>
        <li>{{ $formatMoney(plan.price) }} تومان</li>
        <li>
          <v-btn
            small
            color="primary"
            style="position: relative; top: 50px"
            @click="finalPurchase"
            :disabled="loading"
          >
            خرید نهایی
          </v-btn>
        </li>
      </ul>
    </div>
    <v-alert
      width="70%"
      :style="[$vuetify.breakpoint.mdAndDown ? { width: '90%' } : '']"
      type="error"
      class="text-center mx-auto my-3"
      dense
      colored-border
      color="deep-purple accent-4"
      elevation="2"
      v-else
      >اشتراکی انتخاب نشده است .
    </v-alert>
    <SnackBar />
  </section>
</template>
<script>
export default {
  layout: "buyPlan",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    plan() {
      return this.$store.getters["plan/getSubscription"];
    },
  },

  methods: {
    async finalPurchase() {
      this.loading = true;
      await this.$axios
        .get(`frontend/users/${this.$auth.user.id}/active-plan`)
        .then(async (res) => {
          if (res.data.data === null) {
            await this.$axios
              .post(`frontend/plans/${this.plan.id}/purchase`, {
                amount: this.plan.price,
              })
              .then((res) => {
                window.open(res.data.action, "_blank");
              });
          } else {
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarColor",
              "orange darken-2"
            );
            await this.$store.commit(
              "option/changeSnackbarText",
              `در حال حاضر طرح ( ${res.data.data.title} ) برای شما فعال است .`
            );
          }
        });

      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 0px;
  height: 100%;

  li {
    display: block;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
  }
}
section {
  width: 100%;
  height: 400px;
  padding-top: 2rem;
  .plan-details {
    width: 20%;
    height: 200px;
    margin: 0px auto;
    background: #fff;
    padding: 0.5rem;
    border-radius: 10px;
    text-align: center;
  }
}

@media screen and (min-width: 425px) and (max-width: 1024px) {
  section {
    .plan-details {
      width: 40%;
    }
  }
}

@media screen and (max-width: 425px) {
  section {
    .plan-details {
      width: 60%;
    }
  }
}
</style>
