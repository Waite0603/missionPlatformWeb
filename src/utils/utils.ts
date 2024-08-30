// 处理时间格式
export function formatTime(time: string) {
	return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0]
}
