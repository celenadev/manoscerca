export default {
    name: 'views-complete-role',
    data() {
        return {
            selectedRole: null,
            errorMessage: ''
        };
    },
    methods: {
        selectRole(role) {
            this.selectedRole = role;
            this.errorMessage = '';
        },
        openDialog() {
            if (this.selectedRole) {
                if (this.selectedRole === 'dependent') {
                    this.$bus.$emit('open-dependent-modal');
                } else if (this.selectedRole === 'carer') {
                    this.$bus.$emit('open-carer-modal');
                }
            } else {
                this.errorMessage = 'Debe seleccionar una opción antes de continuar.';
            }
        }
    }
};