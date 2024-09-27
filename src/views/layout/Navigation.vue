<template>
	<nav>
		<div class="left">
			<div class="logo">
				<img src="@/assets/images/logo.png" />
			</div>
			<div class="links">
				<a href="/">{{ $t('layout.home') }}</a>
				<a href="/course">{{ $t('layout.course') }}</a>
				<a href="/articles">{{ $t('layout.article') }}</a>
				<a href="/contact">{{ $t('layout.contact') }}</a>
			</div>
		</div>

		<div class="buttons">
			<!-- 提示 -->
			<a
				href="#"
				@click="changeI18n"
				v-tooltip.bottom="$t('layout.switchLang')"
			>
				<i class="bx bx-world"></i>
			</a>
			<!-- VIP -->
			<a href="/vip">
				<i
					class="bx bx-diamond"
					style="color: #f8b400"
					v-if="user.userInfo && user.userInfo.status !== 1"
				></i>
				<i class="bx bx-diamond" v-else></i>
			</a>
			<a href="/user/profile"><i class="bx bx-user"></i></a>
		</div>
	</nav>
</template>

<script setup lang="ts">
import '@/assets/css/home.scss'
import { changeLanguage } from '@/lang/index'
import { ref } from 'vue'

const user = JSON.parse(localStorage.getItem('user') || '{}')
const language = ref(
	(localStorage.getItem('language') as 'en-US' | 'zh-CN') || 'en-US'
)

const changeI18n = () => {
	language.value = language.value === 'en-US' ? 'zh-CN' : 'en-US'
	changeLanguage(language.value)
}
</script>
