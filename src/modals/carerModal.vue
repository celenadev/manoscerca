<template>
  <el-dialog :visible.sync="dialogVisible" width="80%">
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
      <el-form-item label="Repita contraseña" prop="repeatPassword">
        <el-input v-model="ruleForm.repeatPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Experiencia" prop="year">
        <el-select v-model="ruleForm.year" placeholder="Años de experiencia">
          <el-option label="1 año" value="1"></el-option>
          <el-option label="2 años" value="2"></el-option>
          <el-option label="3 años" value="3"></el-option>
          <el-option label="más de 4 años" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="¿Qué ayudas ofreces?" prop="help_type">
        <el-checkbox-group v-model="ruleForm.help_type">
          <el-checkbox label="La compra" name="help_type"></el-checkbox>
          <el-checkbox label="Cocina" name="help_type"></el-checkbox>
          <el-checkbox label="Citas médicas" name="help_type"></el-checkbox>
          <el-checkbox
            label="Conducir con mayores"
            name="help_type"
          ></el-checkbox>
          <el-checkbox label="Tareas domésticas" name="help_type"></el-checkbox>
          <el-checkbox label="Paseos" name="help_type"></el-checkbox>
          <el-checkbox label="Aseo Personal" name="help_type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Disponibilidad" prop="work_day">
        <el-select v-model="ruleForm.work_day" placeholder="Disponibilidad">
          <el-option label="Jornada completa" value="1"></el-option>
          <el-option label="Jornada parcial" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Preséntate" prop="presentation">
        <el-input type="textarea" v-model="ruleForm.presentation"></el-input>
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
import CarerApi from "@/api/CarerApi";
import { Message } from "element-ui";

const DEFAULT_PRESENTATION ="Cuidador con 5 años de experiencia en el cuidado de mayores. Soy paciente y dedicado, con habilidades en gestión de medicación y apoyo en actividades diarias.";
export default {
  name: "carer-modal",
  data() {
    return {
      dialogVisible: false,
      isEditMode: false,
      ruleForm: {
        name: "",
        formation: "",
        city: "",
        address: "",
        email: "",
        password: "",
        year: "",
        help_type: [],
        work_day: "",
        presentation: DEFAULT_PRESENTATION,
      },
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
        year: [
          {
            required: true,
            message: "Por favor selecciona tus años de experiencia",
            trigger: "change",
          },
        ],
        help_type: [
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
      },
    };
  },
  created() {
    this.$bus.$on("open-carer-modal", (params) => {
      if (params) {
        // Recupera los datos para ser editados
        this.editCarer(params);
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
            const response = await CarerApi.addCarer(this.ruleForm);
            console.log("Cuidador añadido:", response.data);
            this.dialogVisible = false;
            Message({
              message: "Registrado con éxito",
              type: "success",
              duration: 3000,
            });
          } catch (error) {
            console.error("Error al añadir al cuidador:", error);
          }
        } else {
          console.log("Error en el formulario");
          return false;
        }
      });
    },
    editCarer(params) {
      this.isEditMode = true;
      this.ruleForm.name = params.name || "";
      this.ruleForm.formation = params.formation || "";
      this.ruleForm.city = params.city || "";
      this.ruleForm.address = params.address || "";
      this.ruleForm.email = params.email || "";
      this.ruleForm.year = params.year || "";
      this.ruleForm.help_type = params.help_type || [];
      this.ruleForm.work_day = params.work_day || "";
      this.ruleForm.presentation = params.presentation || DEFAULT_PRESENTATION;
    },
    resetForm() {
      this.isEditMode = false;
      this.ruleForm = {
        name: "",
        formation: "",
        city: "",
        address: "",
        email: "",
        password: "",
        year: "",
        help_type: [],
        work_day: "",
        presentation: DEFAULT_PRESENTATION,
      };
    },
  },
};
</script>
