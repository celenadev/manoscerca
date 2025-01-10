import { email, minLength, required } from "vuelidate/lib/validators";

    export default {
        name: 'SignUpComponent',
        data() {
            return {
                name:'Usuario Prueba',
                email: 'usuarioprueba@gmail.com',
                password: 'usuario2025',
                enviado:false
            };
        },
        validations: {
            name: { required},
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
                console.log('Registrandose en el sistema');
            }
        },
    };