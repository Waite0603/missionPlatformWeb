<template>
	<div
		class="content"
		style="padding: 20px"
		v-if="articleList && articleList.length"
	>
		<div class="article-list">
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
		</div>
		<div class="more">
			<!-- 向下箭头 -->
			<button
				@click="getMore"
				v-if="pageInfo?.page * pageInfo?.pageSize < pageInfo!.total"
			>
				<i class="bx bx-down-arrow"></i>
			</button>
		</div>
	</div>
	<div class="content loading" v-else>
		<ProgressSpinner />
	</div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted } from 'vue'
import { escapeHtml } from '@/utils/utils'
import { ArticleParams, PageTotalParams } from '@/types/article'

// import Button from 'primevue/button'
import { getArticleListAPI } from '@/api/article'

// page, pageSize, total
const pageInfo: Ref<PageTotalParams> = ref({
	page: 1,
	pageSize: 6,
	total: 100
})

// get localstorage language
const lang = localStorage.getItem('language') || 'en-US'

// 文章列表
const articleList = ref<ArticleParams[]>([])

// 获取文章列表
const getArticleList = async () => {
	const res = await getArticleListAPI({
		page: pageInfo.value.page,
		pageSize: pageInfo.value.pageSize
	})
	articleList.value.push(...res.data.data)
	pageInfo.value.total = res.data.total
}

// 获取更多
const getMore = () => {
	pageInfo.value.page++
	getArticleList()
}

onMounted(() => {
	setTimeout(() => {
		getArticleList()
	}, 1000)
})
</script>

<style scoped></style>
