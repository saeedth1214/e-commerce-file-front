<template>
  <v-app id="inspire">
    <v-container v-if="!loading">
      <TheAdvanceFilter
        @orderBy="orderByFiles"
        @searchByTitle="searchByTitle"
      />
      <v-toolbar flat>
        <v-row style="text-align: end">
          <v-col cols="12" sm="4" offset-md="8">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  fab
                  dark
                  color="indigo"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="dialog = true"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>افزودن</span>
            </v-tooltip>
            <NewFile
              :isActive="dialog"
              @close="dialog = false"
              @initializeEmit="initialize"
            />
          </v-col>
        </v-row>
      </v-toolbar>
      <v-row col="mt-n6" v-if="files.length">
        <v-col
          cols="12"
          md="3"
          sm="6"
          lg="3"
          v-for="(file, Idx) in files"
          :key="Idx"
        >
          <v-card
            class="card"
            width="300"
            height="200"
            :class="{ 'mx-auto': $vuetify.breakpoint.smAndDown }"
            nuxt
            :to="{
              path: `/panel/files/${file.title}`,
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
                            <span class="d-block like" v-bind="attrs" v-on="on">
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
                            <span class="d-block like" v-bind="attrs" v-on="on">
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
                            <span class="d-block like" v-bind="attrs" v-on="on">
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
                        {{ $formatMoney(file.amount_after_rebate) + " تومان" }}
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
        <v-alert width="100%" dense type="info" class="text-center"
          >مورد خاصی یافت نشد</v-alert
        >
      </v-row>
      <v-row class="justify-center" v-if="files.length">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="blue-grey"
          class="ma-2 white--text"
          fab
          @click="fetchData"
        >
          <v-icon dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-row dense v-else>
      <v-col cols="12">
        <v-sheet color="grey lighten-3" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            height="300px"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <TheOverlay :overlay="overlay" />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      drawer: false,
      overlay: false,
      dialog: false,
      files: [],
      pagination: {},
      page: 1,
      loading: true,
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    async fetchData() {
      this.page++;
      if (this.page <= this.pagination.total_pages) {
        this.initialize();
      } else {
        this.page = 1;
      }
    },
    async filterFiles(filters) {
      this.overlay = true;
      let params = {};
      params = {...filters};
      await this.$axios
        .get("panel/files", { params })
        .then((res) => {
          this.files = res.data.data;
          this.pagination = res.data.meta.pagination;
        })
        .catch((err) => console.log(err));
      this.overlay = false;
    },
    async initialize() {
      let params = {};
      this.loading = true;
      params["page"] = this.page;
      await this.$axios
        .get("panel/files", { params })
        .then((res) => {
          this.files.push(...res.data.data);
          this.pagination = res.data.meta.pagination;
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
    async orderByFiles(sortBy) {
      let params = {};
      params["sort"] = sortBy;
      this.filterFiles({ sort: sortBy });
    },

    async searchByTitle(title) {
      this.filterFiles({ "filters[title]": title });
    },
  },
};
</script>

<style scope lang="scss">
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
</style>
