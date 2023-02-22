<template>
  <client-only>
    <v-col
      cols="12"
      :md="showFilter ? '9' : '12'"
      :lg="showFilter ? '9' : '12'"
    >
      <div class="mt-8" v-if="!start">
        <v-row v-if="fileData.files?.length">
          <v-col
            cols="12"
            md="3"
            sm="6"
            lg="3"
            v-for="(file, Idx) in fileData.files"
            :key="Idx"
          >
            <v-card
              class="card"
              width="300"
              height="200"
              :class="{ 'mx-auto': $vuetify.breakpoint.smAndDown }"
              nuxt
              :to="{
                path: `/front/files/${file.title}`,
                params: { id: file.id },
              }"
            >
              <v-img
                :src="file.media_url"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="100%"
                height="100%"
              >
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
                <div class="file-details elevation-2 pa-4">
                  <v-row dense>
                    <v-col cols="6" md="6" sm="6">
                      <div class="d-flex flex-column">
                        <p style="width: 40%">
                          <v-tooltip left color="white">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                class="d-block like"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon
                                  class="grey--text accent-1"
                                  style="font-size: 15px !important"
                                  >mdi-heart</v-icon
                                >
                                <span class="like-count">
                                  {{
                                    Object.keys(file.reaction_summary).length
                                      ? file.reaction_summary.like
                                      : 0
                                  }}
                                </span>
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
                        <p style="width: 40%">
                          <v-tooltip left color="white">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                class="d-block like"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon
                                  class="grey--text accent-1"
                                  style="font-size: 15px !important"
                                  >mdi-download</v-icon
                                >
                                <span class="like-count">
                                  {{ file.download_count }}
                                </span>
                              </span>
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
                        <p style="width: 40%" v-if="file.rebate > 0">
                          <v-tooltip left color="white">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                class="d-block like"
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon
                                  class="grey--text accent-1"
                                  style="font-size: 15px !important"
                                >
                                  {{
                                    file.percentage
                                      ? "mdi-percent"
                                      : "mdi-currency-usd "
                                  }}
                                </v-icon>
                                <span class="like-count">
                                  {{ file.rebate }}
                                </span>
                              </span>
                            </template>
                            <span
                              class="grey--text white"
                              style="
                                font-size: 10px !important ;
                                font-weight: bold;
                              "
                            >
                              {{ file.percentage ? "درصد تخفیف" : "تومان" }}
                            </span>
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
                        <p
                          class="text-subtitle-1 font-weight-bold blue--text text-rigth"
                          style="width: 100%"
                          v-if="file.rebate > 0"
                        >
                          {{
                            $formatMoney(file.amount_after_rebate) + " تومان"
                          }}
                        </p>
                        <p
                          class="text-subtitle-1 font-weight-bold blue--text text-rigth"
                          style="width: 100%"
                          v-else
                        >
                          {{ $formatMoney(file.amount) + " تومان" }}
                        </p>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense v-else>
          <v-col cols="12">
            <v-alert
              width="70%"
              type="error"
              class="text-center mx-auto"
              dense
              colored-border
              color="deep-purple accent-4"
              elevation="2"
              >مورد خاصی پیدا نشد</v-alert
            >
          </v-col>
        </v-row>
        <v-row dense v-if="fileData.files?.length">
          <v-col cols="12" class="text-center">
            <v-hover v-slot="{ hover }">
              <v-btn
                nuxt
                to
                color="blue-grey darken-1"
                width="180px"
                class="pa-4 white--text font-weight-bold text-center"
                :class="{ 'on-hover': hover }"
                @click="fetchMoreFiles"
                :disabled="!fileData.files?.length"
              >
                موارد بیشتر
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon color="#fff">mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
            </v-hover>
          </v-col>
        </v-row>
      </div>

      <div style="width: 100%; height: 400px" v-else>
        <TheLoader
          :start="start"
          :leftStyle="[
            $vuetify.breakpoint.mdAndUp
              ? { left: '60% !important' }
              : { left: '50% !important' },
          ]"
        />
      </div>
    </v-col>
    <template #placeholder>
      <TheLoader :start="true" />
    </template>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      attrs: {
        class: "mb-6",
        boilerplate: true,
        elevation: 2,
      },
    };
  },
  props: {
    fileData: {
      type: Object,
      required: true,
    },
    showFilter: {
      type: Boolean,
      required: true,
    },
    start: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    async fetchMoreFiles() {
      console.log("list");
      this.$emit("fetchMoreFiles");
      // this.page++;
      // if (this.page <= this.fileData.pagination.total_pages) {
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.file-details {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0px;
  right: -280px;
  transition: all 0.3s linear;
  opacity: 0.9;
}
.card:hover .file-details {
  right: 0px;
}
.on-hover {
  background-color: #fff !important;
  color: #00bdfe !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
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
.v-application p {
  margin-bottom: 0px !important;
}
</style>
