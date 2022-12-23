<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="files"
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
      <template v-slot:item.title="{ item }">
        <v-img
          width="4rem"
          height="4rem"
          style="border-radius: 50%"
          :src="item.media_url"
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
        </v-img>
        <span
          class="text-body-2 font-weight-medium"
          style="position: relative; right: 70px; top: -30px"
          >{{ item.title }}</span
        >
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
    files: {
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
      return this.$store.state.option.file.headers;
    },
  },
};
</script>
<style lang=""></style>
