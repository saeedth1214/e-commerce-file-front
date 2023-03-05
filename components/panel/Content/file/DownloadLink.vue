<template>
  <div>
    <label class="label-format">لینک موقت با تاریخ انقضا : </label>
    <v-row>
      <v-col cols="12">
        <div class="expiration-date">
          <v-radio-group v-model="radioExpirationTime">
            <v-radio
              v-for="(item, Idx) in expirationTimes"
              :key="Idx"
              :value="Idx"
              color="green darkeb-2"
              :style="[
                Idx === radioExpirationTime
                  ? { 'border-color': 'green', background: 'rgb(22 40 28)' }
                  : '',
              ]"
            >
              <template #label>
                <label
                  class="text-subtitle-2"
                  :style="[
                    Idx === radioExpirationTime ? { color: '#fff' } : '',
                  ]"
                  >{{ item.label }}</label
                >
              </template>
            </v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn
          small
          color="text-subtitle-2 green darken-4 white--text"
          @click="generateLink"
          :disabled="radioExpirationTime ===null"
          >ایجاد</v-btn
        >
      </v-col>
    </v-row>
    <SnackBar />
  </div>
</template>
<script>
export default {
  data() {
    return {
      radioExpirationTime: null,
      expirationTimes: [
        {
          label: "1 ساعت",
          addSecounds: 3600,
        },
        {
          label: "6 ساعت",
          addSecounds: 21600,
        },
        {
          label: "1 روز",
          addSecounds: 86400,
        },
        {
          label: "3 روز",
          addSecounds: 259200,
        },
        {
          label: "7 روز",
          addSecounds: 604800,
        },
      ],
    };
  },

  props: {
    fileId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async generateLink() {
      let secounds = this.expirationTimes[this.radioExpirationTime].addSecounds;
      await this.$axios
        .patch(`panel/files/${this.fileId}/generate-download-link`, {
          expiration_time: secounds,
        })
        .then(async (res) => {
          await this.$store.commit("option/changeSnackbarMood", true);
          await this.$store.commit(
            "option/changeSnackbarColor",
            "green darken-1"
          );
          await this.$store.commit(
            "option/changeSnackbarText",
            " لینک دانلود ایجاد شد."
          );
        })
        .catch(async (err) => {
          if (err.response.status === 400) {
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarColor",
              "orange darken-2"
            );
            await this.$store.commit(
              "option/changeSnackbarText",
              "لطفا قبل از ایجاد لینک دانلود در قسمت آپلود فایل, فایل نمایشی رو وارد کنید "
            );
          }
        });
    },
  },
};
</script>
<style lang="scss">
.v-input--radio-group--column .v-input--radio-group__input {
  flex-direction: row !important;
  gap: 2rem;
}
.v-radio {
  align-items: center;
  display: flex;
  height: 45px;
  outline: none;
  width: 120px;
  border: 2px solid #d7d7d7;
  padding: 0.5rem;
  border-radius: 10px;
}
.expiration-date {
  padding: 0.5rem;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
</style>
