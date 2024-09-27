<template>
	<footer>
		<div class="columns">
			<div class="col">
				<h5>{{ $t('layout.siteLink') }}</h5>
				<a href="/">{{ $t('layout.home') }}</a>
				<a href="/course">{{ $t('layout.course') }}</a>
				<a href="/articles">{{ $t('layout.article') }}</a>
				<a href="/contact">{{ $t('layout.contact') }}</a>
			</div>
			<div class="col">
				<h5>{{ $t('layout.otherPage') }}</h5>
				<a href="/404">{{ $t('layout.404') }}</a>
				<a href="/auth/login">{{ $t('layout.login') }}</a>
				<a href="/auth/register">{{ $t('layout.register') }}</a>
			</div>
			<div class="col">
				<h5>{{ $t('layout.collaboration') }}</h5>
				<a href="https://waite.wang/" target="_blank">{{
					$t('layout.blog')
				}}</a>
			</div>
			<div class="col last">
				<h5>{{ $t('layout.about') }}</h5>
				<p>
					{{ $t('layout.aboutContent') }}
				</p>
				<div class="social-links">
					<i class="bx bxl-instagram"></i>
					<i class="bx bxl-dribbble"></i>
					<i class="bx bxl-linkedin"></i>
					<i class="bx bxl-twitter"></i>
				</div>
			</div>
		</div>
		<div class="copyright">
			<p>
				Copyright © 2024 By
				<a href="https://waite.wang/" target="_blank" style="color: #fff"
					>Waite</a
				>
				, All Rights Reserved.
			</p>
		</div>
	</footer>
</template>

<script></script>

<style scoped></style>
