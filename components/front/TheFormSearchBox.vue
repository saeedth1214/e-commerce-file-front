<template>
  <form action="" class="search-fake">
    <div class="search-gr" :style="searchGroupStyle">
      <div class="search-dropdown" :style="searchDropDownStyle">
        <span class="dropdown_button" @click="showPopover"> فیلتر </span>
        <div
          class="dropdown_popover"
          :style="[{ display: display + ' !important', dropDownStyle }]"
        >
          <ul>
            <li>
              <v-radio-group v-model="selection">
                <v-radio
                  label="وکتور"
                  :value="1"
                  color="primary"
                  style="margin-top: 0.2rem"
                ></v-radio>
                <v-radio
                  label="بک گراند"
                  :value="2"
                  color="primary"
                  style="margin-top: 0.2rem"
                ></v-radio>
              </v-radio-group>
            </li>
            <v-divider></v-divider>
            <li>
              <v-radio-group v-model="amountType">
                <v-radio
                  label="رایگان"
                  value="free"
                  color="primary"
                  style="margin-top: 0.2rem"
                ></v-radio>
                <v-radio
                  label="نقدی"
                  value="cash"
                  color="primary"
                  style="margin-top: 0.2rem"
                ></v-radio>
              </v-radio-group>
            </li>
            <v-divider></v-divider>
          </ul>
        </div>
      </div>
      <input
        type="text"
        class="search-value-fake"
        style="direction: rtl; padding-right: 0.5rem"
        :style="searchValueStyle"
        placeholder="..."
        v-model="search"
      />
      <v-btn
        tile
        color="#000"
        :height="landing ? '50px' : '47px'"
        shaped
        plain
        style="background-color: #fff"
        @click="searchTitle"
        class="btn-search"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selection: null,
      display: "none",
      amountType: null,
    };
  },

  props: {
    searchGroupStyle: {
      type: String,
      required: false,
    },
    dropDownStyle: {
      type: String,
      required: false,
    },
    searchDropDownStyle: {
      type: String,
      required: false,
    },
    searchValueStyle: {
      type: String,
      required: false,
    },
    landing: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    height() {
      return this.landing ? "40px" : "37px";
    },
  },

  created() {
    this.$route.query?.title && (this.search = this.$route.query.title);
    this.$route.query?.selection &&
      (this.selection = this.$route.query.selection);
    this.$route.query?.amount && (this.amountType = this.$route.query.amount);
    (this.search || this.selection || this.amountType) &&
      (this.display = "block");
  },
  methods: {
    async searchTitle() {
      if (this.search && this.search.trim().length) {
        let query = {};
        query["format"] = "search";
        query["title"] = this.search;
        this.category && (query["selection"] = this.category);
        this.amountType && (query["amount"] = this.amountType);
        this.$router.push({
          path: "/front/files",
          query: { ...query },
        });
      }
    },
    showPopover(el) {
      this.display = this.display === "none" ? "block" : "none";
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .search-dropdown {
    display: none !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 960px) {
  .dropdown_button::after {
    right: 150px !important;
  }
  .search-dropdown::before {
    display: none !important;
  }
}
@media screen and (min-width: 960px) and (max-width: 1024px) {
  .dropdown_button::after {
    right: 140px !important;
  }
}
>>> .v-text-field__slot input {
  text-align: right;
  padding: 0px 0.5rem;
}
.active_popover {
  display: block;
}
.search-fake {
  width: 80%;
  margin: 0px auto;
  height: 50px;
  .search-gr {
    display: flex;
    height: 100%;
  }
  .search-dropdown {
    width: 30%;
    background-color: #fff;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &::before {
      content: "";
      width: 1px;
      height: 30px;
      background-color: #d7d7d7;
      display: block;
      position: relative;
      right: 170px;
    }
    &::after {
      display: v-bind(display);
      position: absolute;
      top: 100%;
      left: 50%;
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      transform: translateX(-50%);
      height: 0;
      width: 0;
      border-bottom: 4px solid #fff;
      border-left: 4px solid rgba(0, 0, 0, 0);
      border-right: 4px solid rgba(0, 0, 0, 0);
      margin: 6px 0 0;
      content: "";
    }

    .dropdown_button {
      min-width: 170px;
      text-align: right;
      padding-right: 0.5rem;
      color: #374957;
      &::after {
        position: absolute;
        top: 50%;
        right: 160px;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        height: 0;
        width: 0;
        border-left: 4px solid rgba(0, 0, 0, 0);
        border-right: 4px solid rgba(0, 0, 0, 0);
        border-top: 4px solid #374957;
        content: "";
        border-top-color: #5f7d95;
      }
    }
    .dropdown_popover {
      display: none;
      position: absolute;
      top: 60px;
      width: 100%;
      background: #fff;
      border-radius: 5px;
      direction: rtl;
      z-index: 10;
      > ul {
        list-style: none;
        padding: 0px;
        li {
          text-align: right;
          padding: 0.5rem;
          display: flex;
          justify-content: flex-end;
          flex-direction: row-reverse;
          align-items: flex-end;
          span {
            color: #5f7d95;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
  .search-value-fake {
    outline: none;
    width: 70%;
    background-color: #fff;
  }
}

@media screen and (max-width: 768px) {
  .search-value-fake {
    width: 100% !important;
  }
  .search-fake {
    height: 40px !important;
  }
  .btn-search {
    height: v-bind(height) !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 960px) {
  .search-value-fake {
    width: 70% !important;
  }
  .search-dropdown {
    width: 30% !important;
  }
}
</style>
