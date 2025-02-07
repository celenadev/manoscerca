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
      totalRecords: 0
    }
  },
  created() {
    this.loadDependents();
  },
  methods: {
    buscar()
    {
      const filters = {};
      filters.city = this.filters.city !== '' ? this.filters.city : undefined;
      filters.work_day = this.filters.work_day !== '' ? this.filters.work_day : undefined;
      this.loadDependents(this.page, filters);
    },
    async loadDependents(page = 1, filters = {},limit = this.pageSize) {
      try {
        const response = await DependentApi.getPaginated(page, limit, filters);
        this.dependents = response.body.data;
        this.currentPage = response.body.currentPage;
        this.totalPages = response.body.totalPages;
        this.totalRecords = response.body.totalRecords;
      } catch (error) {
        console.error('Error al obtener los perfiles  de familiares:', error);
      }
    }
  }

}