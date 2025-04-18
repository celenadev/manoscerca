export default {
    data() {
      return {
        mostrarOpciones: false,
        desplegarTexto: 'Abrir opciones',
        cerrarTexto: 'Cerrar',
        fontSize: 16,
        contrast: 'normal',
        grayscale: false,
        underlineLinks: false,
        readableFont: false,
        daltonism: 'normal',
        minFontSize: 12,
        maxFontSize: 24,
      };
    },
    methods: {
      toggleOpciones() {
        this.mostrarOpciones = !this.mostrarOpciones;
      },
      cambiarFontSize(accion) {
        if (accion === 'aumentar' && this.fontSize < this.maxFontSize) this.fontSize++;
        if (accion === 'disminuir' && this.fontSize > this.minFontSize) this.fontSize--;
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
      toggleUnderlineLinks() {
        this.underlineLinks = !this.underlineLinks;
        this.aplicarEstilos();
      },
      toggleReadableFont() {
        document.body.classList.toggle('readable-font', !this.readableFont);
        this.readableFont = !this.readableFont;
        this.savePreferences(); // Si tienes persistencia
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
        document.body.style.fontSize = this.fontSize + 'px';
        document.body.classList.toggle('contrast-high', this.contrast === 'high');
        document.body.classList.toggle('grayscale', this.grayscale);
        document.body.classList.toggle('underline-links', this.underlineLinks);
        document.body.classList.remove('daltonism-protanopia', 'daltonism-deuteranopia', 'daltonism-tritanopia');
        if (this.daltonism === 'protanopia') document.body.classList.add('daltonism-protanopia');
        if (this.daltonism === 'deuteranopia') document.body.classList.add('daltonism-deuteranopia');
        if (this.daltonism === 'tritanopia') document.body.classList.add('daltonism-tritanopia');
        this.savePreferences(); // Si tienes persistencia
      },
      loadPreferences() {
        // ... (tu lógica para cargar preferencias desde localStorage)
        const storedFontSize = localStorage.getItem('fontSize');
        if (storedFontSize) this.fontSize = parseInt(storedFontSize);
        const storedContrast = localStorage.getItem('contrast');
        if (storedContrast) this.contrast = storedContrast || 'normal';
        const storedGrayscale = localStorage.getItem('grayscale');
        if (storedGrayscale) this.grayscale = storedGrayscale === 'true';
        const storedUnderlineLinks = localStorage.getItem('underlineLinks');
        if (storedUnderlineLinks) this.underlineLinks = storedUnderlineLinks === 'true';
        const storedReadableFont = localStorage.getItem('readableFont');
        if (storedReadableFont) this.readableFont = storedReadableFont === 'true';
        const storedDaltonism = localStorage.getItem('daltonism');
        if (storedDaltonism) this.daltonism = storedDaltonism || 'normal';
        this.aplicarEstilos();
      },
      savePreferences() {
        // ... (tu lógica para guardar preferencias en localStorage)
        localStorage.setItem('fontSize', this.fontSize);
        localStorage.setItem('contrast', this.contrast);
        localStorage.setItem('grayscale', this.grayscale);
        localStorage.setItem('underlineLinks', this.underlineLinks);
        localStorage.setItem('readableFont', this.readableFont);
        localStorage.setItem('daltonism', this.daltonism);
      },
    },
    mounted() {
      this.loadPreferences();
    },
}