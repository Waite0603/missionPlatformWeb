import { PageParams } from '@/types/article'
import { get } from '@/utils/request'

// 获取文章
export const getArticle = async (id: number) => {
	const res = await get(`/article/get?id=${id}`)

	return res.data
}

// 获取推荐文章
export const getRecommend = async (id: number) => {
	const res = await get(`/article/recommend?id=${id}`)

	return res.data
}

// 获取文章列表
export const getArticleListAPI = async (params: PageParams) => {
	const res = await get('/article/get_list', params)

	return res.data
}
