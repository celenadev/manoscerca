export default {
    data() {
        return {
            activeIndex: '/',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$router.push(key);
            this.activeIndex = key;
            console.log(key, keyPath);
        }
    }
}