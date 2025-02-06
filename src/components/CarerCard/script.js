export default {
    name: 'CarerCard',
    props: {
        carer: {
            type: Object,
            default: {}
        }
    },
    computed: {
        imageUrl() {
            return `http://localhost:4000/uploads/${this.carer.image}`;
        }
    }
}
