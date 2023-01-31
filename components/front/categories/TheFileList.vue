<template>
  <v-container style="height: auto" fluid class="file-list pa-6">
    <v-row dense>
      <p
        style="width: 100%"
        class="text-h6 mx-auto font-weight-bold d-flex justify-center align-baseline"
      >
        <span
          :class="{
            'text-body-2 font-weight-bold': $vuetify.breakpoint.xsOnly,
          }"
          class="blue-grey--text darken-3"
          >نوع دسته بندی :</span
        >
        <span class="font-weight-bold blue-grey--text lighten-3 accent-4 mr-4">{{
          Object.keys($route.query).length &&
          $route.query.category !== undefined
            ? $route.query.category
            : "همه"
        }}</span>
      </p>
    </v-row>
    <v-row dense v-if="files.length">
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
          :to="{ path: `/front/files/${file.title}`, params: { id: file.id } }"
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
                          style="font-size: 10px !important ; font-weight: bold"
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
                          <span class="d-block"></span>
                          <span class="d-block"></span>
                        </template>
                        <span
                          class="grey--text white"
                          style="font-size: 10px !important ; font-weight: bold"
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
                            <span class="like-count"> {{ file.rebate }} </span>
                          </span>
                        </template>
                        <span
                          class="grey--text white"
                          style="font-size: 10px !important ; font-weight: bold"
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
      <v-col cols="12" class="mt-8">
        <ThePagination :pagination="pagination" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" class="mt-9">
        <v-alert width="70%" type="error" class="text-center mx-auto" 
        dense 
        colored-border
      color="deep-purple accent-4"
      elevation="2"
          >مورد خاصی یافت نشد</v-alert
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
