<template>
  <div class="overlay">
    <v-row>
      <v-overlay :value="overlay"> </v-overlay>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 1000;
  position: absolute;
}

>>> .v-overlay__scrim {
  opacity: 1 !important;
}
</style>
