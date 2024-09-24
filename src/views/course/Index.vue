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

		<div class="courses">
			<div class="item" v-for="item in courseList" :key="item.id">
				<div class="top">
					<img :src="`/api/course/cover/${item.cover}`" alt="course" />
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
						<h5 class="tag" v-if="item.status > 5">
							<span>会员专享</span> Students
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

// 获取课程分类列表
const categoryList = ref<CategoryListItem[]>([])
// 课程列表
const activeCategory = ref<number>(0)
const courseList = ref<CourseInfoItem[]>([])

// 获取课程分类
const handleGetChapterList = async () => {
	const res = await getCategoryList()
	if (res.code === 200) {
		categoryList.value = res.data
	}
}

// 获取课程列表
const handleGetCourseList = async () => {
	const res = await getCourseList(activeCategory.value)
	courseList.value = res.data
}  

watch(activeCategory, () => {
	handleGetCourseList()
})

onMounted(() => {
	handleGetChapterList()
	handleGetCourseList()
})
</script>
c 