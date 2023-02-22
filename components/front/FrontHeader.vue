<template>
  <header class="header">
    <slot></slot>
  </header>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.header {
  background: linear-gradient(180deg, #2d2db0 -65%, #2c8cf4 110%);
  height: 100%;
}

@media screen and (max-width: 560px) {
  .header {
    height: auto !important;
  }
}
</style>
