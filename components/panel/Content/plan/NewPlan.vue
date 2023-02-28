<template>
  <v-card :loading="loading">
    <v-card-text class="mt-3">
      <label class="label-format"> طرح جدید</label>
      <v-row dense>
        <v-col cols="12">
          <v-container>
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="save">
                <v-row>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan-title"
                      rules="required|min:2|max:256"
                    >
                      <v-text-field
                        v-model="plan.title"
                        :error-messages="errors"
                        label="عنوان"
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan-amount"
                      rules="required|numberRule"
                    >
                      <v-text-field
                        v-model="plan.amount"
                        :error-messages="errors"
                        label="قیمت"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan-rebate"
                      style="width: 90%"
                      :rules="`${
                        plan.percentage
                          ? 'percentageRule'
                          : 'numberRule|maxRebate:' + `${plan.amount}`
                      }`"
                    >
                      <v-text-field
                        v-model="plan.rebate"
                        :error-messages="errors"
                        label="مقدار تخفیف"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan_daily_download_limit_count"
                      rules="required|smalRule"
                    >
                      <v-text-field
                        v-model="plan.daily_download_limit_count"
                        :error-messages="errors"
                        label="محدودیت دانلود روزانه"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan_daily_download_limit_count"
                      rules="required|smalRule"
                    >
                      <v-text-field
                        v-model="plan.daily_free_download_limit_count"
                        :error-messages="errors"
                        label="محدودیت دانلود روزانه رایگان"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan_type"
                      rules="required"
                    >
                      <v-select
                        :items="types"
                        dense
                        outlined
                        v-model="plan.type"
                        item-text="name"
                        item-value="value"
                        :error-messages="errors"
                      ></v-select>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="3">
                    <v-checkbox
                      v-model="plan.percentage"
                      hide-details
                      class="shrink mr-2 mt-0"
                      :label="`تخفیف به صورت  ${rebateText}`"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" lg="9" md="9" sm="9">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan-description"
                      rules="min:3|max:1024"
                    >
                      <v-textarea
                        no-resize
                        outlined
                        dense
                        label="توضیحات طرح"
                        v-model="plan.description"
                      ></v-textarea>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row dense>
                  <div class="mt-5">
                    <v-btn class="mr-4" type="submit" :disabled="invalid"
                      >ایجاد</v-btn
                    >
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
</template>

<script>
import showMessage from "@/mixins/showMessage.js";

export default {
  data: () => ({
    loading: false,
    types: [
      {
        name: "1 ماهه",
        value: 1,
      },
      {
        name: "4 ماهه",
        value: 2,
      },
      {
        name: "6 ماهه",
        value: 3,
      },
    ],
    plan: {
      id: null,
      title: null,
      description: null,
      amount: 0,
      percentage: null,
      rebate: null,
      type: null,
      daily_download_limit_count: null,
      daily_free_download_limit_count: null,
    },
  }),
  mixins: [showMessage],
  computed: {
    rebateText() {
      return this.plan.percentage ? "درصدی" : "عددی";
    },
  },
  props: {
    isActive: {
      Type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    isActive(newVal) {
      this.dialog = newVal;
    },
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
        type: null,
        daily_download_limit_count: null,
        daily_free_download_limit_count: null,
      };
    },
    async save() {
      this.loading = true;
      this.plan = {
        ...this.plan,
        amount: parseInt(this.plan.amount),
      };
      Object.keys(this.plan).map((key) => {
        if (this.plan[key] === null) {
          delete this.plan[key];
        }
      });
      let params = {};
      params["filters[unique][title]"] = this.plan.title;
      await this.$axios.get("panel/plans", { params }).then(async (res) => {
        if (!res.data.data.length) {
          await this.$axios.post("panel/plans", this.plan).then((res) => {
            this.close();
            this.showMessage("success", "طرح جدیدی ثبت شد");
            this.$emit("initializeEmit");
          });
        } else {
          this.close();
          this.showMessage("error", "طرحی با این  نام ثبت شده است");
        }
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.label-format {
  color: #443f3f;
  font-size: 1rem;
  font-weight: 700;
}
.v-text-field__slot {
  label {
    font-size: 0.8rem;
  }
}
</style>
