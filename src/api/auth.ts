import { ContactParams } from '@/types/contact'
import { LoginParams, RegisterParams, UserUpdateInfo } from '@/types/user'
import { post, get, upload } from '@/utils/request'

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

// 联系我们
export const handContactUs = async (data: ContactParams) => {
	// console.l
	const res = await post('/auth/contact/', data)

	return res.data
}

// 获取用户信息
export const getUserInfo = async () => {
	const res = await get('/auth/userinfo/')

	return res.data
}

// 更新用户信息
export const updateUserInfo = async (data: UserUpdateInfo) => {
	const res = await post('/auth/update/', data)

	return res.data
}

// 头像上传
export const handUploadAvatar = async (data: FormData) => {
	console.log(data)
	const res = await upload('/auth/avatar/upload/', data)

	return res.data
}

// 开通会员
export const handleOpenVip = async (vip_type: number) => {
	const res = await post('/auth/vip/direct/open/', {
		vip_type
	})

	return res.data
}
