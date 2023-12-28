import {createRouter, createWebHistory} from 'vue-router';
import Link from "../components/Link.vue";
import Introduction from "../components/Introduction.vue";
import App from "../App.vue";
import Subject from "../components/Subject.vue";
import Home from "../components/Home.vue";
// 导入其他页面组件

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children:{
            component: Subject,
        }
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
