<template>
  <div>
    <Uploader :url="url" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: null,
    };
  },

  created() {
    this.url = process.env.dropzoneUrlFront + 'user/profile/change-avatar';
  },
};
</script>
<style lang=""></style>
