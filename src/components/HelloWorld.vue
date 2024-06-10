<template>
	<div>
		<h1>{{ count }}</h1>
		<button @click="count++">Increment</button>
		<h2>{{ props.msg }}</h2>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
// 接收 msg
const props = defineProps<{
	msg: string
}>()
</script>

<style scoped></style>
