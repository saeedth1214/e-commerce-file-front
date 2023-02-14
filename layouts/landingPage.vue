<template>
  <v-app>
    <FrontHeader>
      <TheNavBar headerStyle="padding-top:1.5rem" />
      <Nuxt />
    </FrontHeader>
  </v-app>
</template>
<script>
import TheLoader from "../components/TheLoader.vue";

export default {
  components: { TheLoader },
};
</script>

<style></style>
