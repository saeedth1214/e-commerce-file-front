<template>
  <div style="min-height: 300px">
    <p style="font-size: 1rem; font-weight: 600">اطلاعات طرح فعال شما</p>
    <section class="plan-info" v-if="!loading">
      <ul v-if="hasPlan">
        <li>
          <span>عنوان طرح : </span>
          <span>{{ this.activePlan.title }}</span>
        </li>
        <li>
          <span> قیمت نهایی : </span>
          <span>{{ $formatMoney(this.activePlan.amount) }}</span>
        </li>
        <li>
          <span> روزهای باقیمانده : </span>
          <span>{{ this.activePlan.days_left }}</span>
        </li>
        <li>
          <span> تاریخ خرید : </span>
          <span>{{ this.activePlan.bought_at.split(" ")[0] }}</span>
        </li>
      </ul>
      <v-alert
        v-else
        type="error"
        class="text-center mx-auto"
        dense
        colored-border
        color="deep-purple accent-4"
        elevation="2"
        >درحال حاضر طرح فعالی وجود ندارد.</v-alert
      >
    </section>
    <TheLoader :start="loading" v-else />
  </div>
</template>
<script>
export default {
  data: () => ({
    activePlan: {},
    hasPlan: true,
    loading: false,
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
  }),
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async initialize() {
      let params = {};
      this.loading = true;
      params["page"] = this.page;
      await this.$axios
        .get(`frontend/users/${this.userId}/active-plan`)
        .then((res) => {
          this.activePlan = res.data.data;
          !this.activePlan && (this.hasPlan = false);
        });
      this.loading = false;
    },
  },
  async created() {
    this.initialize();
  },
};
</script>
<style lang="scss" scoped>
.plan-info {
  ul {
    width: 60%;
    margin: 0px auto;

    > li {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1rem;
      > span {
        font-size: 1rem;
        color: #071020;
        font-weight: 600;
      }
    }
  }
}
</style>
