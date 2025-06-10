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
            return `${process.env.VUE_APP_BACK_URL}uploads/${this.dependent.image}`;
        }
    }
}