<template>
	<div class="profile">
		<!-- 头像 -->
		<div class="avater-update">
			<img
				class="avator-img"
				src="https://qiniu.waite.wang/202409021640820.png"
				v-tooltip="'点击更换头像'"
			/>
			<div class="avator-name">amin000</div>
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
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserUpdateInfo } from '@/types/user'

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
	avater: ''
})

const options = ref(['Boy', 'Girl'])

const edited = ref(false)
</script>

<style scoped></style>
