import Breadcrumb from '@/components/Breadcrumb/index.vue';
import HamburgerMenu from '@/components/HamburgerMenu/index.vue'

export default {
    name: 'Header',
    components: {
        Breadcrumb,
        HamburgerMenu,
    },
    data () {
        return {
            isMobile: false
        }
    },
    mounted() {
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);
      },
      beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenSize);
      },
      methods: {
        checkScreenSize() {
          this.isMobile = window.innerWidth <= 768;
        }
      }
}