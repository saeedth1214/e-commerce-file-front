<template>
    <ProductSlider :products="files"/>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    }
  },
};
</script>

<style>
</style>
