<template>
	<header>
		<div class="info">
			<h1>Learn Coding Easier With AsmrProg</h1>
			<p>Learn Programming With Coach And Mentor!</p>
		</div>
		<div class="buttons">
			<a href="/course">
				<button class="see-all">See Courses</button>
			</a>
			<a href="/contact">
				<button>Contact Us</button>
			</a>
		</div>
		<div class="search">
			<input
				type="text"
				placeholder="Search what you want..."
				v-model="searchText"
				@keyup.enter="search"
			/>
			<button @click="search"><i class="bx bx-search"></i></button>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 接收父组件传递的值
const props = defineProps<{
	keyword?: string
}>()

// 通过watchEffect监听路由变化
const searchText = ref(props.keyword)
const router = useRouter()
const search = () => {
	if (searchText.value) {
		router.push({ path: '/search', query: { keyword: searchText.value } })
	} else {
		router.push({ path: '/search' })
	}
}
</script>
<style scoped></style>
