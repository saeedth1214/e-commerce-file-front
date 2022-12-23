<template>
  <div>
    <v-card flat max-width="400px" class="mx-auto pa-4">
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="changePassowrd" class="pa-4">
          <v-row dense>
            <v-col cols="12" sm="6" md="12">
              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required|min:6|max:64"
              >
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  label="رمز عبور"
                  v-model="user.password"
                  :error-messages="errors"
                  @click:append="show = !show"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <validation-provider
                v-slot="{ errors }"
                name="newPassword"
                rules="required|min:6|max:64"
              >
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  label="رمز عبور جدید"
                  v-model="user.newPassword"
                  :error-messages="errors"
                  @click:append="show = !show"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <validation-provider
                v-slot="{ errors }"
                name="password_confirmation"
                :rules="`required|min:6|max:64|confirm:${user.newPassword}`"
              >
                <v-text-field
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  label="تکرار رمزعبور"
                  v-model="user.newPassword_confirmation"
                  :error-messages="errors"
                  @click:append="show = !show"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row dense>
            <div class="mt-5">
              <v-btn class="mr-4" type="submit" :disabled="invalid"
                >ویرایش</v-btn
              >
            </div>
          </v-row>
        </form>
      </validation-observer>
    </v-card>
    <TheOverlay :overlay="overlay" />
    <v-snackbar v-model="snackbar" top color="warning" :timeout="3000">{{
      text
    }}</v-snackbar>
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  data() {
    return {
      show: false,
      overlay: false,
      snackbar: false,
      user: {
        password: null,
        newPassword: null,
        newPassword_confirmation: null,
      },
    };
  },

  computed: {
    text() {
      return this.$store.state.option.snackbar.text;
    },
  },
  mixins: [showMessage],
  methods: {
    async changePassowrd() {
      this.overlay = true;
      await this.$axios
        .post("/user/profile/change-password", { ...this.user })
        .then((res) => {
          this.showMessage("success", "رمز عبور شما تغییر پیدا کرد");
        })
        .catch(async (err) => {
          await this.$store.commit(
            "option/changeSnackbarText",
            "رمزعبور اشتباه است"
          );
          this.snackbar = true;
        });
      this.overlay = false;
    },
  },
};
</script>
<style lang=""></style>
