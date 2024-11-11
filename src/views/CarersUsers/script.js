// export default {
//     //Llamada al contenedor creado
//     name: 'carers-users',
//     components: {

//     },

//     data() {
//         return {
//             ourCarers:[
//                 {
//                     id: 1,
//                     img: require('/public/imagenes/abuelos-pareja.jpg'),
//                     title:'Ayuda para tus mayores',
//                     text: 'Tus familiares en las mejores manos.',
//                     description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eaque exercitationem quo quae quia, pariatur, nisi hic sed commodi ullam neque illum nihil sapiente, blanditiis a. Sed voluptatem reiciendis aliquid.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis magnam magni similique vel tempora perspiciatis error distinctio vero quidem dolore? Sint sequi sit commodi obcaecati fuga. Dolorem facilis sit quasi.',
//                 },
//             ],

//         }
//     }
// }
import CarerApi from '@/api/CarerApi'
export default {
    name: 'carers-users',
    created() {
        this.fetchAllCarers();
    },
    data() {
        return {
            ourCarers: []
        };
    },
    methods: {
        fetchAllCarers() {
            // this.axios.get('/api/carers')
            //     .then(response => {
            //         this.ourCarers = response.data;
            //     })
            //     .catch(error => {
            //         console.error(' No hay cuidadores', error);
            //     });
            this.carersList = []
            CarerApi.getAllCarers().then((response) => {
                this.carersList = response.data.data
                this.loading = false
              }).catch(() => { this.loading = false })
        }
        }
};