import DependentApi from '@/api/DependentApi';
export default {
    name: 'DependentCard',
    data() {
        return {
            dependents: [],
            currentDate: new Date()
        };
    },
    created() {
        this.loadAllDependents();
    },
    methods: {
        async loadAllDependents() {
            try {
                const response = await DependentApi.getAll();
                this.dependents = response.body;
            } catch (error) {
                console.error('Error al obtener los perfiles  de familiares:', error);
            }
        }
    }
}