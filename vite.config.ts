import { defineConfig } from 'vite'
import path from 'path'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [PrimeVueResolver()]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8000/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
})
