// 文章
export type ArticleParams = {
	id: number
	title: string
	english_title: string
	content: string
	cover: string
	author_id: number
	author: string
	author_avatar: string
	create_time: string
	update_time: string
}

// 字数/ 阅读时间
export type ArticleInfoParams = {
	words_number: number
	reading_time: number
}

// page, pageSize
export type PageParams = {
	page: number
	pageSize: number
}

export type PageTotalParams = PageParams & {
	total: number
}
