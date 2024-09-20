// 课程播放列表类型
export type ChapterListItem = {
  id: number
  name: string
  course_id: number
  video: string
  create_time: string
  update_time: string
  watch_num: number
  author_id: number
  status: number
}


// 课程信息类型
export type CourseInfoItem = {
  id: number
  name: string
  desc: string
  cover: string
  create_time: string
  update_time: string
  category_id: number
  category: string
  author_id: number
  status: number
}
