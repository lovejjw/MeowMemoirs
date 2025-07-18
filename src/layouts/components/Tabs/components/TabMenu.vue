<script setup lang="ts">
import { inject, nextTick, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore, useTabsStore, useKeepAliveStore } from "@/stores";
import { STATIC_URL } from "@/config/index.ts";

const route = useRoute();
const router = useRouter();

// 点击鼠标右键点击出现菜单
const choosePath = ref();
const handleMenuParent = (e: any) => {
  if (e.srcElement?.id) {
    choosePath.value = e.srcElement.id.split("-")[1];
  } else {
    return;
  }
  const card = document.querySelector(".tabs-card") as HTMLElement | null;

  // 阻止默认右键菜单
  e.preventDefault();
  if (card != null) {
    // 设置 card 的位置为鼠标点击位置
    card.style.display = "block";
    card.style.left = (e.pageX + "px") as string;
    card.style.top = (e.pageY + "px") as string;

    // 点击数据时，菜单消失
    const hideCard = () => {
      if (card !== null) {
        card.style.display = "none";
      }
      window.removeEventListener("click", hideCard); // 移除点击事件监听器，以免影响其他操作
    };

    window.addEventListener("click", hideCard);
  }
  // 阻止事件冒泡到父元素[防止触发全局的 window.onclick]
  e.stopPropagation();
};

const handleMenuChildren = (path: any, e: any) => {
  choosePath.value = path;
  const card = document.querySelector(".tabs-card") as HTMLElement | null;

  // 阻止默认右键菜单
  e.preventDefault();
  if (card != null) {
    // 设置 card 的位置为鼠标点击位置
    card.style.display = "block";
    card.style.left = (e.pageX + "px") as string;
    card.style.top = (e.pageY + "px") as string;

    // 点击数据时，菜单消失
    const hideCard = () => {
      if (card !== null) {
        card.style.display = "none";
      }
      window.removeEventListener("click", hideCard); // 移除点击事件监听器，以免影响其他操作
    };

    window.addEventListener("click", hideCard);
  }
  // 阻止事件冒泡到父元素[防止触发全局的 window.onclick]
  e.stopPropagation();
};

/** 刷新当前页 */
const refreshCurrentPage: Function = inject("refresh") as Function;
const handleRefresh = () => {
  setTimeout(() => {
    route.meta.isKeepAlive &&
      useKeepAliveStore().removeKeepAliveName(route.name as string);
    refreshCurrentPage(false);
    nextTick(() => {
      route.meta.isKeepAlive &&
        useKeepAliveStore().addKeepAliveName(route.name as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

/** 当前页全屏 */
const handleMaximize = () => {
  // 切换哪个，先跳转哪个
  router.push(choosePath.value);
  useGlobalStore().setGlobal("maximize", !useGlobalStore().maximize);
};

/** 关闭左边 OR 右边选项卡 */
const handleCloseSideTabs = (direction: any) => {
  // console.log("关闭左边 OR 右边选项卡", direction);
  if (choosePath.value) {
    useTabsStore().closeSideTabs(choosePath.value, direction);
  } else {
    useTabsStore().closeSideTabs(route.fullPath, direction);
  }
};

/** 关闭当前选项卡 */
const handleCloseCurrentTab = () => {
  if (choosePath.value) {
    useTabsStore().removeTab(choosePath.value, true, route.fullPath);
  } else {
    useTabsStore().removeTab(route.fullPath);
  }
};

/** 关闭其他选项卡 */
const handleCloseOtherTabs = () => {
  if (choosePath.value) {
    useTabsStore().closeManyTabs(choosePath.value);
    router.push(choosePath.value);
  } else {
    useTabsStore().closeManyTabs(route.fullPath);
  }
};

/** 关闭全部选项卡 */
const handleCloseAllTabs = () => {
  useTabsStore().closeManyTabs();
  router.push(STATIC_URL);
};

/** 组件对外暴露 */
defineExpose({
  handleMenuParent,
  handleMenuChildren,
});
</script>

<template>
  <div class="tabs-card">
    <div @click="handleRefresh()" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <Refresh class="icon-scale" /> </el-icon
      >重新刷新
    </div>
    <div @click="handleMaximize()" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <FullScreen class="icon-scale" /> </el-icon
      >全屏切换
    </div>
    <div @click="handleCloseCurrentTab()" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <Close class="icon-scale" /> </el-icon>关闭当前
    </div>
    <div @click="handleCloseOtherTabs()" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <Star class="icon-scale" /> </el-icon>关闭其它
    </div>
    <div @click="handleCloseSideTabs('left')" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <DArrowLeft class="icon-scale" /> </el-icon
      >关闭左侧
    </div>
    <div @click="handleCloseSideTabs('right')" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <DArrowRight class="icon-scale" /> </el-icon
      >关闭右侧
    </div>
    <div icon="Remove" @click="handleCloseAllTabs()" class="tab-menu-item">
      <el-icon size="16" class="m-r-5px"> <Remove class="icon-scale" /> </el-icon>关闭所有
    </div>
  </div>
</template>

<style lang="scss" scoped>
/** 右键点击选项开始 */
.tabs-card {
  position: absolute;
  z-index: 9999;
  display: none;
  // cursor: pointer;
  background-color: #ffffff;
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
  color: #333639;
  padding: 2px;
}
.dark .tabs-card {
  --un-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--un-bg-opacity));
  --un-text-opacity: 1;
  color: rgb(229 234 243 / var(--un-text-opacity));
}
.tab-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 12px;
  padding: 8px 12px;
  margin-top: 1px;
  font-size: var(--el-font-size-base);
  user-select: none;
  background-color: var(--el-bg-color);
  border-radius: var(--el-border-radius-base);

  &:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }
}

.tab-menu-item:hover .icon-scale {
  animation: scale 0.6s ease-in-out forwards;
}

@keyframes scale {
  0% {
    transform: scale(1);
    /* 初始状态为原始大小 */
    -webkit-transform: scale(1);
    transform-origin: center;
    -webkit-transform-origin: center;
  }

  50% {
    transform: scale(1.16);
    /* 中间放大到1.16倍 */
    -webkit-transform: scale(1.16);
  }

  100% {
    transform: scale(1);
    /* 最终状态恢复到原始大小 */
    -webkit-transform: scale(1);
  }
}

/** 右键点击选项结束 */
</style>
