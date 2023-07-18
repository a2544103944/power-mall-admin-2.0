<template>
  <!-- 上传组件 -->
  <el-upload v-model="imgUrl" :show-file-list="false" list-type="picture-card" :http-request="upload">
    <img v-if="imgUrl" :src="imgUrl" width="150"/>
    <el-icon v-else class="single-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { computed } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import {uploadFile} from "@/api/oss";
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const imgUrl = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    // imgUrl改变时触发修改父组件绑定的v-model的值
    emit('update:modelValue', val);
  },
});

/**
 * 图片上传
 * @param options
 */
async function upload(options){
  const { data } = await uploadFile(options.file);
  // console.log(data)
  imgUrl.value = data.url;
}
</script>
