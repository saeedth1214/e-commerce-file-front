<template>
  <div>
    <FrontHeader>
      <TheNavBar />
      <TheSearchbox />
      <Nuxt />
    </FrontHeader>
  </div>
</template>
<script>
import TheLoader from "../components/TheLoader.vue";

export default {
  components: { TheLoader },
};
</script>

<style scoped></style>
