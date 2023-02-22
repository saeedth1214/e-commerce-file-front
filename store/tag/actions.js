export default {
  async fetchTags({ commit, state }, payload) {
    let params = {};
    params["per_page"] = payload.per_page;
    let tags = await this.$axios
      .get("frontend/tags", { params })
      .then((res) => {
        return res.data.data;
      });
    await commit("SET_TAGS", tags);
  },
};
