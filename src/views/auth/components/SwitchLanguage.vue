<template>
	<div class="bottom">
		<div class="switch_language">
			<Dropdown
				v-model="selectLanguage"
				:options="languages"
				optionLabel="name"
				checkmark
				@change="changeLanguage(selectLanguage.languages)"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { changeLanguage } from '@/lang/index'

const languages = ref([
	{ name: 'English', languages: 'en-US' },
	{ name: '中文', languages: 'zh-CN' }
])

const selectLanguage = ref()

onMounted(() => {
	selectLanguage.value = languages.value.find(
		(item) => item.languages === localStorage.getItem('language')
	)

	if (!selectLanguage.value) {
		selectLanguage.value = languages.value[0]

		localStorage.setItem('language', selectLanguage.value.languages)
	}
})
</script>

<style scoped></style>
