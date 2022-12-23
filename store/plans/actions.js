export default {

    async sliderPlans(context) {
        let params = {};
        params['sort'] = 'created_at';
        params['page'] = context.state.page;
        await this.$axios.$get('frontend/plans', { params })
            .then(res => {
                context.commit('SET_SLIDER_PLANS', res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },
}