<template>
  <v-card :loading="loading">
    <v-card-text class="mt-3">
      <label class="label-format"> فایل جدید</label>
      <v-row dense>
        <v-col cols="12">
          <v-container>
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="save">
                <v-row>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="file-title"
                      rules="required|min:3|max:128"
                    >
                      <v-text-field
                        v-model="file.title"
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
                      name="file-amount"
                      rules="required|numberRule"
                    >
                      <v-text-field
                        v-model="file.amount"
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
                      name="file-rebate"
                      style="width: 90%"
                      :rules="`${
                        file.percentage
                          ? 'percentageRule:' + `${file.amount}`
                          : 'numberRule|maxRebate:' + `${file.amount}`
                      }`"
                    >
                      <v-text-field
                        v-model="file.rebate"
                        :error-messages="errors"
                        label="مقدار تخفیف"
                        type="number"
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <div>
                      <InfiniteScroll
                        url="panel/categories?filters[parentNot]=null"
                        @selectedValue="setCategoryId"
                        :itemId="file.category_id"
                        label="name"
                        title="category"
                        rules="required"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" lg="8" md="8">
                    <validation-provider
                      v-slot="{ errors }"
                      name="file-description"
                      rules="min:3|max:1024"
                    >
                      <v-textarea
                        outlined
                        name="input-7-4"
                        label="توضیحات فایل"
                        :error-messages="errors"
                        v-model="file.description"
                        no-resize
                      ></v-textarea>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" lg="4" md="4" sm="6">
                    <v-checkbox
                      v-model="file.sale_as_single"
                      :label="`${accessTypeText}`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="file.percentage"
                      :label="`تخفیف به صورت  ${rebateText}`"
                    ></v-checkbox>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="4"
                    md="4"
                    offset-md="4"
                    offset-lg="4"
                    sm="6"
                  >
                    <div class="mt-5">
                      <v-btn
                        class="mr-4"
                        type="submit"
                        depressed
                        color="primary"
                        size="20"
                        :disabled="invalid || loading"
                        >ایجاد</v-btn
                      >
                    </div>
                  </v-col>
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
import showMessage from "@/mixins/showMessage";

export default {
  data() {
    return {
      loading: false,
      file: {
        title: null,
        description: null,
        amount: 0,
        percentage: null,
        rebate: null,
        sale_as_single: false,
        category_id: null,
      },
    };
  },
  mixins: [showMessage],

  computed: {
    rebateText() {
      return this.file.percentage ? "درصدی" : "عددی";
    },
    accessTypeText() {
      return this.file.sale_as_single ? "خرید به صورت تکی" : "خرید اشتراکی";
    },
  },
  methods: {
    async save() {
      this.loading = true;
      this.file = {
        ...this.file,
        amount: parseInt(this.file.amount),
      };
      this.file.description &&
        (this.file.description = this.file.description.trim());
      Object.keys(this.file).map((key) => {
        if (this.file[key] === null) {
          delete this.file[key];
        }
      });
      let params = {};
      params["filters[unique][title]"] = this.file.title;
      await this.$axios
        .get("panel/files", { params })
        .then(async (res) => {
          if (!res.data.data.length) {
            await this.$axios.post("panel/files", this.file).then((res) => {
              this.close();
              this.showMessage("success", "فایل جدیدی ثبت شد");
              this.$emit("initializeEmit");
            });
          } else {
            this.close();
            this.showMessage("error", "فایلی با این  نام ثبت شده است");
          }
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
    close() {
      this.emptyFile();
    },
    emptyFile() {
      this.file = {
        title: null,
        description: null,
        amount: 0,
        percentage: null,
        rebate: null,
        sale_as_single: false,
        category_id: null,
      };
    },
    setCategoryId(categoryId) {
      this.file.category_id = categoryId;
    },
  },
};
</script>
<style lang="scss" scoped>
.label-format {
  color: #443f3f;
  font-size: 1rem;
  font-weight: 700;
}
</style>
