
export default {
    SET_FILES(state, payload) {
        state.files = payload;
    },
    SET_PAGINATION(state, payload) {
        state.pagination = payload;
    },

    SET_BANNER_FILES(state, payload) {
        state.bannerFiles = payload;
    },

    SET_SLIDER_FILES(state, payload) {
        state.sliderFiles = payload;
    },

    SET_SLIDER_PLANS(state, payload) {
        state.sliderPlans = payload;
    },
    SET_FILE_ID(state, payload) {
        state.id = payload;
    },
}