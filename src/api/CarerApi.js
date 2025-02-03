import request from "axios";

const url = "http://localhost:4000/api/carers";
class CarerApi {
  // Método para guardar un nuevo usuario
  //El método addCarer está encapsulado dentro de una clase (CarerApi)
  // Los datos del nuevo carer se pasan como un argumento (newCarer) al método addCarer
  async addCarer(newCarer) {
    try {
      return await request.post(`${url}/add`, newCarer);
    } catch (error) {
      console.error("Error en API de cuidadores:", error);
      throw error;
    }
  }

  // Método para listar todos los Cuidadores
  async getAll() {
    try {
      const response = await request.get(`${url}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error al listar los cuidadores", error);
      throw error;
    }
  }

  // Método para listar todos los familiares
  async getPaginated(page = 1, limit = 5, filters = {}) {
    try {
      const response = await request.post(`${url}/getPaginated`, {
        page, limit, filters
      });
      return response.data;
    } catch (error) {
      console.error("Error al listar los perfiles de los cuidadores", error);
      throw error;
    }
  }

  // Método para mostrar datos del cuidador seleccionado
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
      console.error("Error al eliminar el perfil cuidador desde API:", error);
      throw error;
    }
  }
}
export default new CarerApi();
