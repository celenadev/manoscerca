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
    //  edit-dependent creado ahora para ser usado una vez se editan los datos , recarga automaticamente
    this.$bus.$on("edit-carer", () => this.loadCarer())
  },
  computed: {
    imageUrl() {
        return `http://localhost:4000/uploads/${this.carer.image}`;
    }
},
  methods: {
    async loadCarer() {
      try {
        const response = await CarerApi.getByIdProfile(this.$route.params.id);
        const data = response.body;

        if (data && data.length > 0) { // Verifica si hay datos
          const carerData = data[0]; // Toma el primer elemento (ya que GROUP BY debería devolver solo uno)

          this.carer = {
            ...carerData,
            tasks: [] // Inicializa tasks como un array vacío
          };
          // Procesa las tareas si existen
          if (carerData.serviciosArray && carerData.service_idsArray) {
            for (let i = 0; i < carerData.serviciosArray.length; i++) {
              this.carer.tasks.push({
                id_services: carerData.service_idsArray[i],
                id_tasks_carers: carerData.task_idsArray ? carerData.task_idsArray[i] : null, // Maneja el caso de que task_idsArray sea nulo
                description: carerData.serviciosArray[i]
              });
            }
          }
        } else {
          console.error('No se encontraron datos para este ID');}
      } catch (error) {
        console.error('Error al obtener el cuidador', error);
      }
    },
    openEditModal() {
      this.$bus.$emit('open-carer-modal', this.carer);
    },
    updateCarer(updatedCarer) {
      this.carer = updatedCarer;
    }
  }
};