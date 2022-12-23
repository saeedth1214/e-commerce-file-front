<template>
  <v-carousel height="100vh" hide-delimiter-background>
    <template #prev="{attrs,on}">
      <v-btn fab color="transparent" depressed v-bind="attrs" v-on="on">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
    </template>
    <template #next="{attrs,on}">
      <v-btn fab color="transparent" depressed v-bind="attrs" v-on="on">
        <v-icon size="20">mdi-arrow-right</v-icon>
      </v-btn>
    </template>
    <v-carousel-item v-for="(file,Idx) in bannerFiles" :key="Idx">
      <v-img height="100vh" :src="file.media_url">
        <v-container class="fill-height">
          <v-row dense align="center">
            <v-col md="7">
              <div
                v-if="file.amount_after_rebate"
                class="pa-2 indigo lighten-4 rounded-lg text-center"
              >
                <div class="rebate-card"></div>
                <div class="rebate-second-card">
                  <p
                    class="white--text pt-3 d-flex justify-center align-center"
                    style="width:100%;heigth:100%"
                  >
                    <span class="text-h3 font-weight-bold">{{calculateRebate(file)}}</span>
                    <span v-if="file.percentage" class style="width:30px;heigth:auto">درصد تخفیف</span>
                    <span v-else class style="width:30px;heigth:auto">هزارتومان تخفیف</span>
                  </p>
                </div>
                <p class="text-h3 font-weight-bold file-title">{{file.title}}</p>
                <p class="text-h4 font-weight-bold file-amount">
                  <span>{{$formatMoney(file.amount)}} تومان</span>
                  <span v-if="file.rebate" class="rebate-line"></span>
                </p>
                <p v-if="file.rebate" class="text-h4 font-weight-bold file-amount">
                  <span>{{$formatMoney(file.amount_after_rebate)}} تومان</span>
                </p>
                <v-btn
                  nuxt
                  @click="show(file)"
                  depressed
                  color="error"
                  class="text-capitilize text-body-2 font-weight-medium"
                  min-height="40"
                >نمایش</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("file/bannerFile");
  },
  computed: {
    bannerFiles() {
      return this.$store.state.file.bannerFiles;
    }
  },
  methods: {
    async show(file) {
      this.$router.push({
        name: "front-files-title___fa",
        params: { id: file.id, title: file.title.replace(" ", "_") },
      });
    },
    calculateRebate(file) {
      if (!file.percentage) {
        return file.rebate / 1000;
      }
      return file.rebate;
    }
  }
};
</script>

<style scoped>
</style>
