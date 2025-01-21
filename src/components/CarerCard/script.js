import CarerApi from '@/api/CarerApi'
export default {
    name: 'CarerCard',
    data() {
        return {
            carers: [],
            currentDate: new Date()
        };
    },
    created() {
        this.loadAllCarers();
    },
    methods: {
        goToProfile(id) {
            this.$router.push({ name: 'profile-carer', params: { id } });
        },
        async loadAllCarers() {
            try {
                const response = await CarerApi.getAll();
                this.carers = response.body;
            } catch (error) {
                console.error('Error al obtener los cuidadores:', error);
            }
        }
    }
}