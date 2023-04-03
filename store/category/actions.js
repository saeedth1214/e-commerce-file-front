export default {
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
