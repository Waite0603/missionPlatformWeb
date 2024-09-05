<template>
	<div class="setting">
		<div class="setting-left">
			<ul>
				<li class="active">
					<router-link to="/user/profile">个人资料</router-link>
				</li>
				<li>
					<router-link to="/user/security">安全设置</router-link>
				</li>
				<li>
					<router-link to="/user/notification">消息通知</router-link>
				</li>
				<li>
					<router-link to="/user/privacy">隐私设置</router-link>
				</li>
				<li>
					<router-link to="/user/account">账号绑定</router-link>
				</li>
				<li>
					<!-- logout -->
					<a @click="logout">退出登录</a>
				</li>
			</ul>
		</div>
		<div class="setting-right">
			<router-view />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

import { i18n } from '@/lang/index'

const confirm = useConfirm()
const toast = useToast()
const $t = i18n.global.t
const router = useRouter()

const userStore = useUserStore()

const logout = () => {
	confirm.require({
		message: '你想要退出登录吗？',
		header: '退出登录',
		icon: 'pi pi-exclamation-triangle',
		rejectProps: {
			label: 'Cancel',
			severity: 'secondary',
			outlined: true
		},
		acceptProps: {
			label: 'Save'
		},
		accept: () => {
			userStore.clearState()
			toast.add({
				severity: 'success',
				summary: $t('toast.success'),
				detail: 'You have logged out',
				life: 3000
			})
			setTimeout(() => {
				router.push('/auth/login')
			}, 1500)
		}
	})
}
</script>
<style scoped></style>
