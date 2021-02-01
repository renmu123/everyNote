<template>
  <div>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <el-button @click="createNotebook">新建文件夹</el-button>
        <!-- <span @click.right.prevent.stop="handleClick($event)">aaaaa</span> -->
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          draggable
          :allow-drop="allowDrop"
          @node-click="handleNodeClick"
          @node-contextmenu="handleRightClick"
        >
        </el-tree>
      </el-aside>
      <el-main class="main" style="padding-top: 0"
        ><Article :id="dataId"></Article
      ></el-main>
    </el-container>
    <div>
      <vue-simple-context-menu
        elementId="myUniqueId"
        :options="folderOptions"
        ref="folderContextMenu"
        @option-clicked="folderOptionClicked"
      />
      <vue-simple-context-menu
        elementId="myUniqueId11"
        :options="noteOptions"
        ref="noteContextMenu"
        @option-clicked="noteOptionClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
// TODO: 文件栏位，右键菜单的新建文件夹与新建文件
// TODO: 预览&编辑模式的切换
// TODO: 标签功能
// TODO: resize线
// TODO: 自定义编辑器
// TODO: WebDav

import Vue from "vue";
import Component from "vue-class-component";
import Article from "@/views/Article.vue";
import { v4 as uuidv4 } from "uuid";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";

import VueSimpleContextMenu from "vue-simple-context-menu";
@Component({
  name: "home",
  components: { Article, VueSimpleContextMenu }
})
export default class HelloWorld extends Vue {
  dataId = "80336940-715e-4c57-bb03-e08123310869";
  folderOptions = [
    { name: "新建笔记", id: 1 },
    { name: "新建文件夹", id: 2 },
    { name: "编辑", id: 3 },
    { name: "删除", id: 4 }
  ];
  noteOptions = [{ name: "删除", id: 4 }];
  data = [
    {
      id: "11",
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
          id: "80336940-715e-4c57-bb03-e081233108691",
          type: "note"
        },
        {
          label: "第2个文章",
          title: "第2个文章",
          id: "8d857776-f24b-4f5e-87ae-64513363f6214",
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
      return true;
    } else {
      return false;
    }
  }
  createNotebook() {
    this.data.push({
      id: uuidv4(),
      label: "新增分类",
      type: "folder",
      children: []
    });
  }
  handleRightClick(event: MouseEvent, data: any) {
    // console.log(data);
    if (data.type === "folder") {
      this.$refs.noteContextMenu.hideContextMenu();
      this.$refs.folderContextMenu.showMenu(event, data);
    } else {
      this.$refs.folderContextMenu.hideContextMenu();
      this.$refs.noteContextMenu.showMenu(event, data);
    }
  }
  folderOptionClicked(event: any) {
    if (event.option.id === 1) {
      console.log("新建笔记");
    } else if (event.option.id === 2) {
      console.log("新建文件夹");
    } else if (event.option.id === 3) {
      console.log("编辑");
    } else if (event.option.id === 4) {
      console.log("删除");
    }
  }
  noteOptionClicked(event: any) {
    if (event.option.id === 4) {
      console.log("删除");
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
