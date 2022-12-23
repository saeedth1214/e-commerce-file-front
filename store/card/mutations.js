export default {
    loadCard(state) {
        const card = localStorage.getItem('freeCard');
        if (card) {
           state.card = JSON.parse(card);
        }
    },
    addToCard(state, product) {
        const itemFound = state.card.find(p => p.product.id === product.id);
        if (!itemFound) {
            state.card.push({
                product,
                quantity: 1
            })
        }

        if (itemFound) {
            itemFound.quantity += 1;
        }

        localStorage.setItem('freeCard', JSON.stringify(state.card));

        this.$swal({
            toast: true,
            text: 'Card updated',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end'
        })
    },
    decreaseItemCount(state, index) {
        let item = state.card[index];
        if (!item) return;
        if (state.quantity === 1) {
            state.card.splice(index, 1);
        } else {
            item.quantity -= 1;
        }

        this.$swal({
            toast: true,
            text: 'Card updated',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end'
        })
        localStorage.setItem('freeCard', JSON.stringify(state.card));
    },

    removeCardItem(state, index) {
        state.card.splice(index, 1);
        this.$swal({
            toast: true,
            text: 'Card updated',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end'
        })
        localStorage.setItem('freeCard', JSON.stringify(state.card));
    },
    increaseItemCount(state, index) {
        let item = state.card[index];
        item.quantity += 1;
        this.$swal({
            toast: true,
            text: 'Card updated',
            icon: 'success',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end'
        })
        localStorage.setItem('freeCard', JSON.stringify(state.card));
    },

    clearCard(state) {
        state.card = [];
        localStorage.removeItem('freeCard');
    }
}