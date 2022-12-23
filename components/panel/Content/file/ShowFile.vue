<template>
  <v-app dark>
    <v-container>
      <v-card v-if="loading">
        <v-tabs
          v-model="tab"
          background-color="blue accent-4"
          centered
          dark
          icons-and-text
        >
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
          <v-tab href="#tab-4">
            لینک دانلود
            <v-icon>mdi-upload</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mt-4">
          <v-tab-item value="tab-1">
            <div
              class="text-center text-h6 font-weight-light plan-title rounded hover"
            >
              {{ file.title }}
            </div>

            <v-row dense class="mt-5">
              <v-col cols="12">
                <p
                  v-if="file.amount > 0"
                  class="text-center mt-3 text-body-2 font-weight-bold grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    $formatMoney(file.amount)
                  }}</span>
                  <span class="font-weight-bold black--text">/ تومان</span>
                </p>
                <p
                  v-else
                  class="text-center mt-3 text-body-2 font-weight-bold grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="font-weight-bold black--text">رایگان</span>
                </p>

                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    file.like_count || 0
                  }}</span>
                  <span class="font-weight-bold black--text"
                    >/ بار پسندیده شده</span
                  >
                </p>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    file.download_count
                  }}</span>
                  <span class="font-weight-bold black--text"
                    >/ بار دانلود شده</span
                  >
                </p>
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12">
                <p
                  v-if="file.rebate > 0"
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    $calculateRebate(file)
                  }}</span>
                  <span class="font-weight-bold black--text"
                    >/ {{ file.percentage ? "درصدتخفیف" : "تومان تخفیف" }}</span
                  >
                  <v-divider></v-divider>
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="blue--text accent-2 text-h4 font-weight-bold">{{
                    file.users.data.length
                  }}</span>
                  <span class="font-weight-bold black--text"
                    >/ کاربر خریده اند</span
                  >
                  <v-divider></v-divider>
                </p>
              </v-col>
              <v-col cols="12">
                <p
                  class="text-center mt-3 text-body-2 font-weight-light grey--text darken-3"
                  style="width: 100%"
                >
                  <span class="font-weight-bold black--text">توضیحات</span>
                </p>
                <p
                  class="blue--text accent-2 text-body-2 font-weight-ligth text-center"
                >
                  {{ file.description ? file.description : ":(" }}
                </p>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-card max-width="600px" height="auto" class="mx-auto">
              <v-card-actions class="ma-3">
                <validation-observer v-slot="{ invalid }">
                  <form @submit.prevent="submit" class="pa-1">
                    <v-row>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{ errors }"
                          name="file-title"
                          rules="required|min:3|max:256"
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
                            >طرح رایگان است</small
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
                        <InfiniteScroll
                          url="panel/tags"
                          @selectedValue="setTagIds"
                          :itemId="selectedTags"
                          label="name"
                          title="tag"
                          :multiple="true"
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
                        <v-btn
                          class="mx-auto"
                          color="primary"
                          type="submit"
                          :disabled="invalid"
                          >ویرایش</v-btn
                        >
                        <v-btn
                          class="mx-auto"
                          @click.stop="dialogDelete = !dialogDelete"
                          >حذف</v-btn
                        >
                      </div>
                    </v-row>
                  </form>
                </validation-observer>
              </v-card-actions>
            </v-card>
            <v-dialog
              v-model="dialogDelete"
              max-width="500px"
              persistent
              scrollable
            >
              <v-card>
                <v-card-title class="text-h5"
                  >آیا از حذف فایل مطمعن هستید؟</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >انصراف</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >حذف</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <Uploader
              :url="url"
              @uploadSuccessfully="$router.push('/panel/files')"
            />
          </v-tab-item>
          <v-tab-item value="tab-4">
            <DownloadLink :fileId="file.id" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
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
    </v-container>
  </v-app>
</template>

<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    tab: null,
    selectedTags: [],
    url: "",
    dialogDelete: false,
    loading: true,
  }),
  mixins: [showMessage],
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  async created() {
    this.loading = false;
    if (this.file.tags.data.length) {
      await this.file.tags.data.map((tag) => {
        this.selectedTags.push(tag.id);
      });
    }
    this.url =
      process.env.dropzoneUrl + `files/${this.$route.params.id}/upload-media`;
    this.loading = true;
  },
  methods: {
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      await this.$axios
        .delete(`panel/files/${this.$route.params.id}`)
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", "فایل انتخابی حذف شد");
            this.$router.push("/panel/files");
          }
        })
        .catch((err) => {
          this.showMessage("error", err.message);
        });
    },
    setCategoryId(categoryId) {
      this.file.category_id = categoryId;
    },
    setTagIds(tagIds) {
      this.selectedTags = tagIds;
    },

    async submit() {
      let editedFile = {};
      editedFile = {
        ...this.file,
      };

      editedFile["tags"] = this.selectedTags;
      Object.keys(editedFile).forEach((key) => {
        if (editedFile[key] === null || editedFile[key] === "") {
          delete editedFile[key];
        }
      });
      await this.$axios
        .put(`panel/files/${this.$route.params.id}`, editedFile)
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", "فایل انتخابی ویرایش شد");
            this.$router.push("/panel/files");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
