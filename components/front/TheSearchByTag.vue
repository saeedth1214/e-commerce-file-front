<template>
  <client-only>
    <v-col cols="12">
      <div class="wrapper-tags">
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
      </div>
    </v-col>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
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
.wrapper-tags {
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 0.5rem;
}
.tags {
  display: flex;
  margin: 0px auto;
  justify-content: center;
  width: 500px;

  a {
    color: #fff;
    text-decoration: none;
    padding: 0.5rem;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 12px;
    line-height: 1.2;
    background: rgba(255, 255, 255, 0.2);
    text-align: center;
    cursor: pointer;
  }
}

@media screen and (max-width: 500px) {
  .wrapper-tags {
    width: 95%;
    overflow-x: scroll;
    height: 50px;
    position: relative;
    .tags {
      width: 500px;
      position: absolute;
      left: 0px;
      justify-content: flex-end !important;
      a {
        width: 140px;
      }
    }
  }
}
</style>
