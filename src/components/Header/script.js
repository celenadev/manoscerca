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
      const id = localStorage.getItem('id');
      const type = localStorage.getItem('type');
        if(this.$route.path !== `/profile-${type}/${id}`) {
          this.$router.push(`/profile-${type}/${id}`);
        } else {
          window.location.reload();
        }
    }
  }
}
