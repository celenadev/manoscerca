import DependentApi from "@/api/DependentApi";
import commentApi from "@/api/commentApi";
import Comment from "@/components/Comment";
import { notifySuccess } from "@/Languaje/notifications";

export default {
  name: "ProfileDependent",
  components: {
    Comment,
  },
  data() {
    return {
      dependent: {
        tasks: [],
      },
      currentDate: new Date(),
      comments: [],
      dependentUserId: null,
      authenticatedUserId: null,
      UserName: localStorage.getItem("name") || "Usuario Anónimo",
      type: localStorage.getItem("type")
    };
  },
  mounted() {
    this.loadDependent();
    this.loadComments();
    this.$bus.$on("edit-dependents", () => this.loadDependent());
    this.authenticatedUserId = localStorage.getItem("userId");
  },
  computed: {
    imageUrl() {
      return `${process.env.VUE_APP_BACK_URL}uploads/${this.dependent.image}`;
    },
    showEditButton() {
      const isSuperadmin = this.type === "superadmin";
      const isDependentOwner =
        this.authenticatedUserId &&
        this.dependentUserId &&
        this.authenticatedUserId === this.dependentUserId.toString();
      return isSuperadmin || isDependentOwner;
    },
    showLogoutButton() {
      return this.type === "dependent";
    },
    showContactButton() {
      return this.type !== "dependent";
    },
    isOwnProfile() {
      return (
        this.authenticatedUserId &&
        this.dependentUserId &&
        this.authenticatedUserId === this.dependentUserId.toString()
      );
    },
  },

  methods: {
    async loadDependent() {
      try {
        const response = await DependentApi.getByIdProfile(
          this.$route.params.id
        );
        const data = response.body;

        if (data && data.length > 0) {
          // Verifica si hay datos
          const dependentData = data[0];

          this.dependent = {
            ...dependentData,
            tasks: [], // Inicializa tasks como un array vacío
          };
          this.dependentUserId = dependentData.user_id;
          // Procesa las tareas si existen
          if (dependentData.serviciosArray && dependentData.service_idsArray) {
            for (let i = 0; i < dependentData.serviciosArray.length; i++) {
              this.dependent.tasks.push({
                id_services: dependentData.service_idsArray[i],
                id_tasks_dependents: dependentData.task_idsArray
                  ? dependentData.task_idsArray[i]
                  : null, // Maneja el caso de que task_idsArray sea nulo
                description: dependentData.serviciosArray[i],
              });
            }
          }
        } else {
          console.error("No se encontraron datos para este ID");
        }
      } catch (error) {
        console.error("Error al obtener el usuario familia", error);
      }
    },
    // añadir un nuevo comentario
    async addNewComment(comment) {
      try {
        let data = {
          ...comment,
          id_dependents: this.$route.params.id,
          receiver: this.$route.params.id,
          name: this.UserName,
        };
        await commentApi.addComment(data);
        notifySuccess("Su comentario a sido creado con éxito");
        this.loadComments();
      } catch (error) {
        console.error("Error al añadir el comentario", error);
      }
    },
    // Método para cargar los comentarios del usuario
    async loadComments() {
      try {
        const response = await commentApi.getComments(this.$route.params.id);
        const commentsData = response.body.comments || [];
        if (
          this.authenticatedUserId &&
          this.dependentUserId &&
          this.authenticatedUserId === this.dependentUserId.toString()
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
      this.$bus.$emit("open-dependent-modal", this.dependent);
    },
    updateDependent(updatedDependent) {
      this.dependent = updatedDependent;
    },
    //cerrar Sesión de usuario logueado
    logout() {
      localStorage.clear();
      this.$bus.$emit("logout");
      this.$router.push("/vista-login");
    },
  },
};
