<template>
  <div>
    <el-aside width="200px" class="aside"
      ><div v-for="d in data" :key="d.id" style="">
        <el-button style="border: 0" @click="handleNodeClick(d)">{{
          d.name
        }}</el-button>
      </div>
    </el-aside>
    <vue-simple-context-menu
      elementId="myUniqueId11"
      :options="noteOptions"
      ref="noteContextMenu"
      @option-clicked="noteOptionClicked"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Component from "vue-class-component";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import VueSimpleContextMenu from "vue-simple-context-menu";

@Component({
  name: "noteItem",
  components: { VueSimpleContextMenu },
  computed: {
    ...mapState({
      thisNoteBookId: "thisNoteBookId",
      thisNoteId: "thisNoteId",
    }),
  },
})
export default class HelloWorld extends Vue {
  noteOptions = [{ name: "删除", id: 4 }];
  data: any = [
    { id: 1, name: "aaa" },
    { id: 2, name: "bbb" },
    { id: 3, name: "ccc" },
  ];

  handleNodeClick(data: any) {
    this.$store.commit("setThisNoteId", data.id);
  }
  handleRightClick(event: MouseEvent, data: any) {
    const noteContextMenu: any = this.$refs.noteContextMenu;
    noteContextMenu.showMenu(event, data);
    noteContextMenu.hideContextMenu();
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
