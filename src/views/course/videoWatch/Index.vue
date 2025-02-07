<template>
	<div v-if="isLoading" class="loading-container">
		<ProgressSpinner />
	</div>

	<div class="video-container" v-else>
		<div class="video-player">
			<video
				id="thing-v"
				class="video"
				controls
				autoplay="false"
				:src="videoSrc"
				poster="https://video.gitapp.cn/api//upload/cover/1695820162309.jpeg"
				style="background-color: rgb(0, 0, 0)"
			></video>
		</div>
		<div class="video-list">
			<p class="text-lg font-bold">课程目录</p>
			<VirtualScroller
				:items="chapterList"
				:itemSize="50"
				d-loading="true"
				class="border border-surface-200 dark:border-surface-700 rounded"
			>
				<template v-slot:item="{ item, options }">
					<div
						class="list-item"
						:class="{ active: videoIndex === options.index }"
						@click="videoIndex = options.index"
					>
						{{ item.name }}
					</div>
				</template>
			</VirtualScroller>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getChapterList } from '@/api/course'
import { ChapterListItem } from '@/types/course'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { onMounted } from 'vue'
import { watch } from 'vue'
import { delay } from '@/utils/utils'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
// videoId
const videoIndex = ref(
	Number(router.currentRoute.value.params.videoId) - 1 || 0
)
const videoSrc = ref<string>('')
const toast = useToast()
const isLoading = ref(false)

const items = ref<string[]>([])
const chapterList = ref<ChapterListItem[]>([])

const handleGetChapterList = async (id: string) => {
	isLoading.value = true
	const res = await getChapterList(id)
	await delay(800)

	if (res.code === 200) {
		chapterList.value = res.data.chapter
		items.value = chapterList.value.map((item) => item.name)
		videoSrc.value = '/api/video/' + chapterList.value[+videoIndex.value].video
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
	isLoading.value = false
}

watch(videoIndex, (index) => {
	videoSrc.value = '/api/video/' + chapterList.value[+index].video
	router.push({
		path:
			'/course/detail/' + router.currentRoute.value.params.id + '/' + (index + 1)
	})
})

onMounted(() => {
	const courseId = router.currentRoute.value.params.id.toString()
	handleGetChapterList(courseId)
})
</script>

<style scoped>
.loading-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 300px;
}
</style>
