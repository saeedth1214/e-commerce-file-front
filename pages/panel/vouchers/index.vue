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
              <Vouchers/>
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
        text: "کد تخفیف",
        disabled: false,
        href: "/panel/vouchers"
      }
    ]
  })
};
</script>

<style>
</style>
