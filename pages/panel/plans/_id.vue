<template>
  <v-app>
    <v-container>
      <v-card>
        <v-toolbar color="inigo">
          <v-toolbar-title>داشبورد -طرح ها</v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-container fluid mt-3>
          <v-layout row>
            <v-col cols="12">
              <ShowPlan :plan="plan" />
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
    params["include"] = "comments.user";
    const plan = await context.$axios
      .get(`panel/plans/${context.params.id}`, { params })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => console.log(err));
    return { plan };
  },
};
</script>

<style></style>
