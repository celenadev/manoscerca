// import request from "axios";

// const url = "http://localhost:4000/api/services";
// class ServiceApi {
//     // Consulta a la bd la lista  de los servicios para cargarlos en el modal
//     async getAll() {
//       try {
//         const response = await request.get(`${url}/getAll`);
//         return response.data;
//       } catch (error) {
//         console.error("Error", error);
//         throw error;
//       }
//     }
// }
// export default new ServiceApi();
import request from "axios";
import router from '@/router'; // Asegúrate de que la ruta al router sea correcta
import { notifyError } from '@/Languaje/notifications'; // Asegúrate de que la ruta a las notificaciones sea correcta

const url = "http://localhost:4000/api/services";

class ServiceApi {
    async getAll() {
        try {
            const response = await request.get(`${url}/getAll`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                notifyError('Su sesión ha expirado. Por favor, inicie sesión nuevamente...');
                localStorage.removeItem('token');
                localStorage.removeItem('expiresIn');
                localStorage.removeItem('userId');
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