<template>
  <v-row class="sticky sticky-search" style="border-bottom: 1px solid #d7d7d7">
    <section style="width: 95%" class="box">
      <div class="brand">
        <span>فایلیمو</span>
      </div>
      <TheFormSearchBox
        searchGroupStyle="border:1px solid #d7d7d7;"
        searchDropDownStyle="width:20% !important"
        dropDownStyle="border:1px solid #d7d7d7;box-shadow: 0 0 60px rgb(34 34 34 / 25%)"
        btnHeight="height:48px"
        searchValueStyle="width:80% !important"
        @searchBox="(query) => $emit('searchBoxAction', query)"
      />

      <div class="filter-btn">
        <v-btn color="#eff3f6" @click="$emit('showFilterBox')" shaped tile>
          <v-icon color="#374957">mdi-tune</v-icon>
        </v-btn>
      </div>
    </section>
  </v-row>
</template>
<script>
import TheFormSearchBox from "@/components/front/TheFormSearchBox";
export default {
  components: {
    TheFormSearchBox,
  },
};
</script>
<style lang="scss">
.box {
  height: 80px;
  display: flex;
  align-items: center;
}

.brand {
  margin-right: 1rem;
  span:nth-child(1) {
    font-size: 1.5rem;
    font-weight: 800;
    color: blue;
  }
}

@media screen and (max-width: 1096px) {
  .brand {
    display: none;
  }
}
</style>
