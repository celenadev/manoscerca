import request from "axios";

const url = "http://localhost:4000/api/contact"; // Define la URL base

class ContactManosCerca {
    async sentContact(userData) {
        try {
            return await request.post(`${url}/sentContact`, userData); // Petición a /api/sendContact
        } catch (error) {
            console.error("Error al enviar el mensaje de contacto:", error);
            throw error;
        }
    }
}
export default new ContactManosCerca();