<template>
  <vue-markdown
    :toc="true"
    toc-id="toc"
    :toc-anchor-link="false"
    :toc-first-level="1"
    >{{ message }}</vue-markdown
  >
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
  message: string = data[this.id].content;
}
</script>

<style></style>
