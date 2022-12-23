export default {
  changeSnackbarMood(state, payload) {
    state.snackbar.snackbar = payload;
  },

  changeSnackbarText(state, payload) {
    state.snackbar.text = payload;
  },
  changeSnackbarColor(state, payload) {
    state.snackbar.color = payload;
  },

  setBasketItems(state) {
    state.basket = this.$cookies.get("cart", { parseJSON: true });
  },
  setBasketTotalAmount(state, total) {
    state.total_amount = total;
  },
};
