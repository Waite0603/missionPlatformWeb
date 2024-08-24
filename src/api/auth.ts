import { LoginParams, RegisterParams } from '@/types/user'
import { post, get } from '@/utils/request'

// 登录
export const handLogin = async (data: LoginParams) => {
	const { username, password } = data

	const res = await post('/auth/login/', {
		username,
		password
	})

	return res.data
}

// 获取验证码
export const getCaptcha = async (phone: string) => {
	const res = await get('/auth/captcha/', {
		phone
	})

	return res.data
}

// 注册
export const handRegister = async (data: RegisterParams) => {
	const res = await post('/auth/register/', data)

	return res.data
}
