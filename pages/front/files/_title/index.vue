<template>
  <div>
    <TheFileInfo :file="file"/>
    <SnackBar color="orange darken-2" />
    <ScrollTop />
  </div>
</template>
<script>
export default {
  async asyncData(context) {
    // fetch file
    let fileValue = context.params.id ? context.params.id : context.params.title;
    let uri = encodeURI(`frontend/files/${fileValue}`);
    let file = await context.$axios
      .get(uri)
      .then((res) => {
        return res.data.data;
      });
    return { file };
  },
};
</script>

<style scoped></style>
