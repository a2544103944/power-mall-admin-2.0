<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :before-upload="handleBeforeUpload"
    :http-request="handleUpload"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
    :limit="props.limit"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import {ElMessage, ElUpload} from 'element-plus';
import { uploadFile, deleteFile } from "@/api/oss";
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  /**
   * 文件路径集合
   */
  modelValue: {
    type: [],
    default: [],
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 5,
  },
});
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const fileList = ref([]);
watch(
  () => props.modelValue,
  (newVal) => {
    console.log('newVal', newVal);
    const filePaths = fileList.value.map((file) => file.url);
    // 监听modelValue文件集合值未变化时，跳过赋值
    if (
      filePaths.length > 0 &&
      filePaths.length === newVal.length &&
      filePaths.every((x) => newVal.some((y) => y === x)) &&
      newVal.every((y) => filePaths.some((x) => x === y))
    ) {
      return;
    }
    fileList.value = newVal.map((filePath) => {
      return { url: filePath };
    });
  },
  { immediate: true }
);

/**
 * 自定义图片上传
 *
 * @param params
 */
async function handleUpload(options) {
  const { data: fileInfo } = await uploadFile(options.file);
  // 上传成功需手动替换文件路径为远程URL，否则图片地址为预览地址 blob:http://
  const fileIndex = fileList.value.findIndex(
    (file) => file.uid == (options.file).uid
  );
  fileList.value.splice(fileIndex, 1, {
    name: fileInfo.filename,
    url: fileInfo.url,
  });
  emit(
    'update:modelValue',
    fileList.value.map((file) => file.url)
  );
}

/**
 * 删除图片
 */
function handleRemove(removeFile) {
  const filePath = removeFile.name;
  if (filePath) {
    deleteFile(filePath).then(() => {
      emit(
        'update:modelValue',
        fileList.value.map((file) => file.url)
      );
    });
  }
}

/**
 * 限制用户上传文件的格式和大小
 */
function handleBeforeUpload(file) {
  if (file.size > 2 * 1048 * 1048) {
    ElMessage.warning('上传图片不能大于2M');
    return false;
  }
  return true;
}

/**
 * 图片预览
 */
const handlePreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
</script>
