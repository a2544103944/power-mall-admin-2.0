<template>
  <el-button type="success" @click="add">新增</el-button>
  <el-table
      ref="dataTableRef"
      v-loading="loading"
      row-key="id"
      default-expand-all
      :data="categoryList">
    <el-table-column label="分类名称" prop="name"/>
    <el-table-column label="分类图标">
      <template #default="scope">
        <el-image
            style="width: 25px; height: 25px"
            :src="scope.row.icon"
            :zoom-rate="1.2"
            :preview-src-list="[scope.row.icon]"
            :initial-index="1"
            :preview-teleported="true"
            :hide-on-click-modal="true"
        />
      </template>
    </el-table-column>
    <el-table-column label="排序" prop="weight"/>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" link @click.stop="edit(scope.row)">编辑</el-button>
        <el-button type="danger" link @click.stop="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="商品分类" v-model="dialogFormVisible">
    <el-form ref="dataFormRef" :rules="rules" :model="formData" label-width="80px">
      <el-form-item label="上级分类" prop="parentId">
        <el-cascader
            clearable
            v-model="formData.parentId"
            :validate-event="false"
            :options="categoryList"
            :props="{label: 'name', value: 'id', checkStrictly: true, emitPath: false}"
        />
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="分类图标" prop="icon">
        <single-upload v-model="formData.icon"/>
      </el-form-item>
      <el-form-item label="排序" prop="weight">
        <el-input-number v-model="formData.weight" min="0.0" :step="0.01"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import {onMounted, ref} from "vue";
import * as categoryApi from "@/api/pms/category";
import {ElForm, ElMessage, ElMessageBox} from "element-plus";
import SingleUpload from "@/components/Upload/SingleUpload.vue";

// 加载状态
const loading = ref(true);
// 商品分类列表
const categoryList = ref();

onMounted(() => {
  getCategoryList();
})

// 获取商品分类数据
function getCategoryList() {
  categoryApi.list().then(({data}) => {
    categoryList.value = data;
    loading.value = false;
  });
}

// 对话框是否可见
const dialogFormVisible = ref(false);
// 表单数据
const formData = ref({});
// 表单
const dataFormRef = ref(ElForm);

// 新增
function add() {
  dialogFormVisible.value = true;
  formData.value = {
    parentId: 0,
    weight: 0.0
  }
}

// 编辑
function edit(row) {
  dialogFormVisible.value = true;
  Object.assign(formData.value, row);
}

// 删除
function del(row) {
  ElMessageBox.confirm('确认删除?', '警告', {
    type: 'warning',
  }).then(() => {
    categoryApi.deleteById(row.id).then(() => {
      ElMessage.success('删除成功');
      getCategoryList();
    });
  })
}

// 校验规则
const rules = {
  name: [{required: true, message: '请输入分类名称', trigger: 'blur'}],
  icon: [{required: true, message: '请上传分类图标', trigger: 'blur'}],
  weight: [{required: true, message: '请输入分类排序', trigger: 'blur'}]
}

// 表单提交
function submitForm() {
  dataFormRef.value.validate((valid) => {
    if (valid) {
      if (!formData.value.parentId) {
        formData.value.parentId = 0;
      }
      console.log(formData.value)
      if (formData.value.id) {
        categoryApi.updateById(formData.value.id, formData.value).then(() => {
          ElMessage.success('修改成功');
          closeDialog();
          getCategoryList();
        });
      } else {
        categoryApi.add(formData.value).then(() => {
          ElMessage.success('新增成功');
          closeDialog();
          getCategoryList();
        });
      }
    }
  })
}

// 取消
function closeDialog() {
  dialogFormVisible.value = false;
  // 清除校验
  dataFormRef.value.clearValidate();
  // dataFormRef.value.resetFields();
  formData.value = {};
}
</script>
<style scoped>

</style>
