export default {
  async sliderFiles(context) {
    let params = {};
    params["include"] = "tags";
    params["sort"] = "created_at";
    await this.$axios
      .$get("frontend/files", { params })
      .then((res) => {
        context.commit("SET_SLIDER_FILES", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async bannerFile(context) {
    let params = {};
    params["sort"] = "rebate";
    params["filters[sale_as_single]"] = 1;
    params["per_page"] = 5;
    await this.$axios
      .get("frontend/files", { params })
      .then((res) => {
        context.commit("SET_BANNER_FILES", res.data.data);
      })
      .catch((err) => console.log(err));
  },

  async setFileId(context, payload) {
    await context.commit("SET_FILE_ID", payload);
  },

  async fetchMostVisited({ commit }) {
    await this.$axios.get("frontend/files/most-visited").then(async (res) => {
      await commit("SET_SLIDER_FILES", res.data.data["most-visited"]);
    });
  },
};
