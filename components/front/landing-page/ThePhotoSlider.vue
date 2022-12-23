<template>
  <v-slide-group
    v-model="model"
    max="3"
    class="pa-4"
    active-class="success"
    show-arrows
    center-active
    mobile-breakpoint="320"
  >
    <v-slide-item
      v-for="(file, Idx) in files"
      :key="Idx"
      v-slot="{ active, toggle }"
    >
      <v-hover v-slot="{ hover }">
        <v-card class="ma-4" width="310" height="250">
          <v-img width="100%" height="100%" :src="file.media_url">
            <template #placeholder>
              <v-row class="fill-height" justify="center" align="center">
                <v-progress-circular
                  width="2"
                  size="100"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-expand-transition>
            <v-card
              v-if="hover"
              class="transition-fast-in-fast-out v-card--reveal"
              style="height: 100%; background-color: rgba(0, 0, 0, 0.6)"
              nuxt
              :to="{
                name: 'front-files-title___fa',
                params: {
                  id: file.id,
                  title: file.title.replace(/\s+/g, '_'),
                },
              }"
            >
              <v-card-text class="pb-0">
                <v-row dense>
                  <v-col cols="6" md="6" sm="6">
                    <div class="d-flex flex-column">
                      <p style="width: 30%">
                        <v-tooltip left color="white">
                          <template v-slot:activator="{ on, attrs }">
                            <span class="d-block like" v-bind="attrs" v-on="on">
                              <v-icon
                                class="grey--text accent-1"
                                style="font-size: 15px !important"
                                >mdi-heart</v-icon
                              >
                              <span class="like-count"> 1024 </span>
                            </span>
                            <span class="d-block"></span>
                            <span class="d-block"></span>
                          </template>
                          <span
                            class="grey--text"
                            style="
                              font-size: 10px !important ;
                              font-weight: bold;
                            "
                            >پسندیدن</span
                          >
                        </v-tooltip>
                      </p>
                      <p class="mt-2" style="width: 30%">
                        <v-tooltip left color="white">
                          <template v-slot:activator="{ on, attrs }">
                            <span class="d-block like" v-bind="attrs" v-on="on">
                              <v-icon
                                class="grey--text accent-1"
                                style="font-size: 15px !important"
                                >mdi-download</v-icon
                              >
                              <span class="like-count"> 200 </span>
                            </span>
                            <span class="d-block"></span>
                            <span class="d-block"></span>
                          </template>
                          <span
                            class="grey--text white"
                            style="
                              font-size: 10px !important ;
                              font-weight: bold;
                            "
                            >دانلودشده</span
                          >
                        </v-tooltip>
                      </p>
                      <p class="mt-2" style="width: 30%">
                        <v-tooltip left color="white">
                          <template v-slot:activator="{ on, attrs }">
                            <span class="d-block like" v-bind="attrs" v-on="on">
                              <v-icon
                                class="grey--text accent-1"
                                style="font-size: 15px !important"
                                >mdi-percent
                              </v-icon>
                              <span class="like-count"> 5 </span>
                            </span>
                            <span class="d-block"></span>
                            <span class="d-block"></span>
                          </template>
                          <span
                            class="grey--text white"
                            style="
                              font-size: 10px !important ;
                              font-weight: bold;
                            "
                            >درصد تخفیف</span
                          >
                        </v-tooltip>
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="6" md="6" sm="6">
                    <div class="d-flex flex-column">
                      <p
                        class="text-subtitle-1 font-weight-bold white--text text-rigth"
                        style="width: 100%"
                      >
                        {{ file.title }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import makeIntoCorrectFormat from "@/mixins/make-into-correct-format";
export default {
  data: () => ({
    model: null,
    reveal: 0,
    files: [],
  }),
  mixins: [makeIntoCorrectFormat],
  async fetch() {
    let params = {};
    params["per_page"] = 5;
    params["sort"] = "-created_at";
    await this.$axios
      .get("frontend/files", { params })
      .then((res) => {
        this.files = res.data.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    showReveal(index) {
      if (index) {
        this.reveal = index;
      } else {
        this.reveal = 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
p {
  padding: 0px;
  margin: 0px;
}
a {
  width: 180px;
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid #00bdfe;
}

a:hover {
  background-color: #00bdfe;
  color: #fff !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
}
.slideShow {
  min-height: 300px;
  position: relative;
  // top: -300px;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
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

.like {
  padding: 0.3rem;
  border: 1px solid grey;
  border-radius: 10px;
  position: relative;
  background: #fff;
  text-align: center;
  &-count {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    text-align: center;
    position: absolute;
    top: -15px;
    right: -10px;
    font-size: 0.7rem;
    font-weight: bold;
    background: #fff;
    width: 2rem;
    letter-spacing: 1px;
  }
}
</style>
