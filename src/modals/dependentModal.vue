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
      <el-form-item label="Tareas a realizar" prop="tasks">
        <el-checkbox-group v-model="ruleForm.tasks">
          <el-checkbox label="La compra" name="tasks"></el-checkbox>
          <el-checkbox label="Cocina" name="tasks"></el-checkbox>
          <el-checkbox label="Citas médicas" name="tasks"></el-checkbox>
          <el-checkbox label="Conducir con mayores" name="tasks"></el-checkbox>
          <el-checkbox label="Tareas domésticas" name="tasks"></el-checkbox>
          <el-checkbox label="Paseos" name="tasks"></el-checkbox>
          <el-checkbox label="Aseo Personal" name="tasks"></el-checkbox>
          <el-checkbox
            label="Solo acompañamiento domiciliario"
            name="tasks"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Tipo de jornada" prop="work_day">
        <el-select v-model="ruleForm.work_day" placeholder="Jornada">
          <el-option label="Jornada completa" value="1"></el-option>
          <el-option label="Jornada parcial" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Describa su oferta" prop="description">
        <el-input
          type="textarea"
          v-model="ruleForm.description"
          placeholder="Buscamos un cuidador para tareas domésticas generales. Horario flexible y buen ambiente de trabajo. Preferiblemente con experiencia."
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
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
import { Message } from "element-ui";

const DEFAULT_DESCRIPTION =
  "..Buscamos un cuidador para  acompañamiento de un mayor. Preferiblemente con experiencia.";
export default {
  name: "dependent-modal",
  data() {
    return {
      dialogVisible: false,
      isEditMode: false,
      ruleForm: {
        name: "",
        city: "",
        address: "",
        email: "",
        password: "",
        tasks: [],
        work_day: "",
        description: DEFAULT_DESCRIPTION,
      },
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
  created() {
    this.$bus.$on("open-dependent-modal", (params) => {
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
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const response = await DependentApi.addDependent(this.ruleForm);
            console.log("Usuario dependiente añadido:", response.data);
            this.dialogVisible = false;
            Message({
              message: "Registrado con éxito",
              type: "success",
              duration: 3000,
            });
          } catch (error) {
            console.error("Error al añadir al dependiente:", error);
          }
        } else {
          console.log("Error en el formulario");
          return false;
        }
      });
    },
    editDependent(params) {
      this.ruleForm.name = params.name || "";
      this.ruleForm.city = params.city || "";
      this.ruleForm.address = params.address || "";
      this.ruleForm.email = params.email || "";
      this.ruleForm.password = params.password || [];
      this.ruleForm.work_day = params.work_day || "";
      this.ruleForm.presentation = params.presentation || DEFAULT_DESCRIPTION;
      this.ruleForm.tasks = params.tasks || "";
    },
    resetForm() {
      this.ruleForm = {
        name: "",
        city: "",
        address: "",
        email: "",
        password: "",
        tasks: [],
        work_day: "",
        description: DEFAULT_DESCRIPTION,
      };
    },
  },
};
</script>