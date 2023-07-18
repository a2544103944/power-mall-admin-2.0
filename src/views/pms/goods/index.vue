<template>
  <el-form :model="queryParams" :inline="true">
    <el-form-item label="关键字">
      <el-input v-model="queryParams.keywords" placeholder="商品名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="商品分类">
      <el-cascader
          clearable
          v-model="queryParams.categoryId"
          :validate-event="false"
          :options="categoryList"
          :props="{label: 'name', value: 'id', checkStrictly: false, emitPath: false}"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="query">搜索</el-button>
      <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
    </el-form-item>
  </el-form>

  <el-button type="success" :icon="Plus" @click="add">新增</el-button>
  <el-table v-loading="loading" :data="goodsList">
    <el-table-column type="expand" width="120" label="库存">
      <template #default="props">
        <el-table :data="props.row.skuList" border>
          <el-table-column align="left" label="规格名称" prop="name" width="400"/>
          <el-table-column align="center" label="价格" prop="price">
            <template #default="scope">{{ scope.row.price }}</template>
          </el-table-column>
          <el-table-column align="center" label="库存" prop="stock"/>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="name" width="500"/>
    <el-table-column label="封面图片">
      <template #default="scope">
        <el-image
            style="width: 25px; height: 25px"
            :src="scope.row.img"
            :zoom-rate="1.2"
            :preview-src-list="[scope.row.img]"
            :initial-index="1"
            :preview-teleported="true"
            :hide-on-click-modal="true"
        />
      </template>
    </el-table-column>
    <el-table-column label="商品分类" prop="categoryName" width="100"/>
    <el-table-column align="center" label="价格" prop="price">
      <template #default="scope">{{ scope.row.price }}</template>
    </el-table-column>
    <el-table-column label="销量" prop="sales" width="100"/>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" link @click.stop="edit(scope.row)">编辑</el-button>
        <el-button type="danger" link @click.stop="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      :current-page="queryParams.current"
      :page-size="queryParams.size"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper">
  </el-pagination>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {ElTable, ElMessage, ElMessageBox} from 'element-plus';
import {useRouter} from 'vue-router';
import {Search, Refresh, Plus} from '@element-plus/icons-vue';
import * as goodsApi from '@/api/pms/goods';
import * as categoryApi from '@/api/pms/category';
// 路由
const router = useRouter();
// 加载状态
const loading = ref(true);
// 商品分类列表
const categoryList = ref([]);
// 商品列表
const goodsList = ref([]);
// 总页数
const total = ref(0);
// 查询条件
const queryParams = ref({
  current: 1,
  size: 10,
  keywords: '',
  categoryId: '',
});

onMounted(() => {
  // 初始化商品分类树
  categoryApi.list().then(({data}) => {
    categoryList.value = data;
  });
  query();
});

// 查询
function query() {
  loading.value = true;
  goodsApi.list(queryParams.value).then(({data}) => {
    goodsList.value = data.records;
    total.value = data.total;
    loading.value = false;
  });
}

// 重置查询
function resetQuery() {
  queryParams.value = {
    current: 1,
    size: 10,
    keywords: '',
    categoryId: '',
  };
  query();
}
// 每页显示多少条改变事件
function handleSizeChange(size) {
  queryParams.value.current = 1;
  queryParams.value.size = size;
  query();
}
// 页码改变事件
function handleCurrentChange(current) {
  queryParams.value.current = current;
  query();
}
// 新增
function add() {
  router.push({path: 'goods-detail'});
}
// 编辑
function edit(row) {
  router.push({
    path: 'goods-detail',
    query: {goodsId: row.id, categoryId: row.categoryId},
  });
}
// 删除
function del(row) {
  ElMessageBox.confirm('确认删除?', '警告', {
    type: 'warning',
  }).then(() => {
    goodsApi.deleteById(row.id).then(() => {
      ElMessage.success('删除成功');
      query();
    });
  })
}
</script>
<style scoped></style>