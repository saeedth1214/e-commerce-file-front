<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    class="elevation-1"
    hide-default-footer
    :search="search"
    loading-text="لطفا منتظر بمانید"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>لیست کاربران</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="جستجو"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.rebate="{ item }">
      <div>
        <span>{{
          item.percentage ? item.rebate : $formatMoney(item.rebate)
        }}</span>
        <span>
          {{ item.percentage ? "درصد" : "تومان" }}
        </span>
      </div>
    </template>

    <template v-slot:item.status="{ item }">
      <span
        class="pa-2 white--text rounded"
        :class="{
          'yellow darken-2': item.status === 1,
          'blue darken-1': item.status === 2,
          'red darken-1': item.status === 3,
        }"
      >
        {{ item.status_dec }}
      </span>
    </template>

    <template v-slot:no-data>
      <p color="primary" class="text-body-2 font-weight-bold text-center">
        موردی یافت نشد
      </p>
    </template>

  </v-data-table>
</template>
<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      search: null,
    };
  },

  computed: {
    headers() {
      return this.$store.state.option.order.headers;
    },
  },
};
</script>
<style lang=""></style>
