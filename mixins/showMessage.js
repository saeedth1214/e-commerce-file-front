export default {
    methods: {
        async showMessage(type, message) {
            await this.$swal({
                title: message,
                icon: type,
                allowEscapeKey: false,
                alloweOutsideClick: false,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
            });
        },
    }
}