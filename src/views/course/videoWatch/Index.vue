<template>
	<div class="video-container">
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
				:items="items"
				:itemSize="50"
        d-loading=true
				class="border border-surface-200 dark:border-surface-700 rounded"
			>
				<template v-slot:item="{ item, options }">
					<div
						class="list-item"
						:class="{ active: videoIndex === options.index }"
					>
						{{ item }}
					</div>
				</template>
			</VirtualScroller>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const videoIndex = ref(0)
const videoSrc =
	'http://127.0.0.1:8000/video/1dd411c1c3d63bad0efd5fc8280b62b9.mp4'

const items = ref<string[]>([
	'Product 1',
	'Product 2',
	'Product 3',
	'Product 1',
	'Product 2',
	'Product 3',
	'Product 1',
	'Product 2',
	'Product 3',

	'Product 3',
	'Product 3'
])
</script>

<style scoped></style>
