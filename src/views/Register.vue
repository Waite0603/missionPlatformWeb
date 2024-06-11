<template>
	<div class="register">
		<form class="form" @submit="handleSubmit">
			<h1 class="title">Sign Up</h1>

			<div class="flex-column">
				<label>Username </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-user"></span>
				<input
					type="text"
					class="input"
					placeholder="Enter your User Name"
					v-model="RegisterFrom.user"
					autocomplete="current-username"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.user">
				{{ RegisterFromValidate.user }}
			</span>

			<div class="flex-column">
				<label>Email </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-user"></span>
				<input
					type="text"
					class="input"
					placeholder="Enter your Email"
					v-model="RegisterFrom.email"
					autocomplete="current-email"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.email">
				{{ RegisterFromValidate.email }}
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
					v-model="RegisterFrom.password"
					autocomplete="current-password"
					@blur="validate"
				/>
				<span class="pi pi-lightbulb" @click="showPassword($event)"></span>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.password">
				{{ RegisterFromValidate.password }}
			</span>

			<div class="flex-column">
				<label>Confirm Password </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-lock"></span>
				<input
					type="password"
					class="input"
					placeholder="Enter your Password"
					v-model="RegisterFrom.passwordConfirm"
					autocomplete="current-password"
					@blur="validate"
				/>
				<span class="pi pi-lightbulb" @click="showPassword($event)"></span>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.passwordConfirm">
				{{ RegisterFromValidate.passwordConfirm }}
			</span>

			<div class="flex-column">
				<label>Phone </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-phone"></span>
				<input
					type="text"
					class="input"
					placeholder="Enter your Phone"
					v-model="RegisterFrom.phone"
					autocomplete="current-phone"
					@blur="validate"
				/>
				<button class="btn-code" type="button" @click="getCode">
					{{ codeverify_state }}
				</button>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.phone">
				{{ RegisterFromValidate.phone }}
			</span>

			<div class="flex-column">
				<label>Verification Code </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-key"></span>
				<input
					type="text"
					class="input"
					placeholder="Enter your Verification Code"
					v-model="RegisterFrom.verificationCode"
					autocomplete="current-verificationCode"
					@blur="validate"
					@keydown.enter="handleSubmit"
				/>
			</div>
			<span
				class="error-message"
				v-show="RegisterFromValidate.verificationCode"
			>
				{{ RegisterFromValidate.verificationCode }}
			</span>

			<!-- has account -->
			<p class="p">
				Already have an account? <a class="span" href="/login">Sign In</a>
			</p>

			<button class="button-submit" type="submit">Sign Up</button>
		</form>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const RegisterFrom = reactive({
	user: '',
	email: '',
	password: '',
	passwordConfirm: '',
	phone: '',
	verificationCode: ''
})

const RegisterFromValidate = reactive({
	user: '',
	email: '',
	password: '',
	passwordConfirm: '',
	phone: '',
	verificationCode: ''
})

const codeverify_state = ref('Get Code')

// 显示密码, 传入作用域
const showPassword = (scope) => {
	const input = scope.target.previousElementSibling

	if (input.type === 'password') {
		input.type = 'text'
	} else {
		input.type = 'password'
	}
}

// 表单验证
const validate = () => {
	let flag = true

	if (!RegisterFrom.user) {
		RegisterFromValidate.user = 'Please enter your user name'
		flag = false
	} else {
		if (2 > RegisterFrom.user.length || RegisterFrom.user.length > 20) {
			RegisterFromValidate.user =
				'User name must be between 2 and 20 characters'
			flag = false
		} else {
			RegisterFromValidate.user = ''
		}
	}

	if (!RegisterFrom.email) {
		RegisterFromValidate.email = 'Please enter your email'
		flag = false
	} else {
		if (
			!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(RegisterFrom.email)
		) {
			RegisterFromValidate.email = 'Please enter the correct email format'
			flag = false
		} else {
			RegisterFromValidate.email = ''
		}
	}

	if (!RegisterFrom.password) {
		RegisterFromValidate.password = 'Please enter your password'
		flag = false
	} else {
		if (RegisterFrom.password.length < 6) {
			RegisterFromValidate.password = 'Password must be at least 6 characters'
			flag = false
		} else {
			RegisterFromValidate.password = ''
		}
	}

	if (!RegisterFrom.passwordConfirm) {
		RegisterFromValidate.passwordConfirm = 'Please enter your password'
		flag = false
	} else {
		if (RegisterFrom.password !== RegisterFrom.passwordConfirm) {
			RegisterFromValidate.passwordConfirm = 'Password does not match'

			flag = false
		} else {
			RegisterFromValidate.passwordConfirm = ''
		}
	}

	if (!RegisterFrom.phone) {
		RegisterFromValidate.phone = 'Please enter your phone'
		flag = false
	} else {
		if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(RegisterFrom.phone)) {
			RegisterFromValidate.phone = 'Please enter the correct phone format'
			flag = false
		} else {
			RegisterFromValidate.phone = ''
		}
	}

	if (!RegisterFrom.verificationCode) {
		RegisterFromValidate.verificationCode =
			'Please enter your verification code'
		flag = false
	} else {
		RegisterFromValidate.verificationCode = ''
	}

	return flag
}

// 获取验证码
const getCode = () => {
	if (!RegisterFrom.phone) {
		RegisterFromValidate.phone = 'Please enter your phone'
		return
	}

	if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(RegisterFrom.phone)) {
		RegisterFromValidate.phone = 'Please enter the correct phone format'
		return
	}

	if (codeverify_state.value !== 'Get Code') {
		return
	}

	let count = 60
	const timer = setInterval(() => {
		count--
		codeverify_state.value = `${count}s`
		if (count === 0) {
			clearInterval(timer)
			codeverify_state.value = 'Get Code'
		}
	}, 1000)
}

const handleSubmit = (event) => {
	event.preventDefault()

	if (!validate()) {
		return
	}

	console.log(RegisterFrom)

	alert('登录成功')
}
</script>

<style src="@/assets/css/auth.scss"></style>
