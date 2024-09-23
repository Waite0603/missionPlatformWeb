import { get } from '@/utils/request'

// 获取首页推荐文章
export const getIndexRecommendList = async () => {
	const res = await get('/article/index')

	return res.data
}

// 获取首页推荐课程
export const getCourseRecommendList = async () => {
	const res = await get('/course/index')

	return res.data
}
