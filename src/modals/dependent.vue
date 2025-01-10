<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="80%"
  >
    <template slot="title">
      <h2>Formulario De Registro Para Familias</h2>
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
      <el-form-item label="Contraseña" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
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
          <el-checkbox label="Solo acompañamiento domiciliario" name="tasks"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Tipo de jornada" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="Jornada completa"></el-radio>
          <el-radio label="Jornada parcial"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Describa su oferta" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="Buscamos un cuidador para tareas domésticas generales. Horario flexible y buen ambiente de trabajo. Preferiblemente con experiencia."></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="el-button--cancel" @click="dialogVisible = false">Cancelar</el-button>
      <el-button class="el-button--confirm" type="primary" @click="submitForm('ruleForm')">Confirmar</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: 'familiaprueba1',
        city: 'Córdoba',
        address: 'Calle el centro nº10',
        email: 'familiaprueba1@gamil.com',
        password: 'familia2025',
        tasks: ['Solo acompañamiento domiciliario'],
        resource: '',
        desc: 'Buscamos un cuidador para  acompañamiento de un mayor. Preferiblemente con experiencia.'
      },
        rules: {
        name: [
          { required: true, message: 'Por favor ingresa tu nombre', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Por favor ingresa tu ciudad', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'Por favor ingresa tu dirección', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Por favor ingresa tu email', trigger: 'blur' },
          { type: 'email', message: 'Por favor ingresa un email válido', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: 'Por favor ingresa tu contraseña', trigger: 'blur' },
          { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
        ],
        tasks: [
          { type: 'array', required: true, message: 'Por favor selecciona al menos una tarea', trigger: 'change' }
        ],
        resource: [
          { required: true, message: 'Por favor selecciona el tipo de jornada', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Por favor describe tu oferta', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.$bus.$on("open-dependent-dialog", () => {
      this.dialogVisible = true;
    });
  },
   methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('Enviado!');
          } else {
            console.log('Error al enviar!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>