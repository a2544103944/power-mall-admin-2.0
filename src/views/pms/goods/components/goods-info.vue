<template>
  <div class="component-container">
    <div class="component-container__main">
      <el-form ref="dataFormRef" :rules="rules" :model="goodsInfo" label-width="120px">
        <el-form-item label="商品分类" prop="categoryId">
          <el-cascader
              clearable
              v-model="goodsInfo.categoryId"
              :validate-event="false"
              :options="categoryList"
              :props="{label: 'name', value: 'id', checkStrictly: true, emitPath: false}"
          />
        </el-form-item>

        <el-form-item label="商品名称" prop="name">
          <el-input style="width: 400px" v-model="goodsInfo.name" clearable/>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input style="width: 400px" v-model="goodsInfo.price" clearable/>
        </el-form-item>

        <el-form-item label="商品封面图" prop="img">
          <single-upload v-model="goodsInfo.img"/>
        </el-form-item>

        <el-form-item label="商品轮播图" prop="imgList">
          <multi-upload v-model="goodsInfo.imgList"></multi-upload>
        </el-form-item>

        <el-form-item label="商品详情" prop="detail">
          <wang-editor v-model="goodsInfo.detail"/>
        </el-form-item>
      </el-form>
      <div class="component-container__footer">
        <el-button type="primary" @click="handleNext">下一步，设置商品属性</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, toRefs} from 'vue';
import {ElForm} from 'element-plus';
import SingleUpload from "@/components/Upload/SingleUpload.vue";
import MultiUpload from "@/components/Upload/MultiUpload.vue";
import WangEditor from "@/components/WangEditor/WangEditor.vue";
import * as categoryApi from "@/api/pms/category";

const emit = defineEmits(['next', 'update:modelValue']);
const dataFormRef = ref(ElForm);

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
    },
  },
});

const goodsInfo = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
});

const state = reactive({
  categoryList: [],
  rules: {
    categoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
    name: [{required: true, message: '请填写商品名称', trigger: 'blur'}],
    price: [{required: true, message: '请填写商品价格', trigger: 'blur'}],
    img: [{required: true, message: '请上传商品封面图', trigger: 'blur'}],
    imgList: [{required: true, message: '请上传商品商品轮播图', trigger: 'blur'}]
  },
});

const {categoryList, rules} = toRefs(state);

function handleNext() {
  dataFormRef.value.validate((valid) => {
    if (valid) {
      emit('next');
    }
  });
}

onMounted(() => {
  categoryApi.list().then(({data}) => {
    categoryList.value = data;
  })
});
</script>
<style lang="scss" scoped>
.component-container {
  &__main {
    margin: 20px auto;

    .button {
      margin-left: 10px;
    }
  }

  &__footer {
    position: fixed;
    bottom: 20px;
    right: 40px;
    z-index: 100;
  }
}
</style>

