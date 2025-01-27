import DependentApi from '@/api/DependentApi';

export default {
  name: 'ProfileDependent', // Recibir los datos y hace la solicitud correcta
  data() {
    return {
      dependent: {
        tasks: []
      },
      currentDate: new Date()
    };
  },
  created() {
    this.loadDependent();
  },
  methods: {
    // async loaDependent() {
    //   try {
    //     const response = await DependentApi.getById(this.$route.params.id);
    //     this.dependent = response.body[0];
    //   } catch (error) {
    //     console.error('Error al obtener el cuidador');
    //   }
    // },
    async loadDependent() {
      try {
        const response = await DependentApi.getByIdProfile(this.$route.params.id);
        const data = response.body;
        this.dependent = {
          ...data[0],
          tasks: data.map(item => ({
            id_services: item.id_services,
            id_tasks_dependent: item.id_tasks_dependent,
            service_description: item.service_description
          }))
        };
      } catch (error) {
        console.error('Error al obtener el cuidador');
      }
    },
    openEditModal() {
      console.log();
      this.$bus.$emit('open-dependent-modal', this.dependent);
    },
    updateDependent(updatedDependent) {
      this.dependent = updatedDependent;
      // Lógica para actualizar el cuidador en el backend si es necesario
    }
  }
};
