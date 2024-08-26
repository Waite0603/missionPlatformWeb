<template>
	<div class="register">
		<form class="form" @submit="handleSubmit">
			<h1 class="title">{{ $t('auth.register.title') }}</h1>

			<div class="flex-column">
				<label>{{ $t('auth.register.username') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-user"></span>
				<input
					type="text"
					class="input"
					:placeholder="$t('auth.register.usernamePlaceholder')"
					v-model="RegisterFrom.username"
					autocomplete="current-username"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.username">
				{{ RegisterFromValidate.username }}
			</span>

			<div class="flex-column">
				<label>{{ $t('auth.register.email') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-envelope"></span>
				<input
					type="text"
					class="input"
					:placeholder="$t('auth.register.emailPlaceholder')"
					v-model="RegisterFrom.email"
					autocomplete="current-email"
					@blur="validate"
				/>
			</div>
			<span class="error-message" v-show="RegisterFromValidate.email">
				{{ RegisterFromValidate.email }}
			</span>

			<div class="flex-column">
				<label>{{ $t('auth.register.password') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-lock"></span>
				<input
					type="password"
					class="input"
					id="password-input"
					:placeholder="$t('auth.register.passwordPlaceholder')"
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
				<label>{{ $t('auth.register.confirmPassword') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-unlock"></span>
				<input
					type="password"
					class="input"
					:placeholder="$t('auth.register.confirmPasswordPlaceholder')"
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
				<label>{{ $t('auth.register.phone') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-phone"></span>
				<input
					type="text"
					class="input"
					:placeholder="$t('auth.register.phonePlaceholder')"
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
				<label>{{ $t('auth.register.verificationCode') }} </label>
			</div>
			<div class="inputForm">
				<span class="pi pi-key"></span>
				<input
					type="text"
					class="input"
					:placeholder="$t('auth.register.verificationCodePlaceholder')"
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
				{{ $t('auth.register.hasAccount') }}
				<a class="span" href="/auth/login">{{ $t('auth.register.login') }}</a>
			</p>

			<button class="button-submit" type="submit" :disabled="isLoading">
				<span v-if="isLoading"></span>
				<span v-else>{{ $t('auth.register.submit') }}</span>
			</button>
		</form>
	</div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { i18n } from '@/lang/index'
import { useToast } from 'primevue/usetoast'
import { getCaptcha, handRegister } from '@/api/auth'
import { useRouter } from 'vue-router'

const $t = i18n.global.t
const locale = i18n.global.locale
const toast = useToast()
const router = useRouter()

const RegisterFrom = reactive({
	username: '',
	email: '',
	password: '',
	passwordConfirm: '',
	phone: '',
	verificationCode: ''
})

const RegisterFromValidate = reactive({
	username: '',
	email: '',
	password: '',
	passwordConfirm: '',
	phone: '',
	verificationCode: ''
})

// 提交验证状态, 默认为 false, 当为 true 时, 表单验证才会生效
const submitVerificationStatus = ref(false)
// 正在加载状态
const isLoading = ref(false)
// 获取验证码状态
let codeverify_state = ref($t('auth.register.getCode'))
// 切换中英文, 重置 codeverify_state
watch(locale, () => {
	codeverify_state.value = $t('auth.register.getCode')
	validate()
})

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
	if (!submitVerificationStatus.value) {
		return
	}

	let flag = true

	if (!RegisterFrom.username) {
		RegisterFromValidate.username = $t('auth.register.usernamePlaceholder')
		flag = false
	} else {
		if (2 > RegisterFrom.username.length || RegisterFrom.username.length > 20) {
			RegisterFromValidate.username = $t('auth.register.usernameLengthError')
			flag = false
		} else {
			RegisterFromValidate.username = ''
		}
	}

	if (!RegisterFrom.email) {
		RegisterFromValidate.email = $t('auth.register.emailError')
		flag = false
	} else {
		if (
			!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(RegisterFrom.email)
		) {
			RegisterFromValidate.email = $t('auth.register.emailFormatError')
			flag = false
		} else {
			RegisterFromValidate.email = ''
		}
	}

	if (!RegisterFrom.password) {
		RegisterFromValidate.password = $t('auth.register.passwordError')
		flag = false
	} else {
		if (RegisterFrom.password.length < 6) {
			RegisterFromValidate.password = $t('auth.register.passwordLengthError')
			flag = false
		} else {
			RegisterFromValidate.password = ''
		}
	}

	if (!RegisterFrom.passwordConfirm) {
		RegisterFromValidate.passwordConfirm = $t(
			'auth.register.confirmPasswordError'
		)
		flag = false
	} else {
		if (RegisterFrom.password !== RegisterFrom.passwordConfirm) {
			RegisterFromValidate.passwordConfirm = $t(
				'auth.register.passwordInconsistentError'
			)

			flag = false
		} else {
			RegisterFromValidate.passwordConfirm = ''
		}
	}

	if (!RegisterFrom.phone) {
		RegisterFromValidate.phone = $t('auth.register.phoneError')
		flag = false
	} else {
		if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(RegisterFrom.phone)) {
			RegisterFromValidate.phone = $t('auth.register.phoneFormatError')
			flag = false
		} else {
			RegisterFromValidate.phone = ''
		}
	}

	if (!RegisterFrom.verificationCode) {
		RegisterFromValidate.verificationCode = $t(
			'auth.register.verificationCodeError'
		)
		flag = false
	} else {
		RegisterFromValidate.verificationCode = ''
	}

	return flag
}

// 获取验证码
const getCode = async () => {
	if (!RegisterFrom.phone) {
		RegisterFromValidate.phone = $t('auth.register.phoneError')
		return
	}

	if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(RegisterFrom.phone)) {
		RegisterFromValidate.phone = $t('auth.register.phoneFormatError')
		return
	}

	const getCodeText = $t('auth.register.getCode')
	if (codeverify_state.value !== getCodeText) {
		return
	}

	RegisterFromValidate.phone = ''

	const res = await getCaptcha(RegisterFrom.phone)

	toast.add({
		severity: 'info',
		summary: $t('toast.info'),
		detail: res.msg,
		life: 3000
	})
	let count = 60
	const timer = setInterval(() => {
		count--
		codeverify_state.value = `${count}s`
		if (count === 0) {
			clearInterval(timer)
			codeverify_state.value = getCodeText
		}
	}, 1000)
}

const handleSubmit = async (event) => {
	submitVerificationStatus.value = true
	event.preventDefault()

	if (!validate()) {
		return
	}

	if (isLoading.value) {
		return
	}

	isLoading.value = true

	const res = await handRegister(RegisterFrom)
	console.log('res', res)

	if (res.code === 200) {
		toast.add({
			severity: 'success',
			summary: $t('toast.success'),
			detail: res.msg,
			life: 3000
		})

		setTimeout(() => {
			router.push('/auth/login')
		}, 1000)
	} else {
		toast.add({
			severity: 'error',
			summary: $t('toast.error'),
			detail: res.msg,
			life: 3000
		})

		isLoading.value = false
	}
}
</script>
