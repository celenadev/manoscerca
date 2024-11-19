import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import vistaLogin from '../views/VistaLogin/index.vue'
import vistaSignUp from '../views/VistaSignUp/index.vue'
import VistaGuiaParaFamilias from '../views/VistaGuiaParaFamilias/index.vue'
import VistaGuiaParaCuidadores from '../views/VistaGuiaParaCuidadores/index.vue'
import CarersUsers from '../views/CarersUsers/index.vue'
import ProfileCarer from '../views/ProfileCarer/index.vue'
import ContactForm from '../views/ContactForm/index.vue'
// import Breadcrumb from './Breadcrumb.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { breadcrumb: 'Homepage' }
  },
  {
    path: '/vista-login',
    name: 'vista-login',
    component: vistaLogin,
    // meta: { breadcrumb: 'Login' }
  },
  {
    path: '/vista-sign-up',
    name: 'vista-sign-up',
    component: vistaSignUp,
    // meta: { breadcrumb: 'Sign Up' }
  },
  {
    path: '/vista-guia-para-familias',
    name: "vista-guia-para-familias",
    component: VistaGuiaParaFamilias,
    // meta: { breadcrumb: 'Guía para Familias' }
  },
  {
    path: '/vista-guia-para-cuidadores',
    name: "vista-guia-para-cuidadores",
    component: VistaGuiaParaCuidadores,
    // meta: { breadcrumb: 'Guía para Cuidadores' }
  },
  {
    path: '/carers-users',
    name: 'carers-users',
    component: CarersUsers,
    // meta: { breadcrumb: 'Carers Users' }
  },
  {
    path: '/profile-carer',
    name: 'profile-carer',
    component: ProfileCarer,
    // meta: { breadcrumb: 'Profile Carer' }
  },
  {
    path: '/contact-form',
    name: 'Ccontact-form',
    component: ContactForm,
    // meta: { breadcrumb: 'Profile Carer' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
