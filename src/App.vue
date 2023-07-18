<template>
  <el-config-provider :locale="cn">
    <router-view/>
  </el-config-provider>
</template>

<script setup>
import cn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.el-table {
  margin-top: 12px;
}

.el-pagination {
  margin-top: 12px;
}

</style>
