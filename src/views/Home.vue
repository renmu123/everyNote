<template>
  <el-container class="container">
    <el-aside width="200px" class="aside">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-aside>
    <el-main class="main" style="height: 95vh"
      ><Article :id="dataId"></Article
    ></el-main>
  </el-container>
</template>

<script lang="ts">
// TODO: 文件栏位，右键菜单的新建文件夹与新建文件
// TODO: 预览&编辑模式的切换
// TODO: 标签功能
// TODO: resize线
// TODO: 自定义编辑器

import Vue from "vue";
import Component from "vue-class-component";
import Article from "@/views/Article.vue";
// import { v4 as uuidv4 } from "uuid";
@Component({
  name: "home",
  components: { Article }
})
export default class HelloWorld extends Vue {
  dataId = "80336940-715e-4c57-bb03-e08123310869";
  data = [
    {
      id: 1,
      label: "笔记",
      type: "folder",
      children: [
        {
          label: "第1个文章",
          title: "第1个文章",
          id: "80336940-715e-4c57-bb03-e08123310869",
          type: "note"
        },
        {
          label: "第2个文章",
          title: "第2个文章",
          id: "8d857776-f24b-4f5e-87ae-64513363f624",
          type: "note"
        }
      ]
    },
    {
      id: 2,
      label: "笔记2",
      type: "folder",
      children: [
        {
          label: "第1个文章",
          title: "第1个文章",
          id: "80336940-715e-4c57-bb03-e08123310869",
          type: "note"
        },
        {
          label: "第2个文章",
          title: "第2个文章",
          id: "8d857776-f24b-4f5e-87ae-64513363f624",
          type: "note"
        }
      ]
    }
  ];
  getArticle(id: string) {
    this.dataId = id;
  }
  handleNodeClick(data: any) {
    if (data.type === "note") {
      this.getArticle(data.id);
    }
  }
  allowDrop(draggingNode: any, dropNode: any, type: any) {
    // 当目标节点数据类型为note且类型为innner时，无法拖动
    if (dropNode.data.type === "note" && type === "inner") {
      return false;
    }
    // folder类型无法拖动到note类型下
    if (draggingNode.data.type === "folder") {
      if (dropNode.data.type === "note") {
        return false;
      } else {
        return true;
      }
      // note类型无法拖动到第一层节点
    } else if (draggingNode.data.type === "note") {
      if (dropNode.level === 1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  // allowDrag() {}
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
