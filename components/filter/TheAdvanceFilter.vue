<template>
  <div class="filter-file">
    <v-row>
      <v-col cols="12" sm="3" md="3" lg="3">
        <div class="orderBy">مرتب سازی بر اساس :</div>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6">
        <v-btn-toggle
          v-model="select_button"
          background-color="transparent"
          active-class="active"
          borderless
          dense
        >
          <v-btn color="black" text @click="orderBy('-created_at')">
            جدید ترین
          </v-btn>
          <v-btn color="black" text @click="orderBy('mostPopular')">
            محبوب ترین
          </v-btn>
          <v-btn color="black" text @click="orderBy('amount')">
            ارزان ترین
          </v-btn>
          <v-btn color="black" text @click="orderBy('-amount')">
            گرون ترین
          </v-btn>
          <v-btn color="black" text @click="orderBy('bestSelling')">
            پرفروش ترین
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12" sm="3" md="3" lg="3">
        <input
          type="text"
          class="searchby"
          placeholder="search"
          v-model="search"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select_button: null,
      search: null,
      filterTitle: null,
    };
  },
  watch: {
    search() {
      clearTimeout(this.filterTitle);
      this.filterTitle = setTimeout(() => this.searchbyTitle(), 2000);
    },
  },
  methods: {
    orderBy(sortBy) {
      this.$emit("orderBy", sortBy);
    },
    searchbyTitle() {
      this.$emit("searchByTitle", this.search);
    },
  },
};
</script>

<style scoped lang="scss">
.filter-file {
  padding: 1rem;
  background: #d7d7d7;
  border-radius: 0.5rem;

  .best {
    list-style: none;
    display: flex;
    gap: 0.2rem;
  }
}

.active {
  color: #fff !important;
  background-color: #d92388 !important;
}

.searchby {
  padding: 0.5rem;
  border: 1px solid #fff;
  border-radius: 5px;
  font-size: 0.8rem;
  text-align: end !important;
  width: 90%;
  background: linear-gradient(45deg, #ededed, #fdf6f68f);
  &:focus {
    border: 1px solid rgb(78, 105, 255);
  }
}
</style>
