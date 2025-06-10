export default {
  data() {
    return {
      mostrarOpciones: false,
      opcionesTexto: {
        abrir: 'Abrir opciones',
        cerrar: 'Cerrar',
        alternarContrasteTexto: 'Alternar contraste',
        alternarGrayscaleTexto: 'Alternar escala de grises',
        alternarFuenteLegibleTexto: 'Alternar fuente legible',
        alternarDaltonismoTexto: 'Alternar modo para daltonismo',
        desactivarDaltonismoTexto: 'Desactivar daltonismo',
        protanopiaTexto: 'Modo Protanopia (rojo-verde)',
        deuteranopiaTexto: 'Modo Deuteranopia (rojo-verde)',
        tritanopiaTexto: 'Modo Tritanopia (azul-amarillo)',
      },
      contrast: 'normal',
      grayscale: false,
      readableFont: false,
      daltonism: 'normal',
      daltonismOptions: [
        { value: 'protanopia', label: 'Protanopia (rojo-verde)', colorClass: 'protanopia' },
        { value: 'deuteranopia', label: 'Deuteranopia (rojo-verde)', colorClass: 'deuteranopia' },
        { value: 'tritanopia', label: 'Tritanopia (azul-amarillo)', colorClass: 'tritanopia' },
      ],
    };
  },
  computed: {
    desplegarCerrarTexto() {
      return this.mostrarOpciones ? this.opcionesTexto.cerrar : this.opcionesTexto.abrir;
    },
  },
  methods: {
    toggleOpciones() {
      this.mostrarOpciones = !this.mostrarOpciones;
    },
    alternarContraste() {
      this.contrast = this.contrast === 'normal' ? 'high' : 'normal';
      this.aplicarEstilos();
    },
    toggleGrayscale() {
      this.grayscale = !this.grayscale;
      this.aplicarEstilos();
    },
    toggleReadableFont() {
      document.body.classList.toggle('readable-font', this.readableFont = !this.readableFont);
    },
    alternarDaltonismo() {
      this.daltonism = this.daltonism === 'normal' ? 'protanopia' : 'normal';
      this.aplicarEstilos();
    },
    setDaltonism(mode) {
      this.daltonism = mode;
      this.aplicarEstilos();
    },
    aplicarEstilos() {
      document.body.classList.toggle('contrast-high', this.contrast === 'high');
      document.body.classList.toggle('grayscale', this.grayscale);
      document.body.classList.remove('daltonism-protanopia', 'daltonism-deuteranopia', 'daltonism-tritanopia');
      if (this.daltonism !== 'normal') {
        document.body.classList.add(`daltonism-${this.daltonism}`);
      }
    },
  },
};