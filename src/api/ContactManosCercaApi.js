import request from "axios";
const url = process.env.VUE_APP_BACK_URL+"api/contact";

class ContactManosCerca {
    async sentContact(userData) {
        try {
            return await request.post(`${url}/sentContact`, userData);
        } catch (error) {
            console.error("Error al enviar el mensaje de contacto:", error);
            throw error;
        }
    }
}
export default new ContactManosCerca();