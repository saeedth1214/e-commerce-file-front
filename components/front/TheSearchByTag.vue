<template>
  <v-col cols="12">
    <div class="tags">
      <nuxt-link
        v-for="tag in tags"
        :key="tag.id"
        :to="{ path: 'front/files', query: { searchByTag: tag.name } }"
      >
        {{ tag.name }}
        <v-icon color="#fff">mdi-magnify</v-icon>
      </nuxt-link>
    </div>
  </v-col>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  computed: {
    tags() {
      return this.$store.state.tag.tags;
    },
  },
};
</script>
<style lang="scss" scoped>
.tags {
  display: flex;
  margin: 0px auto;
  justify-content: center;

  a {
    color: #fff;
    font-size: 1rem;
    text-decoration: none;
    padding: 0.5rem;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 16px;
    line-height: 1.66;
    background: rgba(255, 255, 255, 0.2);
    text-align: center;
    cursor: pointer;
  }

  @media screen and (max-width: 400px) {
    span {
      font-size: 10px;
      padding: 0.2rem;
    }
  }
}
</style>
