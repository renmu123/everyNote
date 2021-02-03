<template>
  <div>
    <el-container class="container">
      <el-aside width="200px" class="aside">
        <notebookItem></notebookItem>
      </el-aside>
      <!-- <el-main class="main" style="padding-top: 0"
        ><Note :id="thisNoteId"></Note
      ></el-main> -->
    </el-container>
    <div>
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
// TODO: notebook一列，note列表一列

import Vue from "vue";
import Component from "vue-class-component";
import Note from "@/views/Note.vue";
import notebookItem from "@/components/NotebookItem";

import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import VueSimpleContextMenu from "vue-simple-context-menu";
@Component({
  name: "home",
  components: { Note, VueSimpleContextMenu, notebookItem },
})
export default class HelloWorld extends Vue {
  folderOptions = [
    { name: "新建笔记", id: 1 },
    { name: "新建文件夹", id: 2 },
    { name: "编辑", id: 3 },
    { name: "删除", id: 4 },
  ];
  noteOptions = [{ name: "删除", id: 4 }];
  data: any = [];
  mounted() {
    console.log("init");
  }
  handleRightClick(event: MouseEvent, data: any) {
    // console.log(data);
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
  noteOptionClicked(event: any) {
    if (event.option.id === 4) {
      console.log("删除", event);
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
