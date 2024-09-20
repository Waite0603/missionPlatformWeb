import { get } from '@/utils/request'

// 获取课程播放列表 /course/chapter/list
export const getChapterList = async (courseId: string) => {
	const res = await get('/course/chapter/list', {
		courseId
	})

	return res.data
}

// 获取推荐课程
export const getRecommendList = async (courseId: string) => {
	const res = await get('/course/recommend', {
		id: courseId
	})

	return res.data
}
