import CarerApi from "@/api/CarerApi";
import commentApi from "@/api/commentApi";
import Comment from "@/components/Comment";
import { notifySuccess } from "@/Languaje/notifications";

export default {
  name: "ProfileCarer",
  components: {
    Comment,
  },
  data() {
    return {
      carer: {
        tasks: [],
      },
      currentDate: new Date(),
      comments: [],
      carerUserId: null,
      authenticatedUserId: null,
      UserName: localStorage.getItem("name") || "Usuario Anónimo",
    };
  },
  mounted() {
    this.loadCarer();
    this.loadComments();
    this.$bus.$on("edit-carers", () => this.loadCarer());
    this.authenticatedUserId = localStorage.getItem("userId");
  },
  computed: {
    imageUrl() {
      return `http://localhost:4000/uploads/${this.carer.image}`;
    },
    // showEditButton() {
    //   return this.authenticatedUserId && this.carerUserId && this.authenticatedUserId === this.carerUserId.toString(); // Usa carerUserId
    // },
    isOwnProfile() {
      return (
        this.authenticatedUserId &&
        this.carerUserId &&
        this.authenticatedUserId === this.carerUserId.toString()
      );
    },
    showEditButton() {
      const authenticatedUserType = localStorage.getItem('type');
      const authenticatedUserIdFromLS = localStorage.getItem('userId');
      // Condición 1: Si el usuario autenticado es un superadmin
      const isSuperadmin = authenticatedUserType === 'superadmin';
      // Condición 2: Si el usuario autenticado es el mismo carer que el perfil que se está viendo
      // Usamos el ID directamente del localStorage para la comparación
      const isCarerOwner = authenticatedUserIdFromLS && this.carerUserId && authenticatedUserIdFromLS === this.carerUserId.toString();
      // El botón se mostrará si es un superadmin O si es el carer propietario del perfil
      return isSuperadmin || isCarerOwner;
    },
    showLogoutButton() {
      const authenticatedUserType = localStorage.getItem('type');
      return authenticatedUserType === 'carer';
    }
  },

  methods: {
    async loadCarer() {
      try {
        const response = await CarerApi.getByIdProfile(this.$route.params.id);
        const data = response.body;

        if (data && data.length > 0) {
          const carerData = data[0];

          this.carer = {
            ...carerData,
            tasks: [],
          };
          this.carerUserId = carerData.user_id;

          // Procesa las tareas si existen
          if (carerData.serviciosArray && carerData.service_idsArray) {
            for (let i = 0; i < carerData.serviciosArray.length; i++) {
              this.carer.tasks.push({
                id_services: carerData.service_idsArray[i],
                id_tasks_carers: carerData.task_idsArray
                  ? carerData.task_idsArray[i]
                  : null, // Maneja el caso de que task_idsArray sea nulo
                description: carerData.serviciosArray[i],
              });
            }
          }
        } else {
          console.error("No se encontraron datos para este ID");
        }
      } catch (error) {
        console.error("Error al obtener el cuidador", error);
      }
    },
    // añadir un nuevo comentario
    async addNewComment(comment) {
      try {
        let data = {
          ...comment,
          id_carers: this.$route.params.id,
          name: this.UserName,
        };

        await commentApi.addComment(data);
        notifySuccess("Su comentario a sido creado con éxito");
        this.loadComments();
      } catch (error) {
        console.error("Error al añadir el comentario", error);
      }
    },

    async loadComments() {
      try {
        const response = await commentApi.getComments(this.$route.params.id);
        const commentsData = response.body.comments || [];
        if (
          this.authenticatedUserId &&
          this.carerUserId &&
          this.authenticatedUserId === this.carerUserId.toString()
        ) {
          if (commentsData.length > 0) {
            this.comments = commentsData;
          } else {
            this.comments = [{ message: "No hay comentarios en tu perfil." }];
          }
        } else {
          this.comments = commentsData;
        }
      } catch (error) {
        console.log("Error al obtener los comentarios", error);
      }
    },
    openEditModal() {
      this.$bus.$emit("open-carer-modal", this.carer);
    },
    updateCarer(updatedCarer) {
      this.carer = updatedCarer;
    },

    //cerrar Sesión de usuario logueado
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("userId");
      localStorage.removeItem("type");
      localStorage.removeItem("id");
      localStorage.removeItem("city");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      this.$bus.$emit("logout");
      this.$router.push("/vista-login");
    },
  },
};
