<template>
  <div>
    <main>
      <componentHeader />
      <router-view />
      <componentFooter />
      <DependentModal />
      <CaregiverModal />
    </main>
  </div>
</template>

<script>
import componentHeader from '@/components/Header/index.vue';
import componentFooter from '@/components/Footer/index.vue';
import DependentModal from '@/modals/dependent.vue'
import CaregiverModal from '@/modals/caregiver.vue'; //  modal para cuidadores
export default {
  name: 'App',
  components: {
    componentHeader,
    componentFooter,
    DependentModal, // Modals
    CaregiverModal
  },
}
</script>