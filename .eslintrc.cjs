module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-essential'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'vue'],
	rules: {
		indent: ['error', 'tab'], // 使用 tab 缩进
		'linebreak-style': ['error', 'unix'], // 换行符使用 Unix
		quotes: ['error', 'single'],  // 使用单引号
		semi: ['error', 'never'], // 不使用分号
		'vue/multi-word-component-names': 'off' // 不提示多个单词组成的组件名
	}
}
