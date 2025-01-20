import DependentApi from '@/api/DependentApi';

export default {
  name: 'ProfileDependent', // Recibir los datos y hace la solicitud correcta
  data() {
    return {
      dependent: {},
      currentDate: new Date()
    };
  },
  created() {
    this.loaddependent();
  },
  methods: {
    async loaddependent() {
      try {
        // this.$route.params.id) Para obtener parámetros
        const response = await DependentApi.getById(this.$route.params.id);
        this.dependent = response.body[0];
      } catch (error) {
        console.error('Error al obtener el cuidador');
      }
    }
  }
};
