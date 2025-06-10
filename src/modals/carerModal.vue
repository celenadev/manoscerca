<template>
  <el-dialog :visible.sync="modalVisible" width="90%">
    <template slot="title">
      <h2 v-if="isEditMode">Modificar Perfil</h2>
      <h2 v-else>Formulario De Registro Para Cuidadores</h2>
    </template>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Formación" prop="formation">
        <el-input v-model="ruleForm.formation"></el-input>
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
      <el-form-item v-if="ruleForm.password" label="Repita la contraseña" prop="repeatPassword">
        <el-input v-model="ruleForm.repeatPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Experiencia" prop="year">
        <el-select v-model="ruleForm.year" placeholder="Años de experiencia">
          <el-option key="1" label="1 año" value="1"></el-option>
          <el-option key="2" label="2 años" value="2"></el-option>
          <el-option key="3" label="3 años" value="3"></el-option>
          <el-option key="4" label="más de 4 años" value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- INICIO SELECT MÚLTIPLE -->
      <el-form-item label="¿Qué ayudas ofreces?" prop="tasks">
        <el-select
          v-model="ruleForm.tasks"
          multiple
          placeholder="Tareas que pudes realizar"
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
      <el-form-item label="Disponibilidad" prop="work_day">
        <el-select v-model="ruleForm.work_day" placeholder="Disponibilidad">
          <el-option
            label="Jornada completa"
            value="Jornada completa"
            key="1"
          ></el-option>
          <el-option
            label="Jornada parcial"
            value="Jornada parcial"
            key="2"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Preséntate" prop="presentation">
        <el-input type="textarea" v-model="ruleForm.presentation"></el-input>
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
        <div v-if="showRemoveMessage" class="remove-message">
          ¿Está seguro que desea eliminar su perfil?
          <button @click="removeProfile(ruleForm.id, ruleForm.user_id)">
            Sí
          </button>
          <button @click="cancelRemove">No</button>
        </div>
      </div>
      <!-- Eliminar el perfil -->
      <el-button class="el-button--cancel" @click="modalVisible = false"
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
import CarerApi from "@/api/CarerApi";
import UserApi from "@/api/UserApi";
import ServiceApi from "@/api/ServiceApi";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../src/Languaje/notifications";

export default {
  name: "carer-modal",
  data() {
    return {
      modalVisible: false,
      isEditMode: false,
      showRemoveMessage: false,
      file: null,
      imageUrl: "",
      defaultImage: `${process.env.VUE_APP_BACK_URL}/uploads/default-profile.jpg`,
      originalImage: "",
      originalPassword: "",
      ruleForm: {
        name: "",
        formation: "",
        city: "",
        address: "",
        email: "",
        oldPassword: "",
        password: "",
        repeatPassword: "",
        year: "",
        tasks: [],
        work_day: "",
        presentation: "",
        image: "",
      },
      uploadUrl: "",
      options: [],
      rules: {
        name: [
          {
            required: true,
            message: "Por favor ingresa tu nombre",
            trigger: "blur",
          },
        ],
        formation: [
          {
            required: true,
            message: "Por favor ingresa tu formación",
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
          {
            validator: (rule, value, callback) => {
              if (value && /[A-Z]/.test(value)) {
                callback(
                  new Error("El email no debe contener letras mayúsculas")
                );
              } else {
                callback();
              }
            },
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            min: 6,
            trigger: "blur",
            validator: (rule, value, callback) => {
                if (!value && this.isEditMode) {
                  callback();
                } else if (value.length < 6) {
                  callback(
                    new Error("La contraseña debe tener al menos 6 caracteres.")
                  );
                } else if (!/[A-Z]/.test(value)) {
                  callback(
                    new Error(
                      "La contraseña debe incluir al menos una letra mayúscula."
                    )
                  );
                } else if (!/[!@#$%ñ&*(),.?":{}|<>]/.test(value)) {
                  callback(
                    new Error(
                      "La contraseña debe incluir al menos un carácter especial."
                    )
                  );
                } else {
                  callback();
                }
            },
          },
        ],
        oldPassword: [
          {
            required: this.isEditMode,
            message: "Por favor ingresa la contraseña antigua",
            trigger: "blur",
          },
          { validator: this.validateOldPassword, trigger: "blur" },
        ],
        repeatPassword: [
          {
            required: () => !this.isEditMode && !!this.ruleForm.password,
            message: "Por favor repite tu contraseña",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (this.ruleForm.password || !this.isEditMode) {
                if (value !== this.ruleForm.password) {
                  callback(new Error("Las contraseñas no coinciden"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        year: [
          {
            required: true,
            message: "Por favor selecciona tus años de experiencia",
            trigger: "change",
          },
        ],
        tasks: [
          {
            type: "array",
            required: true,
            message: "Por favor selecciona al menos una ayuda que ofreces",
            trigger: "change",
          },
        ],
        work_day: [
          {
            required: true,
            message: "Por favor selecciona tu disponibilidad",
            trigger: "change",
          },
        ],
        presentation: [
          { required: true, message: "Por favor preséntate", trigger: "blur" },
        ],
        image: [
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
      this.$bus.$on("open-carer-modal", (params) => {
        const isNewRegister = !params;
        this.load_services(isNewRegister);
        if (params) {
          this.editCarer(params);
        } else {
          this.resetForm();
        }
        this.modalVisible = true;
      });
      this.$bus.$on("close-modal", () => {
        this.resetForm();
        this.modalVisible = false;
      });
    },
    /**
     * Comprueba si es necesario activar o no las reglas de las contraseñas
     * Si hay alguna contraseña escrita, activa las reglas todos los inputs
     * si no hay ninguna contraseña, los desactiva
     */
    checkPasswordRules() {
      const value =
        !!this.ruleForm.password ||
        !!this.ruleForm.oldPassword ||
        !!this.ruleForm.repeatPassword;
      this.rules.oldPassword[0].required = value;
      this.rules.repeatPassword[0].required = value;
      this.rules.password[0].required = value;
    },
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
            callback(new Error("Contraseña antigua incorrecta"));
          }
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
            let dataToSend = { ...this.ruleForm };

            if (this.file && this.file.raw) {
              formData.append("image", this.file.raw);
              dataToSend.image = this.file.name;
            } else if (
              !dataToSend.image ||
              dataToSend.image === this.defaultImage
            ) {
              dataToSend.image = this.defaultImage;
            }
            if (this.isEditMode && !dataToSend.password) {
              delete dataToSend.oldPassword;
            } else if (!this.isEditMode) {
              delete dataToSend.oldPassword;
            }
            formData.append("data", JSON.stringify(dataToSend));
            let response;
            if (this.isEditMode) {
              response = await CarerApi.editCarer(this.ruleForm.id, formData);
              notifySuccess("Perfil actualizado con éxito");
            } else {
              response = await CarerApi.addCarer(formData);
              notifySuccess("Perfil creado con éxito. Redirigiendo...");
              setTimeout(() => {
                this.$router.push("/vista-login").catch(() => {});
              }, 1500);
            }
            console.log("Respuesta de la API:", response.data);
            this.$bus.$emit("edit-carers");
            this.modalVisible = false;
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
    editCarer(params) {
      this.isEditMode = true;
      this.ruleForm.id = params.id || "";
      this.ruleForm.user_id = params.user_id || "";
      this.ruleForm.name = params.name || "";
      this.ruleForm.formation = params.formation || "";
      this.ruleForm.city = params.city || "";
      this.ruleForm.address = params.address || "";
      this.ruleForm.email = params.email || "";
      this.ruleForm.year = params.year || "";
      this.ruleForm.tasks =
        params.tasks.map((task) => Number(task.id_services)) || [];
      this.ruleForm.work_day = params.work_day || "";
      this.ruleForm.presentation = params.presentation || "";
      this.originalPassword = params.password || "";
      this.ruleForm.oldPassword = "";
      this.ruleForm.password = "";
      this.ruleForm.repeatPassword = "";
      this.ruleForm.image = params.image || this.defaultImage;
      if (params.image) {
        this.imageUrl = this.createUrl(params.image);
      } else {
        this.imageUrl = this.defaultImage;
      }
      this.originalImage = this.ruleForm.image;
    },
    createUrl(image) {
      return `${process.env.VUE_APP_BACK_URL}uploads/${image}`;
    },
    resetForm() {
      this.isEditMode = false;
      this.ruleForm = {
        name: "",
        formation: "",
        city: "",
        address: "",
        email: "",
        oldPassword: "",
        password: "",
        repeatPassword: "",
        year: "",
        tasks: [],
        work_day: "",
        presentation: "",
        image: ""
      };
      this.handleRemove();
    },
    confirmRemove() {
      this.showRemoveMessage = true;
    },
    async removeProfile(id, user_id) {
      try {
        const response = await CarerApi.deleteById(id);
        const responseUser = await UserApi.deleteById(user_id);
        if (response.status === 200 && responseUser.status === 200) {
          notifySuccess(
            "Su perfil como usuario cuidador ha sido eliminado con éxito."
          );
          this.isLoggedIn = false;
          this.resetForm();
          this.modalVisible = false;
          if (localStorage.getItem("type") !== 'superadmin')
          {
            localStorage.clear();
            this.$bus.$emit("logout");
            this.$router.push("/vista-login");
          }
          else {
            this.$router.push("/carers-users");
          }
        }
      } catch (error) {
        notifyError("Hubo un problema al eliminar su perfil como cuidador");
      } finally {
        this.showRemoveMessage = false;
      }
    },
    cancelRemove() {
      this.showRemoveMessage = false;
      notifyInfo("Ha dicho cancelar");
    },
    async load_services(isNewRegister) {
      try {
        let response;
        if (isNewRegister) {
          response = await ServiceApi.getAllPublic();
        } else {
          response = await ServiceApi.getAll();
        }
        this.options = response.body;
      } catch (error) {
        console.error("Error al cargar la lista de servicios:", error);
      }
    },
  },
};
</script>
