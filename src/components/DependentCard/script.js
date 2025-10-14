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
            let image = 'default-profile.jpg';
            if(this.dependent.image) {
                image = this.dependent.image;
            }
            return `${process.env.VUE_APP_BACK_URL}uploads/${image}`;
        }
    }
}