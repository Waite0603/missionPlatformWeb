<template>
	<div class="content" style="padding: 20px">
		<div class="article-list" v-if="!isLoading && articleList.length">
			<a
				v-for="item in articleList"
				:key="item.id"
				:href="'/article/detail/' + item.id"
				class="article-item"
			>
				<Card>
					<template #title>
						{{ lang === 'en-US' ? item.english_title : item.title }}
					</template>
					<template #content>
						<p class="m-0">{{ escapeHtml(item.content) }}</p>
						<div class="author">
							<div class="info">
								<h4>{{ item.author }}</h4>
								<p>
									<i class="bx bx-time"></i>
									{{ item.update_time }}
								</p>
							</div>
						</div>
					</template>
				</Card>
			</a>
			<div class="more">
				<button
					@click="getMore"
					v-if="pageInfo?.page * pageInfo?.pageSize < pageInfo!.total"
				>
					<i class="bx bx-down-arrow"></i>
				</button>
			</div>
		</div>
		<div class="article-list" v-else>
			<div v-for="i in pageInfo.pageSize" :key="i" class="article-item">
				<Card class="skeleton-card">
					<template #title>
						<div class="skeleton-title">
							<Skeleton height="1.75rem" width="85%" class="mb-2" />
						</div>
					</template>
					<template #content>
						<div class="skeleton-content">
							<Skeleton width="100%" height="1rem" class="mb-2" />
							<Skeleton width="95%" height="1rem" class="mb-2" />
							<Skeleton width="90%" height="1rem" class="mb-2" />
							<div class="author mt-4">
								<div class="info">
									<Skeleton width="100px" height="1.25rem" class="mb-2" />
									<div class="time-info">
										<Skeleton width="14px" height="14px" class="mr-2" borderRadius="50%" />
										<Skeleton width="120px" height="1rem" />
									</div>
								</div>
							</div>
						</div>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, watch, nextTick } from 'vue'
import { escapeHtml } from '@/utils/utils'
import { ArticleParams, PageTotalParams } from '@/types/article'
import { i18n } from '@/lang/index'
import Skeleton from 'primevue/skeleton'
import { getArticleListAPI } from '@/api/article'

// page, pageSize, total
const pageInfo: Ref<PageTotalParams> = ref({
	page: 1,
	pageSize: 6,
	total: 100
})

const isLoading: Ref<boolean> = ref(true)
const oldScrollHeight = ref(0)

let lang = localStorage.getItem('language') || 'en-US'

const locale = i18n.global.locale
watch(locale, () => {
	lang = localStorage.getItem('language') || 'en-US'
})

// 文章列表
const articleList = ref<ArticleParams[]>([])

// 获取文章列表
const getArticleList = async () => {
	isLoading.value = true
	// 记录当前滚动高度
	oldScrollHeight.value = document.documentElement.scrollHeight
	try {
		const res = await getArticleListAPI({
			page: pageInfo.value.page,
			pageSize: pageInfo.value.pageSize
		})
		articleList.value.push(...res.data.data)
		pageInfo.value.total = res.data.total
	} finally {
		isLoading.value = false
		// 等待 DOM 更新后再滚动
		await nextTick()
		if (pageInfo.value.page > 1) {
			const newScrollHeight = document.documentElement.scrollHeight
			const scrollDistance = newScrollHeight - oldScrollHeight.value
			const targetScrollPosition = window.scrollY + (scrollDistance * 0.3) // 滚动30%的新增内容高度

			window.scrollTo({
				top: targetScrollPosition,
				behavior: 'smooth'
			})
		}
	}
}

// 获取更多
const getMore = () => {
	if (!isLoading.value) {
		pageInfo.value.page++
		getArticleList()
	}
}

onMounted(() => {
	getArticleList()
})
</script>

<style scoped>
.article-list {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	justify-content: space-between;
	transition: opacity 0.3s ease;
}

.article-item {
	text-decoration: none;
	color: inherit;
	width: calc(50% - 0.5rem);
	transition: transform 0.3s ease, opacity 0.3s ease;
}

.skeleton-card :deep(.p-card-content) {
	padding: 1rem;
}

.skeleton-title {
	padding: 1rem 1rem 0.5rem 1rem;
}

.skeleton-content {
	display: flex;
	flex-direction: column;
}

.author {
	margin-top: 1rem;
	border-top: 1px solid #eee;
	padding-top: 1rem;
}

.time-info {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.more {
	display: flex;
	justify-content: center;
	margin-top: 1rem;
	width: 100%;
}

.more button {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 1.5rem;
	color: #666;
}

.more button:hover {
	color: #333;
}

.mb-2 {
	margin-bottom: 0.5rem;
}

.mt-4 {
	margin-top: 1rem;
}

.mr-2 {
	margin-right: 0.5rem;
}

@media screen and (max-width: 768px) {
	.article-item {
		width: 100%;
	}
}
</style>
