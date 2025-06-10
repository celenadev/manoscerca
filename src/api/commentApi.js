import request from "axios";
import tokenExpired from "./token"

const getToken = () => {
  const token = localStorage.getItem('token') || undefined;
  request.defaults.headers.common['Authorization'] = token;
}

const url = process.env.VUE_APP_BACK_URL+"api/comments";
class CommentApi {
  // Añade un nuevo comenatrio de nuestros usuarios
  async addComment(data) {
    try {
      getToken();
      return await request.post(`${url}/addComment`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.log("Error en add desde API de cuidadores:", error);
        throw error;
      }
    }
  }

  /**
   * Obtiene los comentarios de un cuidador por su ID
   * @param {*} id del cuidador
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async getComments(id) {
    try {
      getToken();
      const response = await request.get(`${url}/getComments/${id}`);
      return response.data;

    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error al obtener los comentarios", error);
        throw error;
      }
    }
  }
  /**
   *
   * @param {*} id_comment
   * @returns
   */
  async deleteComment(id) {
    try {
      getToken();
      const response = await request.delete(`${url}/deleteComment/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        tokenExpired();
      } else {
        console.error("Error al eliminar el comentario desde API:", error);
        throw error;
      }
    }
  }
}
export default new CommentApi();


