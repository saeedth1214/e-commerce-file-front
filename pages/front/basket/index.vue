<template>
  <div>
    <v-row dense v-if="loading">
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
    <v-container class="mt-10" v-else>
      <div class="grid-container">
        <v-card
          elevation="4"
          class="item"
          v-for="(item, Idx) in cartItems"
          :key="Idx"
        >
          <v-card-title>
            <v-img
              height="100px"
              width="100px"
              class="rounded"
              :src="item.media_url"
              style="position: absolute; right: 30%"
            >
              <template #placeholder>
                <v-row class="fill-height" justify="center" align="center">
                  <v-progress-circular
                    width="2"
                    size="50"
                    color="primary"
                    indeterminate
                    style="left: 0px; top: 23px"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-btn
              @click="removeFromBasket(item.type, item.id)"
              icon
              class="close"
              color="pink"
              style="
                position: relative;
                right: 95%;
                top: -30px;
                background: #00006a;
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pt-8">
            <v-row dense class="pt-4">
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth indigo--text darken-1"
                    style="width: 70%"
                  >
                    عنوان :
                  </p>
                  <p
                    class="text-body-2 blue--text accent-1 font-weight-bold text-left"
                    style="width: 70%"
                  >
                    {{ item.title }}
                  </p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth indigo--text darken-1"
                    style="width: 70%"
                  >
                    تخفیف :
                  </p>
                  <p
                    class="text-body-2 font-weight-bold text-left blue--text accent-1"
                    style="width: 70%"
                    v-if="item.rebate > 0"
                  >
                    <span v-if="item.percentage">{{ item.rebate }} درصد</span>

                    <span v-else>
                      {{ $formatMoney(item.rebate) + "هزار تومان" }}
                    </span>
                  </p>
                  <p
                    class="text-body-2 font-weight-bold text-left blue--text accent-1"
                    style="width: 70%"
                    v-else
                  >
                    ندارد
                  </p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth indigo--text darken-1"
                    style="width: 70%"
                  >
                    قیمت :
                  </p>
                  <p
                    class="text-body-2 font-weight-bold text-left blue--text accent-1"
                    style="width: 70%"
                  >
                    {{ $formatMoney(item.amount) }} تومان
                  </p>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-around">
                  <p
                    class="text-body-2 font-weight-bold text-rigth indigo--text darken-1"
                    style="width: 70%"
                  >
                    قیمت نهایی :
                  </p>
                  <p
                    class="text-body-2 font-weight-bold text-left blue--text accent-1"
                    style="width: 70%"
                  >
                    {{ $formatMoney(item.amount_after_rebate) }} تومان
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

      <v-row v-if="cartItems.length">
        <v-card evelation="4" style="width: 100%; padding: 1rem">
          <v-row dense>
            <v-col cols="12" md="4" sm="6">
              <div class="d-flex justify-center">
                <v-text-field
                  label="کد تخفیف"
                  v-model.trim="rebate_code"
                  outlined
                  dense
                  clearable
                  :rules="rules"
                ></v-text-field>
                <v-btn
                  width="40%"
                  class="mr-3"
                  depressed
                  color="primary"
                  @click="applyVoucher"
                  :loading="loading"
                  >اعمال کد تخفیف</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" md="4" sm="6" class="text-center">
              <span
                class="text-h6 text-sm-body-2 font-weight-bold indigo--text darken-2"
                >قیمت نهایی :</span
              >
              <span
                class="text-h6 text-sm-body-2 indigo--text darken-3 font-weight-bold"
                :class="{ 'text-decoration-line-through': applyVoucherFlag }"
                >{{
                  total > 0 ? $formatMoney(total) + "هزار تومان" : "رایگان"
                }}</span
              >
              <span
                v-if="applyVoucherFlag"
                class="text-h6 text-sm-body-2 red--text darken-3 font-weight-bold"
                >{{
                  $formatMoney($applyVoucher(total, voucher)) + "هزار تومان"
                }}</span
              >
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
              offset-sm="3"
              offset-md="0"
              class="text-center"
            >
              <v-btn
                width="35%"
                class="mr-3"
                depressed
                color="primary"
                @click="finalPurches"
                :loading="finalBtnLoading"
                >خرید نهایی</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-row>
      <v-card v-if="!cartItems.length" class="pa-4">
        <p class="text-center">سبد خرید شما خالیست</p>
      </v-card>
      <div style="height: 300px; width: 100%"></div>
      <SnackBar />
    </v-container>
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    cartItems: [],
    rebate_code: null,
    loading: false,
    finalBtnLoading: false,
    voucher: {},
    applyVoucherFlag: false,
    loading: false,
    rules: [(value) => !!value || "" || "مقدار ورودی الزامیست"],
  }),
  mixins: [showMessage],
  computed: {
    total() {
      return this.$store.state.option.total_amount;
    },
  },
  async mounted() {
    this.loading = true;
    this.cartItems =
      (await this.$cookies.get("cart", { parseJSON: true })) || [];
    await this.$store.dispatch("option/set_total_amount_basket");
    this.loading = false;
  },
  methods: {
    async finalPurches() {
      this.finalBtnLoading = true;
      let order = {};
      let files = [];
      this.voucher.id && (order["voucher_id"] = this.voucher.id);
      let index = this.cartItems.findIndex((item) => item.type === "plan");
      if (index > -1) {
        order["plan_id"] = this.cartItems[index].id;
      }
      this.cartItems.map((item) => {
        if (item.type === "file") {
          files.push(item.id);
        }
      });

      if (files.length > 0) {
        order["files"] = files;
      }

      await this.$axios
        .post("panel/orders", { ...order })
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", "سفارش شما ثبت شد");
            this.$router.push("/front/profile");
          }
        })
        .catch((err) => console.log(err));
      this.finalBtnLoading = false;
    },
    async applyVoucher() {
      this.loading = true;
      await this.$axios
        .post("/panel/vouchers/apply-voucher", { code: this.rebate_code })
        .then((res) => {
          this.voucher = {
            id: res.data.data.id,
            percentage: res.data.data.percentage,
            rebate: res.data.data.rebate,
          };
          this.applyVoucherFlag = true;
          this.showMessage("success", "کد تخفیف اعمال شد");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.showMessage("warning", err.response.data.message);
          }
          if (err.response.status === 422) {
            this.showMessage("warning", ".لطفا کد تایید معتبری را وارد کنید");
          }
        });
      this.rebate_code = null;
      this.loading = false;
    },
    async removeFromBasket(type, pId) {
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
          let productIndex = this.cartItems.findIndex((item) => {
            return item.type === type && item.id === pId;
          });
          this.cartItems.splice(productIndex, 1);
          // if (productIndex > 0) {
          // } else {
          //   this.cartItems.shift();
          // }
          await this.$cookies.set("cart", JSON.stringify(this.cartItems), {
            path: "/",
            maxAge: process.env.CART_MAX_AGE,
          });
          await this.$store.commit("option/setBasketItems");
          await this.$store.dispatch("option/set_total_amount_basket");
          this.$swal("آیتم انتخابی حذف شد", {
            icon: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
>>> .v-input {
  flex: 0 1 auto !important;
  width: 45%;
}

.close {
  opacity: 0;
  transition: all 0.5s linear;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 20px;
  margin-bottom: 2rem;
}
.item {
  cursor: pointer;
  &:hover {
    .close {
      opacity: 1;
    }
  }
}
</style>
