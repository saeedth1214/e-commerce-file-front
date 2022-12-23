<template>
  <nav>
    <v-app-bar color="#23262D" dark app class="line" height="90px">
      <v-chip class="ma-2" color="grey darken-1" pill>
        Dashboard
        <v-icon rigth small color="cyan">mdi-chevron-down</v-icon>
      </v-chip>
      <v-chip class="ma-2" color="grey darken-1" pill>
        Dashboard
        <v-icon rigth small color="cyan">mdi-chevron-down</v-icon>
      </v-chip>
      <v-chip class="ma-2" color="grey darken-1" pill>
        Dashboard
        <v-icon rigth small color="cyan">mdi-chevron-down</v-icon>
      </v-chip>
      <v-chip class="ma-2" color="grey darken-1" pill>
        Dashboard
        <v-icon rigth small color="cyan">mdi-chevron-down</v-icon>
      </v-chip>
      <v-spacer></v-spacer>
      <v-text-field
        filled
        dense
        rounded
        label="search"
        prepend-inner-icon="mdi-magnify"
        class="mt-6 mr-2"
      ></v-text-field>
      <v-btn fab color="cyan" elevation="0">
        <v-icon color="white">mdi-account</v-icon>
      </v-btn>
      <v-btn fab color="orange" elevation="0">
        <v-icon color="white">mdi-view-headline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      right
      v-model="drawer"
      dark
      app
      mini-variant
      mini-variant-width="128"
      color="#232620"
      disable-resize-watcher
    >
      <v-list>
        <v-list-item-group color="cyan">
          <v-list-item class="mb-4">
            <v-list-item-content align="content">
              <v-icon align="center" x-large>mdi-monitor</v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-list-item-group v-model="selectedItem" color="cyan">
          <v-list-item v-for="(item,i) in items" :key="i">
            <v-list-item-content align="center">
              <v-icon v-text="item.icon" class="mb-3" align="center"></v-icon>
              <v-list-item-subtitle v-text="item.text" align="center" class="caption"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    selectedItem: 0,
    items: [
      { text: "Dashboard", icon: "mdi-view-dashboard" },
      { text: "Dashboard", icon: "mdi-view-dashboard" },
      { text: "Dashboard", icon: "mdi-view-dashboard" },
      { text: "Dashboard", icon: "mdi-view-dashboard" }
    ]
  })
};
</script>

<style>
</style>
