import axios from 'axios';

const BASE_URL = 'http://localhost:9002';

// 新增
export function addLinkAPI(params) {
    return axios.post(`${BASE_URL}/link/create`, params);
}

// 分组列表
export function fetchSubjectList(params) {
    return axios.get(`${BASE_URL}/subject/list`, {
        params: params
    });
}

// 链接列表
export function fetchLinkList(params) {
    return axios.get(`${BASE_URL}/link/list`, {
        params: params
    });
}

// 点赞
export function addLikeCount(id) {
    return axios.get(`${BASE_URL}/like/count/add/like`, {
        params: {
            id: id,
        },
    });
}

// 点踩
export function addDislikeCount(id) {
    return axios.get(`${BASE_URL}/like/count/add/dislike`, {
        params: {
            id: id,
        },
    });
}
