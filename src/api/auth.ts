import { LoginParams } from '@/types/user'
import { post } from '@/utils/request'

// 登录
export const handLogin = async (data: LoginParams) => {
	const { username, password } = data

	const res = await post('/auth/login/', {
		username,
		password
	})

	console.log(res)
}
