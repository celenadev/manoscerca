import request from "axios";
import router from '@/router';
import { notifyError } from '@/Languaje/notifications';

const url = "http://localhost:4000/api/services";

class ServiceApi {
    async getAll() {
        try {
            const response = await request.get(`${url}/getAll`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                this.$bus.emit('close-modal');
                notifyError('Su sesión ha expirado. Por favor, inicie sesión nuevamente...');
                localStorage.removeItem('token');
                localStorage.removeItem('expiresIn');
                localStorage.removeItem('userId');
                this.isModalAOpen = false;
                router.push('/vista-login');
            } else {
                console.error("Error", error);
                throw error;
            }
        }
    }

    async getAllPublic() {
        try {
            const response = await request.get(`${url}/getAllPublic`);
            return response.data;
        } catch (error) {
            console.error("Error", error);
            throw error;
        }
    }
}
export default new ServiceApi();