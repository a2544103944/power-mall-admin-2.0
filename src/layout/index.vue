<template>
  <el-container class="layout-container">
    <el-header>
      <el-row>
        <el-col :span="6">
          <el-text size="large" class="logo">动力商城管理系统</el-text>
        </el-col>
        <el-col :span="18" class="toolbar">
          <el-dropdown>
            <el-avatar :icon="UserFilled"></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <el-scrollbar>
          <el-menu :router="true">
            <el-menu-item index="/dashboard">
              <el-icon>
                <icon-menu/>
              </el-icon>
              主页
            </el-menu-item>
            <el-sub-menu index="/pms">
              <template #title>
                商品管理
              </template>
              <el-menu-item index="/pms/goods-detail">商品上架</el-menu-item>
              <el-menu-item index="/pms/goods">商品列表</el-menu-item>
              <el-menu-item index="/pms/category">商品分类</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                营销管理
              </template>
              <el-menu-item index="3-1">广告列表</el-menu-item>
              <el-menu-item index="3-2">优惠券列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                订单管理
              </template>
              <el-menu-item index="4-1">订单列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                系统管理
              </template>
              <el-menu-item index="5-1">用户管理</el-menu-item>
              <el-menu-item index="5-2">角色管理</el-menu-item>
              <el-menu-item index="5-3">菜单管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main>
          <!-- 导航-->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <el-icon>
                <IconMenu/>
              </el-icon>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(obj, key) in $route.matched" :key="key">{{ obj.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="main">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import {Menu as IconMenu, UserFilled} from '@element-plus/icons-vue'
import {ElMessageBox} from "element-plus";
import useStore from "@/store";
import router from "@/router";

const {userStore} = useStore();

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    type: 'warning',
  }).then(() => {
    userStore.logout().then(() => {
      router.push('/login');
    });
  });
}
</script>

<style scoped lang="scss">

.el-main::-webkit-scrollbar {
  display: block;
  width: 10em;
  overflow: auto;
  height: 2em;
}

.layout-container {
  .el-header {
    background-color: #303133;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid var(--el-border-color);
    .toolbar {
      text-align: right;
      padding-top: 8px
    };
    .logo {
      width: 240px;
      color: #FFFFFF;
      font-size: 18px;
    }
  }

  .el-aside {
    width: 240px;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }

  .el-main {
    padding: 16px 16px;
    //height: calc(100vh - 60px);
    overflow-y: auto;
    border-left: 1px solid var(--el-border-color);
    background-color: #F2F3F5;

    .el-breadcrumb {
      margin-bottom: 16px
    }

    .main {
      background-color: #FFFFFF;
      padding: 24px
    }
  }

  .el-menu {
    border-right: none;
  }
}
</style>
