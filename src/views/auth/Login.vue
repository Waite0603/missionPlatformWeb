<template>
	<div class="login">
		<form class="form" @submit="handleSubmit">
			<h1 class="title">{{ $t('auth.login.title') }}</h1>

			<div class="flex-column">
				<label> {{ $t('auth.login.email') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-user"></span>
				<input
					type="text"
					class="input"
					:placeholder="$t('auth.login.emailPlaceholder')"
					v-model="loginFrom.email"
					autocomplete="current-email"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="loginFromValidate.email">
				{{ loginFromValidate.email }}
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
import { ref, reactive, onMounted } from 'vue'
import Checkbox from 'primevue/checkbox'
import { i18n } from '@/lang/index'

const $t = i18n.global.t

console.log($t('auth.login.title'))

const loginFrom = reactive({
	email: '',
	password: ''
})
const checked = ref(false)
const loginFromValidate = reactive({
	email: '',
	password: ''
})

// 初始化
onMounted(() => {
	const email = localStorage.getItem('email')
	const password = localStorage.getItem('password')

	if (email && password) {
		loginFrom.email = email
		loginFrom.password = password
		checked.value = true
	}
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

	if (!loginFrom.email) {
		loginFromValidate.email = $t('auth.login.emailError')

		flag = false
	} else {
		if (
			!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(loginFrom.email)
		) {
			loginFromValidate.email = $t('auth.login.emailFormatError')
			flag = false
		} else {
			loginFromValidate.email = ''
		}
	}

	if (!loginFrom.password) {
		loginFromValidate.password = $t('auth.login.passwordError')

		flag = false
	} else {
		loginFromValidate.password = ''
	}

	return flag
}

const handleSubmit = (event) => {
	// 中止默认表单提交
	event.preventDefault()

	if (!validate()) {
		return
	}

	if (checked.value) {
		localStorage.setItem('email', loginFrom.email)
		localStorage.setItem('password', loginFrom.password)
	}

	alert('登录成功')
}
</script>
