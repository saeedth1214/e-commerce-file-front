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
        <TheComment :comment="comment" />
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  layout: "panel",
  components: {},
  data: () => ({
    items: [
      {
        text: "داشبورد",
        disabled: false,
        href: "/panel/dashboard",
      },
      {
        text: "نظرات",
        disabled: false,
        href: "/panel/comments",
      },
    ],
  }),

  async asyncData(context) {
    let params = {};
    params["include"] = "user,model";
    const comment = await context.$axios
      .get(`/panel/comments/${context.route.params.id}`, { params })
      .then((res) => {
          return res.data.data;
      })
      .catch((err) => {
        if (err.response.status === 404) {
          context.redirect("/panel/comments");
        }
      });
    return { comment };
  },
};
</script>

<style></style>
