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
};
