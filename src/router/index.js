import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import vistaLogin from '../views/VistaLogin/index.vue'
import vistaSignUp from '../views/VistaSignUp/index.vue'
import VistaGuiaParaFamilias from '../views/VistaGuiaParaFamilias/index.vue'
import VistaGuiaParaCuidadores from '../views/VistaGuiaParaCuidadores/index.vue'
import CarersUsers from '../views/CarersUsers/index.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/vista-login',
    name: 'vista-login',
    component: vistaLogin
  },
  {
    path: '/vista-sign-up',
    name: 'vista-sign-up',
    component: vistaSignUp
  },
  {
    path: '/vista-guia-para-familias',
    name: "vista-guia-para-familias",
    component: VistaGuiaParaFamilias
  },
  {
    path: '/vista-guia-para-cuidadores',
    name: "vista-guia-para-cuidadores",
    component: VistaGuiaParaCuidadores
  },
  {
    path: '/carers-users',
    name: "carers-users",
    component: CarersUsers
  },
  // {
  //   path: '/about',
  //   name: "about",
  //   component: AboutView
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
