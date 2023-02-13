export default {
  SET_CATEGORIES_FOR_FILTER_FILES(state, payload) {
    state.fileFilterCategory = payload;
  },

  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },
  SET_MENU_BAR_CATEGORIES(state, payload) {
    state.menuBarCategories = payload;
  },
  SET_SELECTED_CATEGORY(state, payload) {
    state.selectedCategory = payload;
  },
};
