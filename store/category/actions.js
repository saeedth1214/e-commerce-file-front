export default {
  async fetchCategoriesForFilterFiles({ commit, state }) {
    let params = {};
    params["per_page"] = 4;
    if (!Object.keys(state).length) {
      console.log(state, "state");
      let categories = await this.$axios
        .get("frontend/categories", { params })
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => console.log(err));
      await commit("SET_CATEGORIES_FOR_FILTER_FILES", categories);
    }
  },

  async fetchCategories({ commit, state }) {
    if (!Object.keys(state).length) {
      let categories = await this.$axios
        .get("frontend/categories")
        .then((res) => {
          return res.data.data;
        });
      await commit("SET_CATEGORIES", categories);
    }
  },

  async fetchMenuBarCategories({ commit, state }) {
    let categories = await this.$axios
      .get("frontend/categories/menubar?include=subCategories")
      .then((res) => {
        return res.data.data;
      });
    await commit("SET_MENU_BAR_CATEGORIES", categories);
  },

  async selectFilterCategory({ commit, state }, payload) {
    let category = state.menuBarCategories.find(
      (item) => item.name === payload
    );
    await commit("SET_FILTER_CATEGORY", category);
  },
};
