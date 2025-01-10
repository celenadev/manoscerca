export default {
    name: 'RegistrationRole',
    data() {
        return {
          selectedRole: null,
          errorMessage: ''
        };
      },
      methods: {
        selectRole(role) {
          this.selectedRole = role;
          this.errorMessage = ''; // Limpiar el mensaje de error al seleccionar una opción
        },
        openDialog() {
          if (this.selectedRole) {
            if (this.selectedRole === 'dependent') {
              this.$bus.$emit('open-dependent-dialog');
              console.log('Emitiendo evento con  dependent');
            } else if (this.selectedRole === 'caregiver') {
              console.log('Emitiendo evento con carers');
              this.$bus.$emit('open-caregiver-dialog');
            }
          } else {
            this.errorMessage = 'Debe seleccionar una opción antes de continuar.';
          }
        }
      }
    };