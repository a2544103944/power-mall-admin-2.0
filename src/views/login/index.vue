<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
    <h2 class="login-title">动力商城管理系统</h2>
    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" @keyup.enter="handleLogin"/>
    </el-form-item>

    <!-- 验证码
    <el-form-item label="验证码" prop="captchaText">
      <el-input v-model="loginForm.captchaText" style="width: 60%" @keyup.enter="handleLogin"/>
      <img :src="captchaImg" @click="handleCaptchaGenerate" alt="加载失败" style="height: 35px;margin-left: 10px"/>
    </el-form-item>
    -->
    <el-button :loading="loading" type="primary" @click.prevent="handleLogin" style="width: 100%;" size="large">登录
    </el-button>
  </el-form>
</template>

<script setup>
import {onMounted, reactive, ref, toRefs, watch} from 'vue';
// 组件依赖
import {ElForm, ElInput} from 'element-plus';
// 路由
import router from '@/router';
import {useRoute} from 'vue-router';
const route = useRoute();
// 状态管理依赖
import useStore from '@/store';
const {userStore} = useStore();
// API依赖
import {getCaptcha} from '@/api/auth';
const loginFormRef = ref(ElForm);

const state = reactive({
  loading: false,
  redirect: '',
  loginForm: {
    username: 'admin',
    password: '123456',
    captchaKey: '',
    captchaText: ''
  },

  loginRules: {
    username: [{required: true, trigger: 'blur', message: "用户名不能为空"}],
    password: [{required: true, trigger: 'blur', message: "密码不能为空"}],
    // captchaText: [{required: true, trigger: 'blur', message: "验证码不能为空"}],
  },
  captchaImg: '',
  otherQuery: {},
});

const {
  loginForm,
  loginRules,
  loading,
  captchaImg,
} = toRefs(state);

function handleLogin() {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      state.loading = true;
      userStore.login(state.loginForm).then(() => {
        router.push({path: state.redirect || '/', query: state.otherQuery});
        state.loading = false;
      }).catch(() => {
        state.loading = false;
        // 重新生成验证码
        // handleCaptchaGenerate();
      });
    } else {
      return false;
    }
  });
}

// 获取验证码
function handleCaptchaGenerate() {
  getCaptcha().then(({data}) => {
    captchaImg.value = data.captchaImg;
    loginForm.value.captchaKey = data.captchaKey;
  });
}

watch(
    route,
    () => {
      const query = route.query;
      if (query) {
        state.redirect = query.redirect;
        state.otherQuery = getOtherQuery(query);
      }
    },
    {
      immediate: true,
    }
);

function getOtherQuery(query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

onMounted(() => {
  // 生成验证码
  // handleCaptchaGenerate();
});
</script>

<style scoped>
body {
  background-color: #303133;
}

.login-form {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 35px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 15px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
