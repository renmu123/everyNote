<template>
  <div>
    <editor
      :initialValue="defaultContent"
      :options="editorOptions"
      height="93vh"
      initialEditType="wysiwyg"
      previewStyle="vertical"
      ref="toastuiEditor"
    />
  </div>
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { Editor } from "@toast-ui/vue-editor";

const Props = Vue.extend({
  props: {
    id: String,
  },
});

@Component({
  name: "Note",
  components: { editor: Editor },
})
export default class HelloWorld extends Props {
  message = {};
  editorOptions = {};
  defaultContent = "我是初始页面";
  data = {
    "80336940-715e-4c57-bb03-e08123310869": {
      name: "aaa",
      id: "80336940-715e-4c57-bb03-e08123310869",
      content: "**我是内容1**dsdsdsds",
    },
    "8d857776-f24b-4f5e-87ae-64513363f624": {
      name: "bbb",
      id: "8d857776-f24b-4f5e-87ae-64513363f624",
      content: "## 我是内容2",
    },
  };
  get noteId(): string {
    return this.id;
  }
  @Watch("noteId")
  noteIdChange(value: string, oldValue: string) {
    const content = this.data[this.noteId].content;
    console.log("aaa", content);
    const toastuiEditor: any = this.$refs.toastuiEditor;
    toastuiEditor.invoke("setMarkdown", content);
    console.log("bbb", this.noteId);
  }
}
</script>

<style></style>
