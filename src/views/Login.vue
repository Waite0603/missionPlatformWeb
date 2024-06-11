<template>
	<div class="login">
		<form class="form" @submit="handleSubmit">
			<h1 class="title">Sign In</h1>

			<div class="flex-column">
				<label>Email </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-user"></span>
				<input
					type="text"
					class="input"
					placeholder="Enter your Email"
					v-model="loginFrom.email"
					autocomplete="current-email"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="loginFromValidate.email">
				{{ loginFromValidate.email }}
			</span>
			<div class="flex-column">
				<label>Password </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-lock"></span>
				<input
					type="password"
					class="input"
					id="password-input"
					placeholder="Enter your Password"
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
					<span>Remember me</span>
				</div>
				<span class="span">Forgot password?</span>
			</div>

			<button class="button-submit" type="submit">Sign In</button>

			<p class="p">Don't have an account? <a class="span">Sign up</a></p>
			<p class="p line">Or With</p>

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
import { ref, reactive } from 'vue'
import Checkbox from 'primevue/checkbox'

const loginFrom = reactive({
	email: '',
	password: ''
})

const loginFromValidate = reactive({
	email: '',
	password: ''
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
		loginFromValidate.email = 'Please enter your email'
		flag = false
	} else {
		if (
			!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(loginFrom.email)
		) {
			loginFromValidate.email = 'Please enter the correct email format'
			flag = false
		} else {
			loginFromValidate.email = ''
		}
	}

	if (!loginFrom.password) {
		loginFromValidate.password = 'Please enter your password'

		flag = false
	} else {
		loginFromValidate.password = ''
	}

	return flag
}

const checked = ref(false)

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

<style src="@/assets/css/auth.scss"></style>
