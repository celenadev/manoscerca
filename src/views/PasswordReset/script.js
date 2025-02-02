import { email, required } from "vuelidate/lib/validators";
import { notifyInfo } from "@/Languaje/notifications";

export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            enviado: false
        };
    },
    validations: {
        email: { required, email }
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
            notifyInfo("Te hemos enviado un correo electrónico. Por favor, verifica el estado de tu cuenta si no recibes el correo en unos minutos.");
        }
    }
};