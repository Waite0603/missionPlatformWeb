import { post, get } from '@/utils/request'

// 传入数据格式
type CreateCommentParams = {
	content: string
	courseId: number
}

// 创建评论
export const createComment = async (data: CreateCommentParams) => {
	const res = await post('/comment/create/', data)

	return res.data
}

// 查看评论
export const getCommentList = async (courseId: number) => {
	const res = await get('/comment/list/', {
		courseId
	})

	return res.data
}
