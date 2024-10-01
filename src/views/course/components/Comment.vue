<template>
	<!-- 评论区 -->
	<Card class="comment-card">
		<template #title> 评论 </template>
		<template #content>
			<div class="comment-box">
				<!-- 评论框 -->
				<div class="comment-input" v-if="userStore.userInfo">
					<span
						v-if="
							props.courseStatus &&
							props.courseStatus > 1 &&
							userStore.userInfo.status < 5
						"
					>
						该课程为会员专享课程，请先
            <router-link to="/vip">
              开通会员
            </router-link>
					</span>
					<span v-else>
						<Textarea v-model="comment" class="comment-textarea" />
						<Button label="提交" class="comment-btn" @click="submitComment" />
					</span>
				</div>
				<div class="comment-input" v-else>
					<p>
						请先
						<router-link to="/auth/login">登录</router-link>
						后再评论
					</p>
				</div>

				<div class="comment-item" v-for="item in commentList" :key="item.id">
					<div class="avatar">
						<img :src="`/api/auth/avatar/preview?avatar=${item.avatar}`" />
					</div>
					<div class="info">
						<p class="name">{{ item.author }}</p>
						<p class="comment">{{ item.content }}</p>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { getCommentList, createComment } from '@/api/comment'
import { CourseCommentParams } from '@/types/comment'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

// 接收课程状态
const props = defineProps({
	courseStatus: Number
})

const comment = ref('')
const userStore = useUserStore()
const router = useRouter()

let courseId = Number(router.currentRoute.value.params.id)
const commentList = ref<CourseCommentParams[]>([])

// 获取评论列表
const getComment = async () => {
	const res = await getCommentList(courseId)
	if (res.code === 200) {
		commentList.value = res.data
	}
}

const submitComment = async () => {
	const res = await createComment({
		courseId: courseId,
		content: comment.value
	})
	if (res.code === 200) {
		comment.value = ''
		getComment()
	}
}

onMounted(() => {
	getComment()
})

watch(
	() => router.currentRoute.value.params.id,
	() => {
		courseId = Number(router.currentRoute.value.params.id)
		getComment()
	}
)
</script>

<style scoped></style>
