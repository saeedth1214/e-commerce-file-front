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
              <ShowUser />
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
    params["include"] = "activePlan,plans,files,vouchers";
    await context.$axios
      .get(`panel/users/${context.params.id}`, { params })
      .then((res) => {
        if (res.status === 200) {
          context.store.commit("user/setUser", res.data.data);
        }
      })
      .catch((err) => console.log(err.message));
  },
  data: () => ({
    items: [
      {
        text: "داشبورد",
        disabled: false,
        href: "/panel/dashboard",
      },
      {
        text: "کاربران",
        disabled: false,
        href: "/panel/users",
      },
    ],
  }),
};
</script>

<style></style>
