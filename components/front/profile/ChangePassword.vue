<template>
  <div>
    <v-card flat max-width="400px" class="mx-auto pa-4" v-if="!loading">
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
    <v-sheet color="grey lighten-4" class="pa-3" v-else>
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <SnackBar />
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  data() {
    return {
      show: false,
      loading: false,
      snackbar: false,
      user: {
        password: null,
        newPassword: null,
        newPassword_confirmation: null,
      },
    };
  },

  mixins: [showMessage],
  methods: {
    async changePassowrd() {
      this.loading = true;
      await this.$axios
        .post("/user/profile/change-password", { ...this.user })
        .then((res) => {
          this.showMessage("success", "رمز عبور شما تغییر پیدا کرد");
          this.user = {
            password: null,
            newPassword: null,
            newPassword_confirmation: null,
          };
        })
        .catch(async (err) => {
          await this.$store.commit("option/changeSnackbarMood", true);
          await this.$store.commit(
            "option/changeSnackbarText",
            "رمزعبور اشتباه است"
          );
          await this.$store.commit(
            "option/changeSnackbarColor",
            "orange darken-2"
          );
        });
      this.loading = false;
    },
  },
};
</script>
<style lang=""></style>
