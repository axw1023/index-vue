import {createRouter, createWebHistory} from 'vue-router';
import Link from "../components/Link.vue";
import Subject from "../components/Subject.vue";
import Home from "../components/Home.vue";
// 导入其他页面组件

const routes = [
    {
        // 首页
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        // 详情
        path: '/detail/:fnSubjectId',
        name: 'Detail',
        components: {
            Link, Subject
        }
    },
    {
        // 详情（查询）
        path: '/search/:searchMsg',
        name: 'Search',
        components: {
            Link, Subject
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
