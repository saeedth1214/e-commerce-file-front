<template>
  <div>
    <v-row v-if="products.length" class="fill-height ma-4" align="center" justify="center">
      <h3
        class="text-h5 pa-4 blue--text lighten-3"
        style="border-bottom:2px solid grey"
      >فایل های خریداری شده</h3>
    </v-row>
    <v-slide-group>
      <v-slide-item v-for="(product,i) in products" :key="`hotProduct-${i}`">
        <v-card
          link
          color="surface"
          width="300"
          class="el ma-2 mb-5 mr-5"
          :to="`/panel/files/${product.id}`"
          nuxt
        >
          <v-img height="300" :src="product.media_url">
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
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width:50%"
                  >{{product.title}}</p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p class="text-body-2 font-weight-bold text-rigth" style="width:50%">قیمت :</p>
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width:50%"
                  >{{$formatMoney(product.amount)}}</p>
                </div>
              </v-col>

              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth"
                    style="width:50%"
                  >قیمت بعد از تخفیف :</p>
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width:50%"
                  >{{ $formatMoney(product.amount_after_rebate)}}</p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p class="text-body-2 font-weight-bold text-rigth" style="width:50%">تاریخ خرید :</p>
                  <p
                    class="text-body-2 font-weight-bold text-left"
                    style="width:50%"
                  >{{product.bought_at}}</p>
                </div>
              </v-col>
            </v-row>
            <v-chip
              x-small
              label
              outlined
              class="mr-1"
              v-for="(tag,Idx) in product.tags"
              :key="`tag-${Idx}`"
            >{{tag.title}}</v-chip>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>
