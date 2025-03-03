import CarerApi from '@/api/CarerApi';
import commentApi from '@/api/commentApi';
import Comment from '@/components/Comment';
import {
  notifySuccess,
 } from "@/Languaje/notifications";

export default {
  name: 'ProfileCarer',
  components: {
    Comment
  },
  data() {
    return {
      carer: {
        tasks: []
      },
      currentDate: new Date(),
      comments: [], //almacena los comentarios
      carerUserId: null, // Agrega esta propiedad
      authenticatedUserId: null, // ID del usuario autenticado
    };
  },
  mounted() {
    this.loadCarer();
    this.loadComments(); // Línea para cargar los comentarios
    this.$bus.$on("edit-carer", () => this.loadCarer())//  edit-dependent creado ahora para ser usado una vez se editan los datos , recarga automaticamente
    this.authenticatedUserId = localStorage.getItem('userId'); // Obtener el userId del localStorage
  },
  computed: {
    imageUrl() {
      return `http://localhost:4000/uploads/${this.carer.image}`;
    },
    showEditButton() {
      console.log(".............................");
      console.log("...id de cuidador");
      console.log(this.authenticatedUserId);
      return this.authenticatedUserId && this.carerUserId && this.authenticatedUserId === this.carerUserId.toString(); // Usa carerUserId
    },
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
          this.carerUserId = carerData.user_id; // Obtiene el user_id del cuidador

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
          console.error('No se encontraron datos para este ID');
        }
      } catch (error) {
        console.error('Error al obtener el cuidador', error);
      }
    },

    // añadir un nuevo comentario
    async addNewComment(comment) {
      try {
        let data = {
          ...comment,
          id_carers: this.$route.params.id
        }

        await commentApi.addComment(data);
        notifySuccess("Su comentario a sido creado con éxito");
        this.loadComments(); // Recarga los comentarios después de añadir uno nuevo
      } catch (error) {
        console.error('Error al añadir el comentario', error);
      }
    },
    // Método para cargar los comentarios del usuario
    async loadComments() {
      try {
        const response = await commentApi.getComments(this.$route.params.id);
        this.comments = response.body.comments || []; // Accede directamente al array o asigna un array vacío
      } catch (error) {
        console.log('Error al obtener los comentarios', error);
      }
    },
    openEditModal() {
      this.$bus.$emit('open-carer-modal', this.carer);
    },
    updateCarer(updatedCarer) {
      this.carer = updatedCarer;
    },
  }
};