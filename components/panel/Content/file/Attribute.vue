<template>
  <article class="attribute">
    <label class="label-format">{{ attribute.slug }}</label>
    <div :class="`${typeKey.toLowerCase()}-box`">
      <slot :type="typeKey" :attributeId="attribute.id"> </slot>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      typeKey: "",
    };
  },

  props: {
    attribute: {
      type: Object,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.findAttributeType();
  },

  methods: {
    findAttributeType() {
      let index = this.types.findIndex(
        (type) => type.value === this.attribute.type_id
      );
      this.typeKey = this.types[index].key;
    },
  },
};
</script>
<style lang="scss" scoped>
.label-format {
  color: #443f3f;
  font-size: 1rem;
  font-weight: 700;
}
.attribute {
  width: 100%;
  height: 200px;
  border: 1px solid #d7d7d7;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.aspect-box {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}
.resolution-box div,
.screen-box div {
  display: flex;
  align-items: baseline;
}
.file-format {
  width: 250px;
  padding: 0.5rem;
  border: 1px solid #d3d2d2;
  border-radius: 5px;
}
.format-file-box {
  width: 100%;
  text-align: center;
}
</style>
