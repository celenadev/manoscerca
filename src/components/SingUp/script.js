import { required } from "vuelidate/lib/validators";

export default {
    name: 'SignUpComponent',
    data() {
        return {
            name: '',
            message: 'He revisado tu perfil en ManosCerca.es y me ha parecido muy interesante. Creo que podríamos tener una buena oportunidad de colaboración. Me gustaría ponerme en contacto contigo para discutir más detalles y ver cómo podemos ayudarnos mutuamente. Gracias y espero tu respuesta.',
            enviado: false
        };
    },
    validations: {
        name: { required }
    },
    methods: {
        validate() {
            this.enviado = true;
            // si el formulario es inválido, no continúa
            if (this.$v.$invalid) {
                return
            }
        }
    },
};


// import axios from 'axios';

// export default {
//   data() {
//     return {
//       name: '',
//       email: '',
//       message: '',
//       enviado: false
//     };
//   },
//   methods: {
//     validate() {
//       this.enviado = true;
//       if (this.$v.$invalid) {
//         return;
//       }
//       this.sendMessage();
//     },
//     async sendMessage() {
//       try {
//         const response = await axios.post('http://localhost:3000/contact', {
//           name: this.name,
//           email: this.email,
//           message: this.message
//         });
//         console.log('Mensaje enviado:', response.data);
//       } catch (error) {
//         console.error('Error al enviar el mensaje:', error);
//       }
//     }
//   },
//   validations: {
//     name: { required: value => !!value },
//     email: { required: value => !!value, email: value => /.+@.+\..+/.test(value) },
//     message: { required: value => !!value }
//   }
// };
