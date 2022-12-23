<template>
  <div
    class="filter-wrapper"
    :style="[showFilter ? { transform: 'translateX(0px)' } : '']"
  >
    <div class="filter">
      <p
        class="text-body-2 font-weight-bold d-flex justify-space-between align-center mt-4"
        style="color: #e37043; width: 100%"
      >
        دسته بندی
      </p>
      <div class="categories">
        <v-chip-group v-model="category" active-class="grey white--text">
          <v-chip
            :value="{ id: category.id, name: category.name }"
            v-for="category in categories"
            :key="category.id"
            >{{ category.name }}</v-chip
          >
          <v-btn icon color="grey" @click="redirectToCategory">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-chip-group>
      </div>
      <v-row dense class="pa-4 d-flex justify-center">
        <v-col cols="12">
          <div
            class="text-body-2 font-weight-bold d-flex justify-space-between align-center"
            style="color: #e37043"
          >
            <p>براساس قیمت</p>
            <!-- <p> -->
            <v-radio-group v-model="amountType">
              <v-radio label="نقدی" value="cash"></v-radio>
              <v-radio label="رایگان" value="free"></v-radio>
            </v-radio-group>
            <!-- </p> -->
          </div>
        </v-col>
        <v-row dense v-if="amountType === 'cash'">
          <v-col cols="12">
            <v-select
              v-model="amountValue"
              :items="amounts"
              item-text="value"
              return-object
              color="#e37043"
              label="محدوده ی قیمت"
            ></v-select>
          </v-col>
        </v-row>
        <v-row dense v-if="amountType === 'cash'">
          <v-col cols="12">
            <v-select
              v-model="rebateValue"
              :items="rebates"
              item-text="text"
              return-object
              color="#e37043"
              label="براساس تخفیف"
            ></v-select>
          </v-col>
        </v-row>
        <v-col cols="12">
          <v-chip-group active-class="primary--text" column>
            <v-chip
              v-for="(item, key) in filterItems"
              :key="key"
              @click="removeItem(key)"
            >
              {{ item.text }} : {{ item.value }}
              <v-icon>mdi-close</v-icon>
            </v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="setMyFilter">اعمال فیلتر</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import createFilter from "@/mixins/createFilter";
export default {
  data() {
    return {
      category: null,
    };
  },
  mixins: [createFilter],
  watch: {
    category(newVal) {
      if (newVal) {
        this.filterItems["category"] = {
          text: "دسته بندی",
          value: newVal.name,
        };
      } else {
        delete this.filterItems["category"];
      }
    },
  },
  props: {
    showFilter: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
  },
  methods: {
    removeItem(key) {
      if (key === "category") {
        delete this.filterItems[key];
        this.category = null;
      } else {
        this.removeFilter(key);
      }
    },

    redirectToCategory() {
      this.$router.push({
        path: "/front/categories",
      });
    },

    async setMyFilter() {
      this.category &&
        (this.params = this.createFilter(this.params, "category", {
          value: this.category.id,
        }));
      await this.applyfilter();
    },
  },
};
</script>

<style scoped lang="scss">
a {
  width: 180px;
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid #00bdfe;
}

a:hover {
  background-color: #00bdfe;
  color: #fff !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
}

.filter {
  position: relative;
  height: 450px;
  padding: 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}

.filter-wrapper {
  background: #fff;
  min-height: 100vh;
  transform: translateX(-340px);
  transition: all 0.3s linear;
  z-index: 0;
  position: sticky;
  top: 128px;
}
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  span {
    border: 1px solid rgb(184, 180, 180);
    padding: 0.2rem;
    border-radius: 5px;
    font-size: 0.8rem;
    cursor: pointer;
    &.active {
      background-color: grey;
      color: #fff;
    }
  }
}
</style>
