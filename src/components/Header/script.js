import NavMenu from "@/components/NavMenu/index.vue";
import HamburgerMenu from "@/components/HamburgerMenu/index.vue";

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
            isSuperadmin: false, // NEW: Add this data property
        }
    },
    mounted() {
        this.checkScreenSize();
        this.isLoggedIn = !!localStorage.getItem('token');
        this.isSuperadmin = localStorage.getItem('type') === 'superadmin';

        window.addEventListener('resize', this.checkScreenSize);
        this.$bus.$on('login', () => {
            this.isLoggedIn = true;
            this.isSuperadmin = localStorage.getItem('type') === 'superadmin';
        });
        this.$bus.$on('logout', () => {
            this.isLoggedIn = false;
            this.isSuperadmin = false;
        });
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

            let targetPath;

            if (type === 'superadmin') {
                targetPath = `/profile-admin/${idAdmin}`;
            } else {
                targetPath = `/profile-${type}/${id}`;
            }
            if (this.$route.path !== targetPath) {
                this.$router.push(targetPath);
            } else {
                window.location.reload();
            }
        },
        logout() {
            localStorage.clear();
            this.$router.push('/vista-login'); // Changed to '/vista-login' as per your original template for login
            this.$bus.$emit("logout");
            this.$router.push("/vista-login");
            this.$message({
                message: 'Sesión cerrada exitosamente.',
                type: 'success',
                duration: 5000
            });
        }
    }
}