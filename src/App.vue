<template>
  <div class="app-main-div">
    <div class="logo">
      <a @click="goToHome">首页</a>
    </div>
    <!--内容div-->
    <div class="content-div">
      <Home/>
    </div>
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home
  },
  /*首页*/
  methods: {
    goToHome() {
      this.$router.push({path: '/'}).then(() => {
        /*刷新：<Home/>的原因，路由跳转后不刷新，添加router-link ：key会导致二次渲染，因此在这强制刷新一下*/
        location.reload();
      });
    }
  }
};
</script>

