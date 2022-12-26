<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="580px">
    <v-card color="#fff">
      <v-toolbar dark color="indigo" dense>
        <v-toolbar-title class="text-center">اطلاعات طرح خود را وارد کنید</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="mt-3">
        <v-row dense>
          <v-col cols="12">
            <v-container>
              <validation-observer v-slot="{ invalid }">
                <form @submit.prevent="save">
                  <v-row>
                    <v-col cols="12">
                      <validation-provider
                        v-slot="{errors}"
                        name="plan-title"
                        rules="required|min:2|max:256"
                      >
                        <v-text-field v-model="plan.title" :error-messages="errors" label="عنوان"></v-text-field>
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
                        <small class="error--text" v-if="plan.amount == 0">طرح رایگان است</small>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" v-if="plan.amount > 0">
                      <v-row align="center">
                        <v-checkbox v-model="plan.percentage" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                        <validation-provider
                          v-slot="{errors}"
                          name="plan-rebate"
                          style="width:90%"
                          :rules="`${plan.percentage ? 'percentageRule' : 'numberRule|maxRebate:'+`${plan.amount}`}`"
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
                          no-resize
                          outlined
                          label="توضیحات طرح"
                          v-model="plan.description"
                        ></v-textarea>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <div class="mt-5">
                      <v-btn class="mr-4" type="submit" :disabled="invalid">ایجاد</v-btn>
                      <v-btn class="mr-4" @click="close">انصراف</v-btn>
                    </div>
                  </v-row>
                </form>
              </validation-observer>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import showMessage from "@/mixins/showMessage.js";

export default {
  data: () => ({
    dialog: false,
    plan: {
      id: null,
      title: null,
      description: null,
      amount: 0,
      percentage: null,
      rebate: null,
      activation_days: null,
      daily_download_limit_count: null
    }
  }),

  mixins: [showMessage],
  props: {
    isActive: {
      Type: Boolean,
      required: false,
      default: false
    }
  },
  watch: {
    isActive(newVal) {
      this.dialog = newVal;
    }
  },
  methods: {
    close() {
      this.$emit("close");
      this.emptyPlan();
    },
    emptyPlan() {
      this.plan = {
        id: null,
        title: null,
        description: null,
        amount: 0,
        percentage: null,
        rebate: null,
        activation_days: null,
        daily_download_limit_count: null
      };
    },
    async save() {
      this.dialog = true;
      Object.keys(this.plan).map(key => {
        if (this.plan[key] === null) {
          delete this.plan[key];
        }
      });
      let params = {};
      params["filters[unique][title]"] = this.plan.title;
      await this.$axios
        .get("panel/plans", { params })
        .then(async res => {
          if (!res.data.data.length) {
            await this.$axios.post("panel/plans", this.plan).then(res => {
              this.close();
              this.showMessage("success", "طرح جدیدی ثبت شد");
              this.$emit("initializeEmit");
            });
          } else {
            this.close();
            this.showMessage("error", "طرحی با این  نام ثبت شده است");
          }
        })
        .catch(err => console.log(err));
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>
