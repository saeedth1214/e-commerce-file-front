<template>
  <v-app dark>
    <v-container class="ma-2">
      <v-card>
        <v-tabs v-model="tab" background-color="blue accent-4" centered dark icons-and-text>
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-1">
            نمایش
            <v-icon>mdi-phone</v-icon>
          </v-tab>
          <v-tab href="#tab-2">
            ویرایش
            <v-icon>mdi-tooltip-edit</v-icon>
          </v-tab>
          <v-tab href="#tab-3">
            آپلود عکس
            <v-icon>mdi-upload</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="ma-1">
          <v-tab-item value="tab-1">
            <div
              class="text-center text-h6 font-weight-light plan-title rounded hover"
            >{{plan.title}}</div>

            <v-row dense class="mt-5">
              <v-col cols="12">
                <p
                  v-if="plan.amount > 0"
                  class="text-center mt-3 text-body-2 font-weight-bold grey--text darken-3"
                  style="width:100%"
                >
                  <span
                    class="blue--text accent-2 text-h4 font-weight-bold"
                  >{{$formatMoney(plan.amount)}}</span>
                  <span class="font-weight-bold black--text">/ تومان در ماه</span>
                </p>
                <p
                  class="text-center mt-3 text-body-2 font-weight-bold grey--text darken-3"
                  style="width:100%"
                  v-else
                >
                  <span class="blue--text accent-2 text-h6 font-weight-bold">رایگان</span>
                </p>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width:100%"
                >
                  <span
                    class="blue--text accent-2 text-h4 font-weight-bold"
                  >{{plan.daily_download_limit_count}}</span>
                  <span class="font-weight-bold black--text">/ دانلود در روز</span>
                </p>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width:100%"
                >
                  <span
                    class="blue--text accent-2 text-h4 font-weight-bold"
                  >{{$calculateRebate(plan)}}</span>
                  <span
                    class="font-weight-bold black--text"
                  >/ {{plan.percentage ? 'درصدتخفیف' : 'تومان تخفیف'}}</span>
                  <v-divider></v-divider>
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width:100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{plan.usersCount}}</span>
                  <span class="font-weight-bold black--text">/ کاربر خریده اند</span>
                  <v-divider></v-divider>
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width:100%"
                >
                  <span class="font-weight-bold black--text">توضیحات</span>
                </p>
                <p
                  class="blue--text accent-2 text-body-2 font-weight-ligth text-center"
                >{{plan.description ?plan.description: ':(' }}</p>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card max-width="600px" height="auto" class="mx-auto">
              <v-card-actions class="ma-3">
                <validation-observer v-slot="{invalid}">
                  <form @submit.prevent="submit" class="pa-1">
                    <v-row>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{errors}"
                          name="plan-title"
                          rules="required|min:3|max:256"
                        >
                          <v-text-field
                            v-model="plan.title"
                            outlined
                            dense
                            :error-messages="errors"
                            label="عنوان"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{errors}"
                          name="plan-amount"
                          rules="required|numberRule"
                        >
                          <v-text-field
                            v-model="plan.amount"
                            :error-messages="errors"
                            label="قیمت"
                            type="number"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12" v-if="plan.amount > 0">
                        <v-row align="center">
                          <v-checkbox
                            v-model="plan.percentage"
                            hide-details
                            class="shrink mr-2 mt-0"
                          ></v-checkbox>
                          <validation-provider
                            v-slot="{errors}"
                            name="plan-rebate"
                            style="width:90%"
                            :rules="`${plan.percentage ? 'percentageRule' : 'numberRule'}`"
                          >
                            <v-text-field
                              v-model="plan.rebate"
                              :error-messages="errors"
                              label="مقدار تخفیف"
                              type="number"
                            ></v-text-field>
                          </validation-provider>
                        </v-row>
                      </v-col>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{errors}"
                          name="plan_daily_download_limit_count"
                          rules="required|smalRule"
                        >
                          <v-text-field
                            v-model="plan.daily_download_limit_count"
                            :error-messages="errors"
                            label="محدودیت دانلود روزانه"
                            type="number"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{errors}"
                          name="plan_activation_days"
                          rules="required|smalRule"
                        >
                          <v-text-field
                            v-model="plan.activation_days"
                            :error-messages="errors"
                            label="روزای فعال"
                            type="number"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{errors}"
                          name="plan-description"
                          rules="min:3|max:1024"
                        >
                          <v-textarea
                            outlined
                            name
                            label="توضیحات طرح"
                            no-resize
                            v-model="plan.description"
                            :error-messages="errors"
                          ></v-textarea>
                        </validation-provider>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <div class="mt-5">
                        <v-btn
                          class="mx-auto"
                          color="primary"
                          type="submit"
                          :disabled="invalid"
                        >ویرایش</v-btn>
                      </div>
                    </v-row>
                  </form>
                </validation-observer>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <Uploader :url="url" @uploadSuccessfully="$router.push('/panel/plans')"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    tab: null
  }),
  mixins: [showMessage],
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  async created() {
    this.url =
      process.env.dropzoneUrl + `plans/${this.$route.params.id}/upload-media`;
  },
  methods: {
    async submit() {
      await this.$axios
        .put(`panel/plans/${this.$route.params.id}`, this.plan)
        .then(res => {
          if (res.status === 204) {
            this.showMessage("success", "طرح انتخابی ویرایش شد");
            this.$router.push("/panel/plans");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>
