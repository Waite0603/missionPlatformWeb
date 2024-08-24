// 用户 pinia state 的类型定义
export interface UserState {
	userInfo: Ref<UserInfo | null>
	token: Ref<UserToken | null>
	setUserInfor: (info: UserInfo) => void
	setToken: (token: UserToken) => void
	clearState: () => void
}

// LoginParams
export type LoginParams = {
  username: string
  password: string
}

// 用户信息
export type UserInfo = {
	id: number
	username: string
	first_name: string
	last_name: string
	email: string
	is_superuser: boolean
	// 是否是激活状态
	is_active: boolean
	data_joined: string
	last_login: string
	phone: string
	birthday: string
	sex: string
	avater: string
	address: string
}

// 用户 token
export type UserToken = {
	access: string
	refresh: string
}
