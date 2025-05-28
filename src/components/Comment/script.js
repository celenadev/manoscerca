import { notifyInfo } from "@/Languaje/notifications";
import commentApi from "@/api/commentApi";
export default {
    name: 'Comment',
    props: {
        comments: {
            type: Array,
            default: [],
        },
        isOwnProfile: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String
        }
    },
    data() {
        return {
            showForm: false,
            comentario: '',
            newCommentRating: 0,
            authenticatedUserId: parseInt(localStorage.getItem("id")) || "",
            authenticatedUserType: localStorage.getItem("type") || "",
        };
    },
    computed: {
        canAddComment() {
            return localStorage.getItem("type") !== this.type;
        }
    },

    methods: {
        async submitComment() {
            if (this.comentario.trim() === '') {
                notifyInfo("El comentario no puede estar vacío");
                return;
            }
            if (this.newCommentRating === 0) {
                notifyInfo("Por favor, selecciona una valoración para tu comentario.");
                return;
            }

            if (!this.authenticatedUserId || !this.authenticatedUserType) {
                notifyInfo("Error: No se encontró el ID o el tipo de usuario autenticado.");
                return;
            }

            // Obtener el ID del receptor
            const receptorId = this.targetUserId || this.$route.params.id;

            if (!receptorId) {
                notifyInfo("Error: No se encontró el ID del usuario receptor.");
                return;
            }

            // Validar que solo se pueda comentar entre dependent y carer
            if (!this.canAddComment) {
                notifyInfo("No puedes comentar a un usuario de tu mismo grupo.");
                return;
            }
            // Obtener el ID correcto del dependent antes de enviar el comentario
            let id_dependents = "";
            let id_carers = "";

            if (this.authenticatedUserType === "carer") {
                id_dependents = receptorId;
                id_carers = this.authenticatedUserId;
            } else if (this.authenticatedUserType === "dependent") {
                id_carers = receptorId;
                id_dependents = this.authenticatedUserId;
            }

            // Crear objeto de comentario con los IDs correctos
            const newComment = {
                description: this.comentario,
                date: new Date().toISOString().split("T")[0],
                rating: this.newCommentRating,
                id_carers,
                id_dependents
            };

            try {
                await this.$emit("add-comment", newComment);
                this.comentario = "";
                this.newCommentRating = 0;
                this.showForm = false;
            } catch (error) {
                console.error("Error al enviar el comentario:", error);
            }
        },
        canDeleteComment(comment) {
            const isSuperAdmin = this.authenticatedUserType === "superadmin";
            let isCommentOwner;

            if (this.authenticatedUserType === 'dependent') {
                isCommentOwner = comment.id_dependents === this.authenticatedUserId && comment.receiver !== this.authenticatedUserId;
            }
            else {
                isCommentOwner = comment.id_carers === this.authenticatedUserId && comment.receiver !== this.authenticatedUserId;
            }

            return isSuperAdmin || isCommentOwner;
        },

        async handleDeleteComment(comment) {
            try {
                await commentApi.deleteComment(comment.id_comment);
                notifyInfo("Comentario eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar el comentario:", error);
                notifyInfo("Hubo un problema al eliminar el comentario");
            }
        }
    }
}
