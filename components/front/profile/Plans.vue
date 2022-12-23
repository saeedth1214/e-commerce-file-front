<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="plans"
      class="elevation-1"
      hide-default-footer
      :page.sync="page"
      :search="search"
      :loading="loading"
      loading-text="لطفا منتظر بمانید"
    >
      <!-- <template v-slot:footer>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </template> -->
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
      <template v-slot:item.hasBeenExpired="{ item }">
        <span
          class="pa-2 primary white--text rounded"
          v-if="!item.has_been_expired"
        >
          فعال
        </span>
        <span class="pa-2 red white--text rounded" v-else> منقضی شده </span>
      </template>

      <template v-slot:no-data>
        <p color="primary" class="text-body-2 font-weight-bold text-center">
          موردی یافت نشد
        </p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    plans: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    search: null,
    items: [],
    loading: false,
    unique: false,
    roleText: "کاربر عادی",
    user: {
      first_name: null,
      last_name: null,
      mobile: null,
      email: null,
      role_id: false,
      password: null,
      password_confirmation: null,
    },
    show: false,
  }),
  computed: {
    headers() {
      return this.$store.state.option.plan.headers;
    },
  },
};
</script>
<style lang=""></style>
