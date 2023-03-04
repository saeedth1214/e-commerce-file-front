<template>
  <section class="quill-container">
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
      this.$emit("applyComment", this.content, text);
    },
  },
};
</script>

<style lang="scss">
@import "quill/dist/quill.snow.css";
@import "quill/dist/quill.bubble.css";
@import "quill/dist/quill.core.css";

.ql-toolbar.ql-snow {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
  font-family: "vazir";
  font-size: 0.9rem;
  color: #000;
  font-weight: 700;
}
.quill-container {
  width: 90%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}

@media screen and (max-width: 325px) {
  .container {
    width: 350px;
  }
}
</style>
