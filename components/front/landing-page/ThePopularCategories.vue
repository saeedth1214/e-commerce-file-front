<template>
  <v-container class="pop-categories">
    <v-row dense>
      <v-col cols="12" md="6" sm="6">
        <p :class="{'text-center': $vuetify.breakpoint.xs}">
          <span class="cyan--text accent-3 display-1 font-weight-bold" :class="{'display-2':$vuetify.breakpoint.smAndDown}" >محبوب ترین</span>
          <span class="text-h6 font-weight-bold">دسته بند ی ها</span>
        </p>
      </v-col>
      <v-col cols="12" md="2" sm="2" offset-md="4">
        <nuxt-link
          :class="{'mx-auto': $vuetify.breakpoint.xs}"
          class="rounded white--text d-block text-decoration-none text-center text-body-2 font-weight-bold"
          to="/front/categories"
        >همه دسته بندی ها</nuxt-link>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6" md="4" lg="4" v-for="(category,Idx) in categories" :key="Idx">
        <article class="category">
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <p class="text-h6 font-weight-bold">{{category.name}}</p>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <span class="blue--text accent-4 rounded elevation-1 pa-1">{{category.files_count}}</span>
              <span class="grey--text font-weight-light">فایل</span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-img
                :src="category.media"
                width="100%"
                height="150px"
                class="mt-4"
                style="border-radius:20px"
              >
                <template #placeholder>
                  <v-row class="fill-height" justify="center" align="center">
                    <v-progress-circular width="2" size="100" color="primary" indeterminate></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <nuxt-link
                style="width:80%"
                class="rounded white--text d-block text-center text-decoration-none text-center text-body-2 font-weight-bold mx-auto"
                :to="`/front/categories?category=${category.name.replace(/\s+/g,'_')}`"
              >نمایش</nuxt-link>
            </v-col>
          </v-row>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    categories: []
  }),
  async fetch() {
    let params = {};
    params["per_page"] = 4;
    (params["includes"] = "files"), (params["sort"] = "-files_count");
    await this.$axios
      .get("frontend/categories", { params })
      .then(res => {
        this.categories = res.data.data;
      })
      .catch(err => console.log(err.response));
  }
};
</script>

<style scoped>
.pop-categories {
  height: auto;
  position: relative;
  top: -300px;
}
a {
  width: 180px;
  background-color: #00bdfe;
  padding: 0.5rem;
}

a:hover {
  background-color: transparent;
  color: #00bdfe !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
}

.category {
  width: 100%;
  height: auto;
  border: 1px solid grey;
  border-radius: 10px;
  text-align: center;
  padding: 0.8rem;
}
</style>
