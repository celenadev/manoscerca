import CarerCard from '@/components/CarerCard/index.vue';
import CarerApi from '@/api/CarerApi';

export default {
    name: 'CarersUsers',
    components: {
        CarerCard
    },
    data() {
        return {
            filters: {
                city: '',
                work_day: '',
                year: ''
            },
            carers: [],
            currentPage: 1,
            totalPages: 1,
            totalRecords: 0
        }
    },
    created() {
        this.loadCarers();
    },
    methods: {
        buscar() {
            const filters = {};
            filters.city = this.filters.city !== '' ? this.filters.city : undefined;
            filters.year = this.filters.year !== '' ? this.filters.year : undefined;
            filters.work_day = this.filters.work_day !== '' ? this.filters.work_day : undefined;
            this.loadCarers(this.page, filters);
        },
        async loadCarers(page = 1, filters = {}, limit = 5) {
            try {
                const response = await CarerApi.getPaginated(page, limit, filters);
                this.carers = response.body.data;
                this.currentPage = response.body.currentPage;
                this.totalPages = response.body.totalPages;
                this.totalRecords = response.body.totalRecords;
            } catch (error) {
                console.error('Error al obtener los perfiles  de cuidadores:', error);
            }
        }
    }

}