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
</script>

