<template>
  <v-card :loading="loading">
    <v-card-text class="mt-3">
      <label class="label-format"> ویرایش طرح </label>
      <v-row dense>
        <v-col cols="12">
          <v-container>
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="edit">
                <v-row>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="plan-title"
                      rules="required|min:2|max:256"
                    >
                      <v-text-field
                        v-model="editedPlan.title"
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
                        v-model="editedPlan.amount"
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
                        editedPlan.percentage
                          ? 'percentageRule'
                          : 'numberRule|maxRebate:' + `${editedPlan.amount}`
                      }`"
                    >
                      <v-text-field
                        v-model="editedPlan.rebate"
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
                        v-model="editedPlan.daily_download_limit_count"
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
                        v-model="editedPlan.daily_free_download_limit_count"
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
                        v-model="editedPlan.type"
                        item-text="name"
                        item-value="value"
                        :error-messages="errors"
                      ></v-select>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="3" md="3" sm="3">
                    <v-checkbox
                      v-model="editedPlan.percentage"
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
                        v-model="editedPlan.description"
                      ></v-textarea>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row dense>
                  <div class="mt-5">
                    <v-btn class="mr-4" type="submit" :disabled="invalid"
                      >ویرایش</v-btn
                    >
                    <v-btn class="mr-4" @click="remove">حذف</v-btn>
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
    editedPlan: {
      id: null,
      title: null,
      description: null,
      amount: 0,
      percentage: null,
      rebate: null,
      activation_days: null,
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
    plan: {
      Type: Object,
      required: true,
      default: () => {},
    },
  },

  created() {
    this.editedPlan = {
      title: this.plan.title,
      description: this.plan.description,
      amount: this.plan.amount,
      percentage: this.plan.percentage,
      rebate: this.plan.rebate,
      type: this.plan.type,
      daily_download_limit_count: this.plan.daily_download_limit_count,
      daily_free_download_limit_count:
        this.plan.daily_free_download_limit_count,
    };
  },
  methods: {
    async remove() {
      this.loading = true;
      await this.$axios.delete(`panel/plans/${this.plan.id}`).then((res) => {
        this.showMessage("success", "طرح انتخابی حذف شد");
        this.$router.push("/panel/plans");
      });
      this.emptyPlan();
      this.loading = false;
    },
    emptyPlan() {
      this.editedPlan = {
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
    async edit() {
      this.loading = true;
      this.editedPlan = {
        ...this.editedPlan,
        amount: parseInt(this.editedPlan.amount),
      };
      Object.keys(this.editedPlan).map((key) => {
        if (this.editedPlan[key] === null) {
          delete this.editedPlan[key];
        }
      });
      await this.$axios
        .put(`panel/plans/${this.plan.id}`, this.editedPlan)
        .then((res) => {
          this.emptyPlan();
          this.showMessage("success", "طرح انتخابی ویرایش شد");
          this.$router.push("/panel/plans");
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
