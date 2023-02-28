<template>
  <v-app>
    <v-container>
      <v-card>
        <v-toolbar color="inigo">
          <div>
            <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
          </div>
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

  data() {
    return {
      items: [
      {
        text: "داشبورد",
        disabled: false,
        href: "/panel/dashboard",
      },
      {
        text: "ویرایش طرح",
        disabled: false,
        href: "/panel/plans",
      },
    ],
    }
  },
  async asyncData(context) {
    const plan = await context.$axios
      .get(`panel/plans/${context.params.id}`)
      .then((res) => {
        return res.data.data;
      });
    return { plan };
  },
};
</script>

<style></style>
