export default {
    name: 'hamburger-menu',
    data() {
      return {
        menuOpen: false
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      }
    }
  };