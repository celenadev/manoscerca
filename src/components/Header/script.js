import Breadcrumb from '@/components/Breadcrumb/index.vue';
import HamburgerMenu from '@/components/HamburgerMenu/index.vue'

export default {
  name: 'Header',
  components: {
    Breadcrumb,
    HamburgerMenu,
  },
  data() {
    return {
      isMobile: false,
      isLoggedIn: !!localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type')
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize );
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
    goToProfile()
    {
        if(this.$route.path !== `/profile-${this.type}/${this.id}`) {
          this.$router.push(`/profile-${this.type}/${this.id}`);
        } else {
          window.location.reload();
        }
    }
  }
}
