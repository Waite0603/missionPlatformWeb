<template>
	<nav>
		<div class="left">
			<div class="logo">
				<img src="@/assets/images/logo.png" />
			</div>
			<div class="links">
				<a href="/">Home</a>
				<a href="/course">Courses</a>
				<a href="/articles">Articles</a>
				<a href="#">Podcasts</a>
				<a href="/contact">Contact Us</a>
			</div>
		</div>

		<div class="buttons">
			<a href="#"><i class="bx bx-support"></i></a>
			<!-- VIP -->
			<a href="/vip">
				<i
					class="bx bx-diamond"
					style="color: #f8b400"
					v-if="user.userInfo.status !== 1"
				></i>
        <i
          class="bx bx-diamond"
          v-else
        ></i>
			</a>
			<a href="/user/profile"><i class="bx bx-user"></i></a>
		</div>
	</nav>
</template>

<script setup lang="ts">
import '@/assets/css/home.scss'

const user = JSON.parse(localStorage.getItem('user') || '{}')
</script>
