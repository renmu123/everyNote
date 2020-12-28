<template>
  <div class="container">
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="article" v-for="n in 40" :key="n">第{{ n }}个笔记}</div>
      </el-aside>
      <el-main class="main" style="height: 95vh"
        ><Article :id="id"></Article
      ></el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Article from "@/views/Article.vue";
import data from "@/mock/mock.js";
import { v4 as uuidv4 } from "uuid";
@Component({
  name: "home",
  components: { Article }
})
export default class HelloWorld extends Vue {
  nowArticle = "";
  id = "80336940-715e-4c57-bb03-e08123310869";
  mounted() {
    console.log("aaa", uuidv4());
  }
}
</script>

<style lang="scss">
.article {
  margin: 20px 0px;
  cursor: pointer;
}
.aside {
  height: 95vh;
  text-align: center;
}
.container {
  margin-top: 20px;
}
</style>
