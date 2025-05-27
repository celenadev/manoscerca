import NavMenu from '@/components/NavMenu/index.vue';
import HamburgerMenu from '@/components/HamburgerMenu/index.vue'

export default {
  name: 'Header',
  components: {
    NavMenu,
    HamburgerMenu,
  },
  data() {
    return {
      isMobile: false,
      isLoggedIn: false,
    }
  },
  mounted() {
    this.checkScreenSize();
    this.isLoggedIn = !!localStorage.getItem('token');
    window.addEventListener('resize', this.checkScreenSize);
    this.$bus.$on('login', () => this.isLoggedIn = true);
    this.$bus.$on('logout', () => this.isLoggedIn = false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
    this.$bus.$off('login', () => this.isLoggedIn = true);
    this.$bus.$off('logout', () => this.isLoggedIn = false);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    },
    goToProfile() {
      const id = localStorage.getItem('id');
      const type = localStorage.getItem('type');
      const idAdmin = localStorage.getItem('userId');

      let targetPath; // Definimos la ruta de destino aquí

      if (type === 'superadmin') {
        targetPath = `/profile-admin/${idAdmin}`;
      } else {
        targetPath = `/profile-${type}/${id}`;
      }
      if (this.$route.path !== targetPath) {
        this.$router.push(targetPath); // Redirecciona a la ruta calculada
      } else {
        // Si ya estás en la ruta correcta, recarga la página
        window.location.reload();
      }
    }
  }
}