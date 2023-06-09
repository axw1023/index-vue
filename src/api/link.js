import axios from 'axios';

const BASE_URL = 'http://localhost:9002';

// 新增
export function addLink(params) {
  return axios.post(`${BASE_URL}/link/create`, params);
}

// 分组列表
export function fetchSubjectList() {
  return axios.get(`${BASE_URL}/subject/list`);
}

// 链接列表
export function fetchLinkList(params) {
  return axios.get(`${BASE_URL}/link/list`, {
    params: {
      fnSubjectId: params.fnSubjectId,
    },
  });
}

// 点赞
export function addLikeCount(id) {
  return axios.get(`${BASE_URL}/like/count/add`, {
    params: {
      id: id,
    },
  });
}

// 点反
export function subtractLikeCount() {
  return axios.get(`${BASE_URL}/like/count/subtract`);
}
