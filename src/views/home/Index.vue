<template>
  <SearchInput />

	<div class="content home">
		<div class="separator">
			<h2> {{ $t('layout.popularCourse') }} </h2>
			<a href="#">See all <i class="bx bx-chevron-right"></i></a>
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
		</div>

		<div class="separator">
			<h2> {{ $t('layout.studentComments') }} </h2>
		</div>

		<div class="comments">
			<p>
        {{ $t('layout.studentCommentsContent') }}
			</p>
			<div class="right">
				<div class="item">
					<img src="@/assets/images/profile-3.png" />
					<p>That was best course for me.</p>
				</div>
				<div class="item">
					<img src="@/assets/images/profile-2.png" />
					<p>This courses helped me a lot!</p>
				</div>
				<div class="item">
					<img src="@/assets/images/profile-1.png" />
					<p>That was best course for me.</p>
				</div>
				<div class="item">
					<img src="@/assets/images/profile-1.png" />
					<p>This courses helped me a lot!</p>
				</div>
				<div class="item">
					<img src="@/assets/images/profile-2.png" />
					<p>That was best course for me.</p>
				</div>
				<div class="item">
					<img src="@/assets/images/profile-3.png" />
					<p>This courses helped me a lot!</p>
				</div>
			</div>
		</div>

		<div class="separator">
			<h2> {{ $t('layout.blogArticle') }} </h2>
			<a href="/articles"> See all <i class="bx bx-chevron-right"></i></a>
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
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import { getIndexRecommendList, getCourseRecommendList } from '@/api/home'
import { onMounted } from 'vue'
import { ArticleParams } from '@/types/article'
import { CourseInfoItem } from '@/types/course'

const articleList = ref<ArticleParams[]>([])
const courseList = ref<CourseInfoItem[]>([])

const lang = localStorage.getItem('language') || 'en-US'

// 获取课程列表
const getCourseList = async () => {
	const res = await getIndexRecommendList()
	articleList.value = res.data
}

// 获取文章列表
const getArticleList = async () => {
	const res = await getCourseRecommendList()
	console.log(res)
	courseList.value = res.data
}

onMounted(async () => {
	getArticleList()
	getCourseList()
})
</script>

<style scoped></style>
