<template>
  <div>
    <v-card elevation="4">
      <v-card-title> ایجاد لینک دانلود</v-card-title>
      <v-card-text>
        <div class="expiration-date">
          <div class="item">
            <label class="black--text ml-4" style="font-size: 1rem">
              روز :</label
            >
            <v-text-field
              v-model="day"
              type="number"
              :rules="rules.ruleOfDay"
              solo
              style="width: 200px"
            ></v-text-field>
          </div>
          <div class="item">
            <label class="black--text ml-4" style="font-size: 1rem">
              ساعت :
            </label>
            <v-text-field
              v-model="hour"
              :rules="rules.ruleOfHour"
              type="number"
              solo
            ></v-text-field>
          </div>
          <div class="item">
            <label class="black--text ml-4" style="font-size: 1rem">
              دقیقه :
            </label>
            <v-text-field
              v-model="minute"
              :rules="rules.ruleOfMinute"
              type="number"
              solo
            ></v-text-field>
          </div>
        </div>
        <v-row>
          <v-col cols="12" md="6" sm="6" lg="4">
            <div style="padding: 0.5rem">
              <label for="" class="black--text ml-4" style="font-size: 1rem">
                اعتبار تا تاریخ : {{ expiration_date }}</label
              >
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="6" lg="4">
            <v-btn
              color="primary"
              size="20"
              :disabled="!valid"
              @click="generateLink"
            >
              ایجاد
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <SnackBar />
  </div>
</template>
<script>
export default {
  data() {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      valid: true,
      rules: {
        ruleOfDay: [
          (value) => {
            if (!(value >= 0 && value <= 7)) {
              this.valid = false;
              return "لطفا یک مقدار معتبر وارد کنید.";
            }
            this.valid = true;
            return this.valid;
          },
        ],
        ruleOfMinute: [
          (value) => {
            if (!(value >= 0 && value <= 59)) {
              this.valid = false;
              return "لطفا یک مقدار معتبر وارد کنید.";
            }
            this.valid = true;
            return this.valid;
          },
        ],
        ruleOfHour: [
          (value) => {
            if (!(value >= 0 && value <= 23)) {
              this.valid = false;
              return "لطفا یک مقدار معتبر وارد کنید.";
            }
            this.valid = true;
            return this.valid;
          },
        ],
      },
    };
  },

  props: {
    fileId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    dayToSecounds() {
      return this.day * 24 * 60 * 60;
    },
    hourToSecounds() {
      return this.hour * 60 * 60;
    },
    minuteToSecounds() {
      return this.minute * 60;
    },
    expiration_seconds() {
      return this.dayToSecounds + this.hourToSecounds + this.minuteToSecounds;
    },
    expiration_date() {
      var t = new Date();
      return this.valid
        ? this.$moment(t)
            .add(this.expiration_seconds, "seconds")
            .format("H:mm jDD/jMM/jYYYY")
        : "-";
    },
  },
  methods: {
    async generateLink() {
      await this.$axios
        .patch(`panel/files/${this.fileId}/generate-download-link`, {
          expiration_time: this.expiration_seconds,
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
.expiration-date {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  column-gap: 20px;

  .item {
    display: flex;
    label {
      width: 60px;
    }
  }
}
</style>
