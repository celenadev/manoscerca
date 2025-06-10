import request from "axios";
import tokenExpired from "./token"

const getToken = () => {
  const token = localStorage.getItem('token') || undefined;
  request.defaults.headers.common['Authorization'] = token;// token para todas  las funciones
}

const url = process.env.VUE_APP_BACK_URL+"api/carers";
class CarerApi {
  /**
   * Añade un nuevo cuidador.
   * @param {*} newCarer  Los datos del nuevo cuidador.
   * @returns  Una promesa que resuelve los datos de la respuesta de la API.
   */
  async addCarer(newCarer) {
    try {
      return await request.post(`${url}/add`, newCarer, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error("Error en API de cuidadores:", error);
      throw error;
    }
  }
  /**
   * Edita la información de un cuidador existente
   * @param {*} id   El ID del cuidador a editar.
   * @param {*} carerData Los nuevos datos del cuidador.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async editCarer(id, carerData) {
    try {
      getToken();
      return await request.put(`${url}/edit/${id}`, carerData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error en API de cuidadores (edit):", error);
        throw error;
      }
    }
  }

  /**
   * Método para listar todos los Cuidadores
   * @returns Toda la información de los perfiles de cuidadores
   */
  async getAll() {
    try {
      getToken();
      const response = await request.get(`${url}/getAll`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error al listar los cuidadores", error);
        throw error;
      }
    }
  }
  /**
   * Obtiene una lista paginada de cuidadores con filtros opcionales.
   * @param {*} page El número de la página a obtener.
   * @param {*} limit l número de elementos por página
   * @param {*} filters Los filtros a aplicar en la búsqueda.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async getPaginated(page = 1, limit = this.pageSize, filters = {}) {
    try {
      getToken();
      const dataToSend = {
        page: page,
        limit: limit,
        filters: filters
      };
      const response = await request.post(`${url}/getPaginated`, dataToSend)
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error al listar los perfiles de los cuidadores", error);
        throw error;
      }
    }
  }

  /**
   *  Obtiene el perfil de un cuidador por su ID.
   * @param {*} id El ID del cuidador.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async getById(id) {
    try {
      getToken();
      const response = await request.get(`${url}/getById/${id}`);
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
  /**
   * Obtiene el perfil de un cuidador por su ID.
   * @param {*} id El ID del cuidador.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async getByIdProfile(id) {
    try {
      getToken();
      const response = await request.get(`${url}/getByIdProfile/${id}`);
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

  /**
   *  Elimina un perfil de cuidador por su ID.
   * @param {*} id El ID del cuidador a eliminar.
   * @returns  Una promesa que resuelve los datos de la respuesta de la API.
   */
  async deleteById(id) {
    try {
      getToken();
      const response = await request.delete(`${url}/deleteById/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error al eliminar el perfil cuidador desde API:", error);
        throw error;
      }
    }
  }

  /**
   * @param {*} recipientId El ID del destinatario del mensaje
   * @param {*} senderEmail  La dirección de correo electrónico del remitente del mensaje
   * @param {*} message  El contenido del mensaje que se quiere enviar
   * @returns  Respuesta
   */
  async sentMessage(recipientId, senderEmail, message, name) {
    try {
      getToken();
      return await request.post(`${url}/sentMessage`, {
        recipientId,
        senderEmail,
        name,
        message
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error al enviar el mensaje de contacto:", error);
        throw error;
      }
    }
  }
}
export default new CarerApi();