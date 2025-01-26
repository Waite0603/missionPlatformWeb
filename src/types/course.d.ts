// 课程章节列表项类型定义
export type ChapterListItem = {
	id: number // 章节ID
	name: string // 章节名称
	course_id: number // 所属课程ID
	video: string // 视频地址
	create_time: string // 创建时间
	update_time: string // 更新时间
	watch_num: number // 观看次数
	author_id: number // 作者ID
	status: number // 状态：0-未发布，1-已发布
}

// 课程基本信息类型定义
export type CourseInfoItem = {
	id: number // 课程ID
	name: string // 课程名称
	desc: string // 课程描述
	cover: string // 课程封面
	create_time: string // 创建时间
	update_time: string // 更新时间
	category_id: number // 分类ID
	category: string // 分类名称
	author_id: number // 作者ID
	status: number // 状态：0-未发布，1-已发布
}

// 课程分类项类型定义
export type CategoryListItem = {
	id: number // 分类ID
	name: string // 分类名称
	desc: string // 分类描述
	create_time: string // 创建时间
	update_time: string // 更新时间
}
