<template>
	<!-- loading -->
	<div v-if="!courseInfo" class="content loading">
		<ProgressSpinner />
	</div>
	<div class="course-detail-page" v-else>
		<div class="course-detail-banner">
			<div class="banner">
				<h1>{{ courseInfo?.name }}</h1>
				<!-- 会员专享 -->
				<div class="vip-box" v-if="courseInfo && courseInfo.status > 5">
					<img src="@/assets/images/logo.png" />
					<span>会员专享</span>
				</div>
				<p>新考纲通关备考系统指南，助你高效备考，倍速掌握知识要点，顺利通关</p>

				<div class="info-box">
					<div class="item-box">已完结</div>
					<span class="devide">|</span>
					<div class="item-box">
						难度：<span class="red js-difficult-word">中级</span>
					</div>
					<span class="devide">|</span>
					<div class="item-box">
						分类:
						<span class="red">
							{{ courseInfo?.category }}
						</span>
					</div>
				</div>
			</div>
			<div class="btn-box" v-if="userInfo?.status < 5">
				<a href="/vip">
					<Button label="开通会员" severity="danger" rounded />
				</a>
			</div>
		</div>

		<div class="course-content">
			<div class="right">
				<Card>
					<template #title> 课程目录 </template>
					<template #content>
						<ul v-for="item in chapterList" :key="item.id">
							<li @click="skipToVideo(item.id)">
								<i class="pi pi-video"></i>
								<span>{{ item.name }}</span>
							</li>
						</ul>
						<!-- 会员课程, 用户未登录或者不是会员，显示 -->
						<div
							v-if="courseInfo && courseInfo.status > 1 && userInfo?.status < 5"
						>
							<p>该课程为会员专享课程，请先开通会员</p>
						</div>
					</template>
				</Card>

				<!-- 评论区 -->
				<Comment :courseStatus="courseInfo?.status" />
			</div>

			<div class="left">
				<Card>
					<template #title> 课程介绍 </template>
					<template #content>
						<p>
							{{ courseInfo?.desc }}
						</p>
					</template>
				</Card>

				<!-- 推荐课程 -->
				<Card>
					<template #title> 推荐课程 </template>
					<template #content>
						<div v-if="isLoadingRecommend" class="section-loading">
							<ProgressSpinner style="width: 30px; height: 30px" />
						</div>
						<div class="recommend-course" v-else>
							<div
								class="item"
								v-for="item in recommendList"
								:key="item.id"
								@click="skipToCourse(item.id)"
							>
								<img :src="`/api/course/cover/${item.cover}`" />
								<div class="info">
									<a href="#">{{ item.name }}</a>
									<p>Cateogry: {{ item.category }}</p>
									<p class="desc">description: {{ item.desc }}</p>
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
import Comment from '../components/Comment.vue'
import { ref, watch } from 'vue'
import { getChapterList, getRecommendList } from '@/api/course'
import { ChapterListItem, CourseInfoItem } from '@/types/course'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { delay } from '@/utils/utils'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
const toast = useToast()
const userStore = useUserStore()
const userInfo = userStore.userInfo

const chapterList = ref<ChapterListItem[]>([])
const courseInfo = ref<CourseInfoItem | null>(null)
const recommendList = ref<CourseInfoItem[]>([])
const isLoadingCourse = ref(false)
const isLoadingRecommend = ref(false)
let courseId = router.currentRoute.value.params.id.toString()

// 跳转到视频播放页面
const skipToVideo = (id: number) => {
	if (
		courseInfo.value &&
		courseInfo.value!.status > 1 &&
		userInfo?.status < 5
	) {
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: '该课程为会员专享课程，请先开通会员',
			life: 3000
		})
		return
	}

	// 清空数据
	chapterList.value = []
	courseInfo.value = null
	router.push({
		path: '/course/detail/' + courseId + '/' + id
	})
}

// 跳转到课程详情页面
const skipToCourse = (id: number) => {
	router.push({
		path: '/course/' + id
	})
}

const handleGetChapterList = async () => {
	isLoadingCourse.value = true
	const res = await getChapterList(courseId)
	await delay(800)
	if (res.code === 200) {
		chapterList.value = res.data.chapter
		courseInfo.value = res.data.course
		document.title = res.data.course.name
	} else {
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: res.msg,
			life: 3000
		})
		setTimeout(() => {
			router.go(-1)
		}, 1500)
	}
	isLoadingCourse.value = false
}

const handleGetRecommendList = async () => {
	isLoadingRecommend.value = true
	const res = await getRecommendList(courseId)
	await delay(800)
	if (res.code === 200) {
		recommendList.value = res.data
	}
	isLoadingRecommend.value = false
}

onMounted(() => {
	Promise.all([handleGetChapterList(), handleGetRecommendList()])
})

watch(
	() => router.currentRoute.value.params.id,
	() => {
		courseId = router.currentRoute.value.params.id.toString()
		Promise.all([handleGetChapterList(), handleGetRecommendList()])
		window.scrollTo(0, 0)
	}
)
</script>

<style scoped>
.section-loading {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100px;
}
</style>
