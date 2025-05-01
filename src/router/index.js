import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import vistaLogin from '../views/VistaLogin/index.vue'
import DependentGuide from '../views/DependentGuide/index.vue'
import CarerGuide from '../views/CarerGuide/index.vue'
import CarersUsers from '../views/CarersUsers/index.vue'
import ProfileCarer from '../views/ProfileCarer/index.vue'
import ContactForm from '../views/ContactForm/index.vue'
import OurCompany from '../views/OurCompany/index.vue'
import HelpAndQuestions from '../views/HelpAndQuestions/index.vue'
import ViewsCompleteRole from '../views/ViewsCompleteRole/index.vue'
import DependentsUsers from '../views/DependentsUsers/index.vue'
import ProfileDependent from '../views/ProfileDependent/index.vue'
import PasswordReset from '../views/PasswordReset/index.vue'
import TermsAndConditions from '../views/TermsAndConditions/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/vista-login',
    name: 'vista-login',
    component: vistaLogin,
  },
  {
    path: '/dependent-guide',
    name: "dependent-guide",
    component: DependentGuide,
  },
  {
    path: '/carer-guide',
    name: "carer-guide",
    component: CarerGuide,
  },
  {
    path: '/carers-users',
    name: 'carers-users',
    component: CarersUsers,
    beforeEnter: auth,
  },
  {
    path: '/dependents-users',
    name: 'dependents-users',
    component: DependentsUsers,
    beforeEnter: auth,
  },
  {
    path: '/profile-carer/:id',
    name: 'profile-carer',
    component: ProfileCarer,
  },
  {
    path: '/profile-dependent/:id',
    name: 'profile-dependent',
    component: ProfileDependent,
  },
  {
    path: '/contact-form/:id',
    name: 'contact-form',
    component: ContactForm,
  },
  {
    path: '/our-company',
    name: "our-company",
    component: OurCompany,
  },
  {
    path: '/help-and-questions',
    name: "help-and-questions",
    component: HelpAndQuestions,
  },
  {
    path: '/views-complete-role',
    name: 'views-complete-role',
    component: ViewsCompleteRole,
  },
  {
    path: '/views-password-reset',
    name: 'views-password-reset',
    component: PasswordReset,
  },
  {
    path: '/terms-and-conditions',
    name: 'terms-and-conditions',
    component: TermsAndConditions,
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import {
  notifyInfo,
} from "../../src/Languaje/notifications";
/**
 * verifica si el usuario está autenticado antes de permitirle acceder a ciertas rutas.
 * Si el usuario no está autenticado, se le notifica y se le redirige a la página de inicio de sesión
 * @param {*} to to: El destino de la navegación.
 * @param {*} from La ruta desde la que se navega.
 * @param {*} next Una función que se llama para continuar la navegación.
 * @returns continue la navegación
 */
function auth(to, from, next ) {
  const token = localStorage.getItem('token');
  if (!token) {
      notifyInfo("Inicie sesión en nuestro sistema");
      return router.push('/vista-login');
  }
  return next();
}


export default router
