<template>
	<SearchInput :keyword="keyword" />

	<div class="content search-page" v-if="keyword !== void 0">
		<div class="separator">
			<h2>Popular Courses</h2>
		</div>

		<div v-if="isLoadingCourses" class="section-loading">
			<ProgressSpinner style="width: 30px; height: 30px" />
		</div>

		<div class="courses" v-else>
			<div class="item" v-for="item in courseList" :key="item.id">
				<div class="top">
					<img :src="`/api/course/cover/${item.cover}`" alt="course" />
					<div class="info">
						<a :href="`/course/${item.id}`" class="title"> {{ item.name }}</a>
						<p class="desc">{{ item.desc }}</p>
						<br />
						<p>Creat Time : {{ item.create_time }}</p>
						<p>Update Time : {{ item.update_time }}</p>
					</div>
				</div>
				<div class="bottom">
					<div class="price">
						<h5>ID : {{ item.id }}</h5>
						<h5>Categroy : {{ item.category }}</h5>
					</div>
					<div class="discount">
						<h5 class="tag" v-if="item.status > 1">
							<span>会员专享</span>
						</h5>
						<h5 v-else><span>限时免费</span></h5>
					</div>
				</div>
			</div>
			<div class="nofound" v-if="courseList.length === 0">
				<h3>No course found</h3>
			</div>
		</div>

		<div class="separator">
			<h2>Blog Articles</h2>
		</div>

		<div v-if="isLoadingArticles" class="section-loading">
			<ProgressSpinner style="width: 30px; height: 30px" />
		</div>

		<div class="articles" v-else>
			<div class="item" v-for="item in articleList" :key="item.id">
				<div class="top">
					<img :src="`/api/article/cover/${item.cover}`" />
					<h5 v-html="lang === 'en-US' ? item.english_title : item.title"></h5>
				</div>
				<div class="bottom">
					<h5>{{ item.create_time }}</h5>
					<a :href="'/article/detail/' + item.id"
						>Read More <i class="bx bx-chevron-right"></i
					></a>
				</div>
			</div>
			<div class="nofound" v-if="articleList.length === 0">
				<h3>No article found</h3>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import { getSearchCourseList, getSearchArticleList } from '@/api/search'
import { onMounted } from 'vue'
import { ArticleParams } from '@/types/article'
import { CourseInfoItem } from '@/types/course'
import { useRouter } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
const keyword = ref('')
const isLoadingCourses = ref(false)
const isLoadingArticles = ref(false)

const articleList = ref<ArticleParams[]>([])
const courseList = ref<CourseInfoItem[]>([])

const lang = localStorage.getItem('language') || 'en-US'

// 获取课程列表
const getCourseList = async () => {
	isLoadingCourses.value = true
	const res = await getSearchCourseList(keyword.value)
	await delay(800)
	courseList.value = res.data
	isLoadingCourses.value = false
}

// 获取文章列表
const getArticleList = async () => {
	isLoadingArticles.value = true
	const res = await getSearchArticleList(keyword.value)
	await delay(800)
	articleList.value = res.data
	isLoadingArticles.value = false
}

// 添加延迟函数
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 搜索函数
const handleSearch = async () => {
	await Promise.all([
		getCourseList(),
		getArticleList()
	])
}

watchEffect(async () => {
	keyword.value = router.currentRoute.value.query.keyword as string
	if (keyword.value) {
		await handleSearch()
	}
})

onMounted(async () => {
	if (keyword.value) {
		await handleSearch()
	}
})
</script>

<style scoped>
.section-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100px;
}
</style>

