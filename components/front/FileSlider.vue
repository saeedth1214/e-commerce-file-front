<template>
  <div>
    <v-row dense>
      <p class="text-center text-h5 indigo--text darken-4" style="width:100%">جدیدترین فایل ها</p>
    </v-row>
    <v-slide-group>
      <v-slide-item v-for="(file,i) in sliderFiles" :key="`hotProduct-${i}`">
        <v-card
          link
          color="surface"
          width="300"
          class="el ma-2 mb-5 mr-5"
          @click.stop="show(file)"
          nuxt
        >
          <div class="rebate" v-if="file.rebate">
            <div class="rebate-card"></div>
            <div class="rebate-second-card">
              <p
                class="white--text pt-3 d-flex justify-center align-center"
                style="width:100%;heigth:100%"
              >
                <span class="text-h4 font-weight-bold">{{$calculateRebate(file)}}</span>
                <span v-if="file.percentage" style="width:80px;heigth:auto">درصد تخفیف</span>
                <span v-else class style="width:80px;heigth:auto">هزارتومان تخفیف</span>
              </p>
            </div>
          </div>
          <v-img height="300" :src="file.media_url">
            <template #placeholder>
              <v-row class="fill-height" justify="center" align="center">
                <v-progress-circular width="2" size="100" color="primary" indeterminate></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p class="text-body-2 font-weight-bold text-rigth" style="width:50%">عنوان فایل :</p>
                  <p class="text-body-2 font-weight-bold text-left" style="width:50%">{{file.title}}</p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p class="text-body-2 font-weight-bold text-rigth" style="width:50%">قیمت :</p>
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width:50%"
                  >{{ file.amount > 0 ? $formatMoney(file.amount) : 'رایگان'}}</p>
                </div>
              </v-col>
            </v-row>
            <v-chip
              x-small
              label
              outlined
              class="mr-1"
              v-for="(tag,Idx) in file.tags.data"
              :key="`tag-${Idx}`"
            >{{tag.name}}</v-chip>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("file/sliderFiles");
  },
  computed: {
    sliderFiles() {
      return this.$store.getters["file/getSliderFiles"];
    }
  },

  methods: {
    async show(file) {
      this.$router.push({
        name: "front-files-title___fa",
        params: { id: file.id, title: file.title.replace(" ", "_") }
      });
    }
  }
};
</script>

<style scoped>
.rebate {
  height: 0px;
}

.rebate .rebate-card {
  z-index: 0 !important;
  transform: translateY(-20px) !important;
}

.rebate .rebate-second-card {
  z-index: 1;
  transform: translateY(-70px) !important;
}

>>> .v-slide-group__wrapper {
  padding: 1rem;
}
</style>
