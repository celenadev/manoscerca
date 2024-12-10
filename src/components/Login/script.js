import { Validator, ValidationProvider, ValidationObserver } from 'vee-validate';
import { required, email, min } from 'vee-validate';

// Extender las reglas de validación
Validator.extend('required', {
  ...required,
  getMessage: () => 'Este campo es obligatorio'
});

Validator.extend('email', {
  ...email,
  getMessage: () => 'Introduzca un email válido'
});

Validator.extend('min', {
  ...min,
  getMessage: () => 'La contraseña debe tener al menos 8 caracteres'
});

export default {
  name: 'vistaLogin',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.observer.validate().then(success => {
        if (success) {
          // Lógica para manejar el inicio de sesión
        }
      });
    }
  }
};