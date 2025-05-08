export default {
    data() {
        return {
            mounted() {
                this.updateActiveIndicator();
            },
            watch: {
                '$route.path': 'updateActiveIndicator'
            },
        };
    },
    updateActiveIndicator() {
        this.$nextTick(() => {
            const activeItem = document.querySelector('.el-menu-demo .router-link-exact-active');
            const indicator = document.querySelector('.el-menu-demo .active-indicator');

            if (activeItem && indicator) {
                indicator.style.width = `${activeItem.offsetWidth}px`;
                indicator.style.left = `${activeItem.offsetLeft}px`;
            } else if (indicator) {
                indicator.style.width = '0';
                indicator.style.left = '0';
            }
        });
    }
}
