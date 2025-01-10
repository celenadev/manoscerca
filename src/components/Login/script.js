import { email, minLength, required } from "vuelidate/lib/validators";

export default {
    name: 'LoginComponent',
    data() {
        return {
            email: '',
            password: '',
            enviado:false
        };
    },
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) }

    },
    methods: {
        validate() {
            this.enviado = true;
            // si el formulario es inválido, no continúa
            if (this.$v.$invalid) {
                return
            }
            console.log('Accediendo al sistema');
        }
    },
};