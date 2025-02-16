export default {
    name: 'DependentCard',
    props: {
        dependent: {
            type: Object,
            default: {}
        }
    },
    computed: {
        imageUrl() {
            return `http://localhost:4000/uploads/${this.dependent.image}`;
        }
    }
}