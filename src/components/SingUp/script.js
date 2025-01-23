import { required } from "vuelidate/lib/validators";

export default {
    name: 'SignUpComponent',
    data() {
        return {
            name: '',
            message: 'He revisado tu perfil en ManosCerca.es y me ha parecido muy interesante. Creo que podríamos tener una buena oportunidad de colaboración. Me gustaría ponerme en contacto contigo para discutir más detalles y ver cómo podemos ayudarnos mutuamente. Gracias y espero tu respuesta.',
            enviado: false
        };
    },
    validations: {
        name: { required }
    },
    methods: {
        validate() {
            this.enviado = true;
            // si el formulario es inválido, no continúa
            if (this.$v.$invalid) {
                return
            }
        }
    },
};