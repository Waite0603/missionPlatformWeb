<template>
	<header>
		<div class="info">
			<h1>{{ $t('layout.hometitle') }}</h1>
			<p>{{ $t('layout.homecontent') }}</p>
		</div>
		<div class="buttons">
			<a href="/course">
				<button class="see-all">{{ $t('layout.seeCourse') }}</button>
			</a>
			<a href="/contact">
				<button>{{ $t('layout.contact') }}</button>
			</a>
		</div>
		<div class="search">
			<input
				type="text"
				:placeholder="$t('layout.searchPlaceholder')"
				v-model="searchText"
				@keyup.enter="search"
			/>
			<button @click="search"><i class="bx bx-search"></i></button>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

// 接收父组件传递的值
const props = defineProps<{
	keyword?: string
}>()

// 通过watchEffect监听路由变化
const searchText = ref(props.keyword)
const router = useRouter()

// 使用防抖的搜索函数
const debouncedSearch = useDebounceFn((value: string) => {
	if (value) {
		router.push({ path: '/search', query: { keyword: value } })
	} else {
		router.push({ path: '/search' })
	}
}, 1000)

// 监听输入变化
watch(searchText, (newValue) => {
	debouncedSearch(newValue || '')
})

// 保留即时搜索按钮功能
const search = () => {
	if (searchText.value) {
		router.push({ path: '/search', query: { keyword: searchText.value } })
	} else {
		router.push({ path: '/search' })
	}
}
</script>
<style scoped></style>
