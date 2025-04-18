import { notifyInfo } from "@/Languaje/notifications";
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
    },
    data() {
        return {
            showForm: false,
            comentario: '',
        };
    },
    methods: {
        async submitComment() {
            if (this.comentario.trim() === '') {
                notifyInfo("El comentario no puede estar vacío");
                return;
            }
            const newComment = {
                description: this.comentario,
                date: new Date().toISOString().split('T')[0], // Formato de fecha YYYY-MM-DD
            };
            try {
                await this.$emit('add-comment', newComment);
                this.comentario = '';
                this.showForm = false;
            } catch (error) {
                console.error('Error al enviar el comentario:', error);
            }
        },
    },
};
