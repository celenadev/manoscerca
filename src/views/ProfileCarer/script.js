import CarerApi from '@/api/CarerApi';

export default {
  name: 'ProfileCarer', // Recibir los datos y hace la solicitud correcta
  data() {
    return {
      carer: {},
      currentDate: new Date()
    };
  },
  created() {
    this.loadCarer();
  },
  methods: {
    async loadCarer() {
      try {
        // this.$route.params.id) Para obtener parámetros
        const response = await CarerApi.getById(this.$route.params.id);
        this.carer = response.body[0];
      } catch (error) {
        console.error('Error al obtener el cuidador');
      }
    }
  }
};
