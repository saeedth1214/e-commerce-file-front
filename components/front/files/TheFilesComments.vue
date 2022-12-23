<template>
  <v-container v-if="comments.length">
    <v-row dense>
      <p
        class="text-center text-h6 blue--text accent-1 font-weight-bold"
        style="width: 100%"
      >
        نظرات کاربران
      </p>
    </v-row>
    <v-carousel
      cycle
      :interval="3000"
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item>
        <v-row dense class="pa-8 ma-4">
          <v-col cols="12" md="4" sm="4">
            <v-img
              width="300"
              height="250"
              src="/images/author.jpg"
              class="user-avatar"
            ></v-img>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="7" sm="7">
            <p class="text-center text-h6 font-weight-bold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              ipsum recusandae quasi minima, voluptate ratione. Maiores quasi, a
              doloremque nam vel perspiciatis quae, consequatur, quod voluptatem
              ratione illum expedita nemo.
            </p>
            <v-divider></v-divider>
            <p class="d-flex flex-column justify-end">
              <span class="text-h6 font-weight-bold">سعیدسلطانی</span>
              <span class="grey--text font-weight-bold">4روز قبل</span>
            </p>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
  <v-row dense v-else>
    <v-col cols="12">
      <v-alert width="70%" type="info" class="text-center mx-auto"
        >مورد خاصی پیدا نشد</v-alert
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
  }),

  props: {
    comments: {
      type: Array,
      required: false,
    },
  },

  created() {
    console.log(this.comments);
  },
};
</script>

<style scoped lang="scss">
.user-avatar {
  border-radius: 25px;
}
>>> .v-carousel__item {
  border: 1px solid #e0e0e0 !important;
  border-radius: 50px !important;
  width: 700px !important;
  margin: auto !important;
}
</style>
