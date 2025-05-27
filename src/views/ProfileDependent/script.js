
import DependentApi from '@/api/DependentApi';
import commentApi from '@/api/commentApi';
import Comment from '@/components/Comment';
import {
  notifySuccess,
} from "@/Languaje/notifications";

export default {
  name: 'ProfileDependent',
  components: {
    Comment
  },
  data() {
    return {
      dependent: {
        tasks: []
      },
      currentDate: new Date(),
      comments: [], //almacena los comentarios
      dependentUserId: null,
      authenticatedUserId: null,
      UserName: localStorage.getItem('name')  || 'Usuario Anónimo',

    };
  },
  mounted() {
    this.loadDependent();
    this.loadComments(); // Línea para cargar los comentarios
    this.$bus.$on("edit-dependents", () => this.loadDependent())//  edit-dependent creado ahora para ser usado una vez se editan los datos , recarga automaticamente
    this.authenticatedUserId = localStorage.getItem('userId');
  },
  computed: {
    imageUrl() {
      return `http://localhost:4000/uploads/${this.dependent.image}`;
    },
    // showEditButton() {
    //   return this.authenticatedUserId && this.dependentUserId && this.authenticatedUserId === this.dependentUserId.toString(); // Usa dependentUserId
    // },
     showEditButton() {
      const authenticatedUserType = localStorage.getItem('type');
      const authenticatedUserIdFromLS = localStorage.getItem('userId');
      // Condición 1: Si el usuario autenticado es un superadmin
      const isSuperadmin = authenticatedUserType === 'superadmin';
      // Condición 2: Si el usuario autenticado es el mismo dependent que el perfil que se está viendo
      // Usamos el ID directamente del localStorage para la comparación
      const isDependentOwner = authenticatedUserIdFromLS && this.dependentUserId && authenticatedUserIdFromLS === this.dependentUserId.toString();
      // El botón se mostrará si es un superadmin O si es el dependent propietario del perfil
      return isSuperadmin || isDependentOwner;
    },
      showLogoutButton() {
      const authenticatedUserType = localStorage.getItem('type');
      return authenticatedUserType === 'dependent';
    },
    isOwnProfile() {
      return this.authenticatedUserId && this.dependentUserId && this.authenticatedUserId === this.dependentUserId.toString();
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
          this.dependentUserId = dependentData.user_id;
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
    // añadir un nuevo comentario
    async addNewComment(comment) {
      try {
        let data = {
          ...comment,
          id_dependents: this.$route.params.id,
          name: this.UserName
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
        const commentsData = response.body.comments || [];
        if (this.authenticatedUserId && this.dependentUserId && this.authenticatedUserId === this.dependentUserId.toString()) {
          if (commentsData.length > 0) {
            this.comments = commentsData;
          } else {
            this.comments = [{ message: "No hay comentarios en tu perfil." }];
          }
        } else {
          this.comments = commentsData;
        }
      } catch (error) {
        console.log('Error al obtener los comentarios', error);
      }
    },
    openEditModal() {
      this.$bus.$emit('open-dependent-modal', this.dependent);
    },
    updateDependent(updatedDependent) {
      this.dependent = updatedDependent;
    },
    //cerrar Sesión de usuario logueado
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('userId');
      localStorage.removeItem('type');
      localStorage.removeItem('id');
      localStorage.removeItem('city');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      this.$bus.$emit("logout")
      this.$router.push('/vista-login');
    }
  }
};