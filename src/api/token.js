import { notifyError } from '@/Languaje/notifications';
import router from '@/router';


export default function tokenExpired() {
    notifyError('Su sesión ha expirado. Por favor, inicie sesión nuevamente...');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('city');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('type');
    router.push('/vista-login').catch(() => { });
}