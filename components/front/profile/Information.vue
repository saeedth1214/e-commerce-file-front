<template>
  <div>
    <v-row dense v-if="!loading">
      <v-col cols="12" lg="3" sm="3" md="3">
        <v-card :loading="infoLoading">
          <div class="avatar-box">
            <v-avatar
              size="60"
              style="cursor: pointer"
              color="primary"
              @click="handleFileImport"
            >
              <v-img
                :src="$auth.user && $auth.user.media_url"
                v-if="$auth.user && $auth.user.media_url"
              ></v-img>
              <v-icon dark color="#fff" v-else>mdi-account-circle</v-icon>
            </v-avatar>
            <v-btn color="primary" small dark @click="uploadFile">
              ویرایش
            </v-btn>
            <div class="fileName" v-if="file">{{ file.name }}</div>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              @change="onFileChanged"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" lg="9" sm="9" md="9">
        <v-card :loading="avatarLoading">
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
                        color="primary"
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
        </v-card>
      </v-col>
    </v-row>
    <v-sheet color="grey lighten-4" class="pa-3" v-else>
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <SnakBar />
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";

export default {
  data: () => ({
    profile: {
      first_name: null,
      last_name: null,
      email: null,
      mobile: null,
    },
    isSelecting: false,
    file: null,
    avatarLoading: false,
    infoLoading: false,
    loading: false,
    // 500 kb
    maxSize: 500000,
    types: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  }),
  mixins: [showMessage],

  props: {
    user: {
      type: Object,
      required: false,
    },
  },

  methods: {
    async updateInformation() {
      this.infoLoading = true;
      let updatedProfile = {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
      };

      await this.$axios.put("user/profile", updatedProfile).then((res) => {
        this.showMessage("success", ".اطلاعات شما تغییر پیدا کرد");
      });
      this.infoLoading = false;
    },
    onFileChanged(e) {
      if (e.target.files[0] !== undefined) {
        this.file = e.target.files[0];
      }
    },
    handleFileImport() {
      this.isSelecting = true;
      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },

    uploadFile() {
      if (!this.file) {
        return;
      }
      this.avatarLoading = true;
      if (this.file.size > this.maxSize) {
        alert("The file size should not be more than 500kb.");
        return;
      }
      if (!this.types.includes(this.file.type)) {
        alert("The file must have one of the [jpeg,jpg,png,webp] formats");
        return;
      }

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      let formData = new FormData();
      formData.append("file", this.file);

      this.$axios
        .post("user/profile/change-avatar", formData, config)
        .then(async (res) => {
          if (res.status === 204) {
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarColor",
              "green darken-1"
            );
            await this.$store.commit(
              "option/changeSnackbarText",
              " عکس پروفایل شما ویرایش شد."
            );
          }
        });

      this.avatarLoading = false;
    },
  },
  created() {
    this.loading = true;
    this.profile = Object.assign({}, { ...this.user });
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.avatar-box {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  .fileName {
    width: 100%;
    font-size: 0.8rem;
    color: #100e0e;
    text-align: center;
  }
}
</style>
