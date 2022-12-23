<template>
  <v-app>
    <v-main>
      <TheHeader @drawerChangeState="drawer=!drawer"/>
      <TheSidebar :drawer="drawer" @changeDrawerState="drawer=!drawer"/>
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true
  }),
  middleware(context) {
    if (!context.$auth.loggedIn || context.$auth.user.role_id !== 1) {
      context.redirect("/");
    }
  }
};
</script>

<style scope>
</style>
