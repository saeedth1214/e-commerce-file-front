export default {
  async fetchTags({ commit, state }) {
    let params = {};
    params["per_page"] = 10;
    let tags = await this.$axios
      .get("frontend/tags", { params })
      .then((res) => {
        return res.data.data;
      });
    await commit("SET_TAGS", tags);
  },
};
