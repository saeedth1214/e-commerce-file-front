<template>
  <v-container>
    <v-toolbar color="inigo">
      <v-toolbar-title>داشبورد - فایل</v-toolbar-title>
    </v-toolbar>
    <v-spacer></v-spacer>
    <div>
      <ShowFile :file="file" />
    </div>
  </v-container>
</template>
<script>
export default {
  layout: "panel",
  async asyncData(context) {
    let params = {};
    params["include"] = "users,tags,attributes";
    const file = await context.$axios
      .get(`panel/files/${context.params.id}`, { params })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err, "err"));

    return { file };
  },
};
</script>

<style></style>
