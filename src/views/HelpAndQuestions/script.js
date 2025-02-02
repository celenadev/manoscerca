import { email, required } from "vuelidate/lib/validators";
import { notifyInfo } from "@/Languaje/notifications";

export default {
    name: 'HelpAndQuestions',
    data() {
        return {
            email: '',
            mensaje: '',
            name:'',
            enviado: false
        };
    },
    validations: {
        email: { required, email },
        mensaje: { required },
        name:{ required }
    },
    methods: {
        validate() {
            this.enviado = true;
            if (this.$v.$invalid) {
                return;
            }
            this.mostrarAlerta();
        },
        mostrarAlerta() {
            notifyInfo(" Estamos trabajando en su consulta ¡Gracias por contactarnos!");
        }
    }
};