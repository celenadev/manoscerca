
export default {
    data() {
        return {
            images: [
                require('/public/imagenes/pareja_abuelos.jpg'),
                require('/public/imagenes/manos_abuelos.jpg'),
            ],
            ourServices:[
                {
                    id: 1,
                    img: require('/public/imagenes/abuelos-pareja.jpg'),
                    title:'Ayuda para tus mayores',
                    text: 'Tus familiares en las mejores manos.'
                },
                {
                    id: 2,
                    img: require('/public/imagenes/hands.jpg'),
                    title:'Cuidadores de Confianza',
                    text: 'Apoyo y cuidado para tus seres queridos.'
                }
            ],
            services: [
                {
                    id: 1,
                    img: require('/public/imagenes/servicios/servicio7.jpg'),
                    text: 'Acompañamos a los mayores en sus paseos diarios para que disfruten del aire libre y se mantengan activos.'
                },
                {
                    id: 2,
                    img: require('/public/imagenes/servicios/servicio3.jpg'),
                    text: 'Preparamos comidas saludables y adaptadas a las necesidades dietéticas de cada person.'
                },
                {
                    id: 3,
                    img: require('/public/imagenes/servicios/servicio8.jpg'),
                    text: 'Coordinamos visitas médicas y acompañamos a los mayores a sus citas para asegurar su bienestar.'
                },
                {
                    id: 4,
                    img: require('/public/imagenes/servicios/servicio6.jpg'),
                    text: 'Proporcionamos cuidados e iguiene personal atendiendo las necesidades específicas de cada persona.'
                },
                {
                    id: 5,
                    img: require('/public/imagenes/servicios/servicio5.jpg'),
                    text: 'Ofrecemos compañía y apoyo emocional para que los mayores no se sientan solos.'
                },
                {
                    id: 6,
                    img: require('/public/imagenes/servicios/servicio4.jpg'),
                    text: 'Ofrecemos servicio de limpieza del hogar serviciso de lavanderías entre otros.'
                },

            ]
        };
    }
};
