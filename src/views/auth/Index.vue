<template>
	<div class="container">
		<router-view></router-view>

		<SwitchLanguage />
	</div>
</template>

<script setup>
import SwitchLanguage from './components/SwitchLanguage.vue'
</script>

<style src="@/assets/css/auth.scss"></style>
