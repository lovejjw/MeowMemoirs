<!-- 这里是一次性加载 LayoutComponents -->
<template>
  <div>
    <!-- 同级进行选择不同布局时就不会被关闭 -->
    <component :is="ThemeConfig" />
    <component :is="LayoutComponent[layout]" v-if="!isMobile" />
    <component :is="LayoutMobile" v-if="isMobile" />
  </div>
</template>

<script setup lang="ts" name="layout">
import { useScreenStore } from "@/utils/screen";
import { computed, type Component } from "vue";
// 全局主题配置
import {useGlobalStore} from "@/stores";
import ThemeConfig from "@/layouts/components/ThemeConfig/index.vue";
// import LayoutVertical from "@/layouts/LayoutVertical/index.vue";
import LayoutColumns from "@/layouts/LayoutColumns/index.vue";
// import LayoutClassic from "@/layouts/LayoutClassic/index.vue";
// import LayoutHorizontal from "@/layouts/LayoutHorizontal/index.vue";
// import LayoutOptimum from "@/layouts/LayoutOptimum/index.vue";
import LayoutMobile from "@/layouts/LayoutMobile/index.vue";

type LayoutType = "vertical" | "columns" | "classic" | "horizontal" | 'optimum' | string;
const LayoutComponent: Record<LayoutType, Component> = {
//   vertical: LayoutVertical,
  columns: LayoutColumns,
//   classic: LayoutClassic,
//   horizontal: LayoutHorizontal,
//   optimum: LayoutOptimum
};

/** 获取布局格式 */
const layout = computed(() => useGlobalStore().layout);
// 获取当前为[移动端、IPad、PC端]仓库，阔以使用 watchEffect(() => {}) 进行监听。
const { isMobile } = useScreenStore();
</script>

<style scoped lang="scss"></style>
