import enUS from './en-US/index'
import zhCN from './zh-CN/index'

import { createI18n } from 'vue-i18n'

const langConfig = localStorage.getItem('language') || 'en-US'

const i18n = createI18n({
	// componsition API 需要使用legacy: false
	legacy: false,
	locale: langConfig,
	// 可以使用globalInjection: true，将i18n对象注入到全局属性中
	// 通过this.$t('key')访问
	globalInjection: true,
	messages: {
		'en-US': enUS,
		'zh-CN': zhCN
	}
})

const changeLanguage = (language: 'en-US' | 'zh-CN') => {
	i18n.global.locale.value = language
	localStorage.setItem('language', language)
	// location.reload()
}

export { i18n, changeLanguage }
