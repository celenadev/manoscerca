import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import vistaLogin from '../views/VistaLogin/index.vue'
import vistaSignUp from '../views/VistaSignUp/index.vue'
import VistaGuiaParaFamilias from '../views/VistaGuiaParaFamilias/index.vue'
import VistaGuiaParaCuidadores from '../views/VistaGuiaParaCuidadores/index.vue'
import CarersUsers from '../views/CarersUsers/index.vue'
import ProfileCarer from '../views/ProfileCarer/index.vue'
import ContactForm from '../views/ContactForm/index.vue'
import NuestraEmpresa from '../views/NuestraEmpresa/index.vue'
import HelpAndQuestions from '../views/HelpAndQuestions/index.vue'

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
  },
  {
    path: '/vista-sign-up',
    name: 'vista-sign-up',
    component: vistaSignUp,
  },
  {
    path: '/vista-guia-para-familias',
    name: "vista-guia-para-familias",
    component: VistaGuiaParaFamilias,
  },
  {
    path: '/vista-guia-para-cuidadores',
    name: "vista-guia-para-cuidadores",
    component: VistaGuiaParaCuidadores,
  },
  {
    path: '/carers-users',
    name: 'carers-users',
    component: CarersUsers,
  },
  {
    path: '/profile-carer',
    name: 'profile-carer',
    component: ProfileCarer,
  },
  {
    path: '/contact-form',
    name: 'contact-form',
    component: ContactForm,
  },
  {
    path: '/nuestra-empresa',
    name: "nuestra-empresa",
    component:NuestraEmpresa,
  },
  {
    path: '/help-and-questions',
    name: "help-and-questions",
    component:HelpAndQuestions,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
