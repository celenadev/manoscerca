import { email, required } from "vuelidate/lib/validators";
import { notifyInfo } from "@/Languaje/notifications";

export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            mensaje: 'He revisado tu perfil en ManosCerca.es y me ha parecido muy interesante. Me gustaría ponerme en contacto contigo para discutir más detalles y ver cómo podemos ayudarnos mutuamente. Gracias y espero tu respuesta.',
            enviado: false
        };
    },
    validations: {
        email: { required, email },
        mensaje: { required }
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
            notifyInfo("Tu mensaje ha sido enviado con éxito. Te responderemos a la brevedad. ¡Gracias por contactarnos!");
        }
    }
};