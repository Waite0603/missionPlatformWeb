<template>
	<div class="profile" v-if="profile.username">
		<!-- 头像 -->
		<div class="avater-update">
			<img
				class="avator-img"
				:src="profile.avatar"
				v-tooltip="'点击更换头像'"
				@click="visible = true"
			/>
			<div class="avator-name">{{ profile.username }}</div>
		</div>
		<hr />

		<div class="info-wapper">
			<div class="info-item">
				<label class="info-title">FirstName</label>
				<InputText
					placeholder="FirstName"
					:disabled="!edited"
					v-model="profile.first_name"
				/>
			</div>
			<div class="info-item">
				<label class="info-title">LastName</label>
				<InputText
					placeholder="LastName"
					:disabled="!edited"
					v-model="profile.last_name"
				/>
			</div>
			<div class="info-item">
				<label class="info-title">Email</label>
				<InputText
					placeholder="Email"
					:disabled="!edited"
					v-model="profile.email"
				/>
			</div>
			<div class="info-item">
				<label class="info-title">Phone</label>
				<InputText
					placeholder="Phone"
					:disabled="!edited"
					v-model="profile.phone"
				/>
			</div>
			<div class="info-item">
				<label class="info-title">Birthday</label>
				<InputText
					placeholder="Birthday"
					:disabled="!edited"
					v-model="profile.birthday"
				/>
			</div>
			<div class="info-item">
				<label class="info-title">Sex</label>
				<SelectButton
					v-model="profile.sex"
					:options="options"
					aria-labelledby="basic"
					:disabled="!edited"
				/>
			</div>
			<!-- addrees -->
			<div class="info-item" style="width: 61vw">
				<label class="info-title">Address</label>
				<InputText
					placeholder="Address"
					:disabled="!edited"
					v-model="profile.address"
				/>
			</div>
		</div>

		<div class="btn-group">
			<Button label="Edit" icon="pi pi-pencil" @click="edited = !edited" />
			<Button
				label="Save"
				icon="pi pi-save"
				@click="saveUpdate"
				:disabled="!edited"
			/>
		</div>
	</div>
	<!-- loading -->
	<div class="loading content" v-if="!profile.username">
		<ProgressSpinner />
	</div>

	<Dialog
		v-model:visible="visible"
		maximizable
		modal
		header="头像上传"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
	>
		<AvatarUpload @update-avatar="handUploadAvatar" />
	</Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserUpdateInfo } from '@/types/user'
import { getUserInfo, updateUserInfo } from '@/api/auth'
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import AvatarUpload from '@/components/AvatarUpload.vue'
import { useRouter } from 'vue-router'
import { i18n } from '@/lang/index'

const $t = i18n.global.t
const toast = useToast()
const router = useRouter()

const visible = ref(false)

const profile = ref<UserUpdateInfo>({
	id: 0,
	username: '',
	first_name: '',
	last_name: '',
	email: '',
	phone: '',
	birthday: '',
	sex: 'Boy',
	address: '',
	data_joined: '',
	avatar: 'https://qiniu.waite.wang/202409021640820.png'
})

onMounted(async () => {
	await getUserInfo()
		.then((res) => {
			profile.value = res.data
			profile.value.avatar =
				'/api/auth/avatar/preview?avatar=' + profile.value.avatar
		})
		.catch((res) => {
			toast.add({
				severity: 'error',
				summary: $t('toast.error'),
				detail: res.response.data.msg,
				life: 3000
			})
			setTimeout(() => {
				router.push('/auth/login')
			}, 1500)
		})
})

const options = ref(['Boy', 'Girl'])

const edited = ref(false)

const saveUpdate = async () => {
	const res = await updateUserInfo(profile.value)

	if (res.code === 200) {
		toast.add({
			severity: 'success',
			summary: $t('toast.success'),
			detail: res.msg,
			life: 3000
		})
	} else {
		toast.add({
			severity: 'error',
			summary: $t('toast.error'),
			detail: res.msg,
			life: 3000
		})
	}

	edited.value = false
}

const handUploadAvatar = async (avatar: string) => {
	profile.value.avatar = '/api/auth/avatar/preview?avatar=' + avatar

	visible.value = false
}
</script>

<style scoped></style>
