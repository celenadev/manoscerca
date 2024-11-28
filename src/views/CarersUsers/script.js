import CarerApi from '@/api/CarerApi';
import axios from 'axios';

export default {
    name: 'CarersUsers',
    data() {
        return {
            usuarios: [
                {
                    id: '1',
                    formation: '',
                    first_name: '',
                    last_name: '',
                    address: '',
                    email: '',
                    imagen: ''
                },
                {
                    id: '2',
                    formation: '',
                    first_name: '',
                    last_name: '',
                    address: '',
                    email: '',
                    imagen: ''
                },
                {
                    id: '3',
                    formation: '',
                    first_name: '',
                    last_name: '',
                    address: '',
                    email: '',
                    imagen: ''
                },

            ]



        };
    },
    mounted() {
        this.getCarers();
    },
    methods: {
        getCarers() {
            axios.get(CarerApi + "?opc=list")
                .then(function(response) {
                    console.log(response.data.carers);
                })
                .catch(function(error) {
                    console.error(error);
                });
        }
    }
};
