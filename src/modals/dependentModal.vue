<template>
  <el-dialog :visible.sync="dialogVisible" width="80%">
    <template slot="title">
      <h2 v-if="isEditMode">Modificar Perfil</h2>
      <h2 v-else>Formulario De Registro Para Familias</h2>
    </template>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="190px"
      class="demo-ruleForm"
    >
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Ciudad" prop="city">
        <el-input v-model="ruleForm.city"></el-input>
      </el-form-item>
      <el-form-item label="Dirección" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item
        v-if="isEditMode"
        label="Antigua contraseña"
        prop="oldPassword"
      >
        <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Contraseña" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Repita contraseña" prop="repeatPassword">
        <el-input v-model="ruleForm.repeatPassword" type="password"></el-input>
      </el-form-item>
      <!-- INICIO SELECT MÚLTIPLE -->
      <el-form-item label="Tareas a realizar" prop="tasks">
        <el-select
          v-model="ruleForm.tasks"
          multiple
          placeholder="Tareas a realizar"
        >
          <el-option
            v-for="item in options"
            :key="item.id_services"
            :label="item.description"
            :value="item.id_services"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- FIN SELECT-->
      <el-form-item label="Tipo de jornada" prop="work_day">
        <el-select v-model="ruleForm.work_day" placeholder="Jornada">
          <el-option
            label="Jornada completa"
            value="Jornada completa"
          ></el-option>
          <el-option
            label="Jornada parcial"
            value="Jornada parcial"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Describa su oferta" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <!-- IMG -->
      <el-form-item label="Imagen de Perfil" prop="image">
        <el-upload
          class="avatar-uploader"
          action=""
          :on-change="handleChangeAvatar"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :auto-upload="false"
          :limit="1"
        >
          <el-button size="small" type="primary">Seleccionar imagen</el-button>
          <div slot="tip" class="el-upload__tip">
            Solo archivos .jpg, .jpeg, .png
          </div>
        </el-upload>
        <div v-if="imageUrl" class="image-preview">
          <img :src="imageUrl" alt="Vista previa de la imagen" />
        </div>
        <div v-else-if="ruleForm.image" class="image-preview">
          <img
            :src="createUrl(ruleForm.image)"
            alt="Imagen de perfil existente"
          />
        </div>
      </el-form-item>

      <!-- IMG -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- Eliminar el perfil -->
      <div v-if="isEditMode">
        <p class="p-borrar" @click="confirmRemove">Eliminar Perfil</p>
        <div v-if="showDeleteMessage" class="remove-message">
          ¿Está seguro que desea eliminar su perfil?
          <button @click="removeProfile(ruleForm.id, ruleForm.user_id)">
            Sí
          </button>
          <button @click="cancelRemove">No</button>
        </div>
      </div>
      <!-- Eliminar el perfil -->
      <el-button class="el-button--cancel" @click="dialogVisible = false"
        >Cancelar</el-button
      >
      <el-button
        class="el-button--confirm"
        type="primary"
        @click="submitForm('ruleForm')"
        >Confirmar</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import DependentApi from "@/api/DependentApi";
import ServiceApi from "@/api/ServiceApi";
import UserApi from "@/api/UserApi";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../src/Languaje/notifications";

export default {
  name: "dependent-modal",
  data() {
    return {
      dialogVisible: false,
      isEditMode: false,
      showDeleteMessage: false, // para eliminar el perfil
      file: null,
      imageUrl: "",
      defaultImage: "http://localhost:4000/uploads/default-profile.jpg",
      originalImage: "",
      originalPassword: "", // Nueva propiedad para almacenar la contraseña original

      ruleForm: {
        name: "",
        city: "",
        address: "",
        email: "",
        oldPassword: "",
        password: "",
        repeatPassword: "",
        tasks: [],
        work_day: "",
        description: "",
        image: "",
      },
      uploadUrl: "",
      options: [], // array que almacena  la lista de tareas
      rules: {
        name: [
          {
            required: true,
            message: "Por favor ingresa tu nombre",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "Por favor ingresa tu ciudad",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Por favor ingresa tu dirección",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Por favor ingresa tu email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Por favor ingresa un email válido",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: false,
            message: "Por favor ingresa tu contraseña",
            trigger: "blur",
          },
          {
            min: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
            trigger: "blur",
          },
        ],
        oldPassword: [
          {
            required: false,
            message: "Por favor ingresa la contraseña antigua",
            trigger: "blur",
          },
          { validator: this.validateOldPassword, trigger: "blur" },
        ],
        repeatPassword: [
          {
            required: false,
            message: "Por favor repite tu contraseña",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.ruleForm.password) {
                callback(new Error("Las contraseñas no coinciden"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        tasks: [
          {
            type: "array",
            required: true,
            message: "Por favor selecciona al menos una tarea",
            trigger: "change",
          },
        ],
        resource: [
          {
            required: true,
            message: "Por favor selecciona el tipo de jornada",
            trigger: "change",
          },
        ],
        desc: [
          {
            required: true,
            message: "Por favor describe tu oferta",
            trigger: "blur",
          },
        ],
        image: [
          // Reglas para la imagen
          {
            required: false,
            message: "Por favor sube una imagen de perfil",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    this.initializeView();
  },
  methods: {
    initializeView() {
      this.$bus.$on("open-dependent-modal", (params) => {
        this.load_services();
        if (params) {
          this.editDependent(params);
        } else {
          this.resetForm();
        }
        this.dialogVisible = true;
      });
    },

    // Comprueba si es necesario activar o no las reglas de las contraseñas
    // Si hay alguna contraseña escrita, activa las reglas todos los inputs
    // si no hay ninguna contraseña, los desactiva
    checkPasswordRules() {
      const value =
        !!this.ruleForm.password ||
        !!this.ruleForm.oldPassword ||
        !!this.ruleForm.repeatPassword;
      this.rules.oldPassword[0].required = value;
      this.rules.repeatPassword[0].required = value;
      this.rules.password[0].required = value;
    },

    // validación para contraseña
    async validateOldPassword(rule, value, callback) {
      if (value) {
        if (!this.isEditMode) {
          return callback();
        }
        try {
          const response = await UserApi.verifyPassword(
            this.ruleForm.user_id,
            value
          );
          if (response.data.success) {
            callback();
          } else {
            callback(new Error("Contraseña antigua incorrecta"));          }
        } catch (error) {
          callback(new Error("Error al verificar contraseña"));
        }
      }
    },

    async submitForm(formName) {
      this.checkPasswordRules();
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            let formData = new FormData();

            if (this.file && this.file.raw) {
              formData.append("image", this.file.raw);
              this.ruleForm.image = this.file.name;
            } else if (
              !this.ruleForm.image ||
              this.ruleForm.image === this.defaultImage
            ) {
              this.ruleForm.image = this.defaultImage;
            }

            formData.append("data", JSON.stringify(this.ruleForm));

            let response;

            if (this.isEditMode) {
              response = await DependentApi.editDependent(
                this.ruleForm.id,
                formData
              );
              notifySuccess("Perfil actualizado con éxito");
            } else {
              response = await DependentApi.addDependent(formData);
              notifySuccess("Perfil creado con éxito.Redirigiendo...");
              // Retrasar la redirección con setTimeout
              setTimeout(() => {
                this.$router.push("/dependents-users");
              }, 1500);
            }
            console.log("Respuesta de la API:", response.data); // Mostrar la respuesta (opcional)
            this.$bus.$emit("edit-dependent")// recarga los datos editados automaticamente
            this.dialogVisible = false;
          } catch (error) {
            notifyError("Hemos tenido un error. Inténtelo de nuevo");
            console.error("Fallo en la operación:", error);
          }
        } else {
          console.log("Error en el formulario");
          return false;
        }
      });
    },

    handleChangeAvatar(file) {
      this.file = file;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.rotation = 0;
    },
    handleAvatarError() {
      notifyError("Error al subir la imagen de perfil");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("La imagen debe ser JPG o PNG!");
      }
      if (!isLt2M) {
        this.$message.error("La imagen debe ser menor a 2MB!");
      }
      return isJPG && isPNG && isLt2M;
    },

    handleRemove() {
      this.file = null;
      this.imageUrl = "";
      this.rotation = 0;
      this.ruleForm.image = this.originalImage;
    },

    editDependent(params) {
      this.isEditMode = true;
      this.ruleForm.id = params.id || "";
      this.ruleForm.user_id = params.user_id || "";
      this.ruleForm.name = params.name || "";
      this.ruleForm.city = params.city || "";
      this.ruleForm.address = params.address || "";
      this.ruleForm.email = params.email || "";
      this.ruleForm.password = params.password || [];
      this.ruleForm.work_day = params.work_day || "";
      this.ruleForm.description = params.description || "";
      this.ruleForm.tasks =
        params.tasks.map((task) => Number(task.id_services)) || [];
      this.originalPassword = params.password || ""; // Store the original password
      this.ruleForm.oldPassword = ""; // Clear old password field
      this.ruleForm.password = ""; // Clear new password field
      this.ruleForm.repeatPassword = ""; // Clear repeat password field
      this.ruleForm.image = params.image || this.defaultImage; // Usa la imagen del backend o la por defecto
      if (params.image) {
        this.imageUrl = this.createUrl(params.image);
      } else {
        this.imageUrl = this.defaultImage;
      }
      this.originalImage = this.ruleForm.image;
    },

    createUrl(image) {
      return `http://localhost:4000/uploads/${image}`;
    },

    resetForm() {
      this.isEditMode = false;
      this.ruleForm = {
        name: "",
        city: "",
        address: "",
        email: "",
        password: "",
        tasks: [],
        work_day: "",
        description: "",
        oldPassword: "",
        repeatPassword: "",
        image: "",
      };
    },
    confirmRemove() {
      this.showDeleteMessage = true;
    },
    // Función que se ejecuta para borrar un perfil de usuario.
    async removeProfile(id, user_id) {
      try {
        const response = await DependentApi.deleteById(id);
        const responseUser = await UserApi.deleteById(user_id);
        if (response.status === 200 && responseUser.status === 200) {
          notifySuccess(
            "Su perfil como usuario familia ha sido eliminado con éxito"
          );
          this.resetForm();
          this.dialogVisible = false;
          this.$router.push("/");
        }
      } catch (error) {
        notifyError("Hubo un problema al eliminar el perfil familiar");
      } finally {
        this.showdeleteMessage = false;
      }
    },
    cancelRemove() {
      this.showRemoveMessage = false;
      notifyInfo("Ha dicho cancelar");
    },
    // Carga la lista de los servicios o tareas en el modal
    async load_services() {
      try {
        const response = await ServiceApi.getAll();
        this.options = response.body;
      } catch (error) {
        console.error("Error al cargar la lista de servicios:", error);
      }
    },
  },
};
</script>
