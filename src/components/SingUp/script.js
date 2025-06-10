import { email, required } from "vuelidate/lib/validators";
import DependentApi from "@/api/DependentApi";
import { notifySuccess, notifyError } from "@/Languaje/notifications";

export default {
    name: "LoginComponent",
    data() {
        return {
            senderEmail: localStorage.getItem("email") || "",
            message: `He revisado tu perfil en manosCerca y me ha parecido muy interesante. Me gustaría ponerme en contacto contigo para discutir más detalles y ver cómo podemos ayudarte mutuamente. Gracias y espero tu respuesta.`,
            sent: false,
            recipientName: localStorage.getItem("name") || "",
            recipientId: this.$route.params.id || null,
        };
    },
    validations: {
        senderEmail: { required, email },
        message: { required },
    },
    methods: {
        async sentMessage() {
            this.sent = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            try {
                const response = await DependentApi.sentMessage(
                    this.recipientId,
                    this.senderEmail,
                    this.message,
                    this.recipientName
                );
                console.log("Mensaje enviado:", response.data);
                notifySuccess(
                    `Tu mensaje ha sido enviado con éxito a ${this.recipientName}. Te responderá a la brevedad. ¡Gracias por contactarnos!`
                );
                this.senderEmail = "";
                this.message = "";
                this.recipientName = "";
                this.sent = false;
                this.$v.$reset();
            } catch (error) {
                console.error("Error al enviar el mensaje:", error);
                notifyError(
                    "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde."
                );
            }
        },
    },
};