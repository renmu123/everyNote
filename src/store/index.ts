import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state: any = {
  thisNoteBookId: "",
  thisNoteId: ""
}

const mutations: any = {
  setThisNoteBookId(state: any, id: string) {
    state.thisNoteBookId = id
  },
  setThisNoteId(state: any, id: string) {
    state.thisNoteId = id
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: {},
  modules: {}
});
