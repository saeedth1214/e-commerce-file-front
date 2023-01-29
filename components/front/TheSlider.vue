<template>
  <v-col cols="12" style="margin-top: 2rem">
    <v-sheet class="mx-auto">
      <v-slide-group max="10" class="pt-4" show-arrows center-active>
        <v-slide-item v-for="(file, Idx) in files" :key="Idx">
          <v-card
            class="ma-4 content"
            nuxt
            :to="{
              name: 'front-files-title___fa',
              params: { id: file.id, title: file.title },
            }"
          >
            <v-img width="100%" height="100%" :src="file.media_url">
              <template #placeholder>
                <v-row class="fill-height" justify="center">
                  <v-progress-circular
                    width="2"
                    size="50"
                    color="primary"
                    indeterminate
                    style="left: -55px; top: 65px"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-col>
</template>
<script>
export default {
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.theme--light.v-sheet {
  background-color: transparent;
  margin-top: 2rem;
  direction: rtl;
}
.content {
  width: 150px;
  height: 150px;
  border-radius: 50% !important;
  border: 3px solid rgb(148, 148, 236) !important;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    transform: scale(0.5rem);
  }
}

.v-slide-group__content {
  justify-content: center !important;
}

.v-progress-circular {
  top: 43px;
  left: 43px;
}
</style>
