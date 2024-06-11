import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

export const changeLanguage = (language: string) => {
	locale.value = language
	localStorage.setItem('language', language)
	location.reload()
}
