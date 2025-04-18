import request from "axios";

const url = "http://localhost:4000/api/users";

class UserApi {
  /**
   * Verifica la contraseña del usuario.
   * @param {*} user_id El ID del usuario.
   * @param {*} oldPassword La contraseña actual del usuario.
   * @returns  Una promesa que resuelve la respuesta de la API.
   */
  async verifyPassword(user_id, oldPassword) {
    const token = localStorage.getItem('token'); // Obtén el token
    if (!token) {
      console.error('Token no encontrado. El usuario no está autenticado.');
      throw new Error('Token no encontrado'); // Lanza un error si no hay token
    }
    try {
      return await request.post(`${url}/verify-password`,
        {
          user_id,
          oldPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token al encabezado
          },
        }
      );
    } catch (error) {
      console.error("Error desde api al verificar la contraseña", error);
      throw error;
    }
  }
  /**
   * Inicia sesión con el email y la contraseña proporcionados
   * @param {*} email El email del usuario.
   * @param {*} password La contraseña del usuario.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async login(email, password) {
    try {
      const response = await request.post(
        `${url}/login`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error en UserApi:", error);

      if (error.response) {
        // El servidor respondió con un error
        console.error(
          "Error del servidor:",
          error.response.status,
          error.response.data
        );
        return {
          success: false,
          message: error.response.data.message || "Error en el login",
        };
      } else if (error.request) {
        // No se recibió respuesta del servidor
        console.error("Error de petición:", error.request);
        return {
          success: false,
          message: "No se pudo conectar con el servidor",
        };
      } else {
        // Error en la configuración de la petición
        console.error("Error de configuración:", error.message);
        return {
          success: false,
          message: error.message,
        };
      }
    }
  }
  /**
   * Elimina un usuario por su ID.
   * @param {*} id El ID del usuario a eliminar.
   * @returns Una promesa que resuelve los datos de la respuesta de la API.
   */
  async deleteById(id) {
    const token = localStorage.getItem('token'); // Obtén el token
    if (!token) {
      console.error('Token no encontrado. El usuario no está autenticado.');
      throw new Error('Token no encontrado'); // Lanza un error si no hay token
    }
    try {
      const response = await request.delete(`${url}/deleteById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el usuario desde API:", error);
      throw error;
    }
  }
}

export default new UserApi();
