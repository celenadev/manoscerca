import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import vuelidate from 'vuelidate'
// Importando element
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(vuelidate)  // validaciones de formularios

Vue.use(VueRouter)

Vue.config.productionTip = false;

//Libreria Element
Vue.use(ElementUI);

//Axios
Vue.use(VueAxios, axios)

// Importa los archivos CSS de Bootstrap y BootstrapVue (el orden es importante)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Importa el archivo principal de estilos
import './styles/main.scss'

// Crear el bus de eventos global
const EventBus = new Vue()
Vue.prototype.$bus = EventBus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
