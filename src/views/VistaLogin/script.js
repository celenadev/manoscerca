
    import {email, minLength, required} from "vuelidate/lib/validators";
    import UserApi from '@/api/UserApi';

    export default {
        name: 'vistaLogin',
    data() {
    return {
        enviado: false,
    email: '',
    password: '',
    loginError: ''
    };
  },
    validations: {
        email: {required, email},
    password: {required, minLength: minLength(6) }
  },
    methods: {
        async login() {
        this.enviado = true;
    this.$v.$touch(); // Llama a $v.$touch() antes de la validación
    if (this.$v.$invalid) {
        return;
      }

    try {
        const response = await UserApi.login(this.email, this.password);

    if (response.success) {
        this.$router.push('/');
        } else {
        this.loginError = response.message || 'Error al iniciar sesión. Revise sus credenciales';
        }
      } catch (error) {
        console.error("Error en el login:", error);
    this.loginError = 'Error al iniciar sesión';
      }
    },

    validate() {
        this.login(); // Llama a login después de la validación
    },
  },
};
