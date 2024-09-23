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

// 获取课程分类
export const getCategoryList = async () => {
	const res = await get('/course/category/list')

	return res.data
}

// 获取课程列表
export const getCourseList = async (categoryId: number) => {
	if (categoryId === 0) {
		const res = await get('/course/list')
		return res.data
	}

	const res = await get('/course/list', {
		category: categoryId
	})
	return res.data
}
