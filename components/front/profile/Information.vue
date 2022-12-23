<template>
  <div>
    <v-card width="100%">
      <v-row dense>
        <v-col cols="12" md="6" sm="6">
          <v-card-text>
            <div>اطلاعات کلی</div>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <p class="d-flex justify-space-between" style="width: 100%">
              <span>نام :</span>
              <span>{{ user.first_name ? user.first_name : "ثبت نشده" }}</span>
            </p>
          </v-card-actions>
          <v-card-actions>
            <p class="d-flex justify-space-between" style="width: 100%">
              <span>نام خانوادگی :</span>
              <span>{{ user.last_name ? user.last_name : "ثبت نشده" }}</span>
            </p>
          </v-card-actions>
          <v-card-actions>
            <p class="d-flex justify-space-between" style="width: 100%">
              <span>تلفن همراه :</span>
              <span>{{ user.mobile ? user.mobile : "ثبت نشده" }}</span>
            </p>
          </v-card-actions>
          <v-card-actions>
            <p class="d-flex justify-space-between" style="width: 100%">
              <span>ایمیل :</span>
              <span>{{ user.email ? user.email : "ثبت نشده" }}</span>
            </p>
          </v-card-actions>
          <v-card-actions>
            <p class="d-flex justify-space-between" style="width: 100%">
              <span>نقش کاربری :</span>
              <span>{{ user.role }}</span>
            </p>
          </v-card-actions>
          <v-card-actions>
            <p class="d-flex justify-space-between" style="width: 100%">
              <span>تاریخ عضویت :</span>
              <span>{{ user.created_at }}</span>
            </p>
          </v-card-actions>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card-text>
            <div>ویرایش اطلاعات</div>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <validation-observer v-slot="{ invalid }" style="width: 100%">
              <v-form>
                <validation-provider
                  v-slot="{ errors }"
                  name="profile_firstName"
                  rules="required|min:3|max:64"
                >
                  <v-text-field
                    v-model="profile.first_name"
                    :label="$t('profile.firstName')"
                    type="text"
                    :error-messages="errors"
                    prepend-icon="mdi-account"
                    color="teal accent-3"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="profile_lastName"
                  rules="required|min:3|max:64"
                >
                  <v-text-field
                    v-model="profile.last_name"
                    :label="$t('profile.lastName')"
                    type="text"
                    prepend-icon="mdi-account-edit"
                    color="teal accent-3"
                    :error-messages="errors"
                  />
                </validation-provider>
                <v-text-field
                  :label="$t('auth.email')"
                  v-model="profile.email"
                  prepend-icon="mdi-email"
                  color="teal accent-3"
                  readonly
                />
                <v-text-field
                  v-model="profile.mobile"
                  :label="$t('profile.mobile')"
                  prepend-icon="mdi-phone"
                  color="teal accent-3"
                  readonly
                />
                <v-row dense>
                  <v-col cols="12">
                    <div class="text-center mt-5">
                      <v-btn
                        rounded
                        color="indigo darken-4"
                        type="submit"
                        :disabled="invalid"
                        class="mb-6 white--text"
                        @click="updateInformation"
                        >ویرایش</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <TheOverlay :overlay="overlay" />
  </div>
</template>

<script>
export default {
  data: () => ({
    profile: {
      first_name: null,
      last_name: null,
      email: null,
      mobile: null,
    },
    overlay: false,
  }),

  props:{
    user:{
      type:Object,
      required:false
    }
  },

  methods: {
    async updateInformation() {
      this.overlay = true;
      let updatedProfile = {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
      };

      await this.$axios
        .put("user/profile", updatedProfile)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.overlay = false;
    },
  },
  created() {
    this.profile = Object.assign({}, { ...this.user });
  },
};
</script>

<style></style>
