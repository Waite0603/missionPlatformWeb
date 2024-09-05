import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo, UserState } from '@/types/user'

export const useUserStore = defineStore({
	id: 'user',
	state: (): UserState => {
		const userInfo = ref<UserInfo | null>(null)

		const setUserInfo = (info: UserInfo) => {
			console.log('info', info)
			userInfo.value = info
		}

		// const setToken = (newToken: UserToken) => {
		// 	token.value = newToken
		// }

		const clearState = () => {
			localStorage.removeItem('userInfo')
			localStorage.removeItem('token')
			userInfo.value = null
		}

		return {
			userInfo,
			setUserInfo,
			clearState
		}
	},
	persist: true
})
