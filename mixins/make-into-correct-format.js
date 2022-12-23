export default {
    methods: {
        makeIntoCorrectFormat(title) {
            return title.replace('/\s+/g', '_');
        },
        makeIntoCorrectApiRequest(title) {
            return title.replace('/_/',' ');
        },
    }
}