export default {
    name: 'SignUpComponent',
    data () {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleSubmit () {
            // Aquí puedes agregar lógica para enviar los datos a tu backend
            console.log('Formulario enviado:', this.form)
        }
    },
    created () {
        console.log('Creado Signup');

    },
};