<template>
  <div>
    <main>
      <componentHeader />
      <router-view />
      <componentFooter />
    </main>
  </div>
</template>

<script>
import componentHeader from '@/components/Header/index.vue';
import componentFooter from '@/components/Footer/index.vue';
export default {
  name: 'App',
  components: {
    componentHeader,
    componentFooter
  },
}
</script>