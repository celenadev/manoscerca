
// export default {
// 	name:Breadcrumb,
//     data() {
//       return {
//         breadcrumbs: []
//       };
//     },
//     watch: {
//       $route: {
//         immediate: true,
//         handler() {
//           this.updateBreadcrumbs();
//         }
//       }
//     },
//     methods: {
//       updateBreadcrumbs() {
//         const matchedRoutes = this.$route.matched;
//         this.breadcrumbs = matchedRoutes.map(route => ({
//           label: route.meta.breadcrumb || route.name,
//           to: { path: route.path }
//         }));
//       }
//     }
//   };
