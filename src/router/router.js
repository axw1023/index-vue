import {createRouter, createWebHistory} from 'vue-router';
import Link from "../components/Link.vue";
import Introduction from "../components/Introduction.vue";
// 导入其他页面组件

const routes = [
  {
    path: '/',
    name: 'Introduction',
    components: {
      mainPage: Introduction
    }
  },
  {
    path: '/link/:fnSubjectId',
    name: 'Link',
    components: {
      mainPage: Link
    }
  },
  // 添加其他页面路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
