import { get } from '@/utils/request'

export const getSearchArticleList = async (keyword: string) => {
	const res = await get('/article/search', { keyword })

	return res.data
}

export const getSearchCourseList = async (keyword: string) => {
	const res = await get('/course/search', { keyword })

	return res.data
}
