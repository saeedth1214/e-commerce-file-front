<template>
  <v-app>
    <v-container>
      <v-card>
        <v-toolbar color="inigo">
          <v-toolbar-title>داشبورد - فایل</v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-container fluid mt-3>
          <v-layout row>
            <v-col cols="12">
              <ShowFile :file="file"/>
            </v-col>
          </v-layout>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  layout: "panel",
  async asyncData(context) {
    let params = {};
    params["include"] = "users,tags";
    const file = await context.$axios
      .get(`panel/files/${context.params.id}`, { params })
      .then(res => {
          return res.data.data;
      })
      .catch(err => console.log(err,'err'));

    return { file };
  },
};
</script>

<style>
</style>
