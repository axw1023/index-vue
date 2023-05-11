<template>
  <div class="app-main-div">
    <div class="logo">
      <router-link to="/">Go to Home</router-link>
    </div>
    <div class="subject-div">
      <Subject/>
    </div>
    <div class="link-div">
      <router-view :key="$route.fullPath" name="mainPage"></router-view>
    </div>
  </div>
</template>

<script>
import Subject from "./components/Subject.vue";

export default {
  name: 'App',
  components: {
    Subject
  },
};
</script>

<style>
.subject-div {
  background-color: #86908A;
  width: 20vw;
  height: 100vh;
  float: left;
  display: flex;
  justify-content: center; /*使用 flex 布局,水平居中对齐*/
}

.link-div {
  background-color: #33a25f;
  width: 70vw;
  height: 100vh;
  float: left;
  display: flex;
  justify-content: center; /*使用 flex 布局,水平居中对齐*/
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


</style>