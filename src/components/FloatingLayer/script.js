export default {
  data() {
    return {
      mostrarOpciones: false,
      opcionesTexto: {
        abrir: 'Abrir opciones',
        cerrar: 'Cerrar',
        aumentarTexto: 'Aumentar texto',
        reducirTexto: 'Reducir texto',
        alternarContrasteTexto: 'Alternar contraste',
        alternarGrayscaleTexto: 'Alternar escala de grises',
        alternarFuenteLegibleTexto: 'Alternar fuente legible',
        alternarDaltonismoTexto: 'Alternar modo para daltonismo',
        desactivarDaltonismoTexto: 'Desactivar daltonismo',
        modoNocheTexto: 'Alternar modo noche',
        modoOscuroTexto: 'Alternar modo oscuro',
        protanopiaTexto: 'Modo Protanopia (rojo-verde)',
        deuteranopiaTexto: 'Modo Deuteranopia (rojo-verde)',
        tritanopiaTexto: 'Modo Tritanopia (azul-amarillo)',
      },
      fontSize: 16,
      contrast: 'normal',
      grayscale: false,
      readableFont: false,
      daltonism: 'normal',
      modoNoche: false,
      modoOscuro: false,
      minFontSize: 12,
      maxFontSize: 24,
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
    cambiarFontSize(accion) {
      const incremento = 2;
      if (accion === 'aumentar' && this.fontSize < this.maxFontSize) {
        this.fontSize += incremento;
        console.log('fontSize aumentado a:', this.fontSize);
      } else if (accion === 'disminuir' && this.fontSize > this.minFontSize) {
        this.fontSize -= incremento;
        console.log('fontSize disminuido a:', this.fontSize);
      }
      this.aplicarEstilos();
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
      this.savePreferences();
    },
    alternarDaltonismo() {
      this.daltonism = this.daltonism === 'normal' ? 'protanopia' : 'normal';
      this.aplicarEstilos();
    },
    setDaltonism(mode) {
      this.daltonism = mode;
      this.aplicarEstilos();
    },
    toggleModoNoche() {
      this.modoNoche = !this.modoNoche;
      this.modoOscuro = false;
      this.aplicarEstilos();
      this.savePreferences();
    },
    toggleModoOscuro() {
      this.modoOscuro = !this.modoOscuro;
      this.modoNoche = false;
      this.aplicarEstilos();
      this.savePreferences();
    },
    aplicarEstilos() {
      console.log('Aplicando estilos, fontSize:', this.fontSize + 'px');
      document.body.style.fontSize = this.fontSize + 'px';
      document.body.classList.toggle('contrast-high', this.contrast === 'high');
      document.body.classList.toggle('grayscale', this.grayscale);
      document.body.classList.toggle('modo-noche', this.modoNoche);
      document.body.classList.toggle('modo-oscuro', this.modoOscuro);
      document.body.classList.remove('daltonism-protanopia', 'daltonism-deuteranopia', 'daltonism-tritanopia');
      if (this.daltonism) {
        document.body.classList.add(`daltonism-${this.daltonism}`);
      }
      this.savePreferences();
    },
    loadPreferences() {
      const prefs = localStorage.getItem('accesibilidad');
      if (prefs) {
        const data = JSON.parse(prefs);
        Object.assign(this, {
          fontSize: data.fontSize || 16,
          contrast: data.contrast || 'normal',
          grayscale: data.grayscale || false,
          readableFont: data.readableFont || false,
          daltonism: data.daltonism || 'normal',
          modoNoche: data.modoNoche || false,
          modoOscuro: data.modoOscuro || false,
        });
        this.aplicarEstilos();
      }
    },
    savePreferences() {
      localStorage.setItem('accesibilidad', JSON.stringify({
        fontSize: this.fontSize,
        contrast: this.contrast,
        grayscale: this.grayscale,
        readableFont: this.readableFont,
        daltonism: this.daltonism,
        modoNoche: this.modoNoche,
        modoOscuro: this.modoOscuro,
      }));
    },
  },
  mounted() {
    this.loadPreferences();
  },
}