<template>
  <div class="ma-4 pa-4">
    <v-row dense>
      <v-col cols="12" sm="6" md="6" offset-md="3" offset-sm="3">
        <InfiniteScroll
          :url="url"
          label="code"
          @selectedValue="setVoucherIds"
          :itemId="selectedVoucherIds"
          title="voucher"
          :multiple="true"
        />
      </v-col>
    </v-row>
    <validation-observer v-slot="{ invalid }">
      <form @submit.prevent="save">
        <v-row
          dense
          v-for="(voucher, index) in temporaryVouchers"
          :key="index"
          class="ma-4"
        >
          <v-col
            cols="12"
            sm="2"
            md="2"
            class="d-flex justify-center align-center"
          >
            {{ voucher.code }}
          </v-col>
          <v-col cols="12" sm="8" md="8" class="text-center">
            <v-row class="align-baseline">
              <v-col cols="12" sm="3" md="3">
                <v-subheader>تعداد دفعات قابل استفاده</v-subheader>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-text-field
                  type="number"
                  min="0"
                  max="1000"
                  v-model="voucher.authorize_use"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <v-subheader>تعداد دفعات استفاده شده</v-subheader>
              </v-col>
              <v-col cols="12" sm="3" md="3">
                <validation-provider
                  :vid="`'attribute'+ ${index}`"
                  v-slot="{ errors }"
                  name="times_use"
                  :rules="'required|maxTimes:' + `${voucher.authorize_use}`"
                >
                  <v-text-field
                    type="number"
                    min="0"
                    max="1000"
                    :error-messages="errors"
                    v-model="voucher.times_use"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense class="ma-3">
          <v-btn type="submit" color="primary" :disabled="invalid"> ثبت </v-btn>
        </v-row>
      </form>
    </validation-observer>
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  data() {
    return {
      vouchersIds: [],
      temporaryVouchers: [],
      selectedVoucherIds: [],
      number_authorize_use: null,
    };
  },
  mixins: [showMessage],

  props: {
    url: {
      type: String,
      required: true,
    },
    vouchers: {
      type: Array,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    async save() {
      await this.$axios
        .post(`panel/users/${this.userId}/assign-vouchers`, {
          vouchers: this.temporaryVouchers,
        })
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", "تغییرات با موفقیت انجام شد");
            this.$router.push("/panel/users");
          }
        })
        .catch((err) => console.log(err));
    },
    setVoucherIds(ids) {
      this.selectedVoucherIds = ids;
      let differenceVouchers = [];

      if (this.selectedVoucherIds.length > this.vouchersIds.length) {
        differenceVouchers = _.difference(
          this.selectedVoucherIds,
          this.vouchersIds
        );
        this.addNewVoucher(differenceVouchers[0]);
      } else {
        differenceVouchers = _.difference(
          this.vouchersIds,
          this.selectedVoucherIds
        );
        this.removeVoucherItem(differenceVouchers[0]);
      }
    },

    async removeVoucherItem(removeId) {
      this.overlay = true;
      this.temporaryVouchers = this.temporaryVouchers.filter(
        (voucher) => voucher.id !== removeId
      );
      const index = this.vouchersIds.indexOf(removeId);
      this.vouchersIds.splice(index, 1);
    },

    async addNewVoucher(addId) {
      const index = this.vouchers.findIndex((item) => item.id === addId);

      if (index > -1) {
        this.temporaryVouchers.push({
          ...this.vouchers[index],
        });
        this.vouchersIds.push(addId);
        return;
      }
      await this.$axios
        .get(`panel/vouchers/${addId}`)
        .then((res) => {
          this.temporaryVouchers = [
            ...this.temporaryVouchers,
            {
              id: res.data.data.id,
              code: res.data.data.code,
              authorize_use: 0,
              times_use: 0,
            },
          ];
          this.vouchersIds.push(addId);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.vouchers.map((voucher) => {
      this.vouchersIds.push(voucher.id);
      this.selectedVoucherIds.push(voucher.id);
    });
    this.temporaryVouchers = [...this.vouchers];
  },
};
</script>
<style lang=""></style>
