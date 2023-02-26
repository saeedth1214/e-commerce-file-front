<template>
  <div class="tags" v-if="tags.length">
    <p class="subtitle-2 font-weight-bold">تگ های مشابه</p>
    <ul class="tag-lits d-flex flex-wrap">
      <li class="tag-item" v-for="tag in tags" :key="tag.id">
        <v-btn
          color="#888"
          class="ma-2 subtitle-2"
          dark
          outlined
          nuxt
          :to="{
            path: 'front/files',
            query: { format: 'search', tag: tag.name },
          }"
        >
          {{ tag.name }}
        </v-btn>
      </li>
    </ul>
  </div>
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
<style scoped></style>
