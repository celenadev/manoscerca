import request from "axios";
const getToken = () => {
  const token = localStorage.getItem('token') || undefined;
  request.defaults.headers.common['Authorization'] = token;// token para todas  las funciones
}

const url = "http://localhost:4000/api/dependents";
class DependentApi {

  /**
 * Añade un nuevo usuario dependiente.
 * @param {*} newDependent Los datos del nuevo usuario dependiente.
 * @returns  Una promesa que resuelve los datos de la respuesta de la API.
 */
  async addDependent(newDependent) {
    try {
      return await request.post(`${url}/add`, newDependent, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error("Error en API de familiares:", error);
      throw error;
    }
  }
/**
 * Edita la información de un usuario familiar existente
 * @param {*} id   El ID del usuario familiar a editar.
 * @param {*} carerData Los nuevos datos del usuario familiar.
 * @returns Una promesa que resuelve los datos de la respuesta de la API.
 */
async editDependent(id, dependentData) {
  getToken();
  try {
    return await request.put(`${url}/edit/${id}`, dependentData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.error("Error en API de familias (edit):", error);
    throw error;
  }
}
  /**
 * Método para listar todos los perfiles de dependientes
 * @returns Toda la información de los perfiles de dependientes
 */
  async getAll() {
    getToken();
    try {
      const response = await request.get(`${url}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error al listar los perfiles de familias", error);
      throw error;
    }
  }

  /**
 * Obtiene una lista paginada de usuariso dependientes con filtros opcionales.
 * @param {*} page El número de la página a obtener.
 * @param {*} limit l número de elementos por página
 * @param {*} filters Los filtros a aplicar en la búsqueda.
 * @returns Una promesa que resuelve los datos de la respuesta de la API.
 */
  async getPaginated(page = 1, limit = this.pageSize, filters = {}) {
    getToken();
    try {
      const dataToSend = {
        page: page,
        limit: limit,
        filters: filters
      };
      const response = await request.post(`${url}/getPaginated`, dataToSend)
      return response.data;
    } catch (error) {
      console.error("Error al listar los perfiles de familiares", error);
      throw error;
    }
  }

  /**
   *  Obtiene el perfil de un familiar por su ID.
   * @param {*} id El ID del familiar.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
  */
  async getById(id) {
    getToken();
    try {
      const response = await request.get(`${url}/getById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }

  /**
 * Obtiene el perfil de un dependiente por su ID.
 * @param {*} id El ID del dependiente.
 * @returns Una promesa que resuelve los datos de la respuesta de la API.
 */
  async getByIdProfile(id) {
    getToken();
    try {
      const response = await request.get(`${url}/getByIdProfile/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }

  /**
  *  Elimina un perfil de dependiente por su ID.
  * @param {*} id El ID del dependiente a eliminar.
  * @returns  Una promesa que resuelve los datos de la respuesta de la API.
  */
  async deleteById(id) {
    getToken();
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
