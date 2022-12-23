
export default (context) => {
    if (process.client) {
        context.store.commit('option/setBasketItems');
    }
}

