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
      @node-click="handleNodeClick"
      @node-contextmenu="handleRightClick"
      @node-drop="nodeDropSuccess"
      :props="{ label: 'name' }"
    >
    </el-tree>
    <vue-simple-context-menu
      elementId="myUniqueId"
      :options="notebookOption"
      ref="notebookContextMenu"
      @option-clicked="notebookOptionClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Note from "@/views/Note.vue";
import {
  addNotebook,
  findNotebook,
  removeNotebook,
  updateNotebook,
} from "@/api/notebook";
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

  get dataIdArray(): string[] {
    // return ["aaa", "bb"]
    return this.data.map((d: { id: string }): string => d.id);
  }
  handleNodeClick(data: any) {
    console.log(this.thisNotebookId);
    this.thisNotebookId = data.id;
  }
  createNotebook(): void {
    const order = this.data.length * 65536;
    addNotebook("新建笔记本" + order, order).then(
      (res: { id: string; name: string }) => {
        console.log("addnotebook", res);
        this.data.push(res);
      }
    );
  }

  handleRightClick(event: MouseEvent, data: any): void {
    const notebookContextMenu: any = this.$refs.notebookContextMenu;
    notebookContextMenu.hideContextMenu();
    notebookContextMenu.showMenu(event, data);
  }
  notebookOptionClicked(event: any): void {
    if (event.option.id === 1) {
      console.log("新建笔记");
    } else if (event.option.id === 2) {
      console.log("新建笔记本");
    } else if (event.option.id === 3) {
      console.log("编辑");
    } else if (event.option.id === 4) {
      removeNotebook(event.item.id).then((res) => {
        console.log(event, event.item.id, "删除成功", res);
        findNotebook().then((res) => {
          this.data = res;
        });
      });
    }
  }
  findLastNextNode(nodeId: string): string {
    const nodeIndex = this.dataIdArray.find((ele) => ele === nodeId);
    console.log("aa", nodeIndex);
    // let lastNode = "";
    // for (const notebook of this.data) {
    //   if (notebook.id === nodeId) {
    //   }
    // }
    return "aa";
  }
  // findNextNode(nodeId: string): string {
  //   return "aaa";
  // }
  // postion: before、after、inner
  nodeDropSuccess(
    draggingNode: any,
    dropNode: any,
    postion: any,
    event: DragEvent
  ) {
    console.log(draggingNode, dropNode, postion, event, this.data);
    const dropNodeId: string = dropNode.data.id;
    const lastNodeId: string = this.findLastNextNode(dropNodeId);
    // const data = dropNode.data;
    // console.log(draggingNode.data.order, dropNode.data.order);
    // console.log(draggingNode.data.order, dropNode.data.order);
    // updateNotebook(draggingNode.data).then(() => {
    //   console.log("更新成功draggingnode");
    //   updateNotebook(dropNode.data).then(() => {
    //     console.log("更新成功dropnode");
    //   });
    // });
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
