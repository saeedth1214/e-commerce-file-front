<template>
  <v-container style="height: 450px">
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="blue accent-4"
    ></v-progress-linear>
    <label class="label-format">ویژگی های فایل</label>
    <section class="attributes">
      <Attribute
        v-for="attribute in attributes"
        :key="attribute.id"
        :attribute="attribute"
        :types="types"
        v-slot="{ type, attributeId }"
      >
        <template v-if="type === 'FORMAT'">
          <v-select
            :items="formatItems"
            dense
            outlined
            itemText="name"
            itemValue="value"
            v-model="fileFormatValue.value"
            @input="setFormatAttributeId(attributeId)"
          ></v-select>
        </template>
        <template v-if="type === 'SCREEN'">
          <div>
            <label class="resolusion-x" style="width: 40%">Width : </label>
            <v-text-field
              type="number"
              min="0"
              step="0.01"
              outlined
              dense
              style="width: 40%"
              suffix="mm"
              v-model="screenSize.width"
              @input="setScreenAttributeId(attributeId)"
            ></v-text-field>
          </div>

          <div>
            <label class="resolusion-Y" style="width: 40%">Height: </label>
            <v-text-field
              type="number"
              min="0"
              step="0.01"
              outlined
              dense
              suffix="mm"
              style="width: 40%"
              v-model="screenSize.height"
              @input="setScreenAttributeId(attributeId)"
            ></v-text-field>
          </div>
        </template>
        <template v-if="type === 'SIZE'">
          <v-text-field
            type="number"
            outlined
            step="0.01"
            dense
            suffix="mb"
            v-model="fileSize.value"
            @input="setSizeAttributeId(attributeId)"
          ></v-text-field>
        </template>
        <template v-if="type === 'ASPECT'">
          <v-text-field
            type="number"
            min="0"
            outlined
            dense
            v-model="aspect.width"
            @input="setAsectAttributeId(attributeId)"
          ></v-text-field>
          :
          <v-text-field
            type="number"
            min="0"
            outlined
            dense
            v-model="aspect.height"
            @input="setAsectAttributeId(attributeId)"
          ></v-text-field>
        </template>
        <template v-if="type === 'RESOLUTION'">
          <div>
            <label class="resolusion-x" style="width: 40%"
              >X-Resolution :
            </label>
            <v-text-field
              type="number"
              min="0"
              outlined
              dense
              style="width: 40%"
              suffix="pexel/pi"
              v-model="resolution.xresolution"
              @input="setResolutionAttributeId(attributeId)"
            ></v-text-field>
          </div>
          <div>
            <label class="resolusion-Y" style="width: 40%"
              >Y-Resolution :
            </label>
            <v-text-field
              type="number"
              min="0"
              outlined
              dense
              suffix="pexel/pi"
              style="width: 40%"
              v-model="resolution.yresolution"
              @input="setResolutionAttributeId(attributeId)"
            ></v-text-field>
          </div>
        </template>
      </Attribute>
      <article class="d-flex justify-center align-center">
        <v-scale-transition>
          <div v-if="!loading" class="text-center">
            <v-btn
              depressed
              color="deep blue darken-3 white--text"
              size="20"
              @click="saveAttributes"
              >ثبت</v-btn
            >
          </div>
        </v-scale-transition>
      </article>
    </section>
  </v-container>
</template>
<script>
import showMessage from "@/mixins/showMessage";

export default {
  data() {
    return {
      loading: false,
      attributes: [],
      types: [],
      fileFormatValue: { id: null, value: null },
      lookUpObjects: {
        ASPECT: {
          key: "aspect",
          callback: (value) => {
            return value.split(":");
          },
          setter: (id, value) => {
            this.aspect.width = value[0];
            this.aspect.height = value[1];
            this.aspect.id = id;
          },
        },
        SCREEN: {
          key: "screenSize",
          callback: (value) => {
            return value.split("*");
          },
          setter: (id, value) => {
            this.screenSize.width = value[0];
            this.screenSize.height = value[1];
            this.screenSize.id = id;
          },
        },
        RESOLUTION: {
          key: "resolution",
          callback: (value) => {
            return value.split("*");
          },
          setter: (id, value) => {
            this.resolution.xresolution = value[0];
            this.resolution.yresolution = value[1];
            this.resolution.id = id;
          },
        },
        FORMAT: {
          key: "fileFormatValue",
          callback: (value) => parseInt(value),
          setter: (id, value) => {
            this.fileFormatValue.value = value;
            this.fileFormatValue.id = id;
          },
        },
        SIZE: {
          key: "fileSize",
          callback: (value) => value,
          setter: (id, value) => {
            this.fileSize.value = value;
            this.fileSize.id = id;
          },
        },
      },
      aspect: {
        id: null,
        width: null,
        height: null,
      },
      resolution: {
        id: null,
        xresolution: null,
        yresolution: null,
      },
      screenSize: {
        id: null,
        width: null,
        height: null,
      },
      fileSize: { id: null, value: null },
      formatItems: [
        {
          name: "eps",
          value: 1,
        },
        {
          name: "Al",
          value: 2,
        },
        {
          name: "jpg",
          value: 3,
        },
        {
          name: "png",
          value: 4,
        },
        {
          name: "jpeg",
          value: 5,
        },
        {
          name: "psd",
          value: 6,
        },
      ],
    };
  },
  mixins: [showMessage],
  computed: {
    aspectAttribute() {
      return this.aspect.id !== null
        ? {
            id: this.aspect.id,
            value: this.aspect.width + ":" + this.aspect.height,
          }
        : null;
    },
    screenAttribute() {
      return this.screenSize.id !== null
        ? {
            id: this.screenSize.id,
            value: this.screenSize.width + "*" + this.screenSize.height,
          }
        : null;
    },
    resolutionAttribute() {
      return this.resolution.id !== null
        ? {
            id: this.resolution.id,
            value:
              this.resolution.xresolution + "*" + this.resolution.yresolution,
          }
        : null;
    },
    sizeAttribute() {
      return this.fileSize.id !== null ? this.fileSize : null;
    },
    formatAttribute() {
      return this.fileFormatValue.id !== null ? this.fileFormatValue : null;
    },
  },
  async created() {
    this.loading = true;
    await this.$axios.get("panel/attributes").then((res) => {
      this.attributes = res.data.data;
      this.types = res.data.meta.types;
      if (this.fileAttributes.length) {
        this.fileAttributes.map((attribute) => {
          this.mappingValueToObject(
            attribute.id,
            attribute.type,
            attribute.value
          );
        });
      }
    });
    this.loading = false;
  },
  props: {
    fileAttributes: {
      type: Array,
      required: true,
    },
    fileId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async saveAttributes() {
      this.loading = true;
      let assignAttributes = [];
      this.aspectAttribute && assignAttributes.push(this.aspectAttribute);
      this.screenAttribute && assignAttributes.push(this.screenAttribute);
      this.resolutionAttribute &&
        assignAttributes.push(this.resolutionAttribute);
      this.sizeAttribute && assignAttributes.push(this.sizeAttribute);
      this.formatAttribute &&
        assignAttributes.push({
          ...this.formatAttribute,
          value: String(this.formatAttribute.value),
        });

      await this.$axios
        .post(`panel/files/${this.fileId}/attributes`, {
          attributes: assignAttributes,
        })
        .then((res) => {
          this.showMessage("success", "ویژگی های فایل انتخابی ثبت شد");
          this.$router.push("/panel/files");
        });
      this.loading = false;
    },
    setScreenAttributeId(id) {
      if (this.screenSize.width === null || this.screenSize.height === null) {
        return;
      }
      if (
        !this.screenSize.width.trim().length ||
        !this.screenSize.height.trim().length
      ) {
        this.screenSize.id = null;
        return;
      }
      this.screenSize.id = id;
    },
    setAsectAttributeId(id) {
      if (this.aspect.width === null || this.aspect.height === null) {
        return;
      }
      if (
        !this.aspect.width.trim().length ||
        !this.aspect.height.trim().length
      ) {
        this.aspect.id = null;
        return;
      }
      this.aspect.id = id;
    },
    setResolutionAttributeId(id) {
      if (
        this.resolution.xresolution === null ||
        this.resolution.yresolution === null
      ) {
        return;
      }
      if (
        !this.resolution.xresolution.trim().length ||
        !this.resolution.yresolution.trim().length
      ) {
        this.resolution.id = null;
        return;
      }
      this.resolution.id = id;
    },
    setFormatAttributeId(id) {
      if (this.fileFormatValue.value !== null) {
        this.fileFormatValue.id = id;
      }
    },
    setSizeAttributeId(id) {
      if (this.fileSize.value !== null && this.fileSize.value.trim().length) {
        this.fileSize.id = id;
      } else {
        this.fileSize.id = null;
      }
    },
    mappingValueToObject(id, type, value) {
      let objectValue = this.lookUpObjects[type].callback(value);
      this.lookUpObjects[type].setter(id, objectValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.attributes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(3, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  direction: ltr;
}
</style>
