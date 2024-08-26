<template>
	<Navigation />
	<router-view />
  <Footer />
</template>

<script setup>
import Navigation from './layout/Navigation.vue'
import Footer from './layout/Footer.vue'
</script>
