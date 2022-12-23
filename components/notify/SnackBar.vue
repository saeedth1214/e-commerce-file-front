<template>
  <v-snackbar v-model="snackbar.snackbar" top :color="snackbar.color">
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="close">بستن</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.state.option.snackbar;
    },
  },
  methods: {
    async close() {
      await this.$store.commit("option/changeSnackbarMood", false);
    },
  },
};
</script>

<style></style>
