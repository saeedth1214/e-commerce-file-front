<template>
  <client-only>
    <v-col
      cols="12"
      md="3"
      sm="3"
      lg="3"
      style="border-left: 1px solid #d7d7d7"
    >
      <div class="filter-wrapper">
        <ul class="filter-list">
          <li v-if="$vuetify.breakpoint.mdAndDown" style="align-items: end">
            <v-icon @click="$emit('showFilterBox')">mdi-close</v-icon>
          </li>
          <li>
            <div
              class="apply-filter-box"
              style="display: flex; gap: 5px; flex-wrap: wrap"
            >
              <v-btn
                v-if="amount"
                @click="amount = null"
                tail
                shaped
                color="primary"
                style="font-size: 0.8rem; padding: 0.5rem"
              >
                {{ applyAmount }}
                <v-icon color="#fff" style="font-size: 0.8rem" small
                  >mdi-close</v-icon
                >
              </v-btn>
              <v-btn
                v-if="format"
                @click="format = null"
                color="primary"
                style="font-size: 0.8rem; padding: 0.5rem"
              >
                {{ applyFormat }}
                <v-icon color="#fff" style="font-size: 0.8rem"
                  >mdi-close</v-icon
                >
              </v-btn>
              <v-btn
                v-if="discount"
                @click="discount = null"
                color="primary"
                style="font-size: 0.8rem; padding: 0.5rem"
              >
                {{ applyDiscount }}
                <v-icon color="#fff" style="font-size: 0.8rem"
                  >mdi-close</v-icon
                >
              </v-btn>
              <v-btn
                v-if="published"
                @click="published = null"
                color="primary"
                style="font-size: 0.8rem; padding: 0.5rem"
              >
                {{ applyPublished }}
                <v-icon color="#fff" style="font-size: 0.8rem"
                  >mdi-close</v-icon
                >
              </v-btn>
            </div>
          </li>
          <li class="filter-item" @click="openContent(1)" ref="li-1">
            <div class="item-label">
              <span>
                <v-icon small>mdi-cash</v-icon>
                بر اساس قیمت</span
              >
              <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
            </div>
            <div class="filter_sub_content">
              <v-chip-group
                active-class="blue accent-2 white--text"
                v-model="amount"
              >
                <v-chip value="cash">نقدی</v-chip>
                <v-chip value="free">رایگان</v-chip>
              </v-chip-group>
            </div>
          </li>
          <li class="filter-item" @click="openContent(2)" ref="li-2">
            <div class="item-label">
              <span>
                <v-icon small>mdi-sale</v-icon>
                بر اساس تخفیف</span
              >
              <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
            </div>
            <div class="filter_sub_content">
              <v-chip-group
                active-class="blue accent-2 white--text"
                v-model="discount"
              >
                <v-chip value="0">بدون تخفیف</v-chip>
                <v-chip value="1">تخفیف دار</v-chip>
              </v-chip-group>
            </div>
          </li>
          <li class="filter-item" @click="openContent(3)" ref="li-3">
            <div class="item-label">
              <span>
                <v-icon small>mdi-file</v-icon>
                فرمت</span
              >
              <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
            </div>
            <div class="filter_sub_content">
              <v-chip-group
                active-class="blue accent-2 white--text"
                v-model="format"
              >
                <v-chip
                  :value="index + 1"
                  v-for="(format, index) in formatItems"
                  :key="index"
                  >{{ format }}</v-chip
                >
              </v-chip-group>
            </div>
          </li>
          <li class="filter-item" @click="openContent(4)" ref="li-4">
            <div class="item-label">
              <span>
                <v-icon small>mdi-calendar-range</v-icon>
                تاریخ انتشار</span
              >
              <v-icon color="#000">{{ "mdi-chevron-down" }}</v-icon>
            </div>
            <div class="filter_sub_content">
              <v-chip-group
                active-class="blue accent-2 white--text"
                v-model="published"
              >
                <v-chip value="3">3 ماه قبل</v-chip>
                <v-chip value="6">6 ماه قبل</v-chip>
                <v-chip value="1">1 سال قبل</v-chip>
              </v-chip-group>
            </div>
          </li>
        </ul>
        <v-row class="mt-4">
          <v-col class="text-center">
            <v-btn color="primary" class="white--text" @click="applyfilter"
              >اعمال فیلتر</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-col>
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      amount: null,
      format: null,
      discount: null,
      published: null,
      formatItems: ["EPS", "AL", "JPG", "PNG", "JPEG", "PSD"],
    };
  },
  computed: {
    applyAmount() {
      return this.amount === "free" ? "رایگان" : "نقدی";
    },
    applyDiscount() {
      return parseInt(this.discount) === 0 ? "بدون تخفیف" : "تخفیف دار";
    },
    applyPublished() {
      let text = "";
      if (parseInt(this.published) === 3) {
        text = "3 ماه قبل";
      } else if (parseInt(this.published) === 6) {
        text = "6 ماه قبل";
      } else if (parseInt(this.published) === 1) {
        text = "1 سال قبل ";
      }
      return text;
    },
    applyFormat() {
      return this.formatItems[this.format - 1];
    },
  },
  methods: {
    applyfilter() {
      let params = {};
      this.amount && (params["amount"] = this.amount);
      this.format && (params["format"] = this.format);
      this.discount && (params["discount"] = this.discount);
      this.published && (params["published"] = this.published);
      this.$emit("applyFilter", params);
    },
    openContent(index) {
      let el = this.$refs["li-" + index];
      el.getElementsByClassName("v-icon")[1].classList.toggle("mdi-chevron-up");
      el.getElementsByClassName("filter_sub_content")[0].classList.toggle(
        "active_content"
      );
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
    .filter_sub_content {
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
