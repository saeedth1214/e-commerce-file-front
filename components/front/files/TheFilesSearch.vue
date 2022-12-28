<template>
  <div style="width: 100%" class="box">
    <v-row>
      <v-col cols="2" v-if="$vuetify.breakpoint.lgAndUp">
        <div class="brand">
          <span>Free</span>
          <span>Picks</span>
        </div>
      </v-col>
      <v-col :cols="$vuetify.breakpoint.lgAndUp ? '10' : '12'">
        <v-row>
          <v-col cols="11" class="d-flex">
            <div class="searchbox">
              <input
                type="text"
                placeholder="جستجو"
                v-model.trim="search"
                @focus="activeIcon = true"
                @blur="activeIcon = false"
              />
            </div>
            <v-icon
              color="#c1c1c1"
              class="magnify"
              :class="{ active: activeIcon }"
              @click="searchfileByTitle"
            >
              mdi-magnify
            </v-icon>
          </v-col>
          <v-col cols="1">
            <div class="filter">
              <v-btn color="#eff3f6" @click="$emit('showFilterBox')">
                <v-icon color="#374957">mdi-tune</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      activeIcon: false,
    };
  },

  methods: {
    async searchfileByTitle() {
      this.$emit("searchByTitle", this.search);
      this.search = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  border-bottom: 1px solid #e7e7e7;
  height: 80px;
  display: flex;
  align-items: center;
}
.brand {
  display: flex;
  direction: ltr;
  justify-content: flex-start;
  height: 60px;
  gap: 5px;
  span:nth-child(1) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 5px;
  }
  span:nth-child(2) {
    font-size: 2rem;
    font-weight: 900;
    color: blue;
  }
}

.searchbox {
  width: 100%;
  padding: 0.8rem;
  height: 45px;
  text-align: left;
  background: #e2e8ec;
  border: 2px solid #c9c9c9;
  border-radius: 0.2rem;
  input {
    width: 100%;
    height: 100%;
    outline: none;
    color: #374957;
  }
}

.active {
  background: #1273eb !important;
  color: #fff !important;
  border-right: none;
}
.magnify {
  border-radius: 3px;
  padding: 0.6rem;
  height: 45px;
  background: transparent;
  border-right: 2px solid #c1c1c1;
  left: 45px;
  &:hover {
    cursor: pointer;
  }
}

.filter {
  display: none;
}

@media screen and (max-width: 1096px) {
  .filter {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }

  .brand {
    display: none;
  }
}
</style>
