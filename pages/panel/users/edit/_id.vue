<template>
  <v-app>
    <v-container>
      <v-card class="pa-3">
        <v-toolbar color="inigo">
          <div>
            <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
          </div>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-container fluid mt-3>
          <v-layout row>
            <v-col cols="12">
              <UserEdit/>
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
  data: () => ({
    items: [
      {
        text: "داشبورد",
        disabled: false,
        href: "/panel/dashboard"
      },
      {
        text: "کاربران",
        disabled: false,
        href: "/panel/users"
      },
      {
        text: "نمایش اطلاعات",
        disabled: false,
        href: ""
      }
    ]
  }),
  created() {
    this.items[2].href = `/panel/users/${this.$route.params.id}`;
  }
};
</script>

<style>
</style>
