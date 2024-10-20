<template>
	<div>
		<div class="vip-banner">
			<div class="container">
				<h1>Join VIP</h1>
				<p>Get access to all our courses, articles, and podcasts.</p>
				<!-- 未登录 -->
				<div v-if="!user">
					<p>Please
            <router-link to="/auth/login">login</router-link>
            to join VIP</p>
				</div>
				<div v-if="user && user.status.status !== 1">
					<p>您已经是 VIP 会员</p>
					<p v-if="user.status === 5">到期时间: {{ user.vip_end_time }}</p>
					<p v-else>终身会员欢迎您！</p>
				</div>
				<!--激活码 -->
				<div v-if="user && user.status !== 10">
					<InputText placeholder="Enter activation code" />
					<Button label="Activate" style="margin-left: 10px"></Button>
				</div>
			</div>
		</div>
	</div>

	<div class="vip-product-card">
		<div class="vip-product-card-item">
			<Card style="width: 25rem; overflow: hidden">
				<template #header> </template>
				<template #title>普通会员</template>
				<template #subtitle>¥ 99 / 年</template>
				<template #content>
					<p class="m-0">畅享所有课程、文章、播客, 无限制观看</p>
				</template>
				<template #footer>
					<Button
						label="点击开通"
						severity="secondary"
						outlined
						class="w-full"
						@click="openVip(5)"
						v-if="user && user.status === 1"
					/>
					<Button
						label="点击续费"
						severity="secondary"
						outlined
						class="w-full"
						@click="openVip(5)"
						v-if="user && user.status === 5"
					/>
				</template>
			</Card>
		</div>
		<div class="vip-product-card-item">
			<Card style="width: 25rem; overflow: hidden">
				<template #header> </template>
				<template #title>终身会员</template>
				<template #subtitle>¥ 199</template>
				<template #content>
					<p class="m-0">畅享所有课程、文章、播客, 无限制观看</p>
				</template>
				<template #footer>
					<Button
						label="点击开通"
						severity="secondary"
						outlined
						class="w-full"
						@click="openVip(10)"
						v-if="user && user.status <= 10"
					/>
				</template>
			</Card>
		</div>
	</div>

	<div class="vip-privilege-card-wrap">
		<DataTable tableStyle="min-width: 50rem" :value="vipPrivilege">
			<Column field="description" header="特权描述" />
			<Column field="normal" header="普通用户" />
			<Column field="normal-vip" header="普通会员" />
			<Column field="lifetime-vip" header="终身会员" />

			<template>
				<tr>
					<td>畅享所有课程、文章、播客, 无限制观看</td>
					<td>畅享所有课程、文章、播客, 无限制观看</td>
				</tr>
			</template>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { handleOpenVip } from '@/api/auth'
import { useConfirm } from 'primevue/useconfirm'
import { i18n } from '@/lang/index'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/store/user'

const confirm = useConfirm()
const toast = useToast()
const $t = i18n.global.t
const useUser = useUserStore()

// 获取当前用户, localStorage.getItem('user')
const user = ref(useUser.userInfo)

console.log(user.value)

// VIP 特权
const vipPrivilege = ref([
	{
		description: '精选课程',
		normal: '仅部分免费课程',
		'normal-vip': '畅享所有课程、文章、播客',
		'lifetime-vip': '畅享所有课程、文章、播客'
	},
	{
		description: '学习时长',
		normal: '限制观看时长',
		'normal-vip': '无限制观看',
		'lifetime-vip': '无限制观看'
	},
	{
		description: '下载资料',
		normal: '部分资料可下载',
		'normal-vip': '所有资料可下载',
		'lifetime-vip': '所有资料可下载'
	}
])

// 开通会员
const openVip = async (vipType: number) => {
	confirm.require({
		message: '你确定要开通会员吗？',
		header: '开通会员',
		icon: 'pi pi-exclamation-triangle',
		rejectLabel: '取消',
		rejectClass: 'p-button-secondary p-button-outlined',
		acceptLabel: '确定',
		accept: async () => {
			// 开通会员
			const res = await handleOpenVip(vipType)
			if (res.code === 200) {
				// 更新用户信息
				useUser.setUserInfo(res.data)
				user.value = ref(JSON.parse(localStorage.getItem('user') || '{}'))
				// 提示
				toast.add({
					severity: 'success',
					summary: $t('toast.success'),
					detail: res.msg,
					life: 3000
				})

				// 刷新页面
				location.reload()
			} else {
				toast.add({
					severity: 'error',
					summary: $t('toast.error'),
					detail: res.msg,
					life: 3000
				})
			}
		}
	})
}
</script>

<style scoped lang="scss">
.vip-banner {
	background-color: #2c3f5e;
	background-size: cover;
	color: #fff;
	padding: 100px 0;
	text-align: center;
  a {
    color: #fff;
  }
  a:hover {
    color: #6f9adf;
  }
}

.vip-product-card {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	padding: 20px;
	align-items: center;
	justify-content: center;

	.vip-product-card-item {
		text-align: center;
	}
}

.vip-privilege-card-wrap {
	padding: 20px;
}
</style>
