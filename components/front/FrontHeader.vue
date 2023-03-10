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
  background-image: linear-gradient(
      to bottom,
      rgb(0 18 129 / 52%),
      rgb(34 4 27 / 73%)
    ),
    url(/header.jpg);
  background-size: cover;
  height: 100%;
  overflow: hidden;
}
@media screen and (max-width: 1024px) {
  .header {
    height: auto !important;
  }
}
</style>
