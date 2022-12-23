import Vuex from "vuex";
import card from "./card";
import option from "./options";
import user from "./user";
import file from "./files";
import plan from "./plans";
import category from "./category";
import tag from "./tag";

const createStore = () => {
  return new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
      async nuxtServerInit({ dispatch }) {
        await dispatch("category/fetchCategories");
        await dispatch("tag/fetchTags");
      },
    },
    getters: {},
    modules: {
      card,
      option,
      user,
      file,
      plan,
      category,
      tag,
    },
  });
};

export default createStore;
