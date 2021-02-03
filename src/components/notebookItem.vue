<template>
  <div>
    <el-button @click="createNotebook" style="margin: 5px 0"
      >新建笔记本</el-button
    >
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      draggable
      :allow-drop="allowDrop"
      @node-click="handleNodeClick"
      @node-contextmenu="handleRightClick"
      :props="{ label: 'name' }"
    >
    </el-tree>
    <vue-simple-context-menu
      elementId="myUniqueId"
      :options="notebookOption"
      ref="folderContextMenu"
      @option-clicked="notebookOptionClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Note from "@/views/Note.vue";
import { addNotebook, findNotebook, removeNotebook } from "@/api/notebook";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import VueSimpleContextMenu from "vue-simple-context-menu";
@Component({
  name: "notebookItem",
  components: { Note, VueSimpleContextMenu },
})
export default class HelloWorld extends Vue {
  notebookOption = [
    { name: "新建笔记", id: 1 },
    { name: "新建文件夹", id: 2 },
    { name: "编辑", id: 3 },
    { name: "删除", id: 4 },
  ];
  data: any = [];
  thisNotebookId = "";
  mounted() {
    findNotebook().then((res) => {
      console.log(res);
      this.data = res;
    });
  }
  handleNodeClick(data: any) {
    console.log(this.thisNotebookId);
    this.thisNotebookId = data.id;
  }
  createNotebook() {
    addNotebook().then((res: { id: string; name: string }) => {
      console.log("addnotebook", res);
      this.data.push({
        id: res.id,
        name: res.name,
        type: "notebook",
        children: [],
      });
    });
  }
  handleRightClick(event: MouseEvent, data: any) {
    const noteContextMenu: any = this.$refs.noteContextMenu;
    const folderContextMenu: any = this.$refs.folderContextMenu;
    if (data.type === "notebook") {
      noteContextMenu.hideContextMenu();
      folderContextMenu.showMenu(event, data);
    } else {
      folderContextMenu.hideContextMenu();
      noteContextMenu.showMenu(event, data);
    }
  }
  notebookOptionClicked(event: any) {
    if (event.option.id === 1) {
      console.log("新建笔记");
    } else if (event.option.id === 2) {
      console.log("新建文件夹");
    } else if (event.option.id === 3) {
      console.log("编辑");
    } else if (event.option.id === 4) {
      removeNotebook(event.item.id).then((res) => {
        console.log("删除成功", res);
        findNotebook().then((res) => {
          this.data = res;
        });
      });
    }
  }
  allowDrop(draggingNode: any, dropNode: any, type: any) {
    // 当目标节点数据类型为note且类型为innner时，无法拖动
    if (dropNode.data.type === "note" && type === "inner") {
      return false;
    }
    // notebook类型无法拖动到note类型下
    if (draggingNode.data.type === "notebook") {
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
