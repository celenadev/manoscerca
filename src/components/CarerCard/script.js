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
            let image = 'default-profile.jpg';
            if(this.carer.image) {
                image = this.carer.image;
            }
            return `${process.env.VUE_APP_BACK_URL}uploads/${image}`;
        }
    }
}
