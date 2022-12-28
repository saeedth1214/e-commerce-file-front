<template>
  <div>
    <v-dialog v-model="dialog" width="750px" scrollable persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          class="mx-2"
          fab
          dark
          color="primary"
          v-on="on"
          v-bind="attrs"
          small
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card style="background-color: #fff">
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text height="auto">
          <v-container>
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="save">
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="voucher-code"
                      rules="required|min:3|max:64"
                    >
                      <v-text-field
                        v-model="item.code"
                        :error-messages="errors"
                        label="کدتخفیف"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-row align="center">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-checkbox
                            v-model="item.percentage"
                            hide-details
                            class="shrink mr-2 mt-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-checkbox>
                        </template>
                        <span>نوع تخفیف به صورت عددی یا درصدی</span>
                      </v-tooltip>

                      <validation-provider
                        v-slot="{ errors }"
                        name="voucher-rebate"
                        style="width: 85%"
                        :rules="`${
                          item.percentage
                            ? 'required|percentageRule'
                            : 'required|numberRule'
                        }`"
                      >
                        <v-text-field
                          v-model="item.rebate"
                          :error-messages="errors"
                          label="مقدار تخفیف"
                          type="number"
                        ></v-text-field>
                        <small class="grey--text lighten-2"
                          >مقدار این فیلد الزامیست</small
                        >
                      </validation-provider>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <date-picker
                      type="datetime"
                      display-format="jD jMMMM ساعت H"
                      modal
                      mode="single"
                      :auto-submit="false"
                      label="تاریخ انقضا:"
                      from
                      v-model="item.expired_at"
                      required
                      :local-config="localConfigs"
                    >
                      <template #after>
                        <small class="invalid-feedback"
                          >این فیلد الزامی می باشد.</small
                        >
                      </template>
                    </date-picker>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <p class="text-body-2 font-weight-bold">وضعیت :</p>
                    <v-switch
                      v-model="item.status"
                      :label="activeText"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <p class="text-body-2 font-weight-bold">نوع تخفیف :</p>
                    <v-select
                      v-model="item.type"
                      :items="voucherTypes"
                      item-text="name"
                      color="#e37043"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row dense>
                  <div class="mt-5">
                    <v-btn
                      class="mr-4"
                      type="submit"
                      :disabled="invalid || !item.expired_at"
                      >{{ item.id ? "ویرایش" : "ایجاد" }}</v-btn
                    >
                    <v-btn class="mr-4" @click="close">انصراف</v-btn>
                  </div>
                </v-row>
              </form>
            </validation-observer>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px" persistent scrollable>
      <v-card>
        <v-card-title class="text-h5"
          >آیا از حذف کدتخفیف مطمعن هستید؟</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">انصراف</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >حذف</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import showMessage from "@/mixins/showMessage.js";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    activeText: "غیر فعال",
    rebateRules: "",
    item: {
      id: null,
      code: null,
      rebate: null,
      percentage: false,
      expired_at: null,
      status: false,
      type: null,
    },
    localConfigs: {
      fa: {
        // displayFormat: "jD jMMMM HH:mm",
        input: "",
        displayValue: null,
      },
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

    item: {
      handler(newVal) {
        this.activeText = newVal.status ? "فعال" : "غیر فعال";
      },
      deep: true,
    },
    editedItem(newVal) {
      this.item = {
        id: newVal.id,
        code: newVal.code,
        rebate: newVal.rebate,
        percentage: newVal.percentage,
        expired_at: newVal.expired_at,
        status: newVal.status,
        type: newVal.type_id,
        expired_at: "",
      };
      if (newVal.deleted) {
        this.dialogDelete = true;
      } else {
        this.dialog = true;
      }
    },
  },

  props: {
    editedItem: {
      type: Object,
      required: false,
      default: () => {},
    },
    voucherTypes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formTitle() {
      return !this.item.id ? "افزودن کد تخفیف" : "ویرایش کد تخفیف";
    },
    accessTypes() {
      return this.$store.state.option.voucher.accessTypes;
    },
  },
  mixins: [showMessage],
  methods: {
    async save() {
      if (this.item.id) {
        let params = {};
        params["filters[unique][code]"] = this.item.code;
        const data = await this.$axios
          .get("panel/vouchers", { params })
          .then(async (res) => {
            if (res.data.data.length && res.data.data[0].id !== this.item.id) {
              this.showMessage("error", "این کد تخفیف قبلا وارد شده است");
            } else {
              let voucher = {
                ...this.item,
                expired_at: this.item.expired_at + ":00",
              };
              await this.$axios
                .put(`panel/vouchers/${voucher.id}`, voucher)
                .then((res) => {
                  this.showMessage("success", "کد تخفیف انتخابی ویرایش شد");
                  this.$emit("initializeEmit");
                });
            }
          })
          .catch((err) => console.log(err));
      } else {
        let voucher = {
          ...this.item,
          expired_at: this.item.expired_at + ":00",
        };
        // unique code
        let params = {};
        params["filters[unique][code]"] = this.item.code;
        const data = await this.$axios
          .get("panel/vouchers", { params })
          .then(async (res) => {
            if (res.data.data.length) {
              this.showMessage("error", "این کد تخفیف قبلا وارد شده است");
            } else {
              const data = await this.$axios
                .post("panel/vouchers", voucher)
                .then((res) => {
                  this.$emit("initializeEmit");
                  this.showMessage("success", "کد تخفیف جدیدی اضافه شد.");
                });
            }
          })
          .catch((err) => console.log(err));
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.localConfigs.fa.input = "";
      this.localConfigs.fa.displayValue = null;
      this.$nextTick(() => {
        this.item = {};
      });
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    async deleteItemConfirm() {
      await this.$axios.delete(`panel/vouchers/${this.item.id}`).then((res) => {
        if (res.status === 204) {
          this.$emit("initializeEmit");
          this.dialogDelete = false;
          this.showMessage("success", "کد تخفیف انتخابی حذف شد");
        }
      });
    },
  },
};
</script>

<style></style>
