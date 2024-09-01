<template>
	<div class="content" id="article-detail" v-if="articleData">
		<h1>
			{{ lang === 'en-US' ? articleData?.english_title : articleData?.title }}
		</h1>

		<!-- 文章观看次数, 文章字数, 阅读时间 -->
		<div class="extra">
			<span
				>{{ $t('article.words_number') }}: {{ articleInfo?.wordsNumber }}</span
			>
			<span
				>{{ $t('article.reading_time') }}:
				{{ articleInfo?.readingTime }} min</span
			>
		</div>

		<!-- 作者 -->
		<div class="author">
			<!-- https://via.placeholder.com/150" alt="author" /> -->
			<img
				:src="articleData?.author_avatar || 'https://via.placeholder.com/150'"
				alt="author"
			/>
			<div class="info">
				<h4>{{ articleData?.author }}</h4>
				<p>{{ articleData?.update_time.split(' ')[0] }}</p>
			</div>
		</div>

		<!-- 文章 -->
		<div class="article">
			<div v-html="articleData?.content"></div>
		</div>

		<!-- 文章推荐 -->
		<div class="recommend">
			<h2>{{ $t('article.recommend') }}</h2>
			<div class="recommend-list">
				<a
					v-for="item in articleRecommend"
					:key="item.id"
					:href="'/article/detail/' + item.id"
					class="recommend-item"
				>
					<Card>
						<template #title>
							{{ lang === 'en-US' ? item.english_title : item.title }}
						</template>
						<template #content>
							<p class="m-0">{{ escapeHtml(item.content).slice(0, 100) }}...</p>
						</template>
					</Card>
				</a>
			</div>
		</div>
	</div>

	<div class="content loading" v-else>
		<ProgressSpinner />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticle, getRecommend } from '@/api/article'
import { i18n } from '@/lang/index'
import { escapeHtml } from '@/utils/utils'

import { ArticleParams, ArticleInfoParams } from '@/types/article'
import { useToast } from 'primevue/usetoast'

const router = useRouter()

// i18n
const $t = i18n.global.t

// toast
const toast = useToast()

// 获取中文/ 英文
const lang = localStorage.getItem('language') || 'en-US'

const articleData = ref<ArticleParams | null>(null)
const articleInfo = ref<ArticleInfoParams | null>(null)
const articleRecommend = ref<ArticleParams[]>([])

// 页面创建
onMounted(() => {
	const id = router.currentRoute.value.params.id

	getArticleDetail(id)
})

// 获取文章详情
const getArticleDetail = async (id) => {
	const res = await getArticle(id)

	if (res.code === 200) {
		// 设置标题
		document.title = lang === 'en-US' ? res.data.english_title : res.data.title

		articleData.value = res.data

		// 获取文章字数, 计算阅读时间
		const wordsNumber = res.data.content.replace(/<[^>]+>/g, '').length
		const readingTime = Math.ceil(wordsNumber / 200)

		articleInfo.value = {
			wordsNumber,
			readingTime
		}

		// 获取推荐文章
		getRecommendArticle(res.data.id)
	} else {
		toast.add({
			severity: 'error',
			summary: $t('toast.error'),
			detail: res.msg
		})

		// 返回上一级
		setTimeout(() => {
			router.go(-1)
		}, 1500)
	}
}

// 获取推荐文章
const getRecommendArticle = async (id: number) => {
	const res = await getRecommend(id)

	console.log(res)
	if (res.code === 200) {
		articleRecommend.value = res.data
	}
}
</script>

<style scoped></style>
