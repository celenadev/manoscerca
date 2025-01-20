import request from "axios";

const url = "http://localhost:4000/api/dependents";
class DependentApi {
  async addDependent(newDependent) {
    try {
          return await request.post(`${url}/add`,newDependent);
      } catch (error) {
          console.error("Error en API de familiares:", error);
          throw error;
      }
  }

  // Método para listar todos los familiares
  async getAll() {
    try {
      const response = await request.get(`${url}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error al listar los perfiles de familias", error);
      throw error;
    }
}
   // Método para mostrar datos de la oferta  seleccionada
   async getById(id) {
    try {
      const response = await request.get(`${url}/getById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }
}
export default new DependentApi();
