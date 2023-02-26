<template>
  <div>
    <label class="label-format"> ایجاد لینک دانلود</label>
    <v-row>
      <v-col cols="12" lg="3" md="3">
        <div class="format-file-box">
          <label class="label-format">فرمت فایل : </label>
          <select
            name="file-format"
            class="file-format"
            v-model="fileFormatValue"
          >
            <option value="1">eps</option>
            <option value="2">Al</option>
            <option value="3">jpg</option>
            <option value="4">png</option>
            <option value="5">jpeg</option>
            <option value="6">psd</option>
          </select>
        </div>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <div class="expiration-date">
          <div class="item">
            <label class="black--text ml-4" style="font-size: 1rem">
              : روز
            </label>
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
              : ساعت
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
              : دقیقه
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
          <v-col cols="12" md="6" lg="6">
            <div style="padding: 0.5rem">
              <label
                for=""
                class="black--text ml-4 label-format"
                style="font-size: 1rem"
              >
                اعتبار تا تاریخ : {{ expiration_date }}</label
              >
            </div>
          </v-col>
          <v-col cols="12" md="6" lg="6">
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
      </v-col>
    </v-row>
    <SnackBar />
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileFormatValue: 1,
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
            .format("jYYYY/jMM/jDD H:mm")
        : "-";
    },
  },
  methods: {
    async generateLink() {
      await this.$axios
        .patch(`panel/files/${this.fileId}/generate-download-link`, {
          expiration_time: this.expiration_seconds,
          format: this.fileFormatValue,
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
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  column-gap: 20px;
  margin-top: 1.5rem;
  direction: ltr;

  .item {
    display: flex;
    flex-direction: row-reverse;
    label {
      width: 70px;
      color: #443f3f;
      font-size: 1rem;
      font-weight: 700;
    }
  }
}

.file-format {
  width: 150px;
  padding: 0.5rem;
  border: 1px solid #d3d2d2;
  border-radius: 5px;
}
.label-format {
  color: #443f3f;
  font-size: 1rem;
  font-weight: 700;
  display: block;
  margin-bottom: 1.5rem;
}

.format-file-box {
  width: 100%;
}

@media screen and (max-width: 960px) {
  .format-file-box {
    display: flex;
    gap: 5px;
    align-items: baseline;
  }

  .file-format {
    width: 80% !important;
  }
}

@media screen and (min-width: 505px) and (max-width: 960px) {
  .file-format {
    width: 75% !important;
  }
}
@media screen and (max-width: 505px) {
  .file-format {
    width: 68% !important;
  }
}
</style>
