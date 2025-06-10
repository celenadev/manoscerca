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
            return `${process.env.VUE_APP_BACK_URL}uploads/${this.carer.image}`;
        }
    }
}
