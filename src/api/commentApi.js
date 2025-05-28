import request from "axios";

const url = "http://localhost:4000/api/comments";
class CommentApi {
  // Añade un nuevo comenatrio de nestros usuarios
  async addComment(data) {
    try {
      return await request.post(`${url}/addComment`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log("Error en add desde API de cuidadores:", error);
      throw error;
    }
  }

  /**
   * Obtiene los comentarios de un cuidador por su ID
   * @param {*} id del cuidador
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async getComments(id) {
    try {
      const response = await request.get(`${url}/getComments/${id}`);
      return response.data;

    } catch (error) {
      console.error("Error al obtener los comentarios", error);
      throw error;
    }
  }
  /**
   * 
   * @param {*} id_comment 
   * @returns 
   */
  async deleteComment(id) {
    try {
      debugger
      const response = await request.delete(`${url}/deleteComment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el comentario desde API:", error);
      throw error;
    }
  }
}
export default new CommentApi();


