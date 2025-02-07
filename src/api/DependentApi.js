import request from "axios";

const url = "http://localhost:4000/api/dependents";
class DependentApi {

  // Método para paginar

  async addDependent(newDependent) {
    try {
      return await request.post(`${url}/add`, newDependent);
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

  // Método para listar todos los familiares
  async getPaginated(page = 1, limit = this.pageSize, filters = {}) {
    try {
      const response = await request.post(`${url}/getPaginated`, {
        page, limit,filters
      });
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

  async getByIdProfile(id) {
    try {
      const response = await request.get(`${url}/getByIdProfile/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }
  // Método para eliminar un perfil de cuidador
  async deleteById(id) {
    try {
      const response = await request.delete(`${url}/deleteById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el perfil de Familia desde API:", error);
      throw error;
    }
  }
}
export default new DependentApi();
