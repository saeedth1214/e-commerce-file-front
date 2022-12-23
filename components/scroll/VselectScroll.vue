<template>
  <v-select
    v-model="selctedvalue"
    :items="items"
    label="Select"
    :multiple="multiple"
    persistent-hint
    v-intersect="infiniteScrolling"
  ></v-select>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      pagination: {},
      page: 1,
      items: []
    };
  },
  props: {
    url: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  // computed: {
  //   url() {
  //     return "https://jsonplaceholder.typicode.com/posts?_page=" + this.page;
  //   }
  // },
  async created() {
    await this.fetchData();
  },
  methods: {
    infiniteScrolling(entries, observer, isIntersecting) {
      console.log(isIntersecting);
    },
    async fetchData() {
      let params = {};
      params["page"] = this.page;
      this.$axios
        .get(this.url)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>
