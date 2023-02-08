<template>
  <v-card elevation="4">
    <p class="text-subtitle-2 pa-4 font-weight-bold h1">اطلاعات کلی</p>
    <v-card-text class="mt-3">
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
                    <InfiniteScroll
                      url="panel/categories"
                      @selectedValue="setCategoryId"
                      :itemId="file.category_id"
                      label="name"
                      title="category"
                      rules="required"
                    />
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
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    dialog: false,
    file: {
      title: null,
      description: null,
      amount: 0,
      percentage: null,
      rebate: null,
      sale_as_single: false,
      category_id: null,
      link: null,
    },
  }),
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

    file: {
      handler(newVal) {
        this.file["description"] =
          newVal["description"] !== null ? newVal["description"].trim() : null;
      },
      deep: true,
    },
  },
  mixins: [showMessage],
  methods: {
    close() {
      this.$emit("close");
      this.emptyFile();
    },
    setCategoryId(categoryId) {
      this.file.category_id = categoryId;
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
        link: null,
      };
    },
    async save() {
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
      this.dialog = false;
    },
  },

  computed: {
    rebateText() {
      return this.file.percentage ? "درصدی" : "عددی";
    },
    accessTypeText() {
      return this.file.sale_as_single ? "خرید به صورت تکی" : "خرید اشتراکی";
    },
  },
};
</script>

<style scoped lang="scss">
.bg {
  background: #fff;
}
</style>
