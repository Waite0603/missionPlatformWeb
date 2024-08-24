import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo, UserState, UserToken } from '@/types/user'

export const useUserStore = defineStore({
	id: 'user',
	state: (): UserState => {
		const userInfo = ref<UserInfo | null>(null)
		const token = ref<UserToken | null>(null)

		const setUserInfor = (info: UserInfo) => {
			userInfo.value = info
		}

		const setToken = (newToken: UserToken) => {
			token.value = newToken
		}

		const clearState = () => {
			localStorage.removeItem('token')
			localStorage.removeItem('userInfo')
			userInfo.value = null
			token.value = null
		}

		return {
			userInfo,
			token,
			setUserInfor,
			setToken,
			clearState
		}
	}
})
