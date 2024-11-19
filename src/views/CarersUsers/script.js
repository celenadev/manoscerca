import CarerApi from '@/api/CarerApi';
import axios from 'axios';

export default {
    name: 'CarersUsers',
    data() {
        return {};
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
