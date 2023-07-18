import {createRouter, createWebHistory} from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useStore from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },

    {
      path: '/',
      name: '主页',
      component: () => import('@/layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: '控制台',
          component: () => import('@/views/dashboard/index.vue'),
        }]
    },
    {
      path: '/pms',
      name: '商品管理',
      component: () => import('@/layout/index.vue'),
      redirect: '/pms/category',
      children: [{
        path: '/pms/category',
        name: '商品分类',
        component: () => import('@/views/pms/category/index.vue'),
      },{
        path: '/pms/goods',
        name: '商品列表',
        component: () => import('@/views/pms/goods/index.vue'),
      },{
        path: '/pms/goods-detail',
        name: '商品详情',
        component: () => import('@/views/pms/goods/detail.vue'),
      }]
    },
  ]
})

// 白名单路由
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start(); //开启进度条
  const {userStore} = useStore();
  const hasToken = userStore.token;
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({path: '/'});
      NProgress.done();
    } else {
      next();
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); //完成进度条
});
export default router
