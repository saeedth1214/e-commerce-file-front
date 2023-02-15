<template>
  <div>
    <Show :file="file" />
    <SnackBar color="orange darken-2" />
    <ScrollTop />
  </div>
</template>
<script>
export default {
  async asyncData(context) {
    let fileValue = context.params.id
      ? context.params.id
      : context.params.title;
    let parameters = {};
    parameters["include"] = "attributes,tags";
    let uri = encodeURI(`frontend/files/${fileValue}`);
    let file = await context.$axios
      .get(uri, { params: parameters })
      .then((res) => {
        return res.data.data;
      });
    return { file };
  },
};
</script>

<style scoped></style>
