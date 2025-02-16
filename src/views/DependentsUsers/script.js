import DependentCard from '@/components/DependentCard/index.vue';
import DependentApi from '@/api/DependentApi';

export default {
  name: 'DependentsUsers',
  components: {
    DependentCard
  },
  data() {
    return {
      filters: {
        city: '',
        work_day: ''
      },
      dependents: [],
      currentPage: 1,
      totalPages: 1,
      totalRecords: 0,
      pageSize: 3 // Define el tamaño de página aquí
    }
  },
  created() {
    this.loadDependents();
  },
  methods: {
    buscar() {
      this.currentPage = 1;
      const filters = {
        city: this.filters.city || undefined,
        work_day: this.filters.work_day || undefined,
      };
      this.loadDependents(this.currentPage, filters);
    },
    async loadDependents(page = 1, filters = {}, limit = this.pageSize) {
      try {
        const response = await DependentApi.getPaginated(page, limit, filters);
        this.dependents = response.body.data;
        this.totalRecords = response.body.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      } catch (error) {
        console.error('Error al obtener los perfiles de familias:', error);
      }
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.loadDependents(newPage, this.filters);
    },
  }
}