<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    max-width="580px"
    content-class="bg"
  >
    <v-card style="background-color: #fff">
      <v-toolbar dark color="primary" dense>
        <v-toolbar-title>اطلاعات فایل خود را وارد کنید</v-toolbar-title>
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
                        v-slot="{ errors }"
                        name="file-title"
                        rules="required|min:3|max:128"
                      >
                        <v-text-field
                          v-model="file.title"
                          :error-messages="errors"
                          label="عنوان"
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12">
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
                        ></v-text-field>
                        <small class="error--text" v-if="file.amount == 0"
                          >فایل رایگان است</small
                        >
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" v-if="file.amount > 0">
                      <v-row align="center">
                        <v-checkbox
                          v-model="file.percentage"
                          hide-details
                          class="shrink mr-2 mt-0"
                        ></v-checkbox>
                        <validation-provider
                          v-slot="{ errors }"
                          name="file-rebate"
                          style="width: 90%"
                          :rules="`${
                            file.percentage
                              ? 'percentageRule'
                              : 'numberRule|maxRebate:' + `${file.amount}`
                          }`"
                        >
                          <v-text-field
                            v-model="file.rebate"
                            :error-messages="errors"
                            label="مقدار تخفیف"
                            type="number"
                          ></v-text-field>
                        </validation-provider>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <InfiniteScroll
                        url="panel/categories"
                        @selectedValue="setCategoryId"
                        :itemId="file.category_id"
                        label="name"
                        title="category"
                        rules="required"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox
                        v-model="file.sale_as_single"
                        label="فروش تکی"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12">
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
  </v-dialog>
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
};
</script>

<style scoped lang="scss">
.bg {
  background: #fff;
}
</style>
