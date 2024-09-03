<template>
	<div class="content contact">
		<h1>{{ $t('contact.title') }}</h1>
		<p>{{ $t('contact.description') }}</p>

		<form class="contact-form" @submit.prevent="submitForm">
			<div class="input-group">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-user"></i>
					</InputGroupAddon>
					<InputText
						:placeholder="$t('contact.name')"
						v-model="contactData.name"
						@blur="validate"
					/>
				</InputGroup>
				<span class="error-message" v-show="contactFromValidate.name">
					{{ contactFromValidate.name }}
				</span>
			</div>
			<div class="input-group">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-envelope"></i>
					</InputGroupAddon>
					<InputText
						:placeholder="$t('contact.email')"
						v-model="contactData.email"
						@blur="validate"
					/>
				</InputGroup>
				<span class="error-message" v-show="contactFromValidate.email">
					{{ contactFromValidate.email }}
				</span>
			</div>

			<div class="input-group">
				<InputGroup>
					<InputGroupAddon>
						<i class="pi pi-comment"></i>
					</InputGroupAddon>
					<Textarea
						v-model="contactData.message"
						autoResize
						rows="5"
						cols="30"
						:placeholder="$t('contact.message')"
						@blur="validate"
						@keydown.enter="submitForm"
					/>
				</InputGroup>
				<span class="error-message" v-show="contactFromValidate.message">
					{{ contactFromValidate.message }}
				</span>
			</div>
			<button type="submit" class="submit-btn" :disabled="submited">
				<span v-if="submited"> <dd></dd></span>
				<span v-else>{{ $t('contact.submit') }}</span>
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { i18n } from '@/lang/index'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { handContactUs } from '@/api/auth'

const $t = i18n.global.t

// 引入提示
const toast = useToast()
const router = useRouter()

// 校验
const contactFromValidate = reactive({
	name: '',
	email: '',
	message: ''
})

// 表单校验
const validate = () => {
	let flag = true
	if (!contactData.name) {
		contactFromValidate.name = $t('contact.nameError')
		flag = false
	} else {
		contactFromValidate.name = ''
	}

	if (!contactData.email) {
		contactFromValidate.email = $t('contact.emailError')
		flag = false
	} else if (
		!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(contactData.email)
	) {
		contactFromValidate.email = $t('contact.emailFormatError')
		flag = false
	} else {
		contactFromValidate.email = ''
	}

	if (!contactData.message) {
		contactFromValidate.message = $t('contact.messageError')
		flag = false
	} else {
		contactFromValidate.message = ''
	}

	return flag
}
const contactData = reactive({
	name: '',
	email: '',
	message: ''
})
const submited = ref(false)

const submitForm = async () => {
	event!.preventDefault()

	if (submited.value) {
		console.log('loginFrom', contactData)
		console.log(submited.value)
		return
	}

	if (!validate()) {
		return
	}

	submited.value = true

	const res = await handContactUs(contactData)

	if (res.code === 200) {
		toast.add({
			severity: 'success',
			summary: $t('toast.success'),
			detail: res.msg,
			life: 2000
		})

		setTimeout(() => {
			router.push('/')
		}, 1000)
	} else {
		toast.add({
			severity: 'error',
			summary: $t('toast.error'),
			detail: res.msg,
			life: 2000
		})
	}

	setTimeout(() => {
		submited.value = false
	}, 1000)
}
</script>

<style scoped></style>
