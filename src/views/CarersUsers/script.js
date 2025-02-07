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
            totalRecords: 0,
            pageSize: 3 // Define el tamaño de página aquí
        }
    },
    created() {
        this.loadCarers();
    },
    methods: {
        buscar() {
            this.currentPage = 1;
            const filters = {
                city: this.filters.city || undefined,
                year: this.filters.year || undefined,
                work_day: this.filters.work_day || undefined,
            };
            this.loadCarers(this.currentPage, filters); // Corregido: usa currentPage y pasa filtros
        },
        async loadCarers(page = 1, filters = {}, limit = this.pageSize) {
            try {
                const response = await CarerApi.getPaginated(page, limit, filters);
                this.carers = response.body.data;
                this.currentPage = response.body.currentPage;
                this.totalRecords = response.body.totalRecords;
                this.totalPages = Math.ceil(this.totalRecords / this.pageSize); // Se calcula una sola vez
                console.log("Respuesta de la API:", response.body); // Para depurar
            } catch (error) {
                console.error('Error al obtener los perfiles de cuidadores:', error);
            }
        },
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.loadCarers(newPage, this.filters);
          },
    }

}