<template>
  <v-row dense>
    <v-container>
      <section style="margin-top: 4rem">
        <h4>بهترین فایل ها برای شما</h4>
        <div class="search">
          <v-text-field
            v-model="search"
            single-line
            outlined
            clearable
            append-icon="mdi-magnify"
            placeholder="جستجو"
            solo
            @keydown="searchByTitle"
          ></v-text-field>
        </div>
      </section>
    </v-container>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      search: null,
    };
  },

  methods: {
    async searchByTitle(event) {
      if (event.keyCode === 13) {
        this.$router.push({
          path: "/front/files",
          query: { searchByTitle: this.search },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
h4 {
  text-transform: capitalize;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

section {
  width: 80%;
  text-align: center;
  margin: 0px auto;
  margin-top: 2rem;
}

@media screen and(max-width:400px) {
  section {
    width: 95%;
  }
}
>>> .v-text-field__slot input {
  text-align: right;
  padding: 0px 0.5rem;
}
</style>
