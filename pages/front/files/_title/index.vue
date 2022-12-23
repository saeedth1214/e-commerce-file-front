<template>
  <div>
    <TheFileInfo :file="file" @addToCart="addToCart" />
    <SnackBar color="orange darken-2" />
    <ScrollTop />
  </div>
</template>
<script>
import toCart from "@/mixins/toCart.js";
export default {
  data: () => ({
    shoppingCart: [],
  }),
  mixins: [toCart],
  mounted() {
    this.shoppingCart = this.$cookies.get("cart", { parseJSON: true }) || [];
  },
  watch: {
    shoppingCart: {
      async handler(newVal) {
        await this.$cookies.set("cart", JSON.stringify(newVal), {
          path: "/",
          maxAge: process.env.CART_MAX_AGE,
        });
        await this.$store.commit("option/setBasketItems");
      },
      deep: true,
    },
  },
  methods: {
    addToCart(file) {
      this.toCart(file, "file");
    },
  },
  async asyncData(context) {
    // fetch file

    let fileValue = null;
    let uri = "";
    let params = {};

    if (context.params.id) {
      fileValue = context.params.id;
    } else {
      fileValue = context.params.title;
    }
    params["include"] = "tags";
    let file = await context.$axios
      .get(`frontend/files/${fileValue}`, {
        params,
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => {});
    // if (file.tags.data.length) {
    //   let tags = [];
    //   await file.tags.data.map((tag) => {
    //     tags.push(tag.id);
    //   });
    //   let parameters = {};
    //   parameters["filters[sameFiles][tags]"] = tags.toString();
    //   parameters["filters[sameFiles][exceptedFile]"] = file.id;
    //   const sameFiles = await context.$axios
    //     .get("frontend/files", { params: parameters })
    //     .then((res) => {
    //       return res.data.data;
    //     })
    //     .catch((err) => console.log(err));
    //   file = Object.assign(file, { ...file, sameFiles });
    // }
    return { file };
  },
};
</script>

<style scoped></style>
