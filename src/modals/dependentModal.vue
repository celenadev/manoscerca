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
          <el-option label="Jornada completa" value="Jornada completa"></el-option>
          <el-option label="Jornada parcial" value="Jornada parcial"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Describa su oferta" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!-- Eliminar el perfil -->
      <div v-if="isEditMode">
        <p @click="confirmDelete">Eliminar Perfil</p>
        <div v-if="showDeleteMessage" class="delete-message">
          ¿Está seguro que desea eliminar su perfil?
          <button @click="deleteProfile(ruleForm.id)">Sí</button>
          <button @click="cancelDelete">No</button>
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
      },
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
            required: true,
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
            required: true,
            message: "Por favor ingresa tu antigua contraseña",
            trigger: "blur",
          },
        ],
        repeatPassword: [
          {
            required: true,
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
          // Recupera los datos para ser editados
          this.editDependent(params);
        } else {
          // Limpia el formulario para un nuevo registro
          this.resetForm();
        }
        this.dialogVisible = true;
      });
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await DependentApi.addDependent(this.ruleForm);
            console.log("Usuario dependiente añadido:", response.data);
            this.dialogVisible = false;
            notifySuccess(
              "Bienvenido  a nuestro sistema, Perfil creado con éxito"
            );
          } catch (error) {
            notifyError(
              "Hemos tenido un error al crear su perfil. Inténtelo de nuevo"
            );
            console.error("Fallo al crear familiar:", error);
          }
        } else {
          console.log("Error en el formulario");
          return false;
        }
      });
    },
    editDependent(params) {
      this.isEditMode = true;
      this.ruleForm.id = params.id || "";
      this.ruleForm.name = params.name || "";
      this.ruleForm.city = params.city || "";
      this.ruleForm.address = params.address || "";
      this.ruleForm.email = params.email || "";
      this.ruleForm.password = params.password || [];
      this.ruleForm.work_day = params.work_day || "";
      this.ruleForm.description = params.description || "";
      this.ruleForm.tasks = params.tasks || "";
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
      };
    },
    confirmDelete() {
      this.showDeleteMessage = true;
    },
    // Función que se ejecuta para borrar un perfil de usuario familia
    async deleteProfile(id) {
      try {
        const response = await DependentApi.deleteById(id);
        if (response.status === 200) {
          notifySuccess("Perfil Familiar eliminado exitosamente");
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
    cancelDelete() {
      this.showDeleteMessage = false;
      notifyInfo("Ha  dicho cancelar");
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
<style scoped>
p {
  color: rgb(94, 92, 92);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  margin-left: 80px;
  font-size: 14px;
}

p:hover {
  text-decoration: underline;
  color: black;
}

.delete-message {
  margin-left: 60px;
  color: #721c24;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
}

.delete-message button {
  background-color: #d0cece;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 3px;
  cursor: pointer;
}
.delete-message button:hover {
  background-color: #801563;
  color: aliceblue;
}
</style>
