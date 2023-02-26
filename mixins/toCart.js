export default {
  methods: {
    async toCart(product) {
      this.loading = true;
      await new Promise((r) => setTimeout(r, 2000));
      let exists = false;
      for (const item of this.shoppingCart) {
        if (item.id === product.id) {
          await this.$store.commit("option/changeSnackbarMood", true);
          await this.$store.commit(
            "option/changeSnackbarColor",
            "orange darken-2"
          );
          await this.$store.commit(
            "option/changeSnackbarText",
            "این " +
              this.$t("file.message") +
              " قبلا  به سبد خرید شما اضافه شده است"
          );
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.shoppingCart.push({
          ...product,
        });
        await this.$store.commit("option/changeSnackbarMood", true);
        await this.$store.commit(
          "option/changeSnackbarColor",
          "orange darken-2"
        );
        await this.$store.commit(
          "option/changeSnackbarText",
          this.$t("file.message") + " انتخابی به سبد خرید شما اضافه شد"
        );
      }
      this.loading = false;
    },
  },
};
