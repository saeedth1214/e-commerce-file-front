<template>
  <nav>
    <v-navigation-drawer
      v-model="temporaryDrawer"
      dark
      app
      right
      class="grey darken-3 py-0"
    >
      <v-container>
        <p class="brand" v-if="$vuetify.breakpoint.mdAndUp">
          <a href="/">Free picks</a>
        </p>
      </v-container>
      <v-list nav>
        <v-list-item router to="/panel/dashboard">
          <v-list-item-action>
            <v-icon small>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("dashboard") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/panel/categories">
          <v-list-item-action>
            <v-icon small>mdi-layers</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("category.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/panel/users">
          <v-list-item-action>
            <v-icon small>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("user.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/panel/comments">
          <v-list-item-action>
            <v-icon small>mdi-comment-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("comment.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/panel/plans">
          <v-list-item-action>
            <v-icon small>mdi-book-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("plan.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/panel/tags">
          <v-list-item-action>
            <v-icon small>mdi-tag-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("tag.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/panel/files">
          <v-list-item-action>
            <v-icon small>mdi-file-image</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("file.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/panel/vouchers">
          <v-list-item-action>
            <v-icon small>mdi-sale</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("voucher.link") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/panel/orders">
          <v-list-item-action>
            <v-icon small>mdi-receipt-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("orders.title") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router to="/panel/transactions">
          <v-list-item-action>
            <v-icon small>mdi-cash-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("transaction") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    interval: {},
    value: 0,
    temporaryDrawer: true,
  }),

  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },

  watch: {
    temporaryDrawer(newVal, oldVal) {
      if (this.drawer !== newVal) {
        this.$emit("changeDrawerState");
      }
    },
    drawer(newVal) {
      this.temporaryDrawer = newVal;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.v-progress-circular {
  margin: 1rem;
}
.brand {
  text-align: right;
  padding-right: 2rem;
  a {
    color: #a5b7c6;
    font-size: 1.2rem;
    font-weight: bolder;
    width: 100%;
    text-transform: capitalize;
    text-decoration: none;
  }
}
</style>
