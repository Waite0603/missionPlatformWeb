<template>
	<div class="login">
		<form class="form" @submit="handleSubmit">
			<h1 class="title">{{ $t('auth.login.title') }}</h1>

			<div class="flex-column">
				<label> {{ $t('auth.login.username') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-user"></span>
				<input
					type="text"
					class="input"
					:placeholder="$t('auth.login.usernamePlaceholder')"
					v-model="loginFrom.username"
					autocomplete="current-username"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="loginFromValidate.username">
				{{ loginFromValidate.username }}
			</span>
			<div class="flex-column">
				<label> {{ $t('auth.login.password') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-lock"></span>
				<input
					type="password"
					class="input"
					id="password-input"
					:placeholder="$t('auth.login.passwordPlaceholder')"
					v-model="loginFrom.password"
					autocomplete="current-password"
					@blur="validate"
					@keydown.enter="handleSubmit"
				/>
				<span class="pi pi-lightbulb" @click="showPassword"></span>
			</div>
			<span class="error-message" v-show="loginFromValidate.password">
				{{ loginFromValidate.password }}
			</span>

			<div class="flex-row">
				<div class="remember">
					<Checkbox v-model="checked" :binary="true" />
					<span>{{ $t('auth.login.rememberMe') }}</span>
				</div>
				<span class="span">{{ $t('auth.login.forgetPassword') }}</span>
			</div>

			<button class="button-submit" type="submit">
				{{ $t('auth.login.submit') }}
			</button>

			<p class="p">
				{{ $t('auth.login.hasNoAccount') }}
				<a class="span" href="/auth/register">{{
					$t('auth.login.register')
				}}</a>
			</p>
			<p class="p line">{{ $t('auth.login.orWith') }}</p>

			<div class="flex-row">
				<button class="btn google" type="button">
					<span class="pi pi-google"></span> Google
				</button>
				<button class="btn apple" type="button">
					<span class="pi pi-apple"></span> Apple
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import Checkbox from 'primevue/checkbox'
import { i18n } from '@/lang/index'
import { handLogin } from '@/api/auth'
import { useToast } from 'primevue/usetoast'

// 国际化
const $t = i18n.global.t
const locale = i18n.global.locale

const loginFrom = reactive({
	username: '',
	password: ''
})
const checked = ref(false)
const loginFromValidate = reactive({
	username: '',
	password: ''
})

// 初始化
onMounted(() => {
	const username = localStorage.getItem('username')
	const password = localStorage.getItem('password')

	if (username && password) {
		loginFrom.username = username
		loginFrom.password = password
		checked.value = true
	}
})

// 切换中英文
watch(locale, () => {
	validate()
})

// 显示密码
const showPassword = () => {
	const passwordInput = document.getElementById('password-input')

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text'
	} else {
		passwordInput.type = 'password'
	}
}

// 表单验证
const validate = () => {
	let flag = true

	if (!loginFrom.username) {
		loginFromValidate.username = $t('auth.login.usernameError')

		flag = false
	} else {
		loginFromValidate.username = ''
	}

	if (!loginFrom.password) {
		loginFromValidate.password = $t('auth.login.passwordError')

		flag = false
	} else {
		loginFromValidate.password = ''
	}

	return flag
}

// 导入提示
const toast = useToast()
const handleSubmit = (event) => {
	// 中止默认表单提交
	event.preventDefault()

	if (!validate()) {
		return
	}
	handLogin(loginFrom)

	toast.add({
		severity: 'warn',
		summary: 'Success Message',
		detail: 'Message Content',
		life: 3000
	})
}
</script>
