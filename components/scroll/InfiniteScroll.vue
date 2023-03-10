<template>
  <div>
    <validation-provider #default="{ errors }" :name="title" :rules="rules">
      <div>
        <p class="text-body-2 font-weight-light">{{ $t(`${title}.title`)}}</p>
      </div>
      <v-select
        dir="rtl"
        :multiple="multiple"
        :label="label"
        v-model="selectedValue"
        :reduce="(option) => option.id"
        :options="items"
        :clearable="true"
        @open="onOpen"
        @close="onClose"
        @search="(query) => (search = query)"
        :loading="loading"
        :disabled="disabled"
      >
        <template #list-footer>
          <li v-show="hasNextPage" ref="load" class="loader">موردی برای نمایش وجود ندارد</li>
        </template>
        <template #no-options="{ search, searching, loading }">موردی یافت نشد</template>
        <template #spinner="{ loading }">
          <div v-if="loading" class="vs__spinner"></div>
        </template>
      </v-select>
      <div v-if="errors.length">
        <p class="red--text text-body-2 font-weight-light">{{errors[0]}}</p>
      </div>
    </validation-provider>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      observer: null,
      currentPage: 1,
      search: null,
      pagination: {},
      items: [],
      setInitialItem: false,
      loading: true
    };
  },

  watch: {
    async url() {
      this.items = [];
      await this.fetchItems({ page: this.currentPage });
    },

    async renderInfinite(newVal) {
      if (newVal) {
        this.loading = true;
        this.pagination = {};
        this.setInitialItem = false;
        this.items = [];
        this.currentPage = 1;
        await this.fetchItems({ page: this.currentPage });
        this.loading = false;
      }
    }
  },
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false
    },
    itemId: {
      type: null,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      required: false
    },
    renderInfinite: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  computed: {
    selectedValue: {
      get() {
        return this.itemId;
      },
      set(newVal) {
        this.$emit("selectedValue", newVal);
        return newVal;
      }
    },
    hasNextPage() {
      return this.currentPage < this.pagination.total_pages;
    }
  },

  async created() {
    this.loading = true;
    await this.fetchItems({ page: this.currentPage });
    this.loading = false;
  },
  methods: {
    async fetchItems(params) {
      // this.loading = true;
      try {
        const { data } = await this.$axios.get(`${this.url}`, {
          params
        });
        // may item was added to items before
        if (this.setInitialItem && this.itemId) {
          data.data = data.data.filter(item => {
            if (typeof this.itemId == "number") {
              return this.itemId !== item.id;
            } else {
              return !this.itemId.includes(item.id);
            }
          });
        }
        if (this.itemId && !this.setInitialItem) {
          this.checkIdisExists(data.data);
        }

        await this.items.push(...data.data);
        this.pagination = data.meta.pagination;
      } catch (error) {
        console.log(error, "resp");
      }
      // this.loading = false;
    },
    async checkIdisExists(items) {
      try {
        if (typeof this.itemId == "number") {
          if (items.findIndex(item => item.id == this.itemId) == -1) {
            const { data } = await this.$axios.get(
              `${this.url.substr(0, this.url.indexOf("?"))}/${this.itemId}`
            );
            this.items.push({
              id: data.data.id,
              name: data.data.name
            });
            this.setInitialItem = true;
          } else {
            this.setInitialItem = true;
          }
        }
        if (Object.keys(this.itemId).length) {
          for (const id of this.itemId) {
            if (items.findIndex(item => item.id == id) == -1) {
              const { data } = await this.$axios.get(
                `${this.url.substr(0, this.url.indexOf("?"))}/${id}`
              );
              this.items.push({
                id: data.data.id,
                name: data.data.name
              });
            }
          }
          this.setInitialItem = true;
        } else {
          this.setInitialItem = true;
        }
      } catch (error) {
        console.log(error, "check");
      }
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        this.currentPage++;
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.fetchItems({ page: this.currentPage });
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    }
  }
};
</script>


<style scoped>
</style>

