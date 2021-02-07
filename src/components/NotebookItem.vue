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
    return this.data.map((d: { id: string }): string => d.id);
  }
  handleNodeClick(data: any) {
    console.log(this.thisNotebookId);
    this.thisNotebookId = data.id;
  }
  createNotebook(): void {
    const order = (this.data.length + 1) * 65536;
    const params = {
      name: "新建笔记本" + order,
      order: order,
      parentId: null,
    };
    addNotebook(params).then((res: { id: string; name: string }) => {
      console.log("addnotebook", res);
      this.data.push(res);
    });
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
  findNodeIndex(dataIdArray: string[], nodeId: string): number {
    const nodeIndex = dataIdArray.findIndex((ele) => ele === nodeId);
    return nodeIndex;
  }
  // postion: before、after、inner
  nodeDropSuccess(
    draggingNode: any,
    dropNode: any,
    postion: any,
    event: DragEvent
  ) {
    console.log(draggingNode, dropNode, postion, event, this.data);
    const draggingNodeData: {
      id: string;
      order: number;
      parentId: string | null;
    } = draggingNode.data;

    let data: { id: string; order: number }[];
    if (dropNode.parent.level === 0 && postion !== "inner") {
      draggingNodeData.parentId = null;
      data = this.data;
    } else {
      if (postion === "inner") {
        data = dropNode.data.children;
        draggingNodeData.parentId = dropNode.data.id;
      } else {
        data = dropNode.parent.data.children;
        draggingNodeData.parentId = dropNode.parent.data.id;
      }
    }
    const dataIdArray = data.map((d: { id: string }): string => d.id);
    const nodeIndex = this.findNodeIndex(dataIdArray, draggingNodeData.id);

    console.log("data", data, dataIdArray, draggingNodeData.id);
    if (nodeIndex === 0) {
      console.log("第一位");
      if (data.length === 1) {
        draggingNodeData.order = data.length * 65536;
      } else {
        draggingNodeData.order = data[nodeIndex + 1].order / 2;
      }
    } else if (nodeIndex === data.length - 1) {
      draggingNodeData.order = data[nodeIndex - 1].order + 65536;
      console.log("最后一位");
    } else {
      console.log("中间", nodeIndex);
      draggingNodeData.order =
        (data[nodeIndex - 1].order + data[nodeIndex + 1].order) / 2;
    }
    updateNotebook(draggingNodeData).then((res) => {
      console.log("更新成功", res, draggingNodeData);
    });
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
