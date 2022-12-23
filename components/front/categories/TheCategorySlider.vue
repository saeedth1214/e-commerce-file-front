<template>
  <v-container fluid>
    <v-slide-group
      v-model="selectedCategory"
      max="4"
      class="pa-4"
      show-arrows
      active-class="grey darkern-2"
    >
      <v-slide-item
        v-for="category in categories"
        :key="category.id"
        v-slot="{ active, toggle }"
        :value="{ id: category.id, name: category.name }"
      >
        <v-hover v-slot="{ hover }">
          <v-card class="ma-4" width="200" height="100" @click="toggle">
            <v-img :src="category.media" width="100%" height="100%"></v-img>
            <v-expand-transition>
              <v-card
                v-if="hover"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%"
              >
                <v-card-actions
                  class="d-flex justify-center align-center"
                  style="height: 100%"
                >
                  <p
                    class="text-subtitle-1 font-weight-bold text-center white--text"
                    style="position: absolute"
                  >
                    {{ category.name }}
                  </p>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-slide-item>
    </v-slide-group>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedCategory: null,
  }),

  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  watch: {
    selectedCategory(newVal) {
      if (newVal !== undefined) {
        this.$emit("filterByCategory", newVal);
      } else {
        this.$router.push({
          path: "/front/categories",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.2) !important;
}
>>> .v-slide-group__next i {
  background: #046ead;
  color: #888;
  border-radius: 50%;
}

>>> .v-slide-group__prev i {
  background: #046ead;
  color: #888;
  border-radius: 50%;
}
</style>
