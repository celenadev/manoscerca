import CarerApi from '@/api/CarerApi';

export default {
  name: 'ProfileCarer',
  data() {
    return {
      carer: {},
      currentDate: new Date()
    };
  },
  mounted() {
    this.loadCarer();
  },
  methods: {
    async loadCarer() {
      try {
        const response = await CarerApi.getById(this.$route.params.id);
        this.carer = response.body[0];
      } catch (error) {
        console.error('Error al obtener el cuidador');
      }
    },
    openEditModal() {
      console.log();
      this.$bus.$emit('open-carer-modal', this.carer);
    },
    updateCarer(updatedCarer) {
      this.carer = updatedCarer;
      // Lógica para actualizar el cuidador en el backend si es necesario
    }
  }
};
