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
					<Checkbox v-model="rememberMe" :binary="true" />
					<span>{{ $t('auth.login.rememberMe') }}</span>
				</div>
				<span class="span">{{ $t('auth.login.forgetPassword') }}</span>
			</div>

			<button class="button-submit" type="submit" :disabled="isLoading">
				<span v-if="isLoading"></span>
				<span v-else>{{ $t('auth.login.submit') }}</span>
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
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

// 国际化
const $t = i18n.global.t
const locale = i18n.global.locale

const loginFrom = reactive({
	username: '',
	password: ''
})
const rememberMe = ref(false)
const isLoading = ref(false)
const loginFromValidate = reactive({
	username: '',
	password: ''
})

// 初始化
onMounted(() => {
	const rememberMeData = localStorage.getItem('rememberMe')
	const { username, password } = rememberMeData
		? JSON.parse(rememberMeData)
		: {}

	if (username && password) {
		loginFrom.username = username
		loginFrom.password = password
		rememberMe.value = true
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
// 导入 user 全局状态
const userStore = useUserStore()
// 导入路由
const router = useRouter()
const handleSubmit = async (event) => {
	// 中止默认表单提交
	event.preventDefault()

	// 表单验证
	if (!validate()) {
		return
	}

	// 防止重复提交
	if (isLoading.value) {
		console.log('loginFrom', loginFrom)
		return
	}

	isLoading.value = true

	const res = await handLogin(loginFrom)

	if (res.code === 200) {
		if (rememberMe.value) {
			localStorage.setItem('rememberMe', JSON.stringify(loginFrom))
		} else {
			localStorage.removeItem('rememberMe')
		}

		// token
		localStorage.setItem('token', JSON.stringify(res.data.token))
		// del token
		delete res.data.token
		// pinia
		userStore.setUserInfo(res.data)

		toast.add({
			severity: 'success',
			summary: $t('toast.success'),
			detail: res.msg,
			life: 3000
		})

		setTimeout(() => {
			router.push('/')
		}, 3000)
	} else {
		toast.add({
			severity: 'error',
			summary: $t('toast.error'),
			detail: res.msg,
			life: 3000
		})
	}

	isLoading.value = false
}
</script>
