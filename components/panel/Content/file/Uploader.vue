<template>
  <div>
    <dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-success="afterSuccessUpload"
      @vdropzone-max-files-exceeded="maxFileExceeded"
      @vdropzone-error="errorUploadFile"
    >
      <slot></slot>
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
    <!-- </v-form> -->
  </div>
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
      // alert(message);
      console.log(message);
    },
  },

  components: {
    Dropzone,
  },
};
</script>

<style scoped>
.v-card > div {
  width: 95%;
  margin: 0px auto;
  padding: 0.5rem;
}
</style>
