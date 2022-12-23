export default {
  methods: {
    async toCart(product, type) {
      this.loading = true;
      await new Promise((r) => setTimeout(r, 2000));
      let exists = false;
      for (const item of this.shoppingCart) {
        if (item.id === product.id && item.type === type) {
          await this.$store.commit("option/changeSnackbarMood", true);
          await this.$store.commit(
            "option/changeSnackbarColor",
            "orange darken-2"
          );
          await this.$store.commit(
            "option/changeSnackbarText",
            "این " +
              this.$t(`${type}.message`) +
              " قبلا  به سبد خرید شما اضافه شده است"
          );
          exists = true;
          break;
        }
      }
      if (!exists) {
        this.shoppingCart.push({
          type,
          ...product,
        });
        await this.$store.commit("option/changeSnackbarMood", true);
        await this.$store.commit(
          "option/changeSnackbarColor",
          "orange darken-2"
        );
        await this.$store.commit(
          "option/changeSnackbarText",
          this.$t(`${type}.message`) + " انتخابی به سبد خرید شما اضافه شد"
        );
      }
      this.loading = false;
    },
  },
};
