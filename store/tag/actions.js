export default {
  async fetchTags({ commit, state }) {
    let tags = await this.$axios
      .get("frontend/tags/landing-page")
      .then((res) => {
        return res.data.data;
      });
    await commit("SET_TAGS", tags);
  },
};
