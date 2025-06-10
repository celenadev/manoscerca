import request from "axios";
import tokenExpired from "./token"

const url = process.env.VUE_APP_BACK_URL+"api/services";

const getToken = () => {
    const token = localStorage.getItem('token') || undefined;
    request.defaults.headers.common['Authorization'] = token;
}
class ServiceApi {
    async getAll() {
        try {
            getToken();
            const response = await request.get(`${url}/getAll`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                tokenExpired();
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