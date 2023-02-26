<template>
  <v-img
    :src="mediaUrl"
    lazy-src="https://picsum.photos/id/11/100/60"
    max-height="300"
    contain
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
          :style="progress_style"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>
<script>
export default {
  props: {
    mediaUrl: {
      type: String,
      required: true,
    },
    progress_style: {
      type: String,
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped></style>
