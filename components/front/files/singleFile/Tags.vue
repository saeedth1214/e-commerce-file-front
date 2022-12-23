<template>
  <v-card-text v-if="file.tags.data.length">
    <p class="text-center text-h5" style="width: 100%">تگ های مشابه</p>
    <v-sheet elevation="10" class="py-4 px-1">
      <v-chip-group mandatory active-class="primary--text">
        <v-chip v-for="tag in file.tags.data" :key="tag">{{ tag.name }}</v-chip>
      </v-chip-group>
    </v-sheet>
  </v-card-text>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
</style>