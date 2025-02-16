
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
    //  edit-dependent creado ahora para ser usado una vez se editan los datos , recarga automaticamente
    this.$bus.$on("edit-dependent", () => this.loadDependent())
  },
  computed: {
    imageUrl() {
      return `http://localhost:4000/uploads/${this.dependent.image}`;
    }
  },
  methods: {
    async loadDependent() {
      try {
        const response = await DependentApi.getByIdProfile(this.$route.params.id);
        const data = response.body;

        if (data && data.length > 0) { // Verifica si hay datos
          const dependentData = data[0]; // Toma el primer elemento (ya que GROUP BY debería devolver solo uno)

          this.dependent = {
            ...dependentData,
            tasks: [] // Inicializa tasks como un array vacío
          };
          // Procesa las tareas si existen
          if (dependentData.serviciosArray && dependentData.service_idsArray) {
            for (let i = 0; i < dependentData.serviciosArray.length; i++) {
              this.dependent.tasks.push({
                id_services: dependentData.service_idsArray[i],
                id_tasks_dependents: dependentData.task_idsArray ? dependentData.task_idsArray[i] : null, // Maneja el caso de que task_idsArray sea nulo
                description: dependentData.serviciosArray[i]
              });
            }
          }
        } else {
          console.error('No se encontraron datos para este ID');
        }
      } catch (error) {
        console.error('Error al obtener el usuario familia', error);
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