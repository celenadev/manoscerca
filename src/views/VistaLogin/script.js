
import { email, minLength, required } from "vuelidate/lib/validators";
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
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async login() {
      this.enviado = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        const response = await UserApi.login(this.email, this.password);
        if (response.success) {
          localStorage.setItem('token', response.user.token);
          console.log(response.user.expiresIn);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('type', response.user.type);
          localStorage.setItem('id', response.user.typeId);
          localStorage.setItem('name', response.user.name);
          localStorage.setItem('city', response.user.city);
          localStorage.setItem('email', response.user.email);
          this.$bus.$emit("login")
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
      this.login();
    },
  },
};