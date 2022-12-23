<template>
  <v-app>
    <v-container>
      <v-card class="mx-auto" style="width:400px;">
        <InfiniteScroll
          url="plans"
          label="title"
          @selectedValue="setPlanIds"
          :itemId="selectedValue"
          title="plan"
        />
        
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Posts",
  data() {
    return {
      pagination: {},
      page: 1,
      items: [],
      selectedValue: []
    };
  },
  methods: {
    setPlanIds(ids) {
      this.selectedValue = ids;
    }
  }
};
</script>

<style scoped>
</style>
