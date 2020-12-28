<template>
  <div>
    <vue-markdown
      :toc="true"
      toc-id="toc"
      :toc-anchor-link="false"
      :toc-first-level="1"
      :source="content"
    ></vue-markdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import VueMarkdown from "vue-markdown";
import data from "@/mock/articles.js";

const Props = Vue.extend({
  props: {
    id: String
  }
});

@Component({
  name: "Article",
  components: { VueMarkdown }
})
export default class HelloWorld extends Props {
  message = data;
  dataId = this.id;

  get content(): any {
    return this.message[this.id].content;
  }
}
</script>

<style></style>
