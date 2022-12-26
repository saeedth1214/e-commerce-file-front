<template>
  <v-dialog v-model="showMedia" persistent width="700px" class="text-center">
    <v-card style="background-color: #fff; padding: 0.5rem">
      <Uploader :url="url" @uploadSuccessfully="closeDialog" />
      <v-btn class="mx-auto" width="100px" @click="closeDialog">انصراف</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showMedia: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeUploadMedia");
    },
  },
};
</script>

<style scoped lang="scss">
>>> .v-dialog {
  text-align: center;
}
</style>
