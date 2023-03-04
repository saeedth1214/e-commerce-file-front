<template>
  <client-only>
    <div>
      <label class="label-format"> آپلود فایل</label>
      <dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="afterSuccessUpload"
        @vdropzone-max-files-exceeded="maxFileExceeded"
        @vdropzone-error="errorUploadFile"
      >
        <div class="dropzone-custom-content" style="font-family: vazir">
          <h3 class="dropzone-custom-title">
            لطفا فایل انتخابی را اینجا رها کنید .
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-card-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path
                d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"
              />
            </svg>
          </h3>
        </div>
        <div class="subtitle" style="font-family: vazir">
          یا از سیستم خود انتخاب کنید.
        </div>
      </dropzone>
      <v-row dense>
        <div class="mx-auto ma-2">
          <v-btn
            class="ma-2 white--text"
            color="primary"
            @click.stop="uploadImage"
          >
            آپلود
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </div>
      </v-row>
    </div>
  </client-only>
</template>

<script>
import Dropzone from "nuxt-dropzone";
import showMessage from "@/mixins/showMessage";
export default {
  data: () => ({
    dropzoneOptions: {
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      parallelUploads: 1,
      maxFiles: 1,
      uploadMultiple: false,
      acceptedFiles: "image/*",
      addRemoveLinks: true,
      autoProcessQueue: false,
    },
    loading: false,
    loader: null,
  }),

  props: {
    url: {
      type: String,
      required: true,
    },
  },

  created() {
    this.dropzoneOptions["url"] = this.url;
    this.dropzoneOptions["headers"] = {
      Authorization: this.$auth.strategy.token.get(),
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  mixins: [showMessage],
  methods: {
    async uploadImage() {
      await this.$refs.myVueDropzone.processQueue();
    },
    async afterSuccessUpload(file, response) {
      if (file.status == "success" && file.accepted) {
        await this.showMessage("success", "تصویر با موفقیت آپلود شد");
        this.$emit("uploadSuccessfully");
      }
    },

    async maxFileExceeded(file) {
      this.$refs.myVueDropzone.removeFile(file);
    },

    async errorUploadFile(file, message, xhr) {
      alert(message);
    },
  },

  components: {
    Dropzone,
  },
};
</script>

<style lang="scss">
@import "nuxt-dropzone/dropzone.css";
.label-format {
  color: #443f3f;
  font-size: 1rem;
  font-weight: 700;
  display: block;
  margin-bottom: 1.5rem;
}
.v-card > div {
  width: 95%;
  margin: 0px auto;
  padding: 0.5rem;
}
.dropzone-custom-title {
  font-size: 14px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.subtitle {
  font-size: 12px;
}
</style>
