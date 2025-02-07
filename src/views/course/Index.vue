<template>
	<div class="banner-container">
		<div class="banner">
			<h1>精品体系课</h1>
			<p>
				精选市场热门高薪职位，大厂从业大牛全程服务，更严苛的学习过程管理，多种云端工具提升学习效果
			</p>
		</div>
	</div>

	<div class="content course-page">
		<div class="type-row">
			<div
				class="type-item"
				:class="{ active: activeCategory === 0 }"
				@click="activeCategory = 0"
			>
				<p>全部</p>
			</div>
			<div
				class="type-item"
				v-for="item in categoryList"
				:key="item.id"
				:class="{ active: activeCategory === item.id }"
				@click="activeCategory = item.id"
			>
				<p>{{ item.name }}</p>
			</div>
		</div>

		<div v-if="isLoadingCourses" class="courses">
			<div class="item" v-for="i in 6" :key="i">
				<div class="top">
					<Skeleton width="200px" height="150px" />
					<div class="info">
						<Skeleton width="70%" height="2rem" />
						<Skeleton width="90%" height="1rem" class="mt-2" />
						<Skeleton width="40%" height="1rem" class="mt-2" />
						<Skeleton width="40%" height="1rem" class="mt-2" />
					</div>
				</div>
				<div class="bottom">
					<div class="price">
						<Skeleton width="100px" height="1.5rem" />
						<Skeleton width="120px" height="1.5rem" />
					</div>
					<div class="discount">
						<Skeleton width="80px" height="1.5rem" />
					</div>
				</div>
			</div>
		</div>

		<div class="courses" v-else>
			<div class="item" v-for="item in courseList" :key="item.id">
				<div class="top">
					<img v-lazy="`/api/course/cover/${item.cover}`" alt="course" />
					<div class="info">
						<a :href="`/course/${item.id}`" class="title">
              {{ item.name }}</a>
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
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getCategoryList, getCourseList } from '@/api/course'
import { CategoryListItem, CourseInfoItem } from '@/types/course'
import { onMounted } from 'vue'
import { delay } from '@/utils/utils'
import vLazy from '@/directives/lazyLoad'
import Skeleton from 'primevue/skeleton'

const categoryList = ref<CategoryListItem[]>([])
const activeCategory = ref<number>(0)
const courseList = ref<CourseInfoItem[]>([])
const isLoadingCourses = ref(false)

// 获取课程分类
const handleGetChapterList = async () => {
	const res = await getCategoryList()
	if (res.code === 200) {
		categoryList.value = res.data
	}
}

// 获取课程列表
const handleGetCourseList = async () => {
	isLoadingCourses.value = true
	const res = await getCourseList(activeCategory.value)
	await delay(800)
	courseList.value = res.data
	isLoadingCourses.value = false
}

watch(activeCategory, () => {
	handleGetCourseList()
})

onMounted(() => {
	handleGetChapterList()
	handleGetCourseList()
})
</script>

<style scoped>
.section-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100px;
}

.mt-2 {
	margin-top: 0.5rem;
}
</style>
