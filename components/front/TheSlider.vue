<template>
  <client-only>
    <v-col cols="12" style="margin-top: 2rem">
      <v-sheet class="mx-auto" style="display: flex; justify-content: center">
        <div class="content">
          <article v-for="(file, Idx) in files" :key="Idx">
            <v-card
              class="ma-4 slider-wrapper"
              nuxt
              rounded-circle
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
            <p>
              {{ file.category_name }}
            </p>
          </article>
        </div>
      </v-sheet>
    </v-col>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      files: [],
    };
  },
  async fetch() {
    await this.$axios.get("frontend/files/most-visited").then((res) => {
      this.files = res.data.data["most-visited"];
    });
  },
};
</script>
<style lang="scss">
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    font-size: 0.8rem;
    color: #fff;
    font-weight: 600;
  }
}
.v-card {
  overflow: hidden;
}
.theme--light.v-sheet {
  background-color: transparent;
  margin-top: 2rem;
  direction: rtl;
}
.slider-wrapper {
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
  left: -5px !important;
}
</style>
