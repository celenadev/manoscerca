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
    async loadCarer() {
      try {
        const response = await CarerApi.getByIdProfile(this.$route.params.id);
        const data = response.body;

        console.log(data); // Verifica los datos recibidos

        if (data && data.length > 0) { // Verifica si hay datos
          const carerData = data[0]; // Toma el primer elemento (ya que GROUP BY debería devolver solo uno)

          this.carer = {
            ...carerData,
            tasks: [] // Inicializa tasks como un array vacío
          };
          console.log(this.carer);

          // Procesa las tareas si existen
          if (carerData.serviciosArray && carerData.service_idsArray) {
            for (let i = 0; i < carerData.serviciosArray.length; i++) {
              this.carer.tasks.push({
                id_services: carerData.service_idsArray[i],
                id_tasks_carers: carerData.task_idsArray ? carerData.task_idsArray[i] : null, // Maneja el caso de que task_idsArray sea nulo
                service_description: carerData.serviciosArray[i]
              });
            }
          }
        } else {
          console.warn("No se encontraron datos para este ID.");
          // Puedes manejar este caso mostrando un mensaje al usuario, redirigiendo, etc.
        }
      } catch (error) {
        console.error('Error al obtener el cuidador', error);
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


// async loadCarer() {
//   try {
//     const response = await CarerApi.getById(this.$route.params.id);
//     this.carer = response.body[0];
//   } catch (error) {
//     console.error('Error al obtener el cuidador');
//   }
// },