
import { email, minLength, required } from "vuelidate/lib/validators";
import UserApi from '@/api/UserApi';

export default {
  name: 'vistaLogin',
  data() {
    return {
      enviado: false,
      email: '',
      password: '',
      loginError: '',
      isLoading: false
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

      this.isLoading = true;
      this.loginError = '';

      try {
        const response = await UserApi.login(this.email, this.password);
        this.isLoading = false;
        if (response.success) {
          localStorage.setItem('token', response.user.token);
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('type', response.user.type);
          localStorage.setItem('id', response.user.typeId);
          localStorage.setItem('name', response.user.name);
          localStorage.setItem('city', response.user.city);
          localStorage.setItem('email', response.user.email);
          this.$bus.$emit("login");
          this.$router.push('/');
          this.$message({
            message: `¡Bienvenido/a, ${response.user.name}!`,
            type: 'success',
            duration: 3000
          });
        } else {
          this.loginError = response.message || 'Error al iniciar sesión.';
          this.$message({
            message: this.loginError,
            type: 'error',
            duration: 3000
          });
        }
      } catch (error) {
        this.loginError = 'Error al iniciar sesión, Revise sus credenciales';
        this.isLoading = false;
        this.$message({
          message: this.loginError,
          type: 'error',
          duration: 3000
        });
      }
    },
    validate() {
      this.login();
    },
  },
};