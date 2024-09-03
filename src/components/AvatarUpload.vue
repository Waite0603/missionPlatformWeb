<template>
	<div class="upload-avater">
		<div class="left" v-show="option.img">
			<VueCropper
				ref="cropper"
				:img="option.img"
				:output-size="option.outputSize"
				:output-type="option.outputType"
				:auto-crop="option.autoCrop"
				:auto-crop-width="option.autoCropWidth"
				:auto-crop-height="option.autoCropHeight"
				:can-move="option.canMove"
				:can-scale="option.canScale"
				:centerBox="option.centerBox"
				:fixed="option.fixed"
				:fixedNumber="option.fixedNumber"
				:full="option.full"
				limitMinSize="100"
				@realTime="onRealTime"
			/>
		</div>
		<div class="right">
			<!-- 预览图片 -->
			<div class="preview">
				<img @load="lookImg" :src="previewImg" v-show="option.img" />
			</div>

			<div class="upload">
				<FileUpload
					mode="basic"
					@select="onFileSelect"
					customUpload
					auto
					severity="secondary"
					class="p-button-outlined"
				/>

				<Button
					label="Upload"
					@click="uploadAvatar"
					v-show="previewImg"
					class="p-button-outlined"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { VueCropper } from 'vue-cropper'
import { defineEmits, ref, reactive } from 'vue'
import { handUploadAvatar } from '@/api/auth'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const emits = defineEmits(['update-avatar'])
// 裁剪后的预览样式信息
const previews = ref({})
const previewImg = ref()
const cropper = ref(null)
// 上传状态
const uploading = ref(false)
const option = reactive({
	img: '',
	name: '',
	outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
	outputType: 'png', //裁剪生成图片的格式（jpeg || png || webp）
	info: true, //图片大小信息
	canScale: true, //图片是否允许滚轮缩放
	autoCrop: true, //是否默认生成截图框
	autoCropWidth: 120, //默认生成截图框宽度
	autoCropHeight: 120, //默认生成截图框高度
	fixed: true, //是否开启截图框宽高固定比例
	fixedNumber: [1, 1], //截图框的宽高比例
	full: false, //false按原比例裁切图片，不失真
	fixedBox: false, //固定截图框大小，不允许改变
	canMove: true, //上传图片是否可以移动
	canMoveBox: true, //截图框能否拖动
	original: false, //上传图片按照原始比例渲染
	centerBox: true, //截图框是否被限制在图片里面
	height: false, //是否按照设备的dpr 输出等比例图片
	infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
	maxImgSize: 3000, //限制图片最大宽度和高度
	enlarge: 1, //图片根据截图框输出比例倍数
	mode: '100% 100%' //图片默认渲染方式
})

const onRealTime = (data) => {
	previews.value = data
	cropper.value.getCropBlob((data) => {
		previewImg.value = URL.createObjectURL(data)
	})
}

const onFileSelect = (e) => {
	const file = e.files[0]
	const reader = new FileReader()

	reader.onload = (e) => {
		option.img = e.target.result
	}

	reader.readAsDataURL(file)
}

// blob 转 file
const blobToFile = (theBlob, fileName) => {
	var b = theBlob
	b.lastModifiedDate = new Date()
	b.name = fileName

	// Cast to a File() type
	return new File([b], fileName)
}
// 上传头像
const uploadAvatar = async () => {
	if (uploading.value) return

	uploading.value = true

	cropper.value.getCropBlob(async (data) => {
		const file = blobToFile(data, 'avatar.png')

		const fromData = new FormData()
		fromData.append('file', file)
		const res = await handUploadAvatar(fromData)

		if (res.code === 200) {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: res.msg,
				life: 3000
			})
			// 上传成功后，将图片地址传递给父组件
			emits('update-avatar', res.data.avatar)
		} else {
			toast.add({
				severity: 'error',
				summary: 'Error',
				detail: res.msg,
				life: 3000
			})
		}
	})

	uploading.value = false
}
</script>

<style scoped lang="scss">
.upload-avater {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 35rem;

	.left {
		width: 15rem;
		height: 15rem;

		.vue-cropper {
			width: 100%;
			height: 100%;
		}
	}
	.right {
		display: flex;
		flex: 1;

		flex-direction: column;
		align-items: center;
		justify-content: center;

		.preview {
			width: 120px;
			height: 120px;
			margin-bottom: 1rem;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.upload {
			display: flex;
			flex-direction: row;
			gap: 10px;
		}
	}
}

@media (max-width: 768px) {
	.upload-avater {
		width: 100%;
		flex-direction: column;

		.left {
			width: 100%;
			height: 15rem;
		}
		.right {
			width: 100%;
			margin-top: 1rem;
		}
	}
}
</style>
