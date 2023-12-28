<template>
  <div class="app-main-div">
    <div class="logo">
      <!--<a @click="goToHome">首页</a>-->
      <router-link to="/">Go to Home</router-link>
    </div>
    <!--内容div-->
    <div class="content-div">
      <Home/>
    </div>
  </div>
</template>

<script setup>
import Home from "./components/Home.vue";
import router from "./router/router";

/*首页*/
// function goToHome() {
//   router.push({path: '/'}).then(() => {
//     /*刷新：<Home/>的原因，路由跳转后不刷新，添加router-link ：key会导致二次渲染，因此在这强制刷新一下*/
//   });
//   location.reload();
// }
</script>

