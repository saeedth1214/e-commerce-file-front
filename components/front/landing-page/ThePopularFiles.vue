<template>
  <v-container class="mt-4 pop-files" fluid>
    <v-row dense>
      <p class="text-center" style="width: 100%">
        <span class="cyan--text accent-3 display-1 font-weight-bold"
          >محبوب ترین</span
        >
        <span class="text-h6 font-weight-bold">فایل ها</span>
      </p>
    </v-row>
    <v-slide-group
      v-model="model"
      max="3"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(file, Idx) in files"
        :key="Idx"
        v-slot="{ active, toggle }"
      >
        <v-card
          class="ma-4 card"
          width="310"
          height="250"
          nuxt
          :to="{
            name: 'front-files-title___fa',
            params: { title: file.title.replace(/\s+/g, '_'), id: file.id },
          }"
        >
          <v-img
            :src="file.media_url"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="100%"
            height="100%"
          >
            <template #placeholder>
              <v-row class="fill-height" justify="center" align="center">
                <v-progress-circular
                  width="2"
                  size="100"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
            <v-card-title class="card-title">
              <p
                class="d-flex justify-space-between text-center"
                style="width: 100%"
              >
                <span
                  class="text-subtitle-1 font-weight-bold text-center"
                  style="width: 100%"
                  >{{ file.title }}</span
                >
              </p>
            </v-card-title>
            <div class="details">
              <v-tooltip left color="white">
                <template v-slot:activator="{ on, attrs }">
                  <span class="d-block like" v-bind="attrs" v-on="on">
                    <v-icon
                      class="grey--text accent-1"
                      style="font-size: 15px !important"
                      >mdi-heart</v-icon
                    >
                    <span class="like-count"> 1024 </span>
                  </span>
                  <span class="d-block"></span>
                  <span class="d-block"></span>
                </template>
                <span
                  class="grey--text"
                  style="font-size: 10px !important ; font-weight: bold"
                  >پسندیدن</span
                >
              </v-tooltip>
              <v-tooltip left color="white">
                <template v-slot:activator="{ on, attrs }">
                  <span class="d-block rebate" v-bind="attrs" v-on="on">
                    <v-icon
                      class="grey--text accent-1"
                      style="font-size: 15px !important"
                      >mdi-percent
                    </v-icon>
                    <span class="rebate-amount"> 5 </span>
                  </span>
                  <span class="d-block"></span>
                  <span class="d-block"></span>
                </template>
                <span
                  class="grey--text white"
                  style="font-size: 10px !important ; font-weight: bold"
                  >درصد تخفیف</span
                >
              </v-tooltip>
            </div>
          </v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <v-row dense>
      <v-col cols="12" md="2" sm="2" offset-md="5">
        <nuxt-link
          :class="{ 'mx-auto': $vuetify.breakpoint.xs }"
          class="rounded white--text d-block text-decoration-none text-center text-body-2 font-weight-bold"
          to="/front/files"
          >همه فایل ها</nuxt-link
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import makeIntoCorrectFormat from "@/mixins/make-into-correct-format";
export default {
  data: () => ({
    model: null,
    files: [],
  }),
  mixins: [makeIntoCorrectFormat],

  async fetch() {
    let params = {};
    params["per_page"] = 10;
    await this.$axios
      .get("frontend/files", { params })
      .then((res) => {
        this.files = res.data.data;
      })
      .catch((err) => console.log(err.response));
  },
};
</script>

<style scoped lang="scss">
.card-title {
  position: relative;
  transform: translateY(90px);
}
.card {
  cursor: pointer;

  &:hover .like {
    transform: translateY(-10px);
    opacity: 1;
  }
  &:hover .rebate {
    transform: translateX(-5px);
    opacity: 1;
  }
}
.details {
  position: relative;
  transform: translateY(-150px);
  transition: all 0.3s ease-in;
  padding-right: 1.5rem;
}
.title {
  width: 40%;
  background: white;
  padding: 0.3rem;
  border-radius: 15px;
  color: #046ead;
}
.pop-files {
  position: relative;
  top: -300px;
  background-image: url("/images/closed-bg.jpg");
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
>>> .v-slide-group__next i {
  background: #046ead;
  color: #888;
  border-radius: 50%;
}

>>> .v-slide-group__prev i {
  background: #046ead;
  color: #888;
  border-radius: 50%;
}
.sameAttribute {
  padding: 0.3rem;
  border: 1px solid grey;
  border-radius: 10px;
  position: relative;
  background: #fff;
  text-align: center;
  width: 15%;
  opacity: 0;
  transition: all 0.3s linear;
}

.sameNestedClass {
  border: 1px solid red;
  border-radius: 5px;
  color: red;
  text-align: center;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 0.7rem;
  font-weight: bold;
  background: #fff;
  width: 2rem;
  letter-spacing: 1px;
}

.rebate {
  @extend .sameAttribute;
  transform: translateX(250px);
  // margin-top: 0.2rem;
  &-amount {
    @extend .sameNestedClass;
  }
}
.like {
  @extend .sameAttribute;
  transform: translateY(-150px);

  &-count {
    @extend .sameNestedClass;
  }
}
</style>
