<template>
  <section class="container">
    <div
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      v-quill:myQuillEditor="editorOption"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
          ],
        },
      },
    };
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.content = html;
      this.$emit("applyComment", this.content,text);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
