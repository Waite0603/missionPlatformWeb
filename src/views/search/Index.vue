<template>
	<SearchInput :keyword="keyword" />

	<div class="content search-page" v-if="keyword !== void 0">
		<div class="separator">
			<h2>Popular Courses</h2>
		</div>

		<div class="courses">
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

		<div class="articles">
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

const router = useRouter()
const keyword = ref('')

const articleList = ref<ArticleParams[]>([])
const courseList = ref<CourseInfoItem[]>([])

const lang = localStorage.getItem('language') || 'en-US'

// 获取课程列表
const getCourseList = async () => {
	const res = await getSearchCourseList(keyword.value)

	courseList.value = res.data
}

// 获取文章列表
const getArticleList = async () => {
	const res = await getSearchArticleList(keyword.value)
	articleList.value = res.data
}

watchEffect(() => {
	keyword.value = router.currentRoute.value.query.keyword as string
	getArticleList()
	getCourseList()
})

onMounted(async () => {
	getArticleList()
	getCourseList()
})
</script>

<style scoped></style>
