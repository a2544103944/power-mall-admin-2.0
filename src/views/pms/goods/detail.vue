<template>
  <el-steps
      :active="active"
      process-status="finish"
      finish-status="success"
      simple
  >
    <el-step title="填写商品信息"/>
    <el-step title="设置商品库存"/>
  </el-steps>

  <goods-info
      v-show="active == 0"
      v-model="goodsInfo"
      v-if="loaded == true"
      @next="next"
  />

  <goods-spec
      v-show="active == 1"
      v-model="goodsInfo"
      v-if="loaded == true"
      @prev="prev"
      @next="next"
  />
</template>

<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();
import {onMounted, reactive, toRefs} from 'vue';
import GoodsInfo from "@/views/pms/goods/components/goods-info.vue";
import GoodsSpec from "@/views/pms/goods/components/goods-spec.vue";

import * as goodsApi from '@/api/pms/goods';

const state = reactive({
  loaded: false,
  active: 0,
  goodsInfo: {
    specList: [],
    skuList: [],
  },
});
const {loaded, active, goodsInfo} = toRefs(state);

function loadData() {
  const goodsId = route.query.goodsId;
  if (goodsId) {
    goodsApi.getDetail(goodsId).then((response) => {
      state.goodsInfo = response.data;
      state.loaded = true;
    });
  } else {
    state.loaded = true;
  }
}

function prev() {
  if (state.active-- <= 0) {
    state.active = 0;
  }
}

function next() {
  if (state.active++ >= 1) {
    state.active = 0;
  }
}

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
</style>
