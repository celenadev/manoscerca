<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import loginAntiguo from '@/components/LoginAntiguo/index.vue'

export default {
    name: 'Home',
    components: {
        loginAntiguo,
    },
    data () {
        return {
            arrayDatos: [
                { name: 'Sofía', pass: 'name: Sofía' },
            ],
            usuario: "",
            passsword: "",
            error: false,
            error_msg: ""
        }
    },
    methods: {
        obtenerDatos () {
            setTimeout(() => {
                const promise = new Promise((resolve) => {
                    resolve([
                        { name: 'Sofía', pass: 'name: Sofía' },
                        { name: 'Emma', pass: 'name: Emma' },
                        { name: 'Olivia', pass: 'name: Olivia' },
                        { name: 'Luna', pass: 'name: Luna' },
                        { name: 'Mia', pass: 'name: Mia' },
                        { name: 'Valentina', pass: 'name: Valentina' },
                        { name: 'Camila', pass: 'name: Camila' },
                        { name: 'Chloe', pass: 'name: Chloe' },
                        { name: 'Zoe', pass: 'name: Zoe' },
                        { name: 'Aitana', pass: 'name: Aitana' },
                        { name: 'Mateo', pass: 'name: Mateo' },
                        { name: 'Lucas', pass: 'name: Lucas' },
                        { name: 'Martín', pass: 'name: Martín' },
                        { name: 'Alejandro', pass: 'name: Alejandro' },
                        { name: 'Hugo', pass: 'name: Hugo' },
                        { name: 'Daniel', pass: 'name: Daniel' },
                        { name: 'Noah', pass: 'name: Noah' },
                        { name: 'Benjamín', pass: 'name: Benjamín' },
                        { name: 'Samuel', pass: 'name: Samuel' },
                        { name: 'Enzo', pass: 'name: Enzo' },
                        { name: 'Anya', pass: 'name: Anya' },
                        { name: 'Noa', pass: 'name: Noa' },
                        { name: 'Kael', pass: 'name: Kael' },
                        { name: 'Leila', pass: 'name: Leila' },
                        { name: 'Ian', pass: 'name: Ian' },
                        { name: 'Elías', pass: 'name: Elías' },
                        { name: 'Izan', pass: 'name: Izan' },
                        { name: 'Maia', pass: 'name: Maia' },
                        { name: 'Nala', pass: 'name: Nala' },
                        { name: 'Thiago', pass: 'name: Thiago' },
                        { name: 'Mateo', pass: 'name: Mateo' },
                    ])
                });

                return promise
                    .then(response => {
                        this.arrayDatos = response;
                    })
            }, 3000);
        }
    },
    created () {
        this.obtenerDatos();
    },
}


</script>

<style>
$mc-bymorado: #c2bec9;

.vistaLogin {
  background-color: $mc-bymorado;
}
</style>