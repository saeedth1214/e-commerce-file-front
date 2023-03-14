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
        await dispatch("category/fetchMenuBarCategories");
        await dispatch("tag/fetchLandingTags");
        await dispatch("tag/fetchTags", { per_page: 30 });
        await dispatch("file/fetchMostVisited");
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
