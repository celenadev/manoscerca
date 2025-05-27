

export default {
  name: "ProfileAdmin",

  data() {
    return {
      superuserName: '', // Para almacenar el nombre del superusuario
      profileImage: '/imagenes/default_admin.png',
    };
  },
  created() {
    // Obtener el nombre del superusuario del localStorage cuando el componente se crea
    this.superuserName = localStorage.getItem('name') || 'Superusuario Desconocido';
  },
  methods: {
    logout() {
      // Limpiar todos los datos del localStorage al cerrar sesión
      localStorage.clear();
      // Redirigir al usuario a la página de inicio o de login
      this.$router.push('/login');
      // Emitir un evento si tienes un bus de eventos para actualizar el estado de autenticación
      this.$bus.$emit("logout");
      this.$message({
        message: 'Sesión cerrada exitosamente.',
        type: 'success',
        duration: 3000
      });
    }
  }
};