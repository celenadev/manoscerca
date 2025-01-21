<template>
  <div>
    <main>
      <componentHeader />
      <router-view />
      <componentFooter />
      <DependentModal />
      <CarerModal />
    </main>
  </div>
</template>

<script>
import componentHeader from '@/components/Header/index.vue';
import componentFooter from '@/components/Footer/index.vue';
import DependentModal from '@/modals/dependentModal.vue';
import CarerModal from '@/modals/carerModal.vue';
export default {
  name: 'App',
  components: {
    componentHeader,
    componentFooter,
    DependentModal, // Modals
    CarerModal
  },
}
</script>