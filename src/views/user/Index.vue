<template>
	<div class="setting">
		<div class="setting-left">
			<div class="avater-mode">
				<img
					class="avator-img"
					src="https://qiniu.waite.wang/202409021640820.png"
				/>
				<!-- 用户名 -->
				<div class="avator-name">amin000</div>
			</div>
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
					<router-link to="/user/other">其他</router-link>
				</li>
			</ul>
		</div>
		<div class="setting-right">
			<router-view />
		</div>
	</div>
</template>

<script setup></script>
<style scoped></style>
