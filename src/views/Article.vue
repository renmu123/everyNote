<template>
  <div>
    <editor
      :initialValue="content"
      :options="editorOptions"
      height="93vh"
      initialEditType="wysiwyg"
      previewStyle="vertical"
    />
  </div>
</template>

<script lang="ts">
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import Vue from "vue";
import Component from "vue-class-component";
import { Editor } from "@toast-ui/vue-editor";
import data from "@/mock/articles.js";

const Props = Vue.extend({
  props: {
    id: String
  }
});

@Component({
  name: "Article",
  components: { editor: Editor }
})
export default class HelloWorld extends Props {
  message = data;
  dataId = this.id;
  editorOptions = {};

  get content(): any {
    return this.message[this.id].content;
  }
}
</script>

<style></style>
