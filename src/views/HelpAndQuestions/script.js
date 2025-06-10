
import { email, required } from "vuelidate/lib/validators";
import { notifyInfo } from "@/Languaje/notifications";
import ContactManosCercaApi from "@/api/ContactManosCercaApi";

export default {
    name: 'HelpAndQuestions',
    data() {
        return {
            email: '',
            message: 'He revisado las preguntas frecuentes pero no he encontrado respuesta a mi situación. Me gustaría saber si pueden orientarme sobre.....',
            name:'',
            enviado: false
        };
    },
    validations: {
        email: { required, email },
        message: { required },
        name:{ required }
    },
    methods: {
        async validate() {
            this.enviado = true;
            if (this.$v.$invalid) {
                return;
            }
            try {
                const response = await ContactManosCercaApi.sentContact({
                    email: this.email,
                    name: this.name,
                    message: this.message
                });

                if (response.status >= 200 && response.status < 300) {
                    this.showAlert();
                    this.email = '';
                    this.message = '';
                    this.name = '';
                    this.enviado = false;
                } else {
                    console.error('Error al enviar el mensaje:', response.data);
                }

            } catch (error) {
                console.error('Error de conexión con el servidor:', error);
            }
        },
        showAlert() {
            notifyInfo(" Estamos trabajando en su consulta ¡Gracias por contactarnos!");
        }
    }
};