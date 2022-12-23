export default {
  async set_total_amount_basket(context) {
    let items = this.$cookies.get("cart") || [];
    let total = 0;
    for (const item of items) {
      total += parseInt(item.amount_after_rebate);
    }
    await context.commit("setBasketTotalAmount", total);
  },
};
