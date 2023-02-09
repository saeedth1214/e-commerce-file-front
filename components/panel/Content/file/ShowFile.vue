<template>
  <v-container>
    <FileDetailes :editedFile="file" :url="url" />
  </v-container>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    tab: null,
    url: "",
  }),
  mixins: [showMessage],
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  async created() {
    this.url =
      process.env.dropzoneUrl + `files/${this.$route.params.id}/upload-media`;
  },
};
</script>

<style></style>
