<template>
  <div>
    <main>
      <componentHeader />
      <FloatingLayer/>
      <router-view />
      <componentFooter />
      <DependentModal />
      <CarerModal />
    </main>
  </div>
</template>

<script>
import componentHeader from '@/components/Header/index.vue';
import FloatingLayer from "@/components/FloatingLayer/index.vue";
import componentFooter from '@/components/Footer/index.vue';
import DependentModal from '@/modals/dependentModal.vue';
import CarerModal from '@/modals/carerModal.vue';
export default {
  name: 'App',
  components: {
    componentHeader,
    FloatingLayer,
    componentFooter,
    DependentModal, // Modals
    CarerModal,
  },
}
</script>