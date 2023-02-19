<template lang="">
  <v-row class="sticky sticky-tag">
    <v-col
      cols="12"
      lg="3"
      :style="[showFilter ? { 'border-left': '1px solid #e1e1e1' } : '']"
    >
      <div
        class="d-flex flex-column showfilterbox"
        v-if="showFilter && $vuetify.breakpoint.lgAndUp"
      >
        <div class="pr-4 pl-4" style="text-align: left">
          <v-btn icon plain color="#333">
            <v-icon style="cursor: pointer" @click="$emit('closeFilter')">
              mdi-arrow-expand-right
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-col>
    <v-col cols="12" :lg="showFilter ? '9' : '12'">
      <div
        style="width: 100%"
        class="wrapper d-flex justify-center border-none"
      >
        <v-chip-group active-class="primary--text" v-model="tag">
          <v-chip v-for="tag in tags" :key="tag.id" :value="tag">
            <span>
              {{ tag.name }}
              <v-icon>mdi-magnify</v-icon>
            </span>
          </v-chip>
        </v-chip-group>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      tag: null,
      tags: [],
      pagination: {},
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  props: {
    showFilter: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    tag(tag) {
      if (tag !== undefined) {
        this.$emit("searchByTag", { name: tag.name, id: tag.id });
      } else {
        this.$router.push({
          path: "/front/files",
        });
      }
    },
  },

  async created() {
    this.fetchTags();
  },

  methods: {
    async fetchTags() {
      let params = {};
      params["per_page"] = 30;
      await this.$axios.get("frontend/tags", { params }).then((res) => {
        this.tags = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
    },
  },
};
</script>
<style lang="css" scoped>
.theme--light.v-chip:not(.v-chip--active) {
  border: 1px solid #e0e0e0 !important;
  background-color: transparent !important;
}
</style>
