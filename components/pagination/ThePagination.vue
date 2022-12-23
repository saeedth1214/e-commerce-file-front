<template>
  <v-row dense>
    <div class="mx-auto">
      <v-pagination
        v-model="pagination.current_page"
        :length="pagination.total_pages"
        @input="handlePageChange"
        circle
        color="#00bdfe"
      ></v-pagination>
    </div>
  </v-row>
</template>

<script>
export default {
  methods: {
    async handlePageChange(value) {
      this.page = value;
      await this.$emit("initialize", value);
    }
  },
  props: {
    pagination: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>
