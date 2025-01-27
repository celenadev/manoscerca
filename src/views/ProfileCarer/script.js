import CarerApi from '@/api/CarerApi';

export default {
  name: 'ProfileCarer',
  data() {
    return {
      carer: {
        tasks: []
      },
      currentDate: new Date()
    };
  },
  mounted() {
    this.loadCarer();
  },
  methods: {
    // async loadCarer() {
    //   try {
    //     const response = await CarerApi.getById(this.$route.params.id);
    //     this.carer = response.body[0];
    //   } catch (error) {
    //     console.error('Error al obtener el cuidador');
    //   }
    // },
    async loadCarer() {
          try {
            const response = await CarerApi.getByIdProfileC(this.$route.params.id);
            const data = response.body;
            this.carer = {
              ...data[0],
              tasks: data.map(item => ({
                id_services: item.id_services,
                id_tasks_carer: item.id_tasks_carer,
                service_description: item.service_description
              }))
            };
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
