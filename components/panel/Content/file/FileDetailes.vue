<template>
  <v-card elevation="4" :loading="loading" style="overflow-x: scroll">
    <template slot="progress">
      <v-progress-linear
        color="blue darken-1"
        height="5"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-timeline align-top dense cliped>
      <v-timeline-item icon="mdi-pencil" fill-dot color="blue accent-4">
        <v-card-text class="mt-3">
          <label class="label-format"> ویرایش فایل </label>
          <v-row dense>
            <v-col cols="12">
              <v-container>
                <validation-observer v-slot="{ invalid }">
                  <form @submit.prevent="update">
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
                        <div class="mt-4">
                          <InfiniteScroll
                            url="panel/tags"
                            @selectedValue="setTagIds"
                            :itemId="selectedTags"
                            label="name"
                            title="tag"
                            :multiple="true"
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
                            >ویرایش</v-btn
                          >
                          <v-btn
                            class="mr-4 white--text"
                            @click="deleteFile"
                            depressed
                            color="red darken-3"
                            size="20"
                            >حذف</v-btn
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
      </v-timeline-item>
      <v-divider></v-divider>
      <v-timeline-item
        icon="mdi-attachment"
        fill-dot
        color="red accent-4"
        class="pt-2"
      >
        <v-card-text class="mt-3">
          <AssignAttributes
            :fileAttributes="editedFile.attributes.data"
            :fileId="editedFile.id"
          />
        </v-card-text>
      </v-timeline-item>
      <v-divider></v-divider>
      <v-timeline-item
        icon="mdi-link"
        fill-dot
        color="yellow accent-4"
        class="pt-2"
      >
        <v-card-text class="mt-3">
          <DonwloadLink :fileId="editedFile.id" />
        </v-card-text>
      </v-timeline-item>
      <v-divider></v-divider>
      <v-timeline-item
        icon="mdi-upload"
        fill-dot
        color="green darken-4"
        class="pt-2"
      >
        <v-card-text class="mt-3">
          <Uploader :url="url" />
        </v-card-text>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>
<script>
import showMessage from "@/mixins/showMessage";
import DonwloadLink from "./DownloadLink.vue";

export default {
  data: () => ({
    loading: false,
    selectedTags: [],
    attributes: [],
    file: {
      title: null,
      description: null,
      amount: 0,
      percentage: null,
      rebate: null,
      sale_as_single: false,
      category_id: null,
    },
  }),
  components: {
    DonwloadLink,
  },
  props: {
    editedFile: {
      Type: Object,
      required: false,
      default: () => {},
    },
    url: {
      Type: String,
      required: true,
    },
  },
  mixins: [showMessage],
  async created() {
    this.loading = true;
    this.file = {
      title: this.editedFile.title,
      description: this.editedFile.description,
      amount: this.editedFile.amount,
      percentage: this.editedFile.percentage,
      rebate: this.editedFile.rebate,
      sale_as_single: this.editedFile.sale_as_single,
      category_id: this.editedFile.category_id,
    };
    if (this.editedFile.tags.data.length) {
      await this.editedFile.tags.data.map((tag) => {
        this.selectedTags.push(tag.id);
      });
    }
    this.loading = false;
  },
  methods: {
    close() {
      this.emptyFile();
      this.selectedTags = [];
    },
    setCategoryId(categoryId) {
      this.file.category_id = categoryId;
    },
    setTagIds(tagIds) {
      this.selectedTags = tagIds;
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
    async update() {
      this.loading = true;
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
        });
      this.loading = false;
    },
    async deleteFile() {
      this.$swal({
        title: "حذف آیتم ! آیا مطمعن هستید ؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "‌ادامه",
        cancelButtonText: "انصراف",
        dangerMode: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
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
        }
      });
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
.label-format {
  color: #443f3f;
  font-size: 1rem;
  font-weight: 700;
}
.v-timeline {
  min-width: 400px;
}
</style>
