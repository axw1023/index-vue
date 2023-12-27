import {createRouter, createWebHistory} from 'vue-router';
import Link from "../components/Link.vue";
import Home from "../components/Home.vue";
// 导入其他页面组件

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/link/:fnSubjectId',
        name: 'Link',
        component: Link
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
