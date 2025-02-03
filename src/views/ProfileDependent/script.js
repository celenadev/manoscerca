
import DependentApi from '@/api/DependentApi';

export default {
  name: 'ProfileDependent',
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
    async loadDependent() {
        try {
            const response = await DependentApi.getByIdProfile(this.$route.params.id);
            const data = response.body;

            console.log(data); // Verifica los datos recibidos

            if (data && data.length > 0) { // Verifica si hay datos
                const dependentData = data[0]; // Toma el primer elemento (ya que GROUP BY debería devolver solo uno)

                this.dependent = {
                    ...dependentData,
                    tasks: [] // Inicializa tasks como un array vacío
                };
                console.log(this.dependent);

                // Procesa las tareas si existen
                if (dependentData.serviciosArray && dependentData.service_idsArray) {
                    for (let i = 0; i < dependentData.serviciosArray.length; i++) {
                        this.dependent.tasks.push({
                            id_services: dependentData.service_idsArray[i],
                            id_tasks_dependents: dependentData.task_idsArray ? dependentData.task_idsArray[i] : null, // Maneja el caso de que task_idsArray sea nulo
                            service_description: dependentData.serviciosArray[i]
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
      this.$bus.$emit('open-dependent-modal', this.dependent);
    },
    updateDependent(updatedDependent) {
      this.dependent = updatedDependent;
    }
  }
};

// async loaDependent() {
//   try {
//     const response = await DependentApi.getById(this.$route.params.id);
//     this.dependent = response.body[0];
//   } catch (error) {
//     console.error('Error al obtener el cuidador');
//   }
// },
