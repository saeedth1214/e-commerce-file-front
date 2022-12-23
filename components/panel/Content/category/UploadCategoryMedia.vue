<template>
  <v-dialog v-model="showMedia" persistent width="700px" class="text-center">
    <v-card style="background-color: #fff; padding: 0.5rem">
      <Uploader :url="url" @uploadSuccessfully="closeDialog">
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
      </Uploader>
      <v-btn class="mx-auto" width="100px" @click="closeDialog">انصراف</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showMedia: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeUploadMedia");
    },
  },
};
</script>

<style scoped lang="scss">
>>> .v-dialog {
  text-align: center;
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
