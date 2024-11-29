<template>
  <div class="home-div">
    <div class="header-div">
      <div class="logo-div">
        <router-link to="/">首页</router-link>
      </div>
      <div class="search-div">
        <input v-model="searchMsg" @change="goToDetail" placeholder="搜索"/>
      </div>
    </div>
    <div class="body-div">
      <div class="link-div">
        <!--强制刷新-->
        <Link :key="$route.path"/>
      </div>
    </div>
    <div class="footer-div">
    </div>
  </div>
</template>

<script setup>
import Introduction from "./Introduction.vue";
import Link from "./Link.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

// 路由
const router = useRouter()
// 查询
const searchMsg = ref(null)

// 通过路由刷新详情页
function goToDetail() {
  // 返回首页
  if (searchMsg.value == null || searchMsg.value == "") {
    router.push('/')
  } else {
    // 刷新详情
    router.push({
      name: 'Search',
      params: {searchMsg: searchMsg.value},
    });
  }
}

</script>

<!--全局样式-->
<style>
.home-div {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.header-div {
  display: flex;
  justify-content: space-between;
}

.body-div {
  /* 使用flex布局 */
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 确保容器至少占满整个视口高度 */
  min-height: 100vh;
}

.footer-div {
}

.link-div {
  background-color: #33a25f;
  width: 70vw;
  height: 100vh;
  float: left;
  display: flex;
  position: relative; /*设置元素定位为相对定位，实现左右两个 div 可以各自上下滚动互不影响的效果。*/
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* 隐藏页面滚动条,使整个页面不滚动 */
body, html {
  overflow: hidden;
}

/*loading*/
.loading-indicator {
  position: relative; /*相对定位*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* 根据需要调整 */
}

</style>