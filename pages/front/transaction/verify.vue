<template>
  <div class="transaction-verify" v-if="!start">
    <ul v-if="Object.keys(transaction).length">
      <li style="border-bottom: 2px solid #d7d7d7; padding: 0.5rem">
        <span
          class="text-body-1 font-weight-bold"
          :class="[
            transaction.status === 1
              ? 'yellow--text darken-3'
              : transaction.status === 2
              ? 'green--text darken-3'
              : 'red--text darken-3',
          ]"
          >{{ transaction.status_desc }}</span
        >
      </li>
      <li class="mt-4">
        <p>شماره تراکنش</p>
        <p>{{ transaction.authority }}</p>
      </li>
      <li>
        <p>شماره مرجع</p>
        <p>{{ transaction.reference_code }}</p>
      </li>
      <li>
        <p>تاریخ پرداخت</p>
        <p>{{ transaction.payed_at }}</p>
      </li>
      <li>
        <p>مبلغ پرداخت</p>
        <p>{{ $formatMoney(transaction.amount) }} تومان</p>
      </li>
    </ul>

    <p
      class="font-weight-bold text-body-1"
      style="font-size: 0.9rem; color: #000"
      v-else
    >
      تراکنشی یافت نشد.
    </p>
  </div>
  <TheLoader :start="start" :leftStyle="[{ left: '50%' }]" v-else />
</template>
<script>
export default {
  layout: "buyPlan",

  data() {
    return {
      start: false,
      transaction: {},
    };
  },

  async created() {
    this.start = true;
    this.$cookies.set("cart", []);
    if (
      !Object.keys(this.$route.query) ||
      this.$route.query.uuid === undefined
    ) {
      this.$router.push("/front/plans");
    }
    await this.$axios
      .get(`frontend/transaction/tracking/${this.$route.query.uuid}`)
      .then((res) => {
        if (res.data.data) {
          this.transaction = res.data.data;
        }
      });
    this.start = false;
  },
};
</script>
<style lang="scss" scoped>
.transaction-verify {
  width: 30%;
  height: auto;
  margin: 2rem auto;
  background: #fff;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: center;

  ul {
    width: 100%;
    list-style: none;
    padding-left: 0px !important;

    li p {
      font-size: 0.9rem;
      font-weight: 600;
      color: #333;
    }
  }
}
</style>
