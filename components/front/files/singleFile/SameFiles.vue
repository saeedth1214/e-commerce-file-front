<template>
  <v-card-text>
    <p class="text-center text-h5" style="width: 100%">فایل های مشابه</p>
    <v-row dense>
      <v-col
        cols="12"
        md="4"
        sm="6"
        lg="4"
        v-for="(file, Idx) in file.sameFiles"
        :key="Idx"
      >
        <v-card
          link
          color="surface"
          width="300"
          class="el mx-auto"
          nuxt
          :to="`/front/files/${file.id}`"
        >
          <div class="rebate">
            <div class="rebate-card"></div>
            <div class="rebate-second-card">
              <p
                v-if="file.amount_after_rebate"
                class="white--text pt-3 d-flex justify-center align-center"
                style="width: 100%; heigth: 100%"
              >
                <span class="text-h4 font-weight-bold">{{
                  $calculateRebate(file)
                }}</span>
                <span v-if="file.percentage" style="width: 80px; heigth: auto"
                  >درصد تخفیف</span
                >
                <span v-else class style="width: 80px; heigth: auto"
                  >هزارتومان تخفیف</span
                >
              </p>
              <p
                v-else
                class="white--text pt-3 d-flex justify-center align-center"
                style="width: 100%; heigth: 100%"
              >
                <span class style="width: 80px; heigth: auto">بدون تخفیف</span>
              </p>
            </div>
          </div>
          <v-img height="300" :src="file.media_url">
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
          </v-img>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth"
                    style="width: 70%"
                  >
                    عنوان فایل :
                  </p>
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width: 70%"
                  >
                    {{ file.title }}
                  </p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth"
                    style="width: 70%"
                  >
                    قیمت :
                  </p>
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width: 70%"
                  >
                    {{ $formatMoney(file.amount) }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.rebate {
  height: 0px !important;
}
.rebate-card {
  transform: translateY(-17px) !important;
  z-index: 0;
}

.rebate-second-card {
  z-index: 1;
  transform: translateY(-67px) !important;
}
</style>