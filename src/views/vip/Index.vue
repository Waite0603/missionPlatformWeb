<template>
	<div>
		<div class="vip-banner">
			<div class="container">
				<h1>Join VIP</h1>
				<p>Get access to all our courses, articles, and podcasts.</p>
				<!--激活码 -->
				<div v-if="!isVip.value">
					<InputText placeholder="Enter activation code" />
					<Button label="Activate" style="margin-left: 10px;"></Button>
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
import { ref, computed } from 'vue'

// 获取当前用户, localStorage.getItem('user')
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// 获取当前用户的 VIP 状态
const isVip = computed(() => user.value.status === 10)

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
</script>

<style scoped lang="scss">
.vip-banner {
	background-color: #2c3f5e;
	background-size: cover;
	color: #fff;
	padding: 100px 0;
	text-align: center;
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
