<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card :loading="loading" class="mx-auto my-12" max-width="374">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <v-card-title class="text-center">{{file.title}}</v-card-title>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>قیمت کل :</v-card-title>
        <v-card-text>
          <v-chip>{{$formatMoney(file.amount)}} تومان</v-chip>
        </v-card-text>

        <v-card-title>مقدار تخفیف:</v-card-title>
        <v-card-text v-if="file.rebate">
          <v-chip v-if="file.percentage">{{file.rebate }} درصد</v-chip>
          <v-chip v-else>{{$formatMoney(file.rebate) }}تومان</v-chip>
        </v-card-text>
        <v-card-text v-else>
          <v-chip>بدون تخفیف</v-chip>
        </v-card-text>

        <v-card-title>قیمت بعد از تخفیف:</v-card-title>
        <v-card-text>
          <v-chip>{{$formatMoney(file.amount_after_rebate)}}</v-chip>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">Reserve</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    }
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false
    },

    file: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>
