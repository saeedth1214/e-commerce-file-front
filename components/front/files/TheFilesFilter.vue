<template>
  <div class="filter-wrapper">
    <ul class="filter-list">
      <li v-if="$vuetify.breakpoint.mdAndDown" style="align-items: end">
        <v-icon @click="$emit('showFilterBox')">mdi-close</v-icon>
      </li>
      <li class="filter-item" @click="openContent">
        <div class="item-label">
          <span>
            <v-icon small>mdi-layers</v-icon>
            دسته بندی
          </span>
          <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
        </div>
        <div class="content">
          <v-chip-group
            active-class="blue accent-2 white--text"
            v-model="category"
          >
            <v-chip value="1">وکتور</v-chip>
            <v-chip value="2">بک گراند</v-chip>
            <v-chip value="3">طبیعت</v-chip>
            <v-chip value="4">ورزشی</v-chip>
          </v-chip-group>
        </div>
      </li>
      <li class="filter-item" @click="openContent">
        <div class="item-label">
          <span>
            <v-icon small>mdi-cash</v-icon>
            نقدی</span
          >
          <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
        </div>
        <div class="content">
          <v-chip-group
            active-class="blue accent-2 white--text"
            v-model="amount"
          >
            <v-chip value="cash">نقدی</v-chip>
            <v-chip value="free">رایگان</v-chip>
          </v-chip-group>
        </div>
      </li>
      <li class="filter-item" @click="openContent">
        <div class="item-label">
          <span>
            <v-icon small>mdi-sale</v-icon>
            تخفیف</span
          >
          <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
        </div>
        <div class="content">
          <v-chip-group
            active-class="blue accent-2 white--text"
            v-model="discount"
          >
            <v-chip value="1">بدون تخفیف</v-chip>
            <v-chip value="2">تخفیف دار</v-chip>
          </v-chip-group>
        </div>
      </li>
      <li class="filter-item" @click="openContent">
        <div class="item-label">
          <span>
            <v-icon small>mdi-file</v-icon>
            فرمت</span
          >
          <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
        </div>
        <div class="content">
          <v-chip-group
            active-class="blue accent-2 white--text"
            v-model="format"
          >
            <v-chip value="1">PNG</v-chip>
            <v-chip value="2">JPG</v-chip>
            <v-chip value="3">JPEG</v-chip>
            <v-chip value="4">AL</v-chip>
            <v-chip value="5">EPS</v-chip>
            <v-chip value="6">PSD</v-chip>
          </v-chip-group>
        </div>
      </li>
      <li class="filter-item" @click="openContent">
        <div class="item-label">
          <span>
            <v-icon small>mdi-calendar-range</v-icon>
            تاریخ انتشار</span
          >
          <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
        </div>
        <div class="content">
          <v-chip-group
            active-class="blue accent-2 white--text"
            v-model="published"
          >
            <v-chip value="1">3 ماه قبل</v-chip>
            <v-chip value="2">6 ماه قبل</v-chip>
            <v-chip value="3">1 سال قبل</v-chip>
          </v-chip-group>
        </div>
      </li>
    </ul>
    <v-row class="mt-4">
      <v-col class="text-center">
        <v-btn color="primary" class="white--text" @click="setMyFilter"
          >اعمال فیلتر</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import createFilter from "@/mixins/createFilter";
export default {
  ssr: false,
  data() {
    return {
      category: null,
      active: false,
      amount: null,
      format: null,
      discount: null,
      published: null,
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
    openContent(el) {
      if (el.target.classList.contains("item-label")) {
        el.target
          .getElementsByClassName("v-icon")[1]
          .classList.toggle("mdi-chevron-up");
        let divContent = el.target.parentElement;
        divContent
          .getElementsByClassName("content")[0]
          .classList.toggle("active_content");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.active_content {
  display: block !important;
}
.filter-list {
  padding: 0.5rem;

  > li {
    display: flex;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    justify-content: space-between;
    cursor: pointer;
    flex-direction: column;
    .item-label {
      display: flex;
      justify-content: space-between;
    }
    .content {
      margin-top: 1rem;
      display: none;
    }
  }
}

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

.filter-wrapper {
  background: #fff;
  min-height: 100vh;
  transition: all 0.3s linear;
  z-index: 0;
  position: sticky;
  width: 320px;
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

@media screen and (min-width: 960px) and(max-width:1264px) {
  .filter-wrapper {
    width: 245px;
  }
}

@media screen and (min-width: 375px) and(max-width:960px) {
  .filter-wrapper {
    position: absolute;
    z-index: 1000;
    top: 0px;
    right: -4px;
    bottom: 0px;
    width: 300px;
    overflow-x: scroll;
  }
}
@media screen and (max-width: 375px) {
  .filter-wrapper {
    position: absolute;
    z-index: 1000;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: 280px;
    overflow-x: scroll;
  }
}
</style>
