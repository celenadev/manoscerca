import request from "axios";

const url = "http://localhost:4000/api/services";
class ServiceApi {
    // Consulta a la bd la lista  de los servicios para cargarlos en el modal
    async getAll() {
      try {
        const response = await request.get(`${url}/getAll`);
        return response.data;
      } catch (error) {
        console.error("Error", error);
        throw error;
      }
    }
}
export default new ServiceApi();
